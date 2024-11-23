import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CHECK_ONLINE_STATUS, REGISTER_USER } from "../backendapi";
import { io } from "socket.io-client";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const navigate = useNavigate();
  const handleRegisterUser = async () => {
    await fetch(REGISTER_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        email,
        password,
        gender,
        age,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "register") {
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
      .catch((err) => console.log("CLIENT error while registering", err));
  };
  return (
    <>
      <div
        id="main-register-container"
        className="flex justify-center items-center p-4"
      >
        <div className="w-[600px] h-[350px] p-2 rounded-md border border-gray-300">
          <div className="flex justify-center text-blue-500 font-bold font-sour text-4xl">
            Register
          </div>
          <div className="flex justify-center items-center">
            <input
              type="text"
              className="w-[500px] h-[40px] rounded-md border border-gray-400 p-1 m-2"
              placeholder="enter username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="flex justify-center items-center">
            <input
              type="text"
              className="w-[500px] h-[40px] rounded-md border border-gray-400 p-1 m-2"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <form>
              <input
                type="radio"
                id="male"
                name="gender"
                value="M"
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="F"
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="female">Female</label>
            </form>
          </div>
          <div className="flex justify-center">
            <span className="m-1 flex justify-center items-center">
              Enter your age
            </span>
            <input
              type="number"
              className="w-[60px] h-[35px] rounded-md border border-gray-400 m-1 p-1 text-[#313131]"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleRegisterUser}
              className="w-[200px] h-[35px] rounded-md bg-blue-600 hover:bg-blue-500 cursor-pointer text-white font-bold"
            >
              Register
            </button>
          </div>
          <div className="flex justify-center">
            <span>already a user? </span>
            <Link to="/login">
              <span className="text-blue-500 font-bold font-sour text-xl hover:cursor-pointer hover:text-blue-600">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
