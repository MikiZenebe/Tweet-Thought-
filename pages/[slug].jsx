import Message from "@/components/Message";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { toast } from "react-toastify";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";

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

  return (
    <div>
      <Message {...routeData}></Message>

      <div>
        <div className="max-w-[350px] mx-auto my-4 flex">
          <input
            className="w-full bg-[#28343E] outline outline-[#28343E]  rounded-lg p-2"
            onChange={(e) => setMessge(e.target.value)}
            type="text"
            value={message}
            placeholder="Write a comment...💬"
          />

          <button
            onClick={submitComments}
            className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-tr-lg rounded-lg ml-2 px-2 py-1 font-medium"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}
