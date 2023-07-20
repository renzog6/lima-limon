//@/app/ventas/page.tsx
import Box from "@/components/ui/Box";
import ListVentas from "./ListVentas";
import { getVentasSafe } from "../_actions/_actionsVentas";
import { VentaSafe } from "../types";

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

const pageVentas = async () => {
  const ventas: VentaSafe[] = await getVentasSafe();
  return (
    <Box>
      <ListVentas ventas={ventas} />
    </Box>
  );
};

export default pageVentas;
