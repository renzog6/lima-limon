//@/app/ventas/pedido/page.tsx
import ListProductos from "./ListProductos";
import { ProductoToCart } from "@/app/types";
import { getProductos } from "@/app/hooks/useProductos";

export const dynamic = "force-dynamic";

async function PagePedido() {
  const productos: ProductoToCart[] = await getProductos();

  return (
    <>
      <ListProductos data={productos} />
    </>
  );
}

export default PagePedido;
