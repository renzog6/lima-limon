"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MenuBarMobile from "./MenuBarMobile";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="">
      <Navbar />
      <div className="flex">
        <MenuBarMobile setter={setShowSidebar} />
        <Sidebar show={showSidebar} setter={setShowSidebar} />
        <div className="container min-h-screen">{children}</div>
      </div>
    </div>
  );
}
