//@/app/cajas/ListCajas.tsx

import Link from "next/link";

const ListCajas = ({ data }) => {
  const total = data.reduce((sum, caja) => sum + caja.saldo, 0.0);

  return (
    <>
      <div className="flex flex-row content-center px-2 h-8 bg-gradient-to-r from-green-200 to-green-500 py-1 w-full  hover:bg-gray-200 font-semibold">
        <div className="basis-1/4 ">Caja</div>
        <div className="basis-1/2 flex justify-center">Saldo</div>
        <div className="basis-1/4 flex justify-center">#</div>
      </div>
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row items-center px-2 h-10 bg-gradient-to-l from-green-100 to-green-400 py-1 w-full  hover:bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="basis-1/3">{row.nombre}</div>
          <div className="basis-1/3 flex justify-center ">
            {row.saldo.toLocaleString()}
          </div>
          <div className="basis-1/3 flex justify-center">
            <Link href={"/cajas/" + row.id} className="mx-auto">
              Detalle
            </Link>
          </div>
        </div>
      ))}
      <div className="flex flex-row items-center px-2 h-8 bg-gradient-to-r from-green-200 to-green-500 py-1 w-full  hover:bg-gray-200 font-semibold">
        <div className="basis-1/4">Total</div>
        <div className="basis-1/2 flex justify-center">
          $ {total.toLocaleString()}
        </div>
        <div className="basis-1/4 flex justify-center">#</div>
      </div>
    </>
  );
};

export default ListCajas;
