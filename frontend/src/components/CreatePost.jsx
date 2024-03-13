import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [loading, setLoading] = useState(false); // State to track loading status
  const loadFile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
  };

  const [caption, setcaption] = useState("");
  const [image, setimage] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [userpic, setuserpic] = useState("");
  const [username, setusername] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    fetch(
      `/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setusername(data.user.name);
        setuserpic(data.user.Photo);
      });
  }, []);

  const postDetails = () => {
    setLoading(true); // Set loading to true before making the Cloudinary request
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dvad0qi7r");
    fetch("https://api.cloudinary.com/v1_1/dvad0qi7r/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false); // Set loading to false after Cloudinary request is complete
        setimageUrl(data.url);
        // Now imageUrl is set, and the useEffect will trigger the post to the backend
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false if there's an error
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (imageUrl) {
      fetch("/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          caption: caption,
          pic: imageUrl,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
            navigate("/");
          } else {
            alert(data.error);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [imageUrl]);

  return (
    <div className="mt-10 flex justify-center">
      <div className="border w-[25vw] flex flex-col justify-center">
        <div className="flex border justify-between p-2">
          <h1 className="text-l font-bold">Create New Post</h1>
          <button
            className="text-blue-400 font-bold"
            onClick={() => postDetails()}
          >
            Share
          </button>
        </div>
        <div className="p-3 flex flex-col justify-center">
          <img
            id="output"
            className="h-64 mb-2 object-contain"
            src="https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg"
          />
          <input
            type="file"
            accept="image/*"
            className="text-[15px]"
            onChange={(e) => {
              loadFile(e);
              setimage(e.target.files[0]);
            }}
          />
        </div>
        <div className="details">
          <div className="flex items-center gap-5">
            <div className="flex justify-center">
              <img src={userpic} alt="" className="h-14 w-14 rounded-full" />
            </div>
            <h5 className="text-l font-bold">{username}</h5>
          </div>
          <textarea
            value={caption}
            onChange={(e) => setcaption(e.target.value)}
            className="mt-2 w-[100%] p-1 font-semibold"
            type="text"
            placeholder="Write a caption..."
          ></textarea>
        </div>
        {/* Loading indicator */}
        {loading && (
          <div className="text-center py-2 absolute top-0 left-[50%]">
            <button
              disabled
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
