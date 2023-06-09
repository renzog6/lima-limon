//@/app/cajas/layout.tsx

import Link from "next/link";
import { FaCashRegister, FaMoneyBill } from "react-icons/fa";
import { BiCreditCard } from "react-icons/bi";

const LayoutCajas = ({ children }) => {
  return (
    <div className="min-h-full max-w-full">
      <div className="flex flex-row justify-around items-center  h-[50px] bg-amber-300">
        <div className="border border-amber-500 rounded h-10 w-32 flex items-center justify-center">
          <Link className="flex items-center justify-center" href={"/cajas"}>
            <FaCashRegister />
            <strong>Cajas</strong>
          </Link>
        </div>
        <div className="border border-amber-500 rounded h-10 w-32 flex items-center justify-center">
          <Link
            className="flex items-center justify-center"
            href="/cajas/cobros"
          >
            <FaMoneyBill />
            Cobros
          </Link>
        </div>
        <div className="border border-amber-500 rounded h-10 w-32 flex items-center justify-center">
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
