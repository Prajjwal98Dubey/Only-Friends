import { useContext, useEffect } from "react";
import LeftSideBar from "./LeftSideBar";
import NavBar from "./NavBar";
import { SelectedContext } from "../contexts/SelectedContext";

const Chat = () => {
  const { setSelected } = useContext(SelectedContext);
  useEffect(() => {
    setSelected("/chat");
  }, [setSelected]);
  return (
    <>
      <NavBar />
      <LeftSideBar />
    </>
  );
};

export default Chat;
