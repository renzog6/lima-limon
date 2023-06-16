//@/app/cajas/layout.tsx
"use client";
import Link from "next/link";
import { FaCashRegister, FaMoneyBill } from "react-icons/fa";
import { BiCreditCard } from "react-icons/bi";
import { usePathname } from "next/navigation";

const LayoutCajas = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-full max-w-full">
      <div className="flex flex-row justify-around items-center  h-[50px] bg-amber-300">
        <div
          className={`border border-amber-500 rounded h-10 w-1/3 mx-1 flex items-center justify-center ${
            pathname === "/cajas" ? "bg-orange-300" : ""
          }`}
        >
          <Link className="flex items-center justify-center" href={"/cajas"}>
            <FaCashRegister />
            <strong>Cajas</strong>
          </Link>
        </div>
        <div
          className={`border border-amber-500 rounded h-10 w-1/3 mx-1 flex items-center justify-center ${
            pathname === "/cajas/cobros" ? "bg-orange-300" : ""
          }`}
        >
          <Link
            className="flex items-center justify-center"
            href="/cajas/cobros"
          >
            <FaMoneyBill />
            Cobros
          </Link>
        </div>
        <div
          className={`border border-amber-500 rounded h-10 w-1/3 mx-1 flex items-center justify-center ${
            pathname === "/cajas/pagos" ? "bg-orange-300" : ""
          }`}
        >
          <Link
            className="flex items-center justify-center"
            href="/cajas/pagos"
          >
            <BiCreditCard />
            Pagos
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default LayoutCajas;
