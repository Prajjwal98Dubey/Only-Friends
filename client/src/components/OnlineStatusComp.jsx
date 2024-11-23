/* eslint-disable react/prop-types */
import { ONLINE_STATUS_ICON } from "../icons";

const OnlineStatusComp = ({ onlineCount }) => {
  return (
    <>
      <div className="absolute bottom-4 transform -translate-x-1.2 -translate-y-1/2 left-[45%] w-[180px] h-[30px] rounded-md border border-gray-400 shadow-sm shadow-gray-400 bg-[#313131] text-white font-bold flex justify-center items-center">
        <div className="flex justify-center items-center">
          <img
            src={ONLINE_STATUS_ICON}
            alt="loading"
            className="flex justify-center items-center animate-ping"
          />
        </div>
        <div className="flex justify-center items-center mb-[3px] text-[16px]">
          <p>{onlineCount} user online</p>
        </div>
      </div>
    </>
  );
};

export default OnlineStatusComp;
