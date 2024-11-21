/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  ALL_CHATS,
  CHECK_IS_LIKED,
  NEW_MESSAGE,
  USER_INTERESTS,
} from "../backendapi";
import { LIKE_ICON, SUPER_LIKE_ICON } from "../icons";

const ChatSpace = ({ friendName, setIsChatOpen }) => {
  const socket = useRef();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const scrollRef = useRef(null);
  const prevChats = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false); // isLiked = true means the loggedin user has already liked the curr friend (friendName)
  useEffect(() => {
    socket.current = io("ws://localhost:8082");
    socket.current.emit("create-room", {
      sender: JSON.parse(localStorage.getItem("of-auth")).userName,
      receiver: friendName,
    });
    if (prevChats.current) {
      prevChats.current = false;

      fetch(
        ALL_CHATS +
          `?roomId=${[
            JSON.parse(localStorage.getItem("of-auth")).userName,
            friendName,
          ]
            .sort()
            .join("-")}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then(async (data) => {
          setChats([...data.chats]);
          setIsLoading(false);
          await fetch(CHECK_IS_LIKED, {
            method: "GET",
            credentials: "include",
          })
            .then((res) => res.json())
            .then(({ results }) => {
              let flag = false;
              for (let index = 0; index < results.length; index++) {
                if (results[index] === friendName) {
                  flag = true;
                  break;
                }
              }
              setIsLiked(flag);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) =>
          console.log("CLIENT error while fetching previous records.", err)
        );
    }
  }, [friendName]);
  useEffect(() => {
    socket.current.on("chat-message", (payload) => {
      setChats([...chats, payload]);
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
  }, [chats]);
  const handleMessageSend = async () => {
    socket.current.emit("chat-message", {
      sender: JSON.parse(localStorage.getItem("of-auth")).userName,
      receiver: friendName,
      message,
    });
    setChats([
      ...chats,
      {
        sender: JSON.parse(localStorage.getItem("of-auth")).userName,
        receiver: friendName,
        message,
      },
    ]);
    setMessage("");
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    await fetch(NEW_MESSAGE, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        sender: JSON.parse(localStorage.getItem("of-auth")).userName,
        receiver: friendName,
        message,
      }),
      credentials: "include",
    });
  };
  const handleUserInterest = async (para) => {
    await fetch(
      USER_INTERESTS +
        `?friendUserId=${friendName}&sl=${para === "sl" ? true : false}&l=${
          para === "l" ? true : false
        }`,
      {
        method: "PUT",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => console.log("user interest data", data))
      .catch((err) => console.log(err));
    return;
  };

  return (
    <>
      <div className="w-[650px] h-[500px] rounded-md shadow-md shadow-gray-400 border border-gray-300 fixed bg-white left-[30%] top-[20%] z-10">
        <div className="w-full h-[50px] bg-[#313131] text-white text-2xl font-bold font-sour flex justify-center items-center">
          {friendName}
          {isLiked && (
            <div className="absolute right-[200px] w-[70px] flex justify-center items-center h-[30px] bg-purple-500 border border-gray-400 rounded-md p-1 text-[15px] shadow-lg shadow-gray-300 font-extraboldbold text-white">
              seeing
            </div>
          )}
          <div
            className="text-3xl font-white font-extrabold absolute right-3 text-white cursor-pointer"
            onClick={() => {
              setIsChatOpen(false);
            }}
          >
            X
          </div>
          <div className="absolute bottom-1 text-black font-mono flex ">
            <input
              placeholder="start typing ..."
              type="text"
              className="w-[400px] h-[35px] p-1 rounded-md border border-gray-300 shadow-md shadow-gray-300 text-[18px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleMessageSend}
              className="bg-blue-400 hover:bg-blue-500 cursor-pointer text-white w-[50px] h-[35px] rounded-md text-[15px] ml-2"
            >
              send
            </button>

            {!isLiked && (
              <>
                <div className="m-1">
                  <img
                    src={SUPER_LIKE_ICON}
                    onClick={() => handleUserInterest("sl")}
                    alt="loading"
                    className="w-[25px] h-[25px] cursor-pointer hover:scale-<105"
                  />
                </div>

                <div className="m-1">
                  <img
                    src={LIKE_ICON}
                    alt="loading"
                    onClick={() => handleUserInterest("l")}
                    className="w-[25px] h-[25px] cursor-pointer hover:scale-105"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {/* all chat space */}
        {isLoading ? (
          <div className="flex justify-center text-2xl font-black font-doto text-black">
            Loading...
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="w-full h-[400px] overflow-y-auto bg-teal-200 text-[17px] font-sans "
          >
            {chats.map((c, index) => (
              <div
                key={index}
                className={`w-full text-[#313131] flex ${
                  c.sender ===
                  JSON.parse(localStorage.getItem("of-auth")).userName
                    ? "justify-end  "
                    : "justify-start "
                } `}
              >
                <div
                  className={`m-2 text-black w-fit h-fit font-bold flex rounded-md border border-gray-400 p-2 ${
                    c.sender ===
                    JSON.parse(localStorage.getItem("of-auth")).userName
                      ? " bg-green-500 "
                      : " bg-gray-400"
                  }`}
                >
                  {c.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatSpace;
