//@/app/productos/marcas/deleteMarca.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Marca } from "@prisma/client";
import { deleteMarca } from "@/app/_actions/crud/crudMarca";
import { FaTrash } from "react-icons/fa";

export default function DeleteMarca(marca: Marca) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(marcaId: number) {
    setIsMutating(true);

    deleteMarca(marcaId);

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
        id="btn-delete-marca"
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
          <h3 className="text-lg font-bold">
            Seguro que desea BORRAR: {marca.nombre} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Cerrar
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(marca.id)}
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
