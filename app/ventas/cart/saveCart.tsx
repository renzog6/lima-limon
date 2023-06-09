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

import { Cliente } from "@prisma/client";
import { Button } from "@/components/Cart";
import { getClientes } from "@/app/actions/actionsClientes";
import { createVenta } from "@/app/actions/actionsVentas";
import { useDispatch } from "react-redux";

export default function SaveCart() {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);

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
      clienteId: data.clienteId,
      total: totalPrice,
      info: data.info,
      cartItems: cartItems,
    };
    const res = await createVenta(venta);

    if (res.success) {
      // La solicitud fue exitosa, puedes acceder a los datos con res.data
      console.log("El producto se ha guardado exitosamente:", res.data);
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
              <label className="label font-bold">Cliente</label>
              <select
                {...register("clienteId", { required: true })}
                className="input w-full input-bordered"
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

            <div className="flex flex-row">
              <div className="form-control basis-1/2">
                <label className="label font-bold">Importe</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("importe", { required: true })}
                  className="input w-full input-bordered"
                  placeholder="$$$"
                />
                {errors.importe && <span className="error">*Requerido</span>}
              </div>
              <div className="form-control basis-1/2">
                <div className="form-control basis-1/2 pr-1">
                  <label className="label font-bold">Forma de Pago</label>
                  <select
                    {...register("formaPago", { required: true })}
                    className="input w-full input-bordered"
                  >
                    <option value="Efectivo">Efectivo</option>
                    <option value="Transferecia">Transferecia</option>
                  </select>

                  {errors.precio && <span className="error">*Requerido</span>}
                </div>
              </div>
            </div>
            <div className="form-control">
              <label className="label font-bold">Info</label>
              <input
                type="text"
                {...register("info")}
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
