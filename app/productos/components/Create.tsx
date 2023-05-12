"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateProducto = () => {
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
        router.push("/clientes");
        router.refresh();
      } else {
        alert("Sorry, something went wrong.");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="max-w-md justify-center items-center">
      <div className="flex justify-center items-center p-4">
        <h1>Nuevo Producto</h1>
      </div>
      <form className="grid grid-flow-row auto-rows-max  gap-4">
        <input
          className="bg-gray-200 shadow-inner rounded-lg p-2"
          id="nombre"
          type="text"
          aria-label="nombre"
          placeholder="Nombre producto ..."
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
        <div className="flex flex-row justify-around">
          <button
            className="basis-1/4 md:basis-1/3 bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-lg"
            type="submit"
            onClick={guardar}
          >
            Guardar
          </button>
          <button
            className="basis-1/4 md:basis-1/3 bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-lg"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProducto;
