//@/app/cajas/[cajaId]/page.tsx
import { FC } from "react";

import { getCajaById } from "@/app/hooks/useCajas";
import { getCajaAllMoviminetos } from "@/app/_actions/getCajaAllMoviminetos";
import { Caja } from "@prisma/client";

import MovimientoList from "../movimientos/MovimientoList";

interface PageProps {
  params: {
    cajaId: number;
  };
}

const pageCajaId: FC<PageProps> = async ({ params }) => {
  const caja: Caja = await getCajaById(params.cajaId);
  const movimientos = await getCajaAllMoviminetos(caja.id);

  return (
    <>
      <div className="max-w-full min-h-full border border-amber-500">
        <MovimientoList caja={caja} data={movimientos} />
      </div>
    </>
  );
};

export default pageCajaId;
