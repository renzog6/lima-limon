//@/app/proveedores/page.tsx
import { Proveedor } from "@prisma/client";

import Table from "@/components/Table";
import AddProveedor from "./addProveedor";
import DeleteProveedor from "./deleteProveedor";
import UpdateProveedor from "./updateProveedor";
import { getProveedores } from "../_actions/crud/crudProveedor";

export const dynamic = "force-dynamic";

export default async function ProveedorList() {
  const columnas = [
    { Header: "Nombre", accessor: "nombre" },
    { Header: "Info", accessor: "info" },
    { Header: "Estado", accessor: "estado" },
  ];

  const proveedors: Proveedor[] = await getProveedores();

  return (
    <div>
      <div className="flex justify-around items-center  h-[40px] bg-amber-300">
        <p className="text-xl font-bold">Proveedores</p>
        <div className="">
          <AddProveedor />
        </div>
      </div>
      <div className="px-1 bg-amber-200">
        <Table
          titulo="Proveedores"
          columns={columnas}
          data={proveedors}
          EditButton={UpdateProveedor}
          DeleteButton={DeleteProveedor}
        />
      </div>
    </div>
  );
}
