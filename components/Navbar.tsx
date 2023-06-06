//@/components/Navbar.tsx
import Link from "next/link";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";

import logo from "@/images/logo.png";

const Navbar = () => {
  return (
    <div className="top-0 left-0 right-0 h-[60px] bg-black flex [&>*]:my-auto">
      <div className="flex-none">
        <button title="menu" className="btn btn-square btn-ghost">
          <FiMenu />
        </button>
      </div>
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          Lima Limon
        </Link>
      </div>
      <div className="flex-1">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={logo.src}
          alt="Company Logo"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default Navbar;
