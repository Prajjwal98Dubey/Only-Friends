/* eslint-disable react/prop-types */

// import { useEffect } from "react"
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const ChatSpace = ({ friendName, setIsChatOpen }) => {
  const socket = useRef();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const scrollRef = useRef(null);
  useEffect(() => {
    socket.current = io("ws://localhost:8082");
    socket.current.emit("create-room", {
      sender: JSON.parse(localStorage.getItem("of-auth")).userName,
      receiver: friendName,
    });
  }, [friendName]);
  useEffect(() => {
    socket.current.on("chat-message", (payload) => {
      setChats([...chats, payload]);
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
  }, [chats]);
  const handleMessageSend = () => {
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
  };

  return (
    <>
      <div className="w-[650px] h-[500px] rounded-md shadow-md shadow-gray-400 border border-gray-300 fixed bg-white left-[30%] ">
        <div className="w-full h-[50px] bg-[#313131] text-white text-2xl font-bold font-sour flex justify-center items-center">
          {friendName}
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
          </div>
        </div>
        {/* all chat space */}
        <div ref={scrollRef} className="w-full h-[400px] overflow-y-auto">
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
                className={`m-2 text-black w-fit h-fit text-xl font-medium flex rounded-md border border-gray-400 p-1 ${
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
      </div>
    </>
  );
};

export default ChatSpace;
