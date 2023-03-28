import { card, pageAnimation } from "../animations/animation";
import { motion } from "framer-motion";

export default function Message({
  children,
  avatar,
  username,
  description,
  timestamp,
}) {
  const date = timestamp && timestamp.toDate().toLocaleTimeString("en-US");
  const time = timestamp && timestamp.toDate().toDateString();

  return (
    <motion.div
      variants={card}
      initial="hidden"
      animate="show"
      className="bg-[#1B2730] max-w-[350px] mx-auto h-auto  rounded-lg mt-10 p-3 flex flex-col"
    >
      <div className="flex gap-2 items-center text-gray-300">
        <img src={avatar} alt="" className="w-8 h-8 rounded-full" />
        <h2 className="text-green-300">{username}</h2>
      </div>

      <div className=" mx-10">
        <p className="text-[12px] text-gray-400 mt-[-5px]">
          {time} <span className="font-semibold italic">{date}</span>
        </p>
        <p className="mt-2 ">{description}</p>
      </div>
      {children}
    </motion.div>
  );
}
