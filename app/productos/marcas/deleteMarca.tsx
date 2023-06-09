"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiDelete } from "react-icons/fi";

import { Marca } from "@prisma/client";
import { deleteMarca } from "@/app/hooks/useMarcas";
import { RiDeleteBin5Line } from "react-icons/ri";

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
        title="delete"
        className="btn btn-error btn-sm"
        onClick={handleChange}
      >
        <RiDeleteBin5Line size={20} />
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
