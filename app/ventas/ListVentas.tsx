//@/app/ventas/pedido/ListProductos.tsx
"use client";
import { useState } from "react";

import DeleteVenta from "./deleteVenta";
import UpdateVenta from "./updateVenta";
import DetailPedido from "./detailPedido";
import { convertDateToTable } from "@/lib/utilDates";

const ListProductos = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // Filtrar los datos basados en el término de búsqueda
  const filteredData = data.filter((row) =>
    row.cliente.toLowerCase().includes(searchTerm.toLowerCase())
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
          <strong className="basis-1/4 flex justify-center">Fecha</strong>
          <strong className="basis-1/4 flex justify-center">Cliente</strong>
          <strong className="basis-1/4 flex justify-center">Importe</strong>
          <strong className="basis-1/4 flex justify-center">###</strong>
        </div>
        {filteredData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-row items-center px-2 bg-gradient-to-b from-yellow-100 to-amber-200 py-1 w-full  hover:bg-gray-200"
          >
            <div className="basis-1/4 flex justify-center">
              {convertDateToTable(row.fecha)}
            </div>
            <div className="basis-1/4 flex justify-center">{row.cliente}</div>
            <div className="basis-1/4 flex justify-center">{row.total}</div>
            <div className="basis-1/4 flex justify-center">
              <div className="px-4 py-2 whitespace-nowrap text-right">
                <div className=" flex flex-row">
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
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ListProductos;
