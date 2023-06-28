//@/app/cajas/[cajaId]/page.tsx

import { getCajaDetalle } from "@/app/hooks/useCajas";
import MovimientoList from "../movimientos/MovimientoList";

export default async function pageCajaId({ params: { cajaId } }) {
  const movimientos = await getCajaDetalle(cajaId);
  return (
    <>
      <div className="min-h-full max-w-full">
        <div className="flex flex-row justify-around items-center  h-[50px] bg-amber-300 border border-amber-500">
          <div className="h-10 w-1/3 mx-1 flex items-center justify-center">
            <span className="flex items-center justify-center">
              <strong className="h3">Cajas</strong>
            </span>
          </div>
        </div>
        <div className="border border-amber-500">
          <MovimientoList data={movimientos} />
        </div>
      </div>
    </>
  );
}
