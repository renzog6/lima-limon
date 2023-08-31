//@/app/productos/categorias/updateCategoria.tsx
"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";

import { Categoria } from "@prisma/client";
import { updateCategoria } from "@/app/_actions/crud/crudCategoria";

export default function UpdateCategoria(categoria: Categoria) {
  const [nombre, setNombre] = useState(categoria.nombre || "");
  const [info, setInfo] = useState(categoria.info || "");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const updated = { ...categoria, nombre: nombre, info: info };
    updateCategoria(updated);

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
        className="btn btn-info btn-sm"
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
          <h3 className="text-lg font-bold">Edit {categoria.nombre}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="font-bold label">Nombre</label>
              <input
                id="nombre"
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
