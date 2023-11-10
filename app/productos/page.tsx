//@/app/productos/page.tsx
import AddProducto from "./addProducto";
import EditProducto from "./editProducto";
import DeleteProducto from "./deleteProducto";

import TableProducto from "./TableProducto";
import { getAllProductosSafe } from "../_actions/_actionsProductos";

export const dynamic = "force-dynamic";

export default async function ProductoList() {
  const columnas = [
    { Header: "Categoria", accessor: "categoria" },
    { Header: "Nombre", accessor: "nombre" },
    { Header: "Precio", accessor: "precio" },
    { Header: "Stock", accessor: "stock" },
    { Header: "Info", accessor: "info" },
  ];

  const productos = await getAllProductosSafe();

  return (
    <>
      <div className="px-1 bg-green-600">
        <TableProducto
          titulo="Productos"
          columns={columnas}
          data={productos}
          AddButton={AddProducto}
          EditButton={EditProducto}
          DeleteButton={DeleteProducto}
        />
      </div>
    </>
  );
}
