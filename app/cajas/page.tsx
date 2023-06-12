//@/app/cajas/page.tsx

import { Caja } from "@prisma/client";
import ListCajas from "./ListCajas";
import { getCajas } from "../hooks/useCajas";

export const dynamic = "force-dynamic";

export default async function pageCajas() {
  const cajas: Caja[] = await getCajas();
  return (
    <>
      <ListCajas data={cajas} />
    </>
  );
}
