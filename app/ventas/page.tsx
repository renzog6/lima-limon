//@/app/ventas/page.tsx
import { Venta } from "@prisma/client";
import { getVentas } from "@/app/hooks/useVentas";
import ListVentas from "./ListVentas";

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

const PageVentas = async () => {
  const ventas: Venta[] = await getVentas();
  return (
    <>
      <ListVentas data={ventas} />
    </>
  );
};

export default PageVentas;
