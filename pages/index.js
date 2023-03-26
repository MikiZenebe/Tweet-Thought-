import Message from "@/components/Message";
import Head from "next/head";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { AiOutlineComment } from "react-icons/ai";

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
      <Head>
        <title>Devs Thought</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-[100vh] justify-center max-w-[400px] mx-auto rounded-2xl py-4 ">
        <h2 className="text-center text-2xl font-semibold">
          See other dev's thought
        </h2>

        {allPosts.map((post) => (
          <Message key={post.id} {...post}>
            <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
              <button className=" text-[14px] flex items-center gap-2 bg-[#3f4a53] px-3 py-1 mt-5 mx-10 rounded-md text-white">
                <span>
                  <AiOutlineComment />
                </span>
                Comment
              </button>
            </Link>
          </Message>
        ))}
      </div>
    </>
  );
}
