"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MenuBarMobile from "./MenuBarMobile";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="overflow-hidden bg-gradient-to-r from-amber-200 to-orange-400">
      <Navbar />
      <div className="flex">
        <MenuBarMobile setter={setShowSidebar} />
        <Sidebar show={showSidebar} setter={setShowSidebar} />
        <div className="container min-h-screen">{children}</div>
      </div>
    </div>
  );
}
