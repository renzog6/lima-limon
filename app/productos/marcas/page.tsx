//@/app/productos/marcas/page.tsx
import AddMarca from "./addMarca";
import EditMarca from "./editMarca";
import DeleteMarca from "./deleteMarca";

import Table from "@/components/Table";
import { Marca } from "@prisma/client";
import { getMarcas } from "@/app/_actions/crud/crudMarca";

export const dynamic = "force-dynamic";

export default async function MarcaList() {
  const columnas = [
    { Header: "Nombre", accessor: "nombre" },
    { Header: "Info", accessor: "info" },
  ];

  const marcas: Marca[] = await getMarcas();

  return (
    <>
      <div className="px-1 bg-amber-200">
        <Table
          titulo="Marcas"
          columns={columnas}
          data={marcas}
          AddButton={AddMarca}
          EditButton={EditMarca}
          DeleteButton={DeleteMarca}
        />
      </div>
    </>
  );
}
