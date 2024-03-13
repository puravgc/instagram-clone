import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const home = () => {
  const defaultProfilePicture =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const [comment, setcomment] = useState("");
  const [show, setshow] = useState(false);
  const [item, setitem] = useState([]);
  let limit = 2;
  let skip = 0;
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup");
    }
    fetchPosts();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchPosts = () => {
    const token = localStorage.getItem("jwt");
    fetch(`/allposts?limit=${limit}&skip=${skip}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setdata((data) => [...data, ...result]);
      })
      .catch((err) => console.error(err));
  };
  const handleScroll = () => {
    if (
      document.documentElement.clientHeight + window.pageYOffset >=
      document.documentElement.scrollHeight
    ) {
      skip = skip + 2;
      fetchPosts();
    }
  };
  const likePost = (id) => {
    const token = localStorage.getItem("jwt");
    fetch("/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setdata(newData);
      });
  };
  const unlikePost = (id) => {
    const token = localStorage.getItem("jwt");
    fetch("/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setdata(newData);
      });
  };
  const makeComment = (text, id) => {
    const token = localStorage.getItem("jwt");
    fetch("/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setdata(newData);
        setcomment("");
        alert("Comment Posted");
      });
  };



  return (
    <div className="flex flex-col justify-center items-center mt-4">
      {data.map((e, id) => {
        return (
          <div className=" border w-[400px] md:w-[500px] mb-5 p-3">
            <div className="flex mb-2 items-center gap-3 border-b-[1px] border-gray-300 p-2">
              <div className=" object-cover">
                <img
                  src={
                    e.postedBy.Photo ? e.postedBy.Photo : defaultProfilePicture
                  }
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <Link to={`/profile/${e.postedBy._id}`}>
                <h5 className=" text-l font-semibold cursor-pointer">
                  {e.postedBy.name}
                </h5>
              </Link>
            </div>
            <div className="card-image flex justify-center bg-black">
              <img src={e.pic} alt="profile image" className="h-fit" />
            </div>
            <div className="">
              <div className=" cursor-pointer w-fit">
                {e.likes.includes(
                  JSON.parse(localStorage.getItem("user"))._id
                ) ? (
                  <span
                    class="material-symbols-outlined"
                    id="like"
                    onClick={() => {
                      unlikePost(e._id);
                    }}
                  >
                    favorite
                  </span>
                ) : (
                  <span
                    class="material-symbols-outlined"
                    onClick={() => {
                      likePost(e._id);
                    }}
                  >
                    favorite
                  </span>
                )}
              </div>
              <p className=" font-semibold">{e.likes.length} Likes</p>
              <p>{e.caption}</p>
              <p
                className=" font-bold cursor-pointer"
                onClick={() => {
                  setshow(true);
                  setitem(e);
                }}
              >
                View all comments
              </p>
            </div>
            <div className="flex items-center gap-6 border p-2">
              <span class="material-symbols-outlined">mood</span>
              <input
                type="text"
                placeholder="Add a comment"
                className=" outline-none w-60"
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
              />
              <button
                className=" text-blue-400 font-bold"
                onClick={() => {
                  makeComment(comment, e._id);
                  setshow(false);
                }}
              >
                Post
              </button>
            </div>
          </div>
        );
      })}
      {show && (
        <div className=" w-screen min-h-screen fixed top-0 left-0 bg-[rgba(16,13,13,0.4)]">
          <div className="flex w-[80%] h-[80%] overflow-auto bg-white absolute top-[10%] left-[10%] right-[5%]">
            <div className="bg-black flex justify-center items-center w-[1000px] h-[100%] overflow-hidden">
              <img
                src={item.pic}
                alt="post image"
                className=" object-contain w-[100%]"
              />
            </div>
            <div className="w-[100%] flex flex-col">
              <div className=" border-b-[1px] border-gray-300">
                <div className="flex mb-2 items-center gap-3">
                  <div className=" object-cover">
                    <img
                      src={
                        item.postedBy.Photo
                          ? item.postedBy.Photo
                          : defaultProfilePicture
                      }
                      alt=""
                      className="h-12 w-12 rounded-full"
                    />
                  </div>
                  <Link to={`/profile/${item.postedBy._id}`}>
                    <h5 className=" text-l font-semibold">
                      {item.postedBy.name}
                    </h5>
                  </Link>
                </div>
              </div>
              <div
                className=" flex-grow text-left ml-3"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                {item.comments.map((e, id) => {
                  return (
                    <p className="flex justify-start gap-2 items-center">
                      <span
                        className="commenter"
                        style={{ fontWeight: "bolder" }}
                      >
                        {e.postedBy.name}
                      </span>
                      <span className="commentText">{e.comment}</span>
                    </p>
                  );
                })}
              </div>

              <div className="">
                <div className=" p-2">
                  <p className=" font-semibold">{item.likes.length} Likes</p>
                  <p>{item.caption}</p>
                </div>
                <div className="flex items-center justify-between gap-6 border p-2">
                  <span class="material-symbols-outlined">mood</span>
                  <input
                    type="text"
                    placeholder="Add a comment"
                    className=" outline-none w-full"
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)}
                  />
                  <button
                    className=" text-blue-400 font-bold"
                    onClick={() => {
                      makeComment(comment, item._id);
                      setshow(false);
                    }}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className=" fixed top-[1%] right-[5%] text-white border-none cursor-pointer">
            <span
              class="material-symbols-outlined closeComment"
              onClick={() => {
                setshow(false);
              }}
            >
              close
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default home;
