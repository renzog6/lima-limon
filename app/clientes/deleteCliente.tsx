//@/app/clientes/deleteCliente.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa";

import { Cliente } from "@prisma/client";
import { deleteCliente } from "@/app/hooks/useClientes";

export default function DeleteCliente(cliente: Cliente) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(clienteId: number) {
    setIsMutating(true);
    deleteCliente(clienteId); // Llama a la función de actualización del estado
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
            Seguro que desea BORRAR: {cliente.nombre} ?
          </h3>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleChange}
            >
              Cerrar
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(cliente.id)}
                className="btn btn-red"
              >
                Borrar
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
