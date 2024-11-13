import { useContext, useEffect } from "react";
import { SelectedContext } from "../contexts/SelectedContext";
import NavBar from "./NavBar";
import LeftSideBar from "./LeftSideBar";

const Profile = () => {
  const { setSelected } = useContext(SelectedContext);
  useEffect(() => {
    setSelected("/profile");
  }, [setSelected]);
  return (
    <>
      <NavBar />
      <LeftSideBar />
    </>
  );
};

export default Profile;
