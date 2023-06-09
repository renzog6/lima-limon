import Link from "next/link";
import { usePathname } from "next/navigation";

import { SlHome } from "react-icons/sl";
import { MdSell } from "react-icons/md";
import { FaTshirt, FaRedhat, FaProductHunt } from "react-icons/fa";
import { GiCash } from "react-icons/gi";

export default function Sidebar({ show, setter }) {
  // Define our base class
  const className =
    "bg-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  // Clickable menu items
  const MenuItem = ({ icon, name, route }) => {
    // Highlight menu item based on currently displayed route
    const pathname = usePathname();
    const colorClass =
      pathname === route
        ? "text-white bg-gray-800"
        : "text-white/50 hover:text-white";
    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <div>{name}</div>
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
        <div className="flex flex-col">
          <MenuItem name="Home" route="/" icon={<SlHome />} />
          <MenuItem name="Caja" route="/cajas" icon={<GiCash />} />
          <MenuItem name="Clientes" route="/clientes" icon={<FaTshirt />} />
          <MenuItem
            name="Proveedores"
            route="/proveedores"
            icon={<FaRedhat />}
          />
          <MenuItem
            name="Productos"
            route="/productos"
            icon={<FaProductHunt />}
          />
          <ul className="pl-4 mt-2">
            <li>
              <MenuItem
                name="Categorias"
                route="/productos/categorias"
                icon={<FaProductHunt />}
              />
            </li>
            <li>
              <MenuItem
                name="Marcas"
                route="/productos/marcas"
                icon={<FaProductHunt />}
              />
            </li>
          </ul>
          <MenuItem name="Ventas" route="/ventas" icon={<MdSell />} />
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
