import { useContext, useEffect, useState } from "react";
import { SelectedContext } from "../contexts/SelectedContext";
import NavBar from "./NavBar";
import LeftSideBar from "./LeftSideBar";
import {
  DISLIKE_ICON,
  LIKE_ICON,
  LOGOUT_ICON,
  SUPER_LIKE_ICON,
  USER_ICON_TWO,
} from "../icons";
import { LOGOUT_USER, MY_DETAILS } from "../backendapi";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { setSelected } = useContext(SelectedContext);
  const [logoutHover, setLogOutHover] = useState(false);
  const [superLike, setSuperLikes] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDisLikes] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setSelected("/profile");
  }, [setSelected]);
  useEffect(() => {
    const getMyDetails = async () => {
      await fetch(MY_DETAILS, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setSuperLikes(data.super_likes);
          setLikes(data.likes);
          setDisLikes(data.dislikes);
        })
        .catch((err) => console.log(err));
    };
    getMyDetails();
  }, []);
  const handleLogOut = async () => {
    await fetch(LOGOUT_USER, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        localStorage.removeItem("of-auth");
        navigate("/");
      })
      .catch((err) => console.log("CLIENT error while logging out", err));
  };
  return (
    <>
      <NavBar />
      <div className="flex">
        <LeftSideBar />
        <div className="flex ml-[30px]">
          <div className="w-[650px] h-[400px] m-2 rounded-md shadow-lg border border-gray-300 shadow-gray-300 bg-gray-100">
            <div className="flex justify-center mt-6">
              <div className="w-[100px] h-[100px] border border-gray-600 rounded-full p-2 flex justify-center items-center shadow-md shadow-red-300">
                <img
                  src={USER_ICON_TWO}
                  alt="loading..."
                  className="w-[90px] h-[90px]"
                />
              </div>
            </div>
            <div className="flex justify-center text-[#313131] text-2xl font-extrabold font-doto mt-2">
              {JSON.parse(localStorage.getItem("of-auth"))
                .userName.charAt(0)
                .toUpperCase() +
                JSON.parse(localStorage.getItem("of-auth")).userName.substring(
                  1
                )}
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center w-[200px]">
                <div className="text-xl font-bold m-2 flex justify-center items-center w-[100px]">
                  {superLike}
                </div>
                <div className="m-2 flex justify-center items-center w-[100px]">
                  <img
                    src={SUPER_LIKE_ICON}
                    alt="loading"
                    className="w-[30px] h-[30px]"
                  />
                </div>
                <div className="text-xl font-bebas font-medium m-2 flex justify-center items-center w-[200px]">
                  Super Likes
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center w-[200px]">
                <div className="text-xl font-bold m-2 flex justify-center items-center w-[100px]">
                  {likes}
                </div>
                <div className="m-2 flex justify-center items-center w-[100px]">
                  <img
                    src={LIKE_ICON}
                    alt="loading"
                    className="w-[30px] h-[30px]"
                  />
                </div>
                <div className="text-xl font-bebas font-medium m-2 flex justify-center items-center w-[200px]">
                  Likes
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center w-[200px]">
                <div className="text-xl font-bold m-2 flex justify-center items-center w-[100px]">
                  {dislikes}
                </div>
                <div className="m-2 flex justify-center items-center w-[100px]">
                  <img
                    src={DISLIKE_ICON}
                    alt="loading"
                    className="w-[30px] h-[30px]"
                  />
                </div>
                <div className="text-xl font-bebas font-medium m-2 flex justify-center items-center w-[200px]">
                  Dislikes
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-2">
              <img
                src={LOGOUT_ICON}
                alt="loading"
                className="w-[32px] h-[32px] cursor-pointer"
                onMouseOver={() => setLogOutHover(true)}
                onMouseLeave={() => setLogOutHover(false)}
                onClick={handleLogOut}
              />
              <div className="relative">
                {logoutHover && (
                  <div className="absolute bg-gray-500 p-1 rounded-md text-black w-[80px] h-[25px] text-[12px] font-bold left-0 top-0 flex justify-center items-center">
                    logout
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-[650px] h-[400px] m-2 rounded-md shadow-lg border border-gray-300 shadow-gray-300 bg-gray-100">
            <p className="text-2xl font-bold font-mono text-center">
              Dashboard
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
