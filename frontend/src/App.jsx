import React, { createContext, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import Search from "./components/Search";
import CreatePost from "./components/CreatePost";
import { loginContext } from "./context/loginContext";
import Modal from "./components/Modal";
import "./App.css";
import UserProfile from "./components/UserProfile";
import MyFollowing from "./components/MyFollowing";
import Sidebar from "./components/Sidebar";
const App = () => {
  const [userLogin, setuserLogin] = useState(false);
  const [openModal, setopenModal] = useState(false);
  return (
    <BrowserRouter>
      <div>
        <loginContext.Provider value={{ setuserLogin, setopenModal }}>
          <Navbar login={userLogin} />
          <div className="flex justify-center">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/signin" element={<Signin />}></Route>
              <Route exact path="/profile" element={<Profile />}></Route>
              <Route path="/search" element={<Search />}></Route>
              <Route path="/createpost" element={<CreatePost />}></Route>
              <Route path="/myfollowing" element={<MyFollowing />}></Route>
              <Route path="/profile/:userid" element={<UserProfile />}></Route>
            </Routes>
          </div>
          {openModal && <Modal />}
        </loginContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
