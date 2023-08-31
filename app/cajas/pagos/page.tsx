//@/app/cajas/pagos/page.tsx

import { Pago } from "@prisma/client";

import ListPagos from "./ListPagos";
import { getPagos } from "@/app/_actions/crud/crudPago";

export const dynamic = "force-dynamic";

export default async function pagePagos() {
  const pagos: Pago[] = await getPagos();

  return (
    <>
      <ListPagos data={pagos} />
    </>
  );
}
