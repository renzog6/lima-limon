//@/app/productos/TableProducto.tsx
import React from "react";

type TableItemProps = {
  item: any;
};

const TableItem: React.FC<TableItemProps> = ({ item }) => {
  // Usa "data" y "text" en tu componente como sea necesario
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-row">
        <div className="px-2 py-2 text-left">{item.categoria}</div>
        <div className="px-2 py-2 text-left">{item.nombre}</div>
      </div>
      <div className="px-2 py-2 text-right">{item.precio}</div>
      <div className="px-2 py-2 text-center">{item.stock}</div>
    </div>
  );
};

export default TableItem;
