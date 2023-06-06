import Link from "next/link";
import React from "react";
import CartBtn from "./CartBtn";

const Header = () => {
  return (
    <>
      <div className="flex flex-row justify-around items-center  h-[50px] bg-amber-300">
        <Link className="text-sky-800" href={"/ventas"}>
          <strong>Ventas</strong>
        </Link>
        <Link href="/ventas/pedido">Pedido</Link>
        <Link href={"/ventas/cart"}>
          <CartBtn />
        </Link>
      </div>
    </>
  );
};

export default Header;
