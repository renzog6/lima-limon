//@/ventas/[ventaId]/page.tsx
import React from "react";
import Box from "@/components/ui/Box";
import LinkBack from "@/components/ui/LinkBack";
import { VentaSafe } from "@/types";
import { convertDateToTable } from "@/lib/utilDates";
import { getDetalleVentaById } from "@/app/_actions/_actionsPedido";
import VentaIdDetalle from "./VentaIdDetalle";
import { getVentaById } from "@/app/_actions/crud/crudVenta";

const pageVentaId = async ({ params: { ventaId } }) => {
  const venta: VentaSafe = await getVentaById(+ventaId);

  const detalles = await getDetalleVentaById(venta.id);
  const VentaIdDetalleMemo = React.memo(VentaIdDetalle);

  return (
    <>
      <div className="flex flex-row items-center justify-around gap-y-2 h-14 bg-amber-300">
        <LinkBack href={"/ventas"} />
        <div className="flex flex-col">
          <span>{convertDateToTable(venta.fecha)}</span>
          <span>{venta.cliente.nombre}</span>
        </div>
        <div className="flex flex-col w-10">
          <span>Total:</span>
          <span>{venta.total}</span>
        </div>
      </div>
      <Box>
        <VentaIdDetalleMemo data={detalles} />
      </Box>
    </>
  );
};

export default pageVentaId;
