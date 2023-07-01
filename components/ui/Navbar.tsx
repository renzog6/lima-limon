//@/components/ui/Navbar.tsx
import Link from "next/link";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";

import logo from "@/images/logo.png";
import { FaUser } from "react-icons/fa";
import Box from "./Box";

const Navbar = ({ setter }) => {
  return (
    <>
      <Box>
        <nav className="flex flex-row h-[60px] w-full items-center">
          <button
            id="MenuSideBar"
            title="MenuSideBar"
            type="button"
            className="flex text-white items-center ml-2"
            onClick={() => {
              setter((oldVal) => !oldVal);
            }}
          >
            <FiMenu size={26} />
          </button>
          <Link href="/" className="mx-auto">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              src={logo.src}
              alt="Company Logo"
              width={50}
              height={50}
            />
          </Link>
          <Link className="flex text-white items-center mr-2" href="/">
            <FaUser size={26} />
          </Link>
        </nav>
      </Box>
    </>
  );
};

export default Navbar;
