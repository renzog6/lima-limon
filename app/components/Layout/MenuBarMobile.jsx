// @/components/Layout/MenuBarMobile.js
import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

import logo from "@/images/logo.png";

export default function MenuBarMobile({ setter }) {
  return (
    <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-black flex [&>*]:my-auto px-2">
      <button
        className="text-4xl flex text-white"
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
      >
        <FiMenu />
      </button>
      <Link href="/" className="mx-auto">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={logo.src}
          alt="Company Logo"
          width={50}
          height={50}
        />
      </Link>
      <Link className="text-3xl flex text-white" href="/">
        <FaUser />
      </Link>
    </nav>
  );
}
