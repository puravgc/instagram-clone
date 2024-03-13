import React, { useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchText, setsearchText] = useState("");
  const [searchData, setsearchData] = useState([]);
  const defaultImage =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  const submitSearch = () => {
    fetch(`/search/${searchText}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setsearchData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="h-screen w-screen">
      <div className=" flex flex-col justify-center items-center">
        <h1 className="mt-10 mb-10 text-2xl">Search For A User</h1>
        <div className="flex w-[80%] justify-center">
          <div class="relative h-11 w-[60%] min-w-[200px]">
            <input
              className="peer h-full w-full border-b border-black bg-transparent pt-4 pb-1.5 font-sans text-xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-500 focus:border-gray-500 focus:outline-0 disabled:border-1 disabled:bg-blue-gray-50 p-5"
              onChange={(e) => {
                setsearchText(e.target.value);
              }}
              placeholder="Search Here"
            />
            <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
          </div>
          <button
            onClick={() => {
              submitSearch();
            }}
          >
            <span class="material-symbols-outlined">search</span>
          </button>
        </div>
        <div className=" min-h-[50px] w-[60%]">
          {searchData.map((item) => {
            return (
              <Link to={`/profile/${item._id}`}>
                <div className="flex justify-center items-center mt-2 gap-20 p-2 cursor-pointer">
                  <img
                    src={item.Photo ? item.Photo : defaultImage}
                    alt="post image"
                    className=" object-cover rounded-full w-14 h-14"
                  />
                  <h2 className="text-xl">{item.name}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
