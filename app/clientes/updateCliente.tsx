//@/app/clientes/updateCliente.tsx
"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";

import { Cliente } from "@prisma/client";
import { updateCliente } from "@/app/hooks/useClientes";

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
          <h3 className="font-bold text-lg">Edit {cliente.nombre}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Nombre</label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Cliente Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Info</label>
              <input
                type="text"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Info"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Carrar
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
