//@/app/categorias/page.tsx
import { Categoria } from "@prisma/client";
import { getCategorias } from "@/app/actions/actionsCategorias";

import Table from "@/app/components/Table";
import AddCategoria from "./addCategoria";
import DeleteCategoria from "./deleteCategoria";
import UpdateCategoria from "./updateCategoria";

export const metadata = {
  title: "Categorias",
};
export const dynamic = "force-dynamic";

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
        <p className="text-xl font-bold">Categorias</p>
        <div className="">
          <AddCategoria />
        </div>
      </div>
      <div className="px-1 bg-blue-400">
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
