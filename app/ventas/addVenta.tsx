//@/app/ventas/addVenta.tsx
"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createVenta } from "@/app/hooks/useVentas";

export default function AddVenta() {
  const [fecha, setFecha] = useState("");
  const [info, setInfo] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);
    const venta = {
      fehca: fecha,
      info: info,
    };

    await createVenta(venta);
    setIsMutating(false);

    setFecha("");
    setInfo("");

    router.refresh();
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
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
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
