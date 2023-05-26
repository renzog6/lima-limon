//@/app/ventas/deleteVenta.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

import { Venta } from "@prisma/client";
import { deleteVenta } from "@/app/actions/actionsVentas";

export default function DeleteVenta(venta: Venta) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(ventaId: number) {
    setIsMutating(true);
    deleteVenta(ventaId);
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
            Seguro que desea BORRAR: {venta.id} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Cerrar
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(venta.id)}
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
