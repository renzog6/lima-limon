//@/app/ventas/cart/saveCart.tsx
"use client";
import {
  TotalPriceSelector,
  resetCartItems,
} from "@/app/redux/features/cartSlice";
import { useAppSelector } from "@/app/redux/store";
import { useState, useEffect, Fragment, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Cliente } from "@prisma/client";
import { Button } from "@/components/Cart";
import { getClientes } from "@/app/hooks/useClientes";
import { createVenta } from "@/app/hooks/useVentas";
import { useDispatch } from "react-redux";
import { createCobro } from "@/app/hooks/useCobros";
import InputDate from "@/components/InputDate";
import InputSelectCajas from "@/components/InputSelectCajas";
import { CajaSimple } from "@/app/types";
import { getCajas } from "@/app/hooks/useCajas";

import { Dialog, Transition } from "@headlessui/react";

const SaveCart = () => {
  const router = useRouter();
  const initialRef = useRef(null);

  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [cajas, setCajas] = useState<CajaSimple[]>([]);
  const [cajaSelected, setCajaSelected] = useState<CajaSimple>(cajas[0]);

  const [startDate, setStartDate] = useState(new Date());
  const [hacePago, setHacePago] = useState(true);

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
    async function fetchCajas() {
      const cajas = await getCajas();
      setCajas(cajas);
      setCajaSelected(cajas[0]);
    }
    fetchCajas();

    //Carga Lista de Categorias
    async function fetchClientes() {
      const clientes = await getClientes();
      setClientes(clientes);
    }
    fetchClientes();
  }, [reset, totalPrice]);

  const handleDateChange = (date) => {
    setStartDate(date); // Actualiza el estado de startDate en SaveCart
  };

  const handleCajaChange = (caja) => {
    setCajaSelected(caja);
  };

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
          cobroInterno: false,
          cobroFecha: startDate,
          cobroImporte: data.importe,
          cobroInfo: data.info,
          cobroCajaId: cajaSelected.id,
          cobroClienteId: data.clienteId,
          ventaId: res.data.id,
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

      <Transition appear show={modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-h-10"
          onClose={handleChange}
          initialFocus={initialRef}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                    ref={initialRef}
                  >
                    Guardar Pedido
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-row">
                      <label
                        htmlFor="date"
                        className="label font-bold h-9 mr-2"
                      >
                        Fecha
                      </label>
                      <div className="input input-bordered h-9 content-center justify-center">
                        <InputDate
                          date={startDate}
                          onChange={handleDateChange}
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
                        id="cartInfo"
                        type="text"
                        {...register("info")}
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
                        <label
                          htmlFor="cartPago"
                          className="label font-bold text-sm md:text-lg mx-2"
                        >
                          Pago?
                        </label>
                        <input
                          id="cartPago"
                          title="Pago"
                          type="checkbox"
                          checked={hacePago}
                          onChange={handlePago}
                          className="checkbox checkbox-sm items-center"
                        />
                      </div>

                      {hacePago && (
                        <div className="flex flex-col md:flex-row">
                          <div className="form-control basis-1/2 px-1">
                            <label className="label font-bold">Importe</label>
                            <input
                              id="cartImporte"
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
                            <div className="form-control basis-1/2 px-1 bordered">
                              <label className="label font-bold">
                                Forma de Pago
                              </label>
                              <div className="input input-bordered h-9">
                                <InputSelectCajas
                                  cajas={cajas}
                                  onChange={handleCajaChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row mt-6 justify-end">
                      <div className="flex flex-row space-x-reverse">
                        <div className="mr-2 ml-0.5">
                          <Button
                            variant="danger"
                            className="w-20 md:w-36 h-7 md:h-10"
                            onClick={handleChange}
                          >
                            Cerrar
                          </Button>
                        </div>
                        <div className="mr-0.5 ml-0.5">
                          {!isMutating ? (
                            <Button
                              variant="success"
                              type="submit"
                              className="w-20 md:w-36 h-7 md:h-10"
                            >
                              Guardar
                            </Button>
                          ) : (
                            <Button
                              variant="success"
                              type="submit"
                              className="w-20 md:w-36 h-7 md:h-10"
                            >
                              Guardando...
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SaveCart;
