import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import { useParams } from "react-router-dom";
const UserProfile = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"))._id;

  const { userid } = useParams();
  const [Userdata, setUserdata] = useState("");
  const [show, setshow] = useState(false);
  const [posts, setposts] = useState([]);
  const [isFollowed, setisFollowed] = useState(false);
  const defaultProfilePicture =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  const followUser = (userId) => {
    const token = localStorage.getItem("jwt");
    fetch("/follow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setisFollowed(true);
      });
  };

  const unfollowUser = (userId) => {
    const token = localStorage.getItem("jwt");
    fetch("/unfollow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setisFollowed(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    fetch(`/user/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserdata(data.user);
        setposts(data.posts);
        console.log(data.user.followers);
        if (
          data.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setisFollowed(true);
        }
      });
  }, [isFollowed]);

  return (
    <div className="w-screen flex justify-center">
      <div className="flex justify-center items-center flex-col border max-w-[80%]">
        <div className="lg:flex justify-evenly gap-20 max-w-[700px]">
          <div className="profile-pic">
            <img
              src={Userdata.Photo ? Userdata.Photo : defaultProfilePicture}
              alt=""
              className="h-60 w-60 rounded-full"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-between gap-16 items-center">
              <h1 className="text-4xl font-bold">{Userdata.name}</h1>
              {Userdata._id === loggedInUser ? (
                <></>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    if (isFollowed) {
                      unfollowUser(Userdata._id);
                    } else {
                      followUser(Userdata._id);
                    }
                  }}
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
            <div className="flex justify-evenly text-xl mt-10 w-[400px]">
              <p>{posts.length} Posts</p>
              <p>
                {Userdata.followers ? Userdata.followers.length : "0"} followers
              </p>
              <p>
                {Userdata.following ? Userdata.following.length : "0"} following
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <hr class=" w-[600px] h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700 flex justify-center" />
        </div>
        <div className="flex flex-wrap justify-center">
          {posts.map((e, id) => {
            return (
              <div
                key={id}
                className="w-[200px] h-[200px] bg-gray-100 dark:bg-gray-700 m-5 object-contain overflow-hidden"
              >
                <img src={e.pic} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
