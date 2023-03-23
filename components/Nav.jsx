import Link from "next/link";
import { AiFillEdit, AiOutlineLogin } from "react-icons/ai";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Nav() {
  const [user, loading, error] = useAuthState(auth); //Check if the user in
  console.log(user);

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
          {!user && (
            <div>
              <Link href={"/auth/login"}>
                <button className="bg-gradient-to-br from-white to-gray-200 py-1 px-2 rounded-lg text-white font-medium flex items-center gap-2 ">
                  <AiOutlineLogin className="text-[#0086da] " />{" "}
                  <span className="text-black">Login</span>
                </button>
              </Link>
            </div>
          )}

          {user && (
            <div className="flex gap-6">
              <Link href={"/post"}>
                <button className="bg-gradient-to-br from-white to-gray-200 py-1 px-2 rounded-lg text-white font-medium flex items-center gap-2 ">
                  <AiFillEdit className="text-[#0086da] " />{" "}
                  <span className="text-black">Post</span>
                </button>
              </Link>

              <Link href={"/dashboard"}>
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
