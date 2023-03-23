import { auth, db } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Post() {
  return (
    <div>
      <div className="max-w-[350px] mx-auto ">
        <form className="bg-[#1B2730] my-20 p-6 rounded-lg">
          <h1 className="text-gray-300">What's on your mind?</h1>

          <div>
            <textarea
              placeholder="Type here..."
              className="bg-[#28343E] outline outline-[#28343E] w-full mt-4 rounded-lg placeholder:px-4 placeholder:py-4 text-gray-300"
            ></textarea>

            <p className="text-gray-300">0/300</p>
          </div>

          <button className="bg-gradient-to-br from-blue-400 to-cyan-500 w-full py-1 my-3 rounded-lg font-bold">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
