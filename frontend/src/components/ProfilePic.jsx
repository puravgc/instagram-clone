import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../context/loginContext";
const ProfilePic = ({ changeprofile }) => {
  const hiddenFileInput = useRef(null);
  const [image, setimage] = useState("");
  const [imageUrl, setimageUrl] = useState("");

  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dvad0qi7r");
    fetch("https://api.cloudinary.com/v1_1/dvad0qi7r/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setimageUrl(data.url))
      .catch((err) => console.log(err));
  };

  const postPic = () => {
    fetch("/uploadprofilepic", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: imageUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        changeprofile();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (image) {
      postDetails();
    }
  }, [image]);

  useEffect(() => {
    if (imageUrl) {
      postPic();
    }
  }, [imageUrl]);

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="p-8">
            <div className="flex justify-center items-center mb-6">
              <h3 className="text-lg font-semibold mb-4">
                Change Profile Photo?
              </h3>
            </div>
            <div className="flex flex-col justify-center">
              <button
                className=" text-blue-500 text-xl font-bold px-4 py-2 rounded mr-4 border-t-2"
                onClick={handleClick}
              >
                Upload Photo
              </button>
              <input
                type="file"
                accept="image/*"
                className=" hidden"
                ref={hiddenFileInput}
                onChange={(e) => {
                  setimage(e.target.files[0]);
                }}
              />
              <button
                className="text-red-500 text-xl font-bold px-4 py-2 rounded mr-4 border-t-2"
                onClick={() => {
                  setimageUrl(null);
                  postPic();
                }}
              >
                Remove Photo
              </button>
              <button
                className="text-black text-xl font-bold px-4 py-2 rounded mr-4 border-t-2 border-b-2"
                onClick={changeprofile}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePic;
