import Message from "@/components/Message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { toast } from "react-toastify";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { card, pageAnimation } from "../animations/animation";
import { motion } from "framer-motion";

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessge] = useState("");
  const [allMessage, setAllMessage] = useState([]);

  //Submit Comments
  const submitComments = async () => {
    if (!auth.currentUser) return router.push("/auth/login");
    if (!message) {
      toast.error("The field is empty ❌", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      return;
    } else {
      toast.success("Commented successfully ✅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }

    const docRef = doc(db, "posts", routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        username: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });
    setMessge("");
  };

  useEffect(() => {
    //Fetch Comments
    const getComments = async () => {
      const docRef = doc(db, "posts", routeData.id);
      const unSub = onSnapshot(docRef, (snapshot) => {
        setAllMessage(snapshot.data().comments);
      });

      return unSub;
    };

    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);

  return (
    <motion.div
      variants={pageAnimation}
      exit="exit"
      initial="hidden"
      animate="show"
      className=" overflow-y-hidden"
    >
      <Message {...routeData}></Message>

      <div className="h-[100vh]">
        <motion.div
          variants={card}
          initial="hidden"
          animate="show"
          className="max-w-[350px] mx-auto my-4 flex"
        >
          <input
            className="w-full bg-[#28343E] outline outline-[#28343E]  rounded-lg p-2"
            onChange={(e) => setMessge(e.target.value)}
            type="text"
            value={message}
            placeholder="Write a comment...💬"
          />

          <button
            onClick={submitComments}
            className="btn bg-gradient-to-br from-blue-400 to-cyan-500 rounded-tr-lg rounded-lg ml-2 px-2 py-1 font-medium"
          >
            Comment
          </button>
        </motion.div>

        <div className="max-w-[350px] mx-auto ">
          <h2 className="mt-16 text-[20px]">Comments</h2>

          {allMessage?.map((comment) => (
            <motion.div
              variants={card}
              initial="hidden"
              animate="show"
              className="bg-[#1B2730]  h-[120px]  rounded-lg mt-2 p-3 flex flex-col"
            >
              <div className="flex gap-2 items-center text-gray-300">
                <img
                  src={comment.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-green-300">{comment.username}</p>
              </div>
              <p className="text-[12px] text-gray-400 mt-[-5px] mx-10">
                <span>
                  {comment.time && comment.time.toDate().toDateString()}
                </span>
                <span className="mx-1 font-semibold italic">
                  {comment.time &&
                    comment.time.toDate().toLocaleTimeString("en-US")}
                </span>
              </p>
              <div className="mx-10 mt-2">{comment.message}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
