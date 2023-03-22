import React from "react";

function Nav() {
  return (
    <div>
      <div className="flex justify-around mb-10 py-8 items-center">
        <div>
          <h1 className="font-bold text-1xl">Devs Thought</h1>
        </div>

        <div className="flex gap-8 items-center">
          <button className="bg-[#0e7ce4] py-1 px-2 rounded-lg text-white font-medium">
            Join
          </button>
          <h3>User</h3>
        </div>
      </div>
    </div>
  );
}

export default Nav;
