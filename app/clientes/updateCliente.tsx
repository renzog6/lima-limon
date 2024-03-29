//@/app/clientes/updateCliente.tsx
"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";

import { Cliente } from "@prisma/client";
import { updateCliente } from "../_actions/crud/crudCliente";

export default function UpdateCliente(cliente: Cliente) {
  const [nombre, setNombre] = useState(cliente.nombre || "");
  const [info, setInfo] = useState(cliente.info || "");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const updated = { ...cliente, nombre: nombre, info: info };
    updateCliente(updated);

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
        title="edit"
        className="mr-2 text-blue-500 hover:text-blue-700"
        onClick={handleChange}
      >
        <FiEdit color="blue" />
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
          <div className="modal-header">
            <h3 className="text-lg font-bold">Editar: {cliente.nombre}</h3>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="font-bold label">Nombre</label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full input input-bordered"
                placeholder="Cliente Name"
              />
            </div>
            <div className="form-control">
              <label className="font-bold label">Info</label>
              <input
                type="text"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                className="w-full input input-bordered"
                placeholder="Info"
              />
            </div>
            <div className="modal-action">
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleChange}
                >
                  Cerrar
                </button>
                {!isMutating ? (
                  <button type="submit" className="btn btn-green">
                    Guardar
                  </button>
                ) : (
                  <button type="button" className="btn loading">
                    Guardando...
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
