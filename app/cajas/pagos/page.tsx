//@/app/cajas/pagos/page.tsx

import { Pago } from "@prisma/client";
import { getPagos } from "@/app/hooks/usePagos";
import ListPagos from "./ListPagos";

export const dynamic = "force-dynamic";

export default async function pagePagos() {
  const pagos: Pago[] = await getPagos();

  return (
    <>
      <ListPagos data={pagos} />
    </>
  );
}
