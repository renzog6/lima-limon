//@/app/ventas/pedido/page.tsx

import { getProductosToCart } from "@/app/_actions/_actionsProductos";
import ListProductos from "./ListProductos";
import { ProductoToCart } from "@/types";

export const dynamic = "force-dynamic";

async function PagePedido() {
  const productos: ProductoToCart[] = await getProductosToCart();

  return (
    <>
      <ListProductos data={productos} />
    </>
  );
}

export default PagePedido;
