"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SelectCliente from "./SelectCliente";

const CreateVenta = () => {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [info, setInfo] = useState("");

  const guardar = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // prevents page reload
    try {
      const res = await fetch("/api/clientes", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
          info: info,
        }),
      });

      if (res.status === 200) {
        alert("You have subscribed! " + nombre + "  " + info);
        router.push("/ventas");
        router.refresh();
      } else {
        alert("Sorry, something went wrong.");
      }
    } catch (err) {
      alert(err);
    }
  };
  const cancelar = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // prevents page reload
    router.push("/ventas");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col overflow-x-auto mt-2 border rounded w-full">
        <div className="flex justify-center items-center p-4">
          <h1 className="text-xl">Nueva Venta</h1>
        </div>
        <div className="flex justify-center items-center p-4 w-full">
          <form className="grid grid-flow-row auto-rows-max  gap-4 basis-full md:basis-9/12">
            <div>
              <SelectCliente />
            </div>
            <input
              className="bg-gray-200 shadow-inner rounded-lg p-2"
              id="nombre"
              type="text"
              aria-label="nombre"
              placeholder="Nombre venta ..."
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              className="bg-gray-200 shadow-inner rounded-lg p-2"
              id="info"
              type="text"
              aria-label="info"
              placeholder="Info ..."
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
            <div className="flex flex-row justify-around border rounded w-full">
              <button
                className="basis-1/4 md:basis-1/3 bg-green-600 hover:bg-green-700 duration-300 text-white shadow p-2 rounded-lg"
                type="submit"
                onClick={guardar}
              >
                Guardar
              </button>
              <button
                className="basis-1/4 md:basis-1/3 bg-red-600 hover:bg-red-700 duration-300 text-white shadow p-2 rounded-lg"
                type="submit"
                onClick={cancelar}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateVenta;
