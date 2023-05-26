"use client";
import { useState } from "react";

const Table = ({ titulo, columns, data, EditButton, DeleteButton }) => {
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
        <p className="text-sm md:text-lg font-semibold">Listado de {titulo}</p>
        <input
          type="text"
          className="px-2 py-1 w-32 md:w-64 border border-gray-300 rounded"
          placeholder="Buscar..." //{`Buscar por ${columns[0].Header}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-4 py-2 bg-gray-300 text-left"
              >
                {column.Header}
              </th>
            ))}
            <th className="px-4 py-2 bg-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? "bg-gray-100" : "bg-slate-300"
              } hover:bg-gray-200`}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-2 whitespace-nowrap">
                  {row[column.accessor]}
                </td>
              ))}
              <td className="px-4 py-2 whitespace-nowrap text-right">
                <div className=" flex flex-row">
                  <div className="">
                    {EditButton && <EditButton {...row} />}
                  </div>
                  <div className="">
                    {DeleteButton && <DeleteButton {...row} />}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
