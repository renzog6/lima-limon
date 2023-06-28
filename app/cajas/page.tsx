//@/app/cajas/page.tsx

import { Caja } from "@prisma/client";
import { getCajas } from "../hooks/useCajas";
import ListCajas from "./ListCajas";
import { FaCashRegister } from "react-icons/fa";
import MovimientoEntreCajas from "./MovimientoEntreCajas";
import MovimientoIngresoACajas from "./MovimientoIngresoACajas";
import MovimientoEgresoACajas from "./MovimientoEgresoDeCajas";

export const dynamic = "force-dynamic";

export default async function pageCajas() {
  const cajas: Caja[] = await getCajas();
  return (
    <>
      <div className="min-h-full max-w-full">
        <div className="flex flex-row justify-around items-center  h-[50px] bg-amber-300 border border-amber-500">
          <div className="h-10 w-1/4 mx-1 flex items-center justify-center">
            <span className="flex items-center justify-center">
              <FaCashRegister />
              <strong className="h2 mx-1">Cajas</strong>
            </span>
          </div>
          <div className="h-10 w-1/4 mx-1 flex items-center justify-center">
            {MovimientoIngresoACajas && (
              <MovimientoIngresoACajas cajas={cajas} />
            )}
          </div>
          <div className="h-10 w-1/4 mx-1 flex items-center justify-center">
            <MovimientoEgresoACajas cajas={cajas} />
          </div>
          <div className="h-10 w-1/4 mx-1 flex items-center justify-center">
            <MovimientoEntreCajas cajas={cajas} />
          </div>
        </div>
        <div className="border border-amber-500">
          <ListCajas data={cajas} />
        </div>
      </div>
    </>
  );
}
