import { AiFillGoogleCircle } from "react-icons/ai";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login() {
  const route = useRouter();
  const [user, loading, error] = useAuthState(auth); //Check if the user in
  console.log(user);

  //Sign in with goggle
  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
      console.log(result);
    } catch (error) {
      console.log("Please login");
    }
  };

  //Run this if the user is found
  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("Please Login");
    }
  }, [user]);

  return (
    <div>
      <div className="bg-[#1B2730] max-w-[300px] mx-auto h-[120px] p-4 mt-32 rounded-lg">
        <div className="text-center text-gray-300">
          <h1>Join to share your thoughts</h1>
        </div>

        <div className="py-5 flex justify-center">
          <button
            className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-700 text-gray-200"
            onClick={GoogleLogin}
          >
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
