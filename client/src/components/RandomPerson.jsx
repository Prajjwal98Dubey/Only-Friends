import { useContext, useEffect, useState } from "react";
import { GENERATE_RANDOM_PERSON } from "../backendapi";
import ChatSpace from "./ChatSpace";
import { FilterContext } from "../contexts/FilterContext";
import { ACTIVE_USER_ICON } from "../icons";

const RandomPerson = () => {
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [superLikes, setSuperLikes] = useState(0);
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [passPerson, setPassPerson] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userOnlineStatus, setUserOnlineStatus] = useState(false);
  const { isFilter, inGender, inAge } = useContext(FilterContext);
  useEffect(() => {
    const getRandomPerson = async () => {
      setIsLoading(true);
      await fetch(
        GENERATE_RANDOM_PERSON +
          `?interested_gender=${inGender}&interested_age=${inAge}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setUserName(data.user_name);
          setGender(data.gender);
          setAge(data.age);
          setSuperLikes(data.superLikes);
          setLikes(data.likes);
          setUserOnlineStatus(data.online_status);
          setIsLoading(false);
        })
        .catch((err) =>
          console.log("CLIENT error while generating a randome person.", err)
        );
    };
    getRandomPerson();
  }, [passPerson, isFilter, inGender, inAge]);

  return (
    <>
      <div className="flex justify-center absolute left-[25%] top-[100px]">
        {isLoading ? (
          <div className="flex justify-center items-center">Loading...</div>
        ) : (
          <div className="w-[750px] h-[170px] rounded-md  bg-[#313131] text-white border border-gray-400 shadow-lg shadow-gray-300">
            <div className="text-white flex justify-center items-center p-1 text-2xl font-bold">
              {userName.charAt(0).toLocaleUpperCase() + userName.substring(1)}
              {userOnlineStatus && (
                <div className="absolute text-white left-[60%] text-[12px] flex justify-center items-center ">
                  <div className="m-1">
                    <img src={ACTIVE_USER_ICON} alt="loading" />
                  </div>
                  <div className="text-gray-300 text-[13px] m-1">
                    active now
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <div className="m-1 font-bold">{age}</div>
              <div className="m-1 font-bold">{gender}</div>
            </div>
            <div className="flex justify-center">
              <div className="m-1 font-bold">{superLikes} Superlikes</div>
              <div className="m-1 font-bold">{likes} Likes</div>
            </div>
            <div className="flex justify-center">
              <div>
                <button
                  className="bg-green-500 rounded-md p-1 m-1 text-white font-bold  hover:bg-green-600 cursor-pointer"
                  onClick={() => setIsChatOpen(true)}
                >
                  Talk
                </button>
              </div>
              <div>
                <button
                  className="bg-red-500 rounded-md p-1 m-1 text-white font-bold  hover:bg-red-600 cursor-pointer"
                  onClick={() => setPassPerson(!passPerson)}
                >
                  Pass
                </button>
              </div>
            </div>
            {isChatOpen && (
              <ChatSpace friendName={userName} setIsChatOpen={setIsChatOpen} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RandomPerson;
