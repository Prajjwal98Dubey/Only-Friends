import { useContext, useEffect, useState } from "react";
import LeftSideBar from "./LeftSideBar";
import NavBar from "./NavBar";
import { SelectedContext } from "../contexts/SelectedContext";
import RandomPerson from "./RandomPerson";
import ApplyFilters from "./ApplyFilters";
const Chat = () => {
  const { setSelected } = useContext(SelectedContext);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  useEffect(() => {
    setSelected("/chat");
  }, [setSelected]);
  return (
    <>
      <NavBar />
      <div className="flex ">
        <LeftSideBar />
        <div>
          <RandomPerson />
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-[45%] left-1/2">
            <button
              className="bg-red-500 cursor-pointer hover:bg-red-600 rounded-md border border-gray-500 text-white font-bold p-2 shadow-md shadow-red-300"
              onClick={() => setIsFilterOpen(true)}
            >
              Apply Filters
            </button>
          </div>
        </div>
        {isFilterOpen && <ApplyFilters setIsFilterOpen={setIsFilterOpen} />}
        {/* <ChatSearch /> */}
      </div>
    </>
  );
};

export default Chat;
