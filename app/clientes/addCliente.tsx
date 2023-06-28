//@/app/clientes/addCliente.tsx
"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createCliente } from "@/app/hooks/useClientes";
import { Button } from "@/components/Cart";

export default function AddCliente() {
  const [nombre, setNombre] = useState("");
  const [info, setInfo] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);
    const cliente = {
      nombre: nombre,
      info: info,
    };

    createCliente(cliente);
    setIsMutating(false);

    setNombre("");
    setInfo("");

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <Button
        variant="warning"
        className="w-36 h-8 py-0"
        onClick={handleChange}
      >
        Agregar
      </Button>

      <input
        id="modal"
        aria-label="modal"
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Agregar Cliente</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Nombre</label>
              <input
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
          </form>
        </div>
      </div>
    </div>
  );
}
