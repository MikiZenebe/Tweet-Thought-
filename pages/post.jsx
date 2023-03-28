import { auth, db } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { card, pageAnimation } from "../animations/animation";
import { motion } from "framer-motion";

function Post() {
  const route = useRouter();

  //accept the post
  const [post, setPost] = useState({ description: "" });

  //access the user
  const [user, loading] = useAuthState(auth);

  //Update Data
  const queryData = route.query;

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

    //Update existing post
    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const updatedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);

      toast.success("Post has been update 🚀", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });

      return route.push("/");
    } else {
      //Make a new post
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });

      toast.success("Post has been made 🚀", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });

      return route.push("/");
    }
  };

  //Check user for updating the data
  useEffect(() => {
    const checkUser = () => {
      if (loading) return;
      if (!user) route.push("/auth/login");
      if (queryData.id) {
        setPost({ description: queryData.description, id: queryData.id });
      }
    };
    checkUser();
  }, [user, loading]);

  return (
    <motion.div
      variants={pageAnimation}
      exit="exit"
      initial="hidden"
      animate="show"
    >
      <motion.div
        variants={card}
        initial="hidden"
        animate="show"
        className="max-w-[350px] mx-auto "
      >
        <form
          onSubmit={submitPost}
          className="bg-[#1B2730] my-20 p-6 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <img src={user?.photoURL} alt="" className="w-8 h-8 rounded-full" />
            <h1 className="text-gray-300">
              {post.hasOwnProperty("id")
                ? "Edit Your Post"
                : "What's on your mind?"}
            </h1>
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
            className="btn bg-gradient-to-br from-blue-400 to-cyan-500 w-full py-1 my-3 rounded-lg font-bold "
          >
            Post
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Post;
