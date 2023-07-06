//@/components/ui/Sidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MdSell } from "react-icons/md";
import { FaRedhat, FaProductHunt, FaShoppingCart } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { useMemo } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import Box from "./Box";

const Sidebar = ({ show, setter }) => {
  // Define our base class
  const className =
    "w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

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
      {
        icon: MdSell,
        label: "Ventas",
        href: "/ventas",
        active: pathname === "/ventas",
      },
      {
        icon: FaProductHunt,
        label: "Productos",
        href: "/productos",
        active: pathname === "/productos",
      },
      {
        icon: FaRedhat,
        label: "Proveedores",
        href: "/proveedores",
        active: pathname === "/proveedores",
      },
      {
        icon: FaShoppingCart,
        label: "Compras",
        href: "/compras",
        active: pathname === "/compras",
      },
    ],
    [pathname]
  );

  // Clickable menu items
  const SidebarItem = ({ icon: Icon, label, href, active }) => {
    return (
      <Link
        href={href}
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
        className={twMerge(
          `flex 
        flex-row 
        h-auto 
        items-center 
        w-full 
        gap-x-4 
        text-md 
        font-medium
        cursor-pointer
        hover:text-white
        transition
        text-neutral-400
        py-1`,
          active && "text-white"
        )}
      >
        <Icon size={26} />
        <p className="truncate w-100">{label}</p>
      </Link>
    );
  };

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className={twMerge(`flex h-full bg-black`)}>
          <div className={twMerge(`flex flex-col gap-y-2 h-full w-[260px]`)}>
            <Box className={twMerge("h-full")}>
              <div className="flex flex-col px-5 py-4 gap-y-4">
                {routes.map((item) => (
                  <SidebarItem key={item.label} {...item} />
                ))}
              </div>
            </Box>
          </div>
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
};

export default Sidebar;
