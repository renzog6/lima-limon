//@/app/ventas/ventaId/VentaIdDetalle.tsx
import { FC } from "react";

import { PedidoSafe } from "@/app/types";
import { formatAmount } from "@/lib/utilNumbers";

interface PageProps {
  data: PedidoSafe[];
}

const VentaIdDetalle: FC<PageProps> = ({ data }) => {
  return (
    <>
      <div className="flex flex-row items-center justify-center h-[40px] px-2 py-1 bg-emerald-500 border border-gray-300">
        <strong className="flex min-w-[96px] w-full">Producto</strong>
        <strong className="flex justify-center basis-1/2">Pecio</strong>
        <strong className="flex justify-center basis-1/2">Cant.</strong>
        <strong className="flex justify-center">#</strong>
      </div>
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row items-center justify-center w-full px-2 py-1 bg-gradient-to-b from-yellow-100 to-amber-300 hover:bg-gray-200"
        >
          <div className="flex flex-col min-w-[96px] w-full py-1">
            <p className="text-sm">{row.producto.nombre}</p>
            <p className="text-xs">{row.producto.categoria.nombre}</p>
          </div>
          <div className="flex justify-center text-sm basis-1/2">
            <p className="text-sm">{formatAmount(row.precio)}</p>
          </div>
          <div className="flex justify-center text-sm basis-1/2">
            <p className="text-sm">{row.cantidad}</p>
          </div>
          <div className="flex items-center justify-center">#</div>
        </div>
      ))}
    </>
  );
};

export default VentaIdDetalle;
