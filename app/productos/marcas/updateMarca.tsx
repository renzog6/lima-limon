//@/app/productos/marcas/addUpdate.tsx
"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Marca } from "@prisma/client";
import { RiEdit2Line } from "react-icons/ri";
import { updateMarca } from "@/app/_actions/crud/crudMarca";

export default function UpdateMarca(marca: Marca) {
  const [nombre, setNombre] = useState(marca.nombre || "");
  const [info, setInfo] = useState(marca.info || "");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);
    const updatedMarca = { ...marca }; // Hacer una copia del objeto marca
    updatedMarca.nombre = nombre;
    updatedMarca.info = info;

    updateMarca(updatedMarca);

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
        <RiEdit2Line size={20} />
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
          <h3 className="text-lg font-bold">Edit {marca.nombre}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="font-bold label">Nombre</label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full input input-bordered"
                placeholder="Marca Name"
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
