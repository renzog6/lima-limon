//@/app/ventas/page.tsx
import { Venta } from "@prisma/client";
import { getVentas } from "@/app/actions/actionsVentas";

import Table from "@/app/components/Table";
import AddVenta from "./addVenta";
import DeleteVenta from "./deleteVenta";
import UpdateVenta from "./updateVenta";

export const metadata = {
  title: "Ventas",
};
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
    <div>
      <div className="flex justify-around items-center  h-[40px] bg-amber-300">
        <p className="text-xl font-bold">Ventas</p>
        <div className="">
          <AddVenta />
        </div>
      </div>
      <div className="px-1 bg-amber-200">
        <Table
          titulo="Ventas"
          columns={columnas}
          data={ventas}
          EditButton={UpdateVenta}
          DeleteButton={DeleteVenta}
        />
      </div>
    </div>
  );
}
