"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

import { Producto } from "@prisma/client";
import { deleteProducto } from "@/app/actions/actionsProductos";

export default function DeleteProducto(producto: Producto) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(productoId: number) {
    setIsMutating(true);
    deleteProducto(productoId); // Llama a la función de actualización del estado
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
        title="delete"
        className="text-red-500 hover:text-red-700"
        onClick={handleChange}
      >
        <FaTrash />
      </button>

      <input
        aria-label="modal-delete"
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Seguro que desea BORRAR: {producto.nombre} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Cerrar
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(producto.id)}
                className="btn btn-primary"
              >
                Borar
              </button>
            ) : (
              <button type="button" className="btn loading">
                Borrando...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
