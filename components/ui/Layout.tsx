"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import Sidebar from "../Sidebar";
import Navbar from "./Navbar";
import Box from "./Box";

interface LayoutRootProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutRootProps> = ({ children }) => {
  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className={twMerge(`flex h-full`)}>
      <div className="flex flex-col bg-gradient-to-b from-emerald-800 h-full w-full">
        <Navbar setter={setShowSidebar} />
        <div className="flex flex-row gap-y-2 bg-gradient-to-b from-emerald-800 h-full w-full">
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          <main className="h-full flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
