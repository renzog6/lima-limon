//@/app/cajas/page.tsx

import { Caja } from "@prisma/client";
import { getCajas } from "../hooks/useCajas";
import ListCajas from "./ListCajas";

export const dynamic = "force-dynamic";

export default async function pageCajas() {
  const cajas: Caja[] = await getCajas();
  return (
    <>
      <ListCajas data={cajas} />
    </>
  );
}
