import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CHECK_ONLINE_STATUS, LOGIN_USER } from "../backendapi";
import { io } from "socket.io-client";
const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    await fetch(LOGIN_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        password,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "login") {
          localStorage.setItem(
            "of-auth",
            JSON.stringify({ userName: data.userName, email: data.email })
          );
          let socket = io(CHECK_ONLINE_STATUS);
          socket.emit("details", {
            userName: JSON.parse(localStorage.getItem("of-auth")).userName,
          });
          navigate("/");
        }
      })
      .catch((err) => console.log("CLIENT error while login", err));
  };
  return (
    <>
      <div
        id="main-login-container"
        className="flex justify-center items-center p-4"
      >
        <div className="w-[600px] h-[300px] p-2 rounded-md border border-gray-300">
          <div className="flex justify-center text-blue-500 font-bold font-sour text-4xl">
            Login
          </div>
          <div className="flex justify-center items-center">
            <input
              type="text"
              className="w-[500px] h-[40px] rounded-md border border-gray-400 p-1 m-2"
              placeholder="enter username or email"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center">
            <input
              type="password"
              className="w-[500px] h-[40px] rounded-md border border-gray-400 p-1 m-2"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleLogin}
              className="w-[200px] h-[35px] rounded-md bg-blue-600 hover:bg-blue-500 cursor-pointer text-white font-bold"
            >
              Login
            </button>
          </div>
          <div className="flex justify-center">
            <span>new user? </span>
            <Link to="/register">
              <span className="text-blue-500 font-bold font-sour text-xl hover:cursor-pointer hover:text-blue-600">
                Register
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
