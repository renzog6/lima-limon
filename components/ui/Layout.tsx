"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface LayoutRootProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutRootProps> = ({ children }) => {
  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className={twMerge(`flex h-full justify-center`)}>
      <div className="flex flex-col w-full h-full md:max-w-[80%] bg-gradient-to-b from-emerald-800">
        <Navbar setter={setShowSidebar} />
        <div className="flex flex-row w-full h-full gap-y-2 bg-gradient-to-b from-emerald-800">
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          {/* <main className="flex-1 h-full overflow-y-auto">{children}</main> */}
          <main className="flex-1 h-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
