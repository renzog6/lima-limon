import Link from "next/link";
import CartBtn from "./CartBtn";
import { FaHome, FaPlus } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <div className="flex flex-row justify-around items-center  h-[50px] bg-amber-300">
        <div className="border border-amber-500 rounded h-10 w-1/3 mx-1 flex items-center justify-center">
          <Link className="flex items-center justify-center" href={"/ventas"}>
            <FaHome />
            <strong>Ventas</strong>
          </Link>
        </div>
        <div className="border border-amber-500 rounded h-10 w-1/3 flex items-center justify-center">
          <Link
            className="flex items-center justify-center"
            href="/ventas/pedido"
          >
            <FaPlus />
            Pedido
          </Link>
        </div>
        <div className="border border-amber-500 rounded h-10 w-1/3 mx-1 flex items-center justify-center">
          <Link
            className="flex items-center justify-center"
            href={"/ventas/cart"}
          >
            <CartBtn />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
