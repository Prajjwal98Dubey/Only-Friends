import { useContext, useEffect } from "react";
import LeftSideBar from "./LeftSideBar";
import NavBar from "./NavBar";
import { SelectedContext } from "../contexts/SelectedContext";
import ChatSearch from "./ChatSearch";
// import Header from "./Header";

const Chat = () => {
  const { setSelected } = useContext(SelectedContext);
  
  useEffect(() => {
    setSelected("/chat");
  }, [setSelected]);
  return (
    <>
      <NavBar />
      <div className="flex ">
      <LeftSideBar />
      <ChatSearch/>
      </div>
      
    </>
  );
};

export default Chat;
