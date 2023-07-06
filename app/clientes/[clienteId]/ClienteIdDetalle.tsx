//@/app/clientes/clientesId/ClienteIdDetalle.tsx

import { convertDateToTable } from "@/lib/utilDates";
import { formatAmount } from "@/lib/utilNumbers";

const ClienteIdDetalle = ({ data }) => {
  return (
    <>
      <div className="flex flex-row items-center justify-center h-[40px] bg-emerald-500 border border-gray-300">
        <strong className="flex min-w-[72px] max-w-[96px] justify-center">
          Fecha
        </strong>
        <strong className="flex justify-center basis-1/2">Importe</strong>
        <strong className="flex justify-center">###</strong>
      </div>
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row items-center justify-center w-full px-2 py-1 bg-gradient-to-b from-yellow-100 to-amber-300 hover:bg-gray-200"
        >
          <div className="flex flex-col min-w-[72px] max-w-[96px] items-center py-2 border-r">
            <p className="text-sm">{convertDateToTable(row.fecha)}</p>
            <p className="text-xs">{row.tipo}</p>
          </div>
          <div className="flex justify-center text-sm basis-1/2">
            <p
              className={`${
                row.tipo === "Venta" ? "text-red-500" : "text-black-500"
              }`}
            >
              {formatAmount(
                row.tipo === "Venta" ? row.importe * -1 : row.importe
              )}
            </p>
          </div>
          <div className="flex items-center justify-center">#</div>
        </div>
      ))}
    </>
  );
};

export default ClienteIdDetalle;
