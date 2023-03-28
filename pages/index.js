import Message from "@/components/Message";
import Head from "next/head";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { AiOutlineComment } from "react-icons/ai";
import { pageAnimation } from "../animations/animation";
import { motion } from "framer-motion";

export default function Home() {
  //State to fetch posts
  const [allPosts, setAllPosts] = useState([]);

  //Fetch Posts from db
  useEffect(() => {
    const getPosts = async () => {
      const collRef = collection(db, "posts");

      //Sorted by
      const q = query(collRef, orderBy("timestamp", "desc"));

      const unSub = onSnapshot(q, (snapshot) => {
        setAllPosts(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return unSub;
    };
    getPosts();
  }, []);

  return (
    <>
      <motion.div
        variants={pageAnimation}
        exit="exit"
        initial="hidden"
        animate="show"
        className="h-[100vh] justify-center max-w-[400px] mx-auto rounded-2xl py-4 "
      >
        <h2 className="text-center text-2xl font-semibold">
          See other dev's thought
        </h2>

        {allPosts.map((post) => (
          <Message key={post.id} {...post}>
            <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
              <button className=" text-[14px] flex items-center gap-1 bg-[#3f4a53] px-3 py-1 mt-5 mx-10 rounded-md text-white">
                <span>
                  <AiOutlineComment />
                </span>
                <span>
                  {post.comments?.length > 0 ? post.comments.length : 0}
                </span>
              </button>
            </Link>
          </Message>
        ))}
      </motion.div>
    </>
  );
}
