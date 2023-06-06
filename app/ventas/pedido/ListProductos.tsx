//@/app/ventas/pedido/ListProductos.tsx
"use client";
import { useState } from "react";
import ItemProducto from "./ItemProducto";
import AddToCart from "./addToCart";
import { BsCartPlus } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";
import { useAppSelector } from "@/app/redux/store";
import AddToCartBtn from "@/components/Cart/AddToCartBtn";
import { TotalPriceSelector } from "@/app/redux/features/cartSlice";

const ListProductos = ({ data }) => {
  const totalPrice = useAppSelector(TotalPriceSelector);

  const [searchTerm, setSearchTerm] = useState("");
  // Filtrar los datos basados en el término de búsqueda
  const filteredData = data.filter(
    (row) =>
      row.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="w-full overflow-x-auto">
        <div className="px-1 flex justify-between items-center h-[40px]">
          <input
            type="text"
            className="px-2 py-1 w-32 md:w-64 border border-gray-300 rounded"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-row items-center justify-center">
            <p className=""> Total: ${totalPrice}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center justify-items-center h-[40px] bg-emerald-400 border border-gray-300">
          <div className="basis-3/4 flex justify-center">
            <strong className="basis-1/2 columns-1 items-center">
              Producto
            </strong>
            <strong className="basis-1/4 flex justify-center">Precio</strong>
            <strong className="basis-1/4 flex justify-center">Stock</strong>
          </div>
          <div className="basis-1/4 flex justify-center">
            <strong>X</strong>
          </div>
        </div>
        {filteredData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-row items-center px-2 bg-gradient-to-b from-yellow-100 to-amber-200 h-20 w-full  hover:bg-gray-200"
          >
            <div className="basis-3/4">
              <ItemProducto {...row} />
            </div>

            <div className="basis-1/4 flex justify-center">
              {/* <div className=""> {AddToCart && <AddToCart {...row} />}</div> */}
              {AddToCartBtn && <AddToCartBtn product={...row} />}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ListProductos;
