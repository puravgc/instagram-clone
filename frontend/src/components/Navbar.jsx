import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import instagram_logo from "../assets/instagram_logo.png";
import { loginContext } from "../context/loginContext";

const Navbar = ({ login }) => {
  const navigate = useNavigate();
  const { setopenModal } = useContext(loginContext);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    const loginStatus = () => {
      const token = localStorage.getItem("jwt");
      if (token || login) {
        setisLoggedIn(true);
      } else {
        setisLoggedIn(false);
      }
    };
    loginStatus();
  }, []);
  const Signout = () => {
    setopenModal(true);
  };

  return (
    <div className=" ">
      <div className="hidden pt-7 fixed pl-11 gap-16 md:block">
        <img
          className="h-[40px] cursor-pointer"
          src={instagram_logo}
          alt="instagram_logo"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="w-[50%]">
          <ul className="">
            {isLoggedIn ? (
              <>
                <Link to={"/"} className="flex items-center">
                  <span class="material-symbols-outlined">home</span>
                  <li className=" text-l font-bold cursor-pointer p-5 hidden md:block">
                    Home
                  </li>
                </Link>
                <Link to={"/myfollowing"} className="flex items-center">
                  <span class="material-symbols-outlined">heart_check</span>
                  <li className="text-l font-bold cursor-pointer p-5 hidden md:block">
                    My Following
                  </li>
                </Link>
                <Link to={"/search"} className="flex items-center">
                  <span class="material-symbols-outlined">search</span>
                  <li className="text-l font-bold cursor-pointer p-5 hidden md:block">
                    Search
                  </li>
                </Link>
                <Link to={"/profile"} className="flex items-center">
                  <span class="material-symbols-outlined">account_circle</span>
                  <li className="text-l font-bold cursor-pointer p-5 hidden md:block">
                    Profile
                  </li>
                </Link>

                <Link to={"/createpost"} className="flex items-center">
                  <span class="material-symbols-outlined">add_circle</span>
                  <li className="text-l font-bold cursor-pointer p-5 hidden md:block">
                    Create Post
                  </li>
                </Link>
                <Link to={"/"} className="flex items-center">
                  <span class="material-symbols-outlined">logout</span>
                  <li
                    className="text-l font-bold cursor-pointer p-5 hidden md:block"
                    onClick={() => Signout()}
                  >
                    Sign Out
                  </li>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/signup"} className="flex items-center">
                  <span class="material-symbols-outlined">input</span>
                  <li className="text-l font-bold cursor-pointer p-5 hidden md:block">
                    Sign Up
                  </li>
                </Link>
                <Link to={"/signin"} className="flex items-center">
                  <span class="material-symbols-outlined">login</span>
                  <li className="text-l font-bold cursor-pointer p-5 hidden md:block">
                    Sign In
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="block fixed bottom-0 left-0 w-full bg-white md:hidden">
        <div className="pt-2 pl-11 flex justify-center md:flex-row md:items-center md:h-auto">
          <div className="w-[100%]">
            <ul className="flex md:flex justify-evenly items-center md:space-x-5 pr-6">
              {isLoggedIn ? (
                <>
                  <Link to={"/"} className="flex items-center">
                    <span class="material-symbols-outlined">home</span>
                  </Link>
                  <Link to={"/myfollowing"} className="flex items-center">
                    <span class="material-symbols-outlined">heart_check</span>
                  </Link>
                  <Link to={"/search"} className="flex items-center">
                    <span class="material-symbols-outlined">search</span>
                  </Link>
                  <Link to={"/profile"} className="flex items-center">
                    <span class="material-symbols-outlined">
                      account_circle
                    </span>
                  </Link>

                  <Link to={"/createpost"} className="flex items-center">
                    <span class="material-symbols-outlined">add_circle</span>
                  </Link>
                  <Link to={"/"} className="flex items-center">
                    <span class="material-symbols-outlined">logout</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={"/signup"} className="flex items-center">
                    <span class="material-symbols-outlined">input</span>
                  </Link>
                  <Link to={"/signin"} className="flex items-center">
                    <span class="material-symbols-outlined">login</span>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
