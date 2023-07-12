//@/app/cajas/page.tsx
import { Caja } from "@prisma/client";
import { FaCashRegister } from "react-icons/fa";
import MovimientoEntreCajas from "./MovimientoEntreCajas";
import MovimientoIngresoACajas from "./MovimientoIngresoACajas";
import MovimientoEgresoACajas from "./MovimientoEgresoDeCajas";
import { getCajas } from "../_actions/_actionsCajas";
import ListCajas from "./ListCajas";

export const dynamic = "force-dynamic";

const PageCajas = async () => {
  const cajas: Caja[] = await getCajas();
  return (
    <>
      <div className="max-w-full min-h-full">
        <div className="flex flex-row justify-around items-center h-[50px] bg-amber-300 border border-amber-500">
          <div className="flex items-center justify-center w-1/4 h-10 mx-1">
            <span className="flex items-center justify-center">
              <FaCashRegister size={"20"} />
              <strong className="mx-1 h2">Cajas</strong>
            </span>
          </div>
          <div className="flex items-center justify-center w-1/4 h-10 mx-1">
            {MovimientoIngresoACajas && (
              <MovimientoIngresoACajas cajas={cajas} />
            )}
          </div>
          <div className="flex items-center justify-center w-1/4 h-10 mx-1">
            <MovimientoEgresoACajas cajas={cajas} />
          </div>
          <div className="flex items-center justify-center w-1/4 h-10 mx-1">
            <MovimientoEntreCajas cajas={cajas} />
          </div>
        </div>
        <div className="border border-amber-500">
          <ListCajas data={cajas} />
        </div>
      </div>
    </>
  );
};

export default PageCajas;
