//@/app/productos/editProducto.tsx
"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";

import { Producto } from "@prisma/client";
import { editProducto } from "../_actions/crud/crudProducto";

export default function EditProducto(producto: Producto) {
  const [nombre, setNombre] = useState(producto.nombre || "");
  const [info, setInfo] = useState(producto.info || "");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const updated = { ...producto, nombre: nombre, info: info };

    editProducto(updated); // Llama a la función de actualización del estado
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
        id="btn-edit-producto"
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
          <h3 className="text-lg font-bold">Edit {producto.nombre}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="font-bold label">Nombre</label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full input input-bordered"
                placeholder="Producto Name"
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
