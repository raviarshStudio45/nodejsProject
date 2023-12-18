import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../environment";

const Notes = () => {
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState();

  const getData = async () => {
    const { data } = await axios.get(`${BACKEND_URL}get-notes`);
    setdata(data);
    setloading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const Loader = () => {
    return <div class="loading"></div>;
  };

  const handleDelete = async (id) => {
    const { data } = await axios.post(`${BACKEND_URL}delete-note/${id}`);
    console.log("dvfgdhgfhg");
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <div class="shadow py-3 flex justify-between px-5">
        <h2 className=" text-xl font-semibold">Notes App</h2>
        <button className="ms-4 text-xl font-semibold">Add note</button>
      </div>
      <div className="w-4/5 mx-auto py-6 flex gap-5">
        {data?.map((item, i) => (
          <div
            key={i}
            class="w-[270px] min-h-[290px] py-4 px-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
          >
            <div>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.title}
              </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.description}
              </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.tags}
              </p>
            </div>
            <div>
              <i class="fa-solid fa-pen-to-square mx-3 cursor-pointer"></i>
              <i
                class="fa-solid fa-trash cursor-pointer"
                onClick={() => handleDelete(item._id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notes;
