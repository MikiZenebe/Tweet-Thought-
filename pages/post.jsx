import { auth, db } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

function Post() {
  const route = useRouter();

  //accept the post
  const [post, setPost] = useState({ description: "" });

  //access the user
  const [user, loading] = useAuthState(auth);

  //submit post
  const submitPost = async (e) => {
    e.preventDefault();

    //Check for description
    if (!post.description) {
      toast.error("The field is empty 😔", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      return;
    }

    //New Post / add to firestore
    const collRef = collection(db, "posts");
    await addDoc(collRef, {
      ...post,
      timestamp: serverTimestamp(),
      user: user.uid,
      avatar: user.photoURL,
      username: user.displayName,
    });
    setPost({ description: "" });

    toast.success("Post successfully ❤️", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
    return route.push("/");
  };

  return (
    <div>
      <div className="max-w-[350px] mx-auto ">
        <form
          onSubmit={submitPost}
          className="bg-[#1B2730] my-20 p-6 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />
            <h1 className="text-gray-300">What's on your mind?</h1>
          </div>

          <div>
            <textarea
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
              placeholder="Type here..."
              className="bg-[#28343E] outline outline-[#28343E] w-full h-40 mt-4 rounded-lg placeholder:px-4 placeholder:py-4 text-gray-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-br from-blue-400 to-cyan-500 w-full py-1 my-3 rounded-lg font-bold "
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
