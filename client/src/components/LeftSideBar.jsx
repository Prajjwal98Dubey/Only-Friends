import { useContext } from "react";
import {
  CHAT_ICON_ONE,
  CHAT_ICON_TWO,
  FEEDS_ICON_ONE,
  FEEDS_ICON_TWO,
  USER_ICON_ONE,
  USER_ICON_TWO,
} from "../icons";
import { SelectedContext } from "../contexts/SelectedContext";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  const { selected } = useContext(SelectedContext);
  return (
    <>
      <div className="w-[90px] h-[600px] flex items-center ml-2">
        <div>
           <Link to="/chat"><div
            className={`w-full h-[100px] mb-2 rounded-md p-2 ${
              selected === "/chat" ? "bg-[#313131] hover:bg-[#3f3b3b]" : "bg-[#4c4a4a]"
            } flex justify-center items-center cursor-pointer hover:bg-[#313131]`}
          >
            <div>
              <img
                src={selected === "/chat" ? CHAT_ICON_TWO : CHAT_ICON_ONE}
                className=" p-1 w-[65px] h-[65px]"
                alt="loading"
              />
              <div
                className={`flex justify-center items-center ${
                  selected === "/chat" ? "text-red-500" : "text-white"
                } font-bold font-sour text-xl`}
              >
                chat
              </div>
            </div>
          </div></Link>
          <Link to="/feeds"><div className={`w-full h-[100px] mb-2 rounded-md p-2 ${
              selected === "/feeds" ? "bg-[#313131] hover:bg-[#3f3b3b]" : "bg-[#4c4a4a]"
            } flex justify-center items-center cursor-pointer hover:bg-[#313131]`}>
            <div>
              <img
                src={selected === "/feeds" ? FEEDS_ICON_TWO : FEEDS_ICON_ONE}
                className=" p-1 w-[65px] h-[65px]"
                alt="loading"
              />
              <div className={`flex justify-center items-center ${
                  selected === "/feeds" ? "text-red-500" : "text-white"
                } font-bold font-sour text-xl`}>
                feeds
              </div>
            </div>
          </div></Link>

          {localStorage.getItem("of-auth") && (
            <Link to="/profile">
            <div className={`w-full h-[100px] mb-2 rounded-md p-2 ${
              selected === "/profile" ? "bg-[#313131] hover:bg-[#3f3b3b]" : "bg-[#4c4a4a]"
            } flex justify-center items-center cursor-pointer hover:bg-[#313131]`}>
            <div>
              <img
                src={selected === "/profile" ? USER_ICON_TWO : USER_ICON_ONE}
                className=" p-1 w-[65px] h-[65px]"
                alt="loading"
              />
              <div className={`flex justify-center items-center ${
                  selected === "/profile" ? "text-red-500" : "text-white"
                } font-bold font-sour text-xl`}>
                me
              </div>
            </div>
          </div></Link>
          )}
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
