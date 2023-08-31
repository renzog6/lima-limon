//@/app/ventas/detailPedido.tsx
"use client";

import { useState } from "react";
import { FiList } from "react-icons/fi";
import { Venta } from "@prisma/client";
import { PedidoSafe } from "../types";
import { getDetalleVentaById } from "../_actions/_actionsPedido";

export default function DetailPedido(venta: Venta) {
  const [pedidos, setPedidos] = useState<PedidoSafe[]>([]);
  const [modal, setModal] = useState(false);

  function handleChange() {
    setModal(!modal);
    async function fetchPedidos() {
      const pedidos = await getDetalleVentaById(venta.id);
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
          <h3 className="text-lg font-bold">Detalle de Pedido</h3>
          <div className="flex flex-row items-center w-full px-2 py-1 bg-gradient-to-b from-yellow-200 to-amber-400 hover:bg-gray-200">
            <div className="flex justify-center basis-1/4">Producto</div>
            <div className="flex justify-center basis-1/4">Cantidad</div>
            <div className="flex justify-center basis-1/4">Precio</div>
            <div className="flex justify-center basis-1/4">Total</div>
          </div>
          {pedidos.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="flex flex-row items-center w-full px-2 py-1 bg-gradient-to-b from-yellow-100 to-amber-200 hover:bg-gray-200"
            >
              <div className="flex justify-start basis-1/4">
                {item.producto.nombre}
              </div>
              <div className="flex justify-center basis-1/4">
                {item.cantidad}
              </div>
              <div className="flex justify-center basis-1/4">{item.precio}</div>
              <div className="flex justify-center basis-1/4">
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
