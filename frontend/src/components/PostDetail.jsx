import React from "react";

const PostDetail = ({ item, toggleDetails }) => {
  const deletePost = () => {
    const decision = window.confirm(
      "Are you sure you want to delete this post?"
    );
    const token = localStorage.getItem("jwt");
    if (decision) {
      fetch(`/deletepost/${item._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          _id: item._id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          toggleDetails();
          window.location.reload();
        });
    } else {
      toggleDetails();
    }
  };

  return (
    <div className=" w-screen min-h-screen fixed top-0 left-0 bg-[rgba(16,13,13,0.4)]">
      <div className=" fixed top-[1%] right-[5%] text-white border-none cursor-pointer">
        <span
          class="material-symbols-outlined closeComment"
          onClick={() => {
            toggleDetails();
          }}
        >
          close
        </span>
      </div>
      <div className="flex w-[80%] h-[80%] overflow-auto bg-white absolute top-[10%] left-[10%] right-[5%]">
        <div className="bg-black flex justify-center items-center w-[1000px] h-[100%] overflow-hidden ">
          <img
            src={item.pic}
            alt="post image"
            className=" object-contain w-[100%]"
          />
        </div>
        <div className="w-[100%] flex flex-col m-4">
          <div
            className="flex justify-end"
            onClick={() => {
              deletePost();
            }}
          >
            <span class="material-symbols-outlined" id="delete">
              delete
            </span>
          </div>

          <div className=" border-b-[1px] border-gray-300">
            <div className="flex mb-2 items-center gap-3">
              <div className=" object-cover">
                <img
                  src={item.postedBy.Photo}
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <h5 className=" text-l font-semibold">{item.postedBy.name}</h5>
            </div>
          </div>
          <div
            className=" flex-grow text-left ml-3"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            {item.comments.map((e, id) => {
              return (
                <p className="flex justify-start gap-2 items-center mt-2">
                  <span className="commenter" style={{ fontWeight: "bolder" }}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
