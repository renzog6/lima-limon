//@/app/productos/TableProducto.tsx
"use client";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import TableItem from "./TableItem";

const TableProducto = ({
  titulo,
  columns,
  data,
  AddButton,
  EditButton,
  DeleteButton,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar los datos basados en el término de búsqueda
  const filteredData = data.filter(
    (row) =>
      row[columns[0].accessor]
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      row[columns[1].accessor].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="px-1 flex justify-between items-center h-[40px]">
        <div className="flex items-center">
          <FaList />
          <p className="mx-1 text-sm font-semibold md:text-lg">{titulo}</p>
        </div>
        <input
          type="text"
          className="w-32 px-2 py-1 border border-gray-300 rounded md:w-64"
          placeholder="Buscar..." //{`Buscar por ${columns[0].Header}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="">{AddButton && <AddButton />}</div>
      </div>
      <table className="table w-full border-collapse">
        <thead>
          <tr className="bg-green-700 ">
            <th className="px-2 py-2 whitespace-nowrap">
              <div className="flex flex-row">
                <div className="px-2 py-2 text-left">Categoria</div>
                <div className="px-2 py-2 text-left">Nombre</div>
              </div>
            </th>
            <th>
              <div className="px-2 py-2 text-center">Precio</div>
            </th>
            <th>
              <div className="px-2 py-2 text-center">Stock</div>
            </th>
            <th>
              <div className="px-2 py-2 text-center">Info</div>
            </th>

            <th className="px-2 py-2 text-center whitespace-nowrap">
              <div className="flex flex-row ">#</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              <td className="w-full px-2 py-2 whitespace-nowrap">
                <div className="flex flex-row">
                  <div className="px-2 py-2 text-left">{row.categoria}</div>
                  <div className="px-2 py-2 text-left">{row.nombre}</div>
                </div>
              </td>
              <td>
                <div className="px-2 py-2 text-right">{row.precio}</div>
              </td>
              <td>
                <div className="px-2 py-2 text-center">{row.stock}</div>
              </td>
              <td>
                <div className="px-2 py-2 text-center">{row.info}</div>
              </td>

              <td className="px-2 py-2 text-right whitespace-nowrap">
                <div className="flex flex-row ">
                  <div className="">
                    {EditButton && <EditButton {...row} />}
                  </div>
                  <div className="">
                    {DeleteButton && <DeleteButton {...row} />}
                  </div>
                </div>
              </td>
            </tr>
            /*             <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0
                  ? "bg-gray-100 bg-opacity-30"
                  : "bg-slate-300 bg-opacity-30"
              } hover:bg-gray-200 w-full`}
            >
              <td className="flex flex-row w-full">
                <TableItem item={row} />
              </td>
            </tr> */
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableProducto;
