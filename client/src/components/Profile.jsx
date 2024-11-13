import { useContext, useEffect } from "react";
import { SelectedContext } from "../contexts/SelectedContext";
import NavBar from "./NavBar";
import LeftSideBar from "./LeftSideBar";
import {  LOGOUT_USER } from "../backendapi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { setSelected } = useContext(SelectedContext);
  const navigate = useNavigate()
  useEffect(() => {
    setSelected("/profile");
  }, [setSelected]);
  const handleLogOut = async()=>{
    await fetch(LOGOUT_USER,{
        method:'GET',
        credentials:"include"
    }).then((res)=>res.json()).then(()=>{
        localStorage.removeItem("of-auth")
        navigate('/')
    }).catch((err)=>console.log("CLIENT error while logging out",err))
  }
  return (
    <>
      <NavBar />
      <LeftSideBar />
      <div className="flex justify-center"><button onClick={handleLogOut} className="w-[100px] h-[30px] bg-red-600 hover:bg-red-400 rounded-md text-white font-bold">logout</button></div>
    </>
  );
};

export default Profile;
