//@/app/ventas/detailPedido.tsx
"use client";

import { useState } from "react";
import { FiList } from "react-icons/fi";

import { Venta } from "@prisma/client";
import { getPedidos } from "../api/ventas/pedidos/getPedidos";
import { SafePedido } from "../types";

export default function DetailPedido(venta: Venta) {
  const [pedidos, setPedidos] = useState<SafePedido[]>([]);
  const [modal, setModal] = useState(false);

  function handleChange() {
    setModal(!modal);
    async function fetchPedidos() {
      const pedidos = await getPedidos({ ventaId: venta.id });
      setPedidos(pedidos);
    }
    if (!modal) {
      fetchPedidos();
    }
  }

  return (
    <div>
      <button
        title="edit"
        className="mr-2 text-green-700 hover:text-blue-700"
        onClick={handleChange}
      >
        <FiList />
      </button>

      <input
        id="modal-update"
        aria-label="modal-update"
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Detalle de Pedido</h3>
          <div className="flex flex-row items-center px-2 bg-gradient-to-b from-yellow-200 to-amber-400 py-1 w-full  hover:bg-gray-200">
            <div className="basis-1/4 flex justify-center">Producto</div>
            <div className="basis-1/4 flex justify-center">Cantidad</div>
            <div className="basis-1/4 flex justify-center">Precio</div>
            <div className="basis-1/4 flex justify-center">Total</div>
          </div>
          {pedidos.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="flex flex-row items-center px-2 bg-gradient-to-b from-yellow-100 to-amber-200 py-1 w-full  hover:bg-gray-200"
            >
              <div className="basis-1/4 flex justify-start">
                {item.producto}
              </div>
              <div className="basis-1/4 flex justify-center">
                {item.cantidad}
              </div>
              <div className="basis-1/4 flex justify-center">{item.precio}</div>
              <div className="basis-1/4 flex justify-center">
                {item.precio * item.cantidad}
              </div>
            </div>
          ))}

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
