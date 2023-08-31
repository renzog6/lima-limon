//@/app/cajas/cobros/page.tsx

import { Cobro } from "@prisma/client";
import ListCobros from "./ListCobros";
import { getCobros } from "@/app/_actions/crud/crudCobro";

export const dynamic = "force-dynamic";

export default async function pageCobros() {
  const cobros: Cobro[] = await getCobros();

  return (
    <>
      <ListCobros data={cobros} />
    </>
  );
}
