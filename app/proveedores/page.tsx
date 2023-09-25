//@/app/proveedores/page.tsx
import AddProveedor from "./addProveedor";
import EditProveedor from "./editProveedor";
import DeleteProveedor from "./deleteProveedor";

import Table from "@/components/Table";
import { Proveedor } from "@prisma/client";
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
    <>
      <div className="px-1 bg-amber-200">
        <Table
          titulo="Proveedores"
          columns={columnas}
          data={proveedors}
          AddButton={AddProveedor}
          EditButton={EditProveedor}
          DeleteButton={DeleteProveedor}
        />
      </div>
    </>
  );
}
