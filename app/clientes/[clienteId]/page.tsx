//@/app/clientes/[clienteId]/page.tsx
import React from "react";
import Link from "next/link";
import Box from "@/components/ui/Box";
import { Cliente } from "@prisma/client";
import { RiArrowGoBackLine } from "react-icons/ri";
import ClienteIdDetalle from "./ClienteIdDetalle";
import CobroACliente from "./CobroACliente";
import { CajaSafe } from "@/app/types";
import { getCajasSafe } from "@/app/_actions/_actionsCajas";
import { getClienteById } from "@/app/_actions/crud/crudCliente";
import { getDetalleClienteById } from "@/app/_actions/_actionsClientes";

interface DetalleCliente {
  fecha: Date;
  tipo: string;
  importe: number | null;
  saldo: number | null;
}

const pageClienteId = async ({ params: { clienteId } }) => {
  const cliente: Cliente = await getClienteById(+clienteId);
  const detalles: DetalleCliente[] = await getDetalleClienteById(+clienteId);
  const cajas: CajaSafe[] = await getCajasSafe();
  const ClienteIdDetalleMemo = React.memo(ClienteIdDetalle);

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-y-2 h-14 bg-amber-300">
        <div className="flex items-center justify-center w-20 h-14">
          <Link
            href="/clientes"
            className="flex items-center justify-center w-full"
          >
            <RiArrowGoBackLine size="20" />
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-3xl">
          <p className="text-lg font-bold">{cliente.nombre}</p>
          <p className="text-lg">
            Saldo: <strong> {cliente.saldo.toLocaleString()}</strong>
          </p>
        </div>
        <div className="flex items-center justify-center w-20 h-14">
          <CobroACliente cliente={cliente} cajas={cajas} />
        </div>
      </div>
      <Box>
        <ClienteIdDetalleMemo data={detalles} />
      </Box>
    </>
  );
};

export default pageClienteId;
