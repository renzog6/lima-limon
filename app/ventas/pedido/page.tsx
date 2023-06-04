//@/app/ventas/pedido/page.tsx
import { Producto } from "@prisma/client";
import { getProductos } from "@/app/actions/actionsProductos";
import ItemProducto from "./ItemProducto";

async function pagePedido() {
  const productos: Producto[] = await getProductos();

  return (
    <div>
      {productos.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row items-center px-2 bg-gradient-to-b from-white to-amber-200 h-20 w-full  hover:bg-gray-200"
        >
          <div className="basis-3/4">
            <ItemProducto {...row} />
          </div>

          <div className="basis-1/4 flex justify-center">
            <div className="">add To Car</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default pagePedido;
