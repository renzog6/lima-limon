//@/components/Table.tsx
"use client";
import { useState } from "react";
import { FaList } from "react-icons/fa";

const Table = ({
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
      <table className="w-full table-auto table-md">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-4 py-2 text-left bg-gray-300"
              >
                {column.Header}
              </th>
            ))}
            <th className="px-4 py-2 bg-gray-300">#</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0
                  ? "bg-gray-100 bg-opacity-30"
                  : "bg-slate-300 bg-opacity-30"
              } hover:bg-gray-200`}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-2 whitespace-nowrap">
                  {row[column.accessor]}
                </td>
              ))}
              <td className="px-4 py-2 text-right whitespace-nowrap">
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
