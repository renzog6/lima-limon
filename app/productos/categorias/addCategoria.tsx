//@/app/productos/categorias/addCategoria.tsx
"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Categoria } from "@prisma/client";
import { createCategoria } from "@/app/_actions/crud/crudCategoria";
import { Button } from "@/components/ui";
import { FaPlus } from "react-icons/fa";

export default function AddCategoria() {
  const [nombre, setNombre] = useState("");
  const [info, setInfo] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);
    const categoria = {
      nombre: nombre,
      info: info,
    };

    createCategoria(categoria as Categoria);
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
      <Button variant="warning" className="h-8 py-0" onClick={handleChange}>
        <div className="flex flex-row items-center justify-center mx-2 min-w-32">
          <FaPlus color="green" size="16" />
          <p className="hidden mx-1 md:block w-14">Agregar</p>
        </div>
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
          <h3 className="text-lg font-bold">Agregar Categoria</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="font-bold label">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full input input-bordered"
                placeholder="Categoria Name"
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
