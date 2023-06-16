//@/app/ventas/updateVenta.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";

import { updateVenta } from "@/app/hooks/useVentas";
import { convertDateToInput } from "@/lib/utilDates";
import { Cliente, Venta } from "@prisma/client";
import { getClientes } from "../hooks/useClientes";
import { useForm } from "react-hook-form";
import InputDate from "@/components/InputDate";

export default function UpdateVenta(venta: Venta) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [startDate, setStartDate] = useState(new Date(venta.fecha));

  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    //Carga Lista de Clients
    async function fetchClientes() {
      const clientes = await getClientes();
      setClientes(clientes);
    }
    fetchClientes();

    setTimeout(() => {
      reset({
        clienteId: venta.clienteId,
        info: venta.info,
      });
    }, 1000);
  }, [reset, venta.clienteId, venta.info]);

  const handleDateChange = (date) => {
    setStartDate(date); // Actualiza el estado de startDate en SaveCart
  };

  async function onSubmit(data) {
    setIsMutating(true);

    const updated = {
      ...venta,
      fecha: startDate,
      clienteId: data.clienteId,
      info: data.info,
    };
    const res = await updateVenta(updated);
    if (res.status === 200) {
      console.log("OOOOOKKKKKKK");
    } else {
      console.log("ERROR");
    }
    console.log("resUpdateVenta :" + JSON.stringify(res));

    setIsMutating(false);
    router.replace("/ventas");
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
          <h3 className="font-bold text-lg">Editar Compra Id: {venta.id}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label htmlFor="date" className="label font-semibold">
                <span className="text-gray-700">Fecha Compra</span>
              </label>
              <div className="input input-bordered h-9 content-center justify-center">
                <InputDate date={startDate} onChange={handleDateChange} />
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="cliente" className="label font-semibold">
                <span className="text-gray-700">Cliente</span>
              </label>
              <select
                {...register("clienteId", { required: true })}
                className="input w-full input-bordered h-9"
                defaultValue={venta.clienteId}
                disabled
              >
                <option value="">Cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.id} - {cliente.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label font-semibold">
                <span className="text-gray-700">Nota</span>
              </label>
              <input
                type="text"
                {...register("info")}
                className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
