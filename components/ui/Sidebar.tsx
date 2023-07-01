//@/components/ui/SidebarItem.tsx
"use client";

import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

import SidebarItem from "./SidebarItem";
import Box from "./Box";
import { GiCash } from "react-icons/gi";
import { BsFillPeopleFill } from "react-icons/bs";
import Navbar from "./Navbar";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname === "/",
        href: "/",
      },
      {
        icon: GiCash,
        label: "Cajas",
        href: "/cajas",
        active: pathname === "/cajas",
      },
      {
        icon: BsFillPeopleFill,
        label: "Clientes",
        href: "/clientes",
        active: pathname === "/clientes",
      },
    ],
    [pathname]
  );

  return (
    <div className={twMerge(`flex h-full`)}>
      <div className="hidden md:flex flex-col gap-y-2 bg-gradient-to-b from-emerald-800 h-full w-[260px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Sidebar;
