//@/app/cajas/ListCajas.tsx

import Link from "next/link";
import { IoMdEye } from "react-icons/io";

const ListClientes = ({ data }) => {
  const total = data.reduce((sum, caja) => sum + caja.saldo, 0.0);

  return (
    <>
      <div className="flex flex-row content-center w-full h-8 px-2 py-1 font-semibold bg-gradient-to-r from-green-200 to-green-500 hover:bg-gray-200">
        <div className="basis-1/2 ">Cliente</div>
        <div className="flex justify-center basis-1/3">Saldo</div>
        <div className="flex justify-center basis-1/6">#</div>
      </div>
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row items-center w-full h-10 px-2 py-1 border-b bg-gradient-to-l from-green-100 to-green-400 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="basis-1/2">{row.nombre}</div>
          <div className="flex justify-center basis-1/3 ">
            {row.saldo.toLocaleString()}
          </div>
          <div className="flex justify-center basis-1/6">
            <Link href={"/clientes/" + row.id} className="mx-auto">
              <IoMdEye />
            </Link>
          </div>
        </div>
      ))}
      <div className="flex flex-row items-center w-full h-8 px-2 py-1 font-semibold bg-gradient-to-r from-green-200 to-green-500 hover:bg-gray-200">
        <div className="basis-1/2">Total</div>
        <div className="flex justify-center basis-1/3">
          $ {total.toLocaleString()}
        </div>
          <div className="flex justify-center basis-1/6">#</div>
      </div>
    </>
  );
};

export default ListClientes;
