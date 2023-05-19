//@/app/productos/categorias/page.tsx
import AddCategoria from "./addCategoria";
import DeleteCategoria from "./deleteCategoria";
import UpdateCategoria from "./updateCategoria";

import { Categoria } from "@prisma/client";
import { getCategorias } from "@/app/actions/actionsCategorias";
import Table from "@/app/components/Table";

export const metadata = {
  title: "Categorias",
};

export default async function CategoriaList() {
  const columnas = [
    { Header: "Nombre", accessor: "nombre" },
    { Header: "Info", accessor: "info" },
    { Header: "Estado", accessor: "estado" },
  ];

  const categorias: Categoria[] = await getCategorias();

  return (
    <div>
      <div className="flex justify-around items-center  h-[40px] bg-amber-300">
        <p className="text-xl font-bold">Clientes</p>
        <div className="">
          <AddCategoria />
        </div>
      </div>
      <div className="px-1 bg-amber-200">
        <Table
          titulo="Categorias"
          columns={columnas}
          data={categorias}
          EditButton={UpdateCategoria}
          DeleteButton={DeleteCategoria}
        />
      </div>
    </div>
  );
}
