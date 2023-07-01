//@/app/cajas/movimientos/MovimientoList.tsx
"use client";
import { useState } from "react";
import MovimientoDetail from "./MovimientoDetail";
import MovimientoEdit from "./MovimientoEdit";
import MovimientoDelete from "./MovimientoDelete";

import { formatAmount } from "@/lib/utilNumbers";
import { convertDateToTable } from "@/lib/utilDates";

const MovimientoList = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // Filtrar los datos basados en el término de búsqueda
  const filteredData = data.filter((row) =>
    row.quien.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="px-1 flex justify-between items-center h-[40px]">
          <input
            type="text"
            className="px-2 py-1 w-32 md:w-64 border border-gray-300 rounded"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center justify-items-center h-[40px] bg-emerald-400 border border-gray-300">
          <strong className="flex min-w-[72px] max-w-[96px] justify-center">
            Fecha
          </strong>
          <strong className="basis-5/12 flex justify-center">C/P</strong>
          <strong className="basis-1/3 flex justify-center">Importe</strong>
          <strong className="basis-5/12 flex justify-center">Info</strong>
          <strong className="flex justify-center">###</strong>
        </div>
        {filteredData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-row items-center px-2 bg-gradient-to-b from-yellow-100 to-amber-200 py-1 w-full  hover:bg-gray-200"
          >
            <div className="flex flex-col min-w-[72px] max-w-[96px] items-center py-2 border-r">
              <p className="text-sm">{convertDateToTable(row.fecha)}</p>
              <p className="text-xs">{row.tipo}</p>
            </div>
            <div className="flex basis-5/12 justify-center">
              <p className="text-sm">{row.quien}</p>
            </div>
            <div className="basis-1/6 flex justify-center text-sm">
              <p
                className={`${
                  row.tipo === "Pago" ? "text-red-500" : "text-black-500"
                }`}
              >
                {formatAmount(
                  row.tipo === "Pago" ? row.importe * -1 : row.importe
                )}
              </p>
            </div>

            <div className="basis-5/12 flex justify-start border-l">
              <p className="text-xs md:text-sm">{row.info}</p>
            </div>
            <div className="flex justify-center">
              <div className=" flex flex-col md:flex-row gap-1 items-center">
                <div className="">
                  <MovimientoDetail />
                </div>
                <div className="">
                  <MovimientoEdit />
                </div>
                <div className="">
                  <MovimientoDelete />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default MovimientoList;
