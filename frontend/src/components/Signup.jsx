import React, { useState } from "react";
import background from "../assets/instagram-background.png";
import logo from "../assets/instagram_logo.png";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  const postData = () => {
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    } else if (!passwordRegex.test(password)) {
      alert(
        "Password must contain 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
      );
      return;
    }

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          navigate("/signin");
        } else {
          alert(data.error);
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen w-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="p-8 md:p-16 bg-white rounded-3xl shadow-6xl flex flex-col justify-center items-center">
        <img className="h-16" src={logo} alt="logo" />
        <p className="text-gray-500 mb-4">
          Sign Up to see photos and videos from your friends
        </p>
        <input
          name="email"
          placeholder="Email"
          className="rounded-xl px-4 py-2 w-full max-w-md mb-5 border-2 border-gray-500"
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          name="name"
          placeholder="Full Name"
          className="rounded-xl px-4 py-2 w-full max-w-md mb-5 border-2 border-gray-500"
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          name="username"
          placeholder="User Name"
          className="rounded-xl px-4 py-2 w-full max-w-md mb-5 border-2 border-gray-500"
          type="text"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          name="password"
          placeholder="Password"
          className="rounded-xl px-4 py-2 w-full max-w-md mb-5 border-2 border-gray-500"
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <p className="text-gray-500">
          By signing in you agree to our Terms, Privacy Policy and Cookies
          Policy
        </p>
        <button
          onClick={postData}
          className="rounded-full px-8 py-2 font-bold text-white bg-blue-400 hover:bg-blue-500 transition duration-300"
        >
          Sign Up
        </button>
        <p className="mt-4 text-gray-500">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
