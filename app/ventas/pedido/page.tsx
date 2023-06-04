//@/app/ventas/pedido/page.tsx

import ListProductos from "./ListProductos";
import { ProductoToCart } from "@/app/types";
import { getProductos } from "@/app/actions/actionsProductos";

async function PagePedido() {
  const productos: ProductoToCart[] = await getProductos();

  return (
    <div className="">
      <ListProductos data={productos} />
    </div>
  );
}

export default PagePedido;