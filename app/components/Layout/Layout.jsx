"use client";
// @/components/Layout/index.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MenuBarMobile from "./MenuBarMobile";

export default function Layout({ children }) {
  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen max-w-full">
      <div className="flex">
        <MenuBarMobile setter={setShowSidebar} />
        <Sidebar show={showSidebar} setter={setShowSidebar} />
        <div className="flex flex-col flex-grow place-content-start w-screen md:w-full min-h-screen py-10 md:py-0">
          {children}
        </div>
      </div>
    </div>
  );
}
