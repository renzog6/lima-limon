//@/app/ventas/page.tsx
import { Venta } from "@prisma/client";
import { getVentas } from "@/app/actions/actionsVentas";

import Table from "@/components/Table";
import AddVenta from "./addVenta";
import DeleteVenta from "./deleteVenta";
import UpdateVenta from "./updateVenta";
import Link from "next/link";

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export default async function VentaList() {
  const columnas = [
    { Header: "Nombre", accessor: "nombre" },
    { Header: "Info", accessor: "info" },
    { Header: "Estado", accessor: "estado" },
  ];

  const ventas: Venta[] = await getVentas();

  return (
    <>
      <div className="px-1 bg-amber-200">
        <Table
          titulo="Ventas"
          columns={columnas}
          data={ventas}
          EditButton={UpdateVenta}
          DeleteButton={DeleteVenta}
        />
      </div>
    </>
  );
}
