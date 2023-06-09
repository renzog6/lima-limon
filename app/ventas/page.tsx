//@/app/ventas/page.tsx
import { Venta } from "@prisma/client";
import { getVentas } from "@/app/actions/actionsVentas";

import ListVentas from "./ListVentas";

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

export default async function VentaList() {
  const ventas: Venta[] = await getVentas();

  return (
    <>
      <ListVentas data={ventas} />
    </>
  );
}
