//@/app/productos/categorias/deleteCategoria.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiDelete } from "react-icons/fi";

import { Categoria } from "@prisma/client";
import { deleteCategoria } from "@/app/actions/actionsCategorias";

export default function DeleteCategoria(categoria: Categoria) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(categoriaId: number) {
    setIsMutating(true);
    deleteCategoria(categoriaId);
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
        className="btn btn-error btn-sm"
        onClick={handleChange}
      >
        <FiDelete />
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
            Seguro que desea BORRAR: {categoria.nombre} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Cerrar
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(categoria.id)}
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
