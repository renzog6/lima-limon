//@/app/cajas/cobros/page.tsx

import { Cobro } from "@prisma/client";
import { getCobros } from "@/app/hooks/useCobros";
import ListCobros from "./ListCobros";

export const dynamic = "force-dynamic";

export default async function pageCobros() {
  const cobros: Cobro[] = await getCobros();

  return (
    <>
      <ListCobros data={cobros} />
    </>
  );
}
