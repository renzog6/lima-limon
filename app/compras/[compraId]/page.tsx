//@/compras/[compraId]/page.tsx
import React from "react";
import Box from "@/components/ui/Box";
import LinkBack from "@/components/ui/LinkBack";
import { CompraSafe } from "@/app/types";
import { convertDateToTable } from "@/lib/utilDates";
import { getDetalleCompraById } from "@/app/_actions/_actionsPedido";
import CompraIdDetalle from "./CompraIdDetalle";
import { getCompraById } from "@/app/_actions/crud/crudCompra";

const pageCompraId = async ({ params: { compraId } }) => {
  const compra: CompraSafe = await getCompraById(+compraId);
  const detalles = await getDetalleCompraById(compra.id);
  const CompraIdDetalleMemo = React.memo(CompraIdDetalle);

  return (
    <>
      <div className="flex flex-row items-center justify-around gap-y-2 h-14 bg-amber-300">
        <LinkBack href={"/compras"} />
        <div className="flex flex-col">
          <span>{convertDateToTable(compra.fecha)}</span>
          <span>{compra.proveedor.nombre}</span>
        </div>
        <div className="flex flex-col w-10">
          <span>Total:</span>
          <span>{compra.total}</span>
        </div>
      </div>
      <Box>
        <CompraIdDetalleMemo data={detalles} />
      </Box>
    </>
  );
};

export default pageCompraId;
