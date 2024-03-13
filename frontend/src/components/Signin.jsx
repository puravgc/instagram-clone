import React, { useState, useContext } from "react";
import background from "../assets/instagram-background.png";
import logo from "../assets/instagram_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { loginContext } from "../context/loginContext";

const Signin = () => {
  const { setuserLogin } = useContext(loginContext);
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const postData = async () => {
    const fetchedData = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await fetchedData.json();

    if (data.message) {
      alert(data.message);
      console.log(data.token);
      localStorage.setItem("jwt", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setuserLogin(true);
      navigate("/");
      window.location.reload();
    } else {
      alert(data.error);
    }
  };

  return (
    <div
      className="bg-cover bg-center h-screen w-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="p-8 md:p-16 bg-white rounded-3xl shadow-6xl flex flex-col items-center">
        <img className="h-16" src={logo} alt="logo" />
        <p className="text-gray-500 text-center mb-4">
          Sign Up to see photos and videos from your friends
        </p>
        <input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Email"
          className="rounded-xl px-4 py-2 w-full max-w-md mb-5 border-2 border-gray-500"
          type="email"
          name="email"
        />
        <input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
          className="rounded-xl px-4 py-2 w-full max-w-md mb-5 border-2 border-gray-500"
          type="password"
          name="password"
        />
        <p className="text-gray-500 mb-4">
          By signing in you agree to our Terms, Privacy Policy and Cookies
          Policy
        </p>
        <button
          onClick={postData}
          className="rounded-full px-8 py-2 font-bold text-white bg-blue-400 hover:bg-blue-500 transition duration-300"
        >
          Sign In
        </button>
        <p className="mt-4 text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
