//@/app/cajas/[cajaId]/page.tsx
import { FC } from "react";

import MovimientoList from "../movimientos/MovimientoList";
import { getCajaById, getCajaMoviminetos } from "@/app/_actions/_actionsCajas";
import NotFound from "@/components/ui/NotFound";

interface PageProps {
  params: {
    cajaId: number;
  };
}

const pageCajaId: FC<PageProps> = async ({ params }) => {
  const caja = await getCajaById(Number(params.cajaId));

  if (!caja) {
    return <NotFound />;
  }

  const movimientos = await getCajaMoviminetos(caja.id);

  return (
    <>
      <div className="max-w-full min-h-full border border-amber-500">
        <MovimientoList caja={caja} data={movimientos} />
      </div>
    </>
  );
};

export default pageCajaId;
