//@/app/ventas/cart/saveCart.tsx
"use client";
import {
  TotalPriceSelector,
  resetCartItems,
} from "@/app/redux/features/cartSlice";
import { useAppSelector } from "@/app/redux/store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Cliente } from "@prisma/client";
import { Button } from "@/components/Cart";
import { getClientes } from "@/app/hooks/useClientes";
import { createVenta } from "@/app/hooks/useVentas";
import { useDispatch } from "react-redux";
import { createCobro } from "@/app/hooks/useCobros";

export default function SaveCart() {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [hacePago, setHacePago] = useState(true);

  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector(TotalPriceSelector);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        importe: totalPrice,
        info: "",
      });
    }, 1000);

    //Carga Lista de Categorias
    async function fetchClientes() {
      const clientes = await getClientes();
      setClientes(clientes);
    }
    fetchClientes();
  }, [reset, totalPrice]);

  async function onSubmit(data) {
    setIsMutating(true);

    const venta = {
      fecha: startDate,
      clienteId: data.clienteId,
      total: totalPrice,
      saldo: hacePago ? totalPrice - data.importe : 0,
      info: data.info,
      cartItems: cartItems,
    };
    const res = await createVenta(venta);

    if (res.data) {
      // La solicitud fue exitosa, puedes acceder a los datos con res.data
      console.log("El producto se ha guardado exitosamente:", res.data);
      if (hacePago) {
        const cobro = {
          cobroFecha: startDate,
          cobroMonto: data.importe,
          cobroFormaPago: data.formaPago,
          cobroNota: data.nota,
          clienteId: data.clienteId,
          ventaId: res.data.id,
          cajaId: 1,
        };
        const resCobro = await createCobro(cobro);
        if (resCobro.data) {
          console.log(
            "El producto se ha guardado exitosamente:",
            resCobro.data
          );
        } else {
          console.log("Error al guardar el producto:", resCobro.error);
        }
      }
    } else {
      // Hubo un error en la solicitud, puedes acceder al objeto de error con res.error
      console.log("Error al guardar el producto:", res.error);
    }

    dispatch(resetCartItems());
    router.replace("/ventas");
    router.refresh();
    setIsMutating(false);
    reset();
    setModal(false);
  }

  function handlePago() {
    setHacePago(!hacePago);
  }
  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <Button variant="success" className="w-36 h-10" onClick={handleChange}>
        Guardar
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
          <h3 className="font-bold text-lg">Guardar Pedido</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label htmlFor="date" className="label font-bold">
                Fecha
              </label>
              <div className="input input-bordered h-8 content-center justify-center">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label font-bold">Cliente</label>
              <select
                {...register("clienteId", { required: true })}
                className="input w-full input-bordered h-9"
              >
                <option value="">Cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.id} - {cliente.nombre}
                  </option>
                ))}
              </select>
              {errors.clienteId && (
                <span className="error text-red-500">*Requerido</span>
              )}
            </div>
            <div className="form-control">
              <label className="label font-bold">Nota</label>
              <input
                type="text"
                {...register("nota")}
                className="input w-full input-bordered h-9"
                placeholder="Info"
              />
            </div>
            <div className="border rounded py-1 my-1">
              <div
                className={`flex flex-row h-9 justify-center items-center ${
                  hacePago ? "border-b" : ""
                }`}
              >
                <label className="label font-bold">Pago?</label>
                <input
                  id="pago"
                  title="Pago"
                  type="checkbox"
                  checked={hacePago}
                  onChange={handlePago}
                  className="checkbox checkbox-sm items-center"
                />
              </div>

              {hacePago && (
                <div className="flex flex-row">
                  <div className="form-control basis-1/2 px-1">
                    <label className="label font-bold">Importe</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("importe", { required: true })}
                      className="input w-full input-bordered h-9"
                      placeholder="$$$"
                    />
                    {errors.importe && (
                      <span className="error">*Requerido</span>
                    )}
                  </div>
                  <div className="form-control basis-1/2">
                    <div className="form-control basis-1/2 px-1">
                      <label className="label font-bold">Forma de Pago</label>
                      <select
                        {...register("formaPago", { required: true })}
                        className="input w-full input-bordered h-9"
                      >
                        <option value="Efectivo">Efectivo</option>
                        <option value="Transferencia">Transferencia</option>
                      </select>

                      {errors.precio && (
                        <span className="error">*Requerido</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
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
