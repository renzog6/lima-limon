//@/app/productos/page.tsx
import { Producto } from "@prisma/client";

import Table from "@/components/Table";
import AddProducto from "./addProducto";
import DeleteProducto from "./deleteProducto";
import UpdateProducto from "./updateProducto";
import { getProductos } from "../_actions/crud/crudProducto";
import { ProductoToCart } from "@/types";
import { getProductosToCart } from "../_actions/_actionsProductos";

export const dynamic = "force-dynamic";

export default async function ProductoList() {
  const columnas = [
    { Header: "Categoria", accessor: "categoria" },
    { Header: "Nombre", accessor: "nombre" },
    { Header: "Precio", accessor: "precio" },
    { Header: "Stock", accessor: "stock" },
    { Header: "Info", accessor: "info" },
  ];

  const productos = await getProductosToCart();

  return (
    <div>
      <div className="flex justify-around items-center  h-[40px] bg-amber-300">
        <p className="text-xl font-bold">Productos</p>
        <div className="">
          <AddProducto />
        </div>
      </div>
      <div className="px-1 bg-amber-200">
        <Table
          titulo="Productos"
          columns={columnas}
          data={productos}
          EditButton={UpdateProducto}
          DeleteButton={DeleteProducto}
        />
      </div>
    </div>
  );
}
