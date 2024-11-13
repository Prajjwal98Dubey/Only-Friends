import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <div className="h-[65px] border border-transparent border-b-gray-500 flex justify-center items-center">
        {localStorage.getItem("of-auth") ? (
          <h1 className="text-center text-2xl font-bold text-[#313131]">
            {JSON.parse(localStorage.getItem("of-auth")).userName}
          </h1>
        ) : (
          <Link to="/login">
            <button className="w-[200px] h-[40px] rounded-md bg-blue-600 hover:bg-blue-500 cursor-pointer text-white font-bebas text-xl">
              Signup/Login
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default NavBar;
