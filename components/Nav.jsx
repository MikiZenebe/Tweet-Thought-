import React from "react";
import { AiFillEdit } from "react-icons/ai";

function Nav() {
  return (
    <div>
      <div className="font-sans flex justify-around mb-10 py-8 items-center">
        <div>
          <h1 className="font-bold text-1xl text-white">Devs Thought</h1>
        </div>

        <div className="flex gap-8 items-center">
          <button className="bg-white py-1 px-2 rounded-lg text-white font-medium flex items-center gap-2">
            <AiFillEdit className="text-[#0086da] " />{" "}
            <span className="text-black">Post</span>
          </button>
          <h3 className="text-white font-medium">User</h3>
        </div>
      </div>
    </div>
  );
}

export default Nav;
