//@/app/productos/marcas/page.tsx
import AddMarca from "./addMarca";
import DeleteMarca from "./deleteMarca";
import UpdateMarca from "./updateMarca";

import { Marca } from "@prisma/client";
import { getMarcas } from "@/app/hooks/useMarcas";
import Table from "@/components/Table";

export const dynamic = "force-dynamic";

export default async function MarcaList() {
  const columnas = [
    { Header: "Nombre", accessor: "nombre" },
    { Header: "Info", accessor: "info" },
    { Header: "Estado", accessor: "estado" },
  ];
  const marcas: Marca[] = await getMarcas();

  return (
    <div>
      <div className="flex justify-around items-center  h-[40px] bg-amber-300">
        <p className="text-xl font-bold">Marcas</p>
        <div className="">
          <AddMarca />
        </div>
      </div>
      <div className="px-1 bg-amber-200">
        <Table
          titulo="Marcas"
          columns={columnas}
          data={marcas}
          EditButton={UpdateMarca}
          DeleteButton={DeleteMarca}
        />
      </div>
    </div>
  );
}
