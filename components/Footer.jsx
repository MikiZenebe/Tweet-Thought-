import Link from "next/link";
import { FaGithub, FaInstagram, FaTelegram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className=" p-8 justify-center items-center w-full bg-[#1B2730]">
      <div className="flex gap-4 flex-col items-center justify-between">
        <div>
          <h1>
            <span className="font-semibold text-gray-300"> Developed by:</span>{" "}
            <span className="font-medium text-green-400">Micky</span>
          </h1>
        </div>

        <div className="flex gap-4 text-blue-400">
          <Link href={"https://github.com/MikiZenebe"}>
            <p>
              <FaGithub className="btn cursor-pointer" />
            </p>
          </Link>

          <Link href={"https://t.me/Miki_Zenebe"}>
            <p>
              {" "}
              <FaTelegram className="btn cursor-pointer" />
            </p>
          </Link>

          <Link href={"https://www.instagram.com/micky_zenebe/"}>
            <p>
              <FaInstagram className="btn cursor-pointer" />
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
