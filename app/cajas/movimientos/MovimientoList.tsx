//@/app/cajas/movimientos/MovimientoList.tsx
"use client";
import { useMemo, useState } from "react";
import MovimientoDetail from "./MovimientoDetail";
import MovimientoEdit from "./MovimientoEdit";
import MovimientoDelete from "./MovimientoDelete";

import { formatAmount } from "@/lib/utilNumbers";
import { convertDateToTable } from "@/lib/utilDates";
import Link from "next/link";
import { RiArrowGoBackLine } from "react-icons/ri";

const MovimientoList = ({ caja, data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // Usar useMemo para evitar recálculos innecesarios
  const filteredData = useMemo(
    () =>
      data.filter((row) =>
        row.quien.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, data]
  );
  return (
    <>
      <div className="w-full px-1 flex justify-between items-center h-[50px] text-amber-400">
        <div className="flex items-center justify-center w-20 h-14">
          <Link
            href="/cajas"
            className="flex items-center justify-center w-full"
          >
            <RiArrowGoBackLine size="20" />
          </Link>
        </div>
        <div className="text-sm md:text-xl">
          <span>
            Caja <strong>{caja.tipo}</strong>
          </span>
        </div>
        <div className="">
          <input
            id="inputBuscar"
            type="text"
            className="w-32 px-2 bg-transparent border border-gray-300 rounded md:w-64"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="">
        <div className="flex flex-row items-center justify-between w-full h-[40px] bg-emerald-400 border border-gray-300">
          <div className="flex flex-row items-center justify-between w-full ">
            <strong className="flex min-w-[72px] max-w-[96px] justify-center">
              Fecha
            </strong>
            <strong>C/P</strong>
            <strong>Importe</strong>
          </div>
          <strong className="flex items-center justify-center w-6 md:w-24">
            #
          </strong>
        </div>
        {filteredData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-row items-center w-full px-1 py-1 bg-gradient-to-b from-yellow-100 to-amber-300 hover:bg-gray-200"
          >
            <div className="flex flex-col items-center justify-center w-full ">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-col min-w-[72px] max-w-[96px] items-center py-2">
                  <p className="text-sm">{convertDateToTable(row.fecha)}</p>
                  <p className="text-xs">{row.tipo}</p>
                </div>
                <div className="flex justify-center">
                  <p className="text-sm">{row.quien}</p>
                </div>
                <div className="flex justify-center px-2 text-sm md:px-10">
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
              </div>
              <div className="flex items-center justify-start w-full h-6 px-2">
                <p className="text-xs md:text-sm">Info: {row.info}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-1 md:flex-row">
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
