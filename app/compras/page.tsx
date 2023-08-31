//@/app/compras/pages.tsx

import ListCompras from "./ListCompras";
import Box from "@/components/ui/Box";
import { CompraSafe } from "../types";
import { getCompras } from "../_actions/crud/crudCompra";

export const dynamic = "force-dynamic";

const pageCompras = async () => {
  const compras: CompraSafe[] = await getCompras();
  return (
    <Box>
      <ListCompras compras={compras} />
    </Box>
  );
};

export default pageCompras;
