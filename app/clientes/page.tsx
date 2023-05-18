import { Cliente } from "@prisma/client";
import { getClientes } from "@/app/actions/actionsClientes";

import Table from "@/app/components/Table";
import AddCliente from "./addCliente";
import DeleteCliente from "./deleteCliente";
import UpdateCliente from "./updateCliente";

export default async function ClienteList() {
  const columnas = [
    { Header: "Nombre", accessor: "nombre" },
    { Header: "Info", accessor: "info" },
    { Header: "Estado", accessor: "estado" },
  ];

  const clientes: Cliente[] = await getClientes();

  return (
    <div>
      <div className="flex justify-around items-center  h-[40px] bg-amber-300">
        <p className="text-xl font-bold">Clientes</p>
        <div className="">
          <AddCliente />
        </div>
      </div>
      <div className="px-1 bg-amber-200">
        <Table
          titulo="Clientes"
          columns={columnas}
          data={clientes}
          EditButton={UpdateCliente}
          DeleteButton={DeleteCliente}
        />
      </div>
    </div>
  );
}
