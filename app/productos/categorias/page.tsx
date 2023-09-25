//@/app/categorias/page.tsx
import AddCategoria from "./addCategoria";
import EditCategoria from "./editCategoria";
import DeleteCategoria from "./deleteCategoria";

import Table from "@/components/Table";
import { Categoria } from "@prisma/client";
import { getCategorias } from "@/app/_actions/crud/crudCategoria";

export const dynamic = "force-dynamic";

export default async function CategoriaList() {
  const columnas = [
    { Header: "Nombre", accessor: "nombre" },
    { Header: "Info", accessor: "info" },
  ];

  const categorias: Categoria[] = await getCategorias();

  return (
    <>
      <div className="px-1 bg-zinc-300">
        <Table
          titulo="Categorias"
          columns={columnas}
          data={categorias}
          AddButton={AddCategoria}
          EditButton={EditCategoria}
          DeleteButton={DeleteCategoria}
        />
      </div>
    </>
  );
}
