"use client";
// @/components/Layout/index.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MenuBarMobile from "./MenuBarMobile";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="w-full top-[117px] lg:top-[344px]">
      <Navbar />
      <div className="flex">
        <MenuBarMobile setter={setShowSidebar} />
        <Sidebar show={showSidebar} setter={setShowSidebar} />

        <div className="flex flex-col flex-grow overflow-x-auto min-h-screen py-10 md:py-0">
          {children}
        </div>
      </div>
    </div>
  );
}
