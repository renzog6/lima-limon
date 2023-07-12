//@/app/ventas/page.tsx
import { getVentas } from "@/app/hooks/useVentas";
import ListVentas from "./ListVentas";
import Box from "@/components/ui/Box";
import { VentaSafe } from "../types";

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

const pageVentas = async () => {
  const ventas: VentaSafe[] = await getVentas();
  return (
    <Box>
      <ListVentas ventas={ventas} />
    </Box>
  );
};

export default pageVentas;
