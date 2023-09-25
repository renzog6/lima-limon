//@/app/ventas/ListVentas.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { convertDateToTable } from "@/lib/utilDates";
import { IoMdEye } from "react-icons/io";
import { VentaSafe } from "@/types";
interface ListVentasProps {
  ventas: VentaSafe[];
}

const ListVentas: React.FC<ListVentasProps> = ({ ventas }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // Filtrar los datos basados en el término de búsqueda
  const filteredData = ventas.filter((row) =>
    row.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="px-1 flex justify-between items-center h-[40px]">
          <input
            id="inputBuscar"
            type="text"
            className="w-32 px-2 py-1 border border-gray-300 rounded md:w-64"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center justify-items-center h-[40px] bg-emerald-400 border border-gray-300">
          <strong className="flex justify-center basis-1/4">Fecha</strong>
          <strong className="flex justify-center basis-1/4">Cliente</strong>
          <strong className="flex justify-center basis-1/4">Importe</strong>
          <strong className="flex justify-center basis-1/4">###</strong>
        </div>
        {filteredData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-row items-center w-full px-2 py-1 bg-gradient-to-b from-yellow-100 to-amber-200 hover:bg-gray-200"
          >
            <div className="flex justify-center basis-1/4">
              {convertDateToTable(row.fecha)}
            </div>
            <div className="flex justify-center basis-1/4">
              {row.cliente.nombre}
            </div>
            <div className="flex justify-center basis-1/4">{row.total}</div>
            <div className="flex justify-center basis-1/4">
              <Link href={"/ventas/" + row.id} className="mx-auto">
                <IoMdEye />
              </Link>
            </div>
            {/* <div className="flex justify-center basis-1/4">
              <div className="px-4 py-2 text-right whitespace-nowrap">
                <div className="flex flex-row ">
                  <div className="">
                    {DetailPedido && <DetailPedido {...row} />}
                  </div>
                  <div className="">
                    {UpdateVenta && <UpdateVenta {...row} />}
                  </div>
                  <div className="">
                    {DeleteVenta && <DeleteVenta {...row} />}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
};
export default ListVentas;
