import { auth, db } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "@/components/Message";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { card, pageAnimation } from "../animations/animation";
import { motion } from "framer-motion";

function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [allPosts, setAllPosts] = useState([]);

  //Protect the page
  useEffect(() => {
    const getData = async () => {
      if (loading) return;
      if (!user) return route.push("/auth/login");

      //Display posts if the user is found
      const collRef = collection(db, "posts");
      const q = query(collRef, where("user", "==", user.uid));
      const unSub = onSnapshot(q, (snapshot) => {
        setAllPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return unSub;
    };

    getData();
  }, [user, loading]);

  //Delete Post
  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };

  return (
    <div>
      <motion.div
        variants={pageAnimation}
        exit="exit"
        initial="hidden"
        animate="show"
        className="max-w-[400px] mx-auto py-4 h-[100vh]"
      >
        <h2 className="text-center text-2xl font-semibold">Your Posts</h2>

        <div>
          {allPosts.map((post) => {
            return (
              <Message key={post.id} {...post}>
                <div className="flex mt-5 gap-4 mx-10">
                  <Link href={{ pathname: "/post", query: post }}>
                    <button className=" text-[13px] flex items-center gap-2 bg-[#3f4a53] px-3 py-1 rounded-md text-blue-300">
                      <span>
                        <AiFillEdit />
                      </span>
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-[13px] flex items-center gap-2 bg-[#3f4a53] px-3 py-1 rounded-md text-red-300"
                  >
                    <span>
                      <AiFillDelete />
                    </span>
                    Delete
                  </button>
                </div>
              </Message>
            );
          })}
        </div>

        <button
          className="btn my-6 mx-6 px-2 py-1 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-700 text-gray-200"
          onClick={() => auth.signOut()}
        >
          Sign out
        </button>
      </motion.div>
    </div>
  );
}

export default Dashboard;
