import React, { useState,useContext } from "react";
import {useNavigate} from "react-router-dom"
import { loginContext } from "../context/loginContext";
const Modal = () => {
  const {setopenModal} = useContext(loginContext)
  const navigate = useNavigate()
  const yes = ()=>{
    localStorage.removeItem("jwt")
    navigate('/')
    window.location.reload()
  }
  const no = ()=>{
    setopenModal(false)
  }
  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <button className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 font-bold" onClick={no}>
            X
          </button>
          <div className="p-8">
            <div className='flex justify-center items-center mb-6'>
            <h3 className="text-lg font-semibold mb-4">Do you want to Logout?</h3>
            </div>  
            <div className="flex justify-center">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-4 hover:bg-red-600" onClick={yes}>
                Yes
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400" onClick={no}>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
