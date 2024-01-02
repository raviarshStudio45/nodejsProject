import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);
  const getData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}post/all`
    );
    setdata(response.data);
    setloading(false);
  };
  useEffect(() => {
    if (loading) {
      getData();
    }
  }, [loading]);

  const handleLike = async (postId) => {
    const userData = JSON.parse(localStorage.getItem("User"));
    const token = localStorage.getItem("Token");
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}like/${postId}/${userData.UserId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response.....", response);
  };
  return (
    <div class="bg-gray-100">
      <div class="py-5 mx-auto w-[60%]">
        <div class="bg-white w-full shadow rounded-lg p-5">
          <textarea
            class="bg-gray-200 w-full rounded-lg shadow border p-2"
            rows="5"
            placeholder="Speak your mind"
          ></textarea>

          <div class="w-full flex flex-row flex-wrap mt-3">
            <div class="w-1/3">
              <select class="w-full p-2 rounded-lg bg-gray-200 shadow border float-left">
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
            <div class="w-2/3">
              <button
                type="button"
                class="float-right bg-indigo-400 hover:bg-indigo-300 text-white p-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div class="mt-3 flex flex-col">
          {data?.map((item, i) => (
            <div class="bg-white mt-3" key={i}>
              <div className="mx-5 my-4">
                <div className="flex">
                  <i class="fa-solid fa-user text-2xl text-gray-600"></i>
                  <p className="ms-2 text-xl text-gray-700 font-semibold">
                    {item.userId.firstName} {item.userId.lastName}
                  </p>
                </div>
                <p class="text-base text-gray-700 font-semibold">
                  {item.caption}
                </p>
              </div>
              <img
                class="border shadow-lg h-[440px] w-full"
                src={item.imageLink}
                alt="img"
              />
              <div class="bg-white p-1 border  flex flex-row flex-wrap">
                <div
                  class="w-1/3 hover:bg-gray-200 text-center text-base text-gray-700 font-semibold"
                  onClick={() => handleLike(item._id)}
                >
                  {item.likes.length} Like
                </div>
                <div class="w-1/3 hover:bg-gray-200 border-l-4 text-center text-base text-gray-700 font-semibold">
                  {item.comments.length} Comment
                </div>
                <div class="w-1/3 hover:bg-gray-200 border-l-4 border-r- text-center text-base text-gray-700 font-semibold">
                  Share
                </div>
              </div>
              <div className="shadow p-4  text-base text-gray-700 font-medium">
                Posted: {item.datePosted.split("T")[0]}
              </div>

              {/* <div class="bg-white border-4 bg-gray-300 border-white rounded-b-lg shadow p-5 text-xl text-gray-700 content-center font-semibold flex flex-row flex-wrap">
              <div class="w-full">
                <div class="w-full text-left text-xl text-gray-600">
                  @Some Person
                </div>
                A Pretty Cool photo from the mountains. Image credit to
                @danielmirlea on Unsplash. A Pretty Cool photo from the
                mountains. Image credit to @danielmirlea on Unsplash.
              </div>
            </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
