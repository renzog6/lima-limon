"use client";

import { SyntheticEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Venta } from "@prisma/client";
import { addVenta } from "@/app/actions/actionsVentas";

export default function AddVenta() {
  const [nombre, setNombre] = useState("");
  const [info, setInfo] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);
    const venta = {
      nombre: nombre,
      info: info,
    };

    await addVenta(venta);
    setIsMutating(false);

    setNombre("");
    setInfo("");

    router.replace(pathname);
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn  btn-sm btn-secondary" onClick={handleChange}>
        Agregar
      </button>

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
          <h3 className="font-bold text-lg">Agregar Venta</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Venta Name"
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
