import { AiFillGoogleCircle } from "react-icons/ai";

export default function Login() {
  return (
    <div>
      <div className="bg-[#1B2730] max-w-[300px] mx-auto h-[120px] p-4 mt-32 rounded-lg">
        <div className="text-center text-gray-300">
          <h1>Join to share your thoughts</h1>
        </div>

        <div className="py-5 flex justify-center">
          <button className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-700 text-gray-200">
            <span>
              <AiFillGoogleCircle />
            </span>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
