import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import instagram_logo from "../assets/instagram_logo.png";
import { loginContext } from "../context/loginContext";

const Sidebar = ({login}) => {
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
    <div className=" pl-5">
      <div className="w-[50%] block md:hidden">
        <ul className="flex flex-col justify-between">
          {isLoggedIn ? (
            <>
              <Link to={"/"}>
                <li className="text-l font-bold cursor-pointer p-5">Home</li>
              </Link>

              <Link to={"/profile"}>
                <li className="text-l font-bold cursor-pointer p-5">Profile</li>
              </Link>
              <Link to={"/myfollowing"}>
                <li className="text-l font-bold cursor-pointer p-5">
                  My Following
                </li>
              </Link>
              <Link to={"/createpost"}>
                <li className="text-l font-bold cursor-pointer p-5">
                  Create Post
                </li>
              </Link>
              <Link to={"/"}>
                <li
                  className="text-l font-bold cursor-pointer p-5"
                  onClick={() => Signout()}
                >
                  Sign Out
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/signup"}>
                <li className="text-l font-bold cursor-pointer p-5">Sign Up</li>
              </Link>
              <Link to={"/signin"}>
                <li className="text-l font-bold cursor-pointer p-5">Sign In</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
