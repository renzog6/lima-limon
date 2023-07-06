//@/app/cajas/[cajaId]/page.tsx

import { getCajaById } from "@/app/hooks/useCajas";
import MovimientoList from "../movimientos/MovimientoList";
import { getCajaAllMoviminetos } from "@/app/_actions/getCajaAllMoviminetos";
import { Caja } from "@prisma/client";

export default async function pageCajaId({ params: { cajaId } }) {
  const caja: Caja = await getCajaById(+cajaId);
  const movimientos = await getCajaAllMoviminetos(caja.id);
  return (
    <>
      <div className="max-w-full min-h-full border border-amber-500">
        <MovimientoList caja={caja} data={movimientos} />
      </div>
    </>
  );
}
