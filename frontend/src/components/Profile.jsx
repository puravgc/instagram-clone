import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import ProfilePic from "./ProfilePic";
const Profile = () => {
  const defaultProfilePicture =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  const [pic, setpic] = useState([]);
  const [show, setshow] = useState(false);
  const [posts, setposts] = useState([]);
  const [user, setuser] = useState("");
  const [changepic, setchangepic] = useState(false);

  const toggleDetails = (posts) => {
    if (show) {
      setshow(false);
    } else {
      setshow(true);
      setposts(posts);
    }
  };
  const changeprofile = () => {
    setchangepic(!changepic);
  };

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
        setpic(data.posts);
        setuser(data.user);
      });
  }, []);

  return (
    <div className="w-screen flex justify-center mt-10">
      <div className="flex justify-center items-center flex-col max-w-[80%]">
        <div className="lg:flex justify-evenly gap-20 max-w-[700px]">
          <div className="profile-pic">
            <img
              src={user.Photo ? user.Photo : defaultProfilePicture}
              alt=""
              className="h-60 w-60 rounded-full cursor-pointer"
              onClick={() => changeprofile()}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">
              {JSON.parse(localStorage.getItem("user")).name}
            </h1>
            <div className="flex justify-evenly text-xl mt-10 w-[400px]">
              <p>{pic ? pic.length : "0"} posts</p>
              <p>{user.followers ? user.followers.length : "0"} followers</p>
              <p>{user.following ? user.following.length : "0"} following</p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <hr class=" w-[600px] h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700 flex justify-center" />
        </div>

        <div className="flex flex-wrap justify-start ml-6">
          {pic.map((e, id) => {
            return (
              <div
                key={id}
                className="w-[150px] md:w-[200px] h-[200px] bg-gray-100 dark:bg-gray-700 m-5 overflow-hidden flex justify-center cursor-pointer"
              >
                <img
                  src={e.pic}
                  onClick={() => {
                    toggleDetails(e);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
      {changepic && <ProfilePic changeprofile={changeprofile} />}
    </div>
  );
};

export default Profile;
