export default function Message({ children }) {
  return (
    <div className="bg-[#1B2730] max-w-[350px] mx-auto h-[120px]  rounded-lg mt-8 p-3 flex flex-col">
      <div className="flex gap-2 ">
        <span className="bg-red-300 rounded-full">Image</span>{" "}
        <img src="" alt="" />
        <h2>user</h2>
      </div>

      <p>time</p>

      <div className="mt-2">
        <p>Desc</p>
      </div>
      {children}
    </div>
  );
}
