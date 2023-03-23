import Link from "next/link";
import React from "react";
import { AiFillEdit } from "react-icons/ai";

function Nav() {
  return (
    <div>
      <div className="font-montserrat flex justify-around mb-10 py-8 items-center ">
        <div>
          <Link href="/">
            <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-500 text-[1.2rem] ">
              Devs Thought
            </h1>
          </Link>
        </div>

        <div className="flex gap-8 items-center">
          <Link href={"/auth/login"}>
            <button className="bg-gradient-to-br from-white to-gray-200 py-1 px-2 rounded-lg text-white font-medium flex items-center gap-2 ">
              <AiFillEdit className="text-[#0086da] " />{" "}
              <span className="text-black">Post</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
