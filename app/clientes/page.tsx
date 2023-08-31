//@/app/clientes/page.tsx
import { Cliente } from "@prisma/client";

import AddCliente from "./addCliente";
import Box from "@/components/ui/Box";
import ListClientes from "./ListClientes";
import { getClientes } from "../_actions/crud/crudCliente";

export const dynamic = "force-dynamic";

const PageClientes = async () => {
  const clientes: Cliente[] = await getClientes();
  return (
    <>
      <div className="flex justify-around items-center  h-[40px] bg-amber-300">
        <p className="text-xl font-bold">Clientes</p>
        <div className="">
          <AddCliente />
        </div>
      </div>
      <Box>
        <ListClientes data={clientes} />
      </Box>
    </>
  );
};

export default PageClientes;
