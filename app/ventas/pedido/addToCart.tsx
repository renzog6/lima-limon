//@/app/ventas/pedido/addToCart.tsx
"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BsCartPlus } from "react-icons/bs";
import { ProductoToCart } from "@/app/types";

export default function AddToCart(producto: ProductoToCart) {
  const [cantidad, setCantidad] = useState(1);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);

    setIsMutating(false);
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button
        title="cart"
        className="mr-2 text-blue-500 hover:text-blue-700"
        onClick={handleChange}
      >
        <BsCartPlus size={20} color="green" />
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
          <h3 className="font-bold text-lg">Agregar a Carrito:</h3>
          <h2 className="py-2">
            {producto.categoria + " - "}
            <strong>{producto.nombre}</strong>
          </h2>
          <form onSubmit={handleUpdate}>
            <div className="flex flex-row">
              <label className="label font-bold">Cantidad</label>
              <input
                id="cantidad"
                type="number"
                value={cantidad === 0 ? "" : cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                className="block w-1/2 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                placeholder="0"
              />
            </div>
            <div className="flex flex-row rounded-md ring-1 ring-inset my-2">
              <label className="label font-bold">
                {"Total: $ " + producto.precio * cantidad}
              </label>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Cerrar
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Guardando...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
