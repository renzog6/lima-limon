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
import { useDispatch } from "react-redux";

import InputDate from "@/components/InputDate";
import InputSelectCajas from "@/components/InputSelectCajas";

import { Dialog, Transition } from "@headlessui/react";
import { CajaSafe, DataCobro } from "@/types";
import { getCajasSafe } from "@/app/_actions/_actionsCajas";
import { getClientes } from "@/app/_actions/crud/crudCliente";
import { createCobro } from "@/app/_actions/crud/crudCobro";
import { createVenta } from "@/app/_actions/crud/crudVenta";

const SaveCart = () => {
  const router = useRouter();
  const initialRef = useRef(null);

  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [cajas, setCajas] = useState<CajaSafe[]>([]);
  const [cajaSelected, setCajaSelected] = useState<CajaSafe>(cajas[0]);

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
      const cajas = await getCajasSafe();
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

    if (res) {
      // La solicitud fue exitosa, puedes acceder a los datos con res.data
      console.log("saveCart: La Compra se ha guardado exitosamente.");
      if (hacePago) {
        const dataCobro: DataCobro = {
          isInterno: false,
          tipoCajaId: cajaSelected.id,
          info: data.info,
          importe: data.importe,
          fecha: startDate,
          clienteId: data.clienteId,
          ventaId: 0,
          movimientoId: 0,
        };
        const resCobro = await createCobro(dataCobro);
        if (resCobro) {
          console.log("saveCart: Cobro se ha guardado exitosamente:");
        } else {
          console.log("saveCart: Error al guardar el Cobro");
        }
      }
    } else {
      // Hubo un error en la solicitud, puedes acceder al objeto de error con res.error
      console.log("saveCart: Error al guardar la compra");
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
      <Button variant="success" className="h-10 w-36" onClick={handleChange}>
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
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
                        className="mr-2 font-bold label h-9"
                      >
                        Fecha
                      </label>
                      <div className="content-center justify-center input input-bordered h-9">
                        <InputDate
                          date={startDate}
                          onChange={handleDateChange}
                        />
                      </div>
                    </div>
                    <div className="form-control">
                      <label className="font-bold label">Cliente</label>
                      <select
                        {...register("clienteId", { required: true })}
                        className="w-full input input-bordered h-9"
                      >
                        <option value="">Cliente</option>
                        {clientes.map((cliente) => (
                          <option key={cliente.id} value={cliente.id}>
                            {cliente.id} - {cliente.nombre}
                          </option>
                        ))}
                      </select>
                      {errors.clienteId && (
                        <span className="text-red-500 error">*Requerido</span>
                      )}
                    </div>
                    <div className="form-control">
                      <label className="font-bold label">Nota</label>
                      <input
                        id="cartInfo"
                        type="text"
                        {...register("info")}
                        className="w-full input input-bordered h-9"
                        placeholder="Info"
                      />
                    </div>
                    <div className="py-1 my-1 border rounded">
                      <div
                        className={`flex flex-row h-9 justify-center items-center ${
                          hacePago ? "border-b" : ""
                        }`}
                      >
                        <label
                          htmlFor="cartPago"
                          className="mx-2 text-sm font-bold label md:text-lg"
                        >
                          Pago?
                        </label>
                        <input
                          id="cartPago"
                          title="Pago"
                          type="checkbox"
                          checked={hacePago}
                          onChange={handlePago}
                          className="items-center checkbox checkbox-sm"
                        />
                      </div>

                      {hacePago && (
                        <div className="flex flex-col md:flex-row">
                          <div className="px-1 form-control basis-1/2">
                            <label className="font-bold label">Importe</label>
                            <input
                              id="cartImporte"
                              type="number"
                              step="0.01"
                              {...register("importe", { required: true })}
                              className="w-full input input-bordered h-9"
                              placeholder="$$$"
                            />
                            {errors.importe && (
                              <span className="error">*Requerido</span>
                            )}
                          </div>
                          <div className="form-control basis-1/2">
                            <div className="px-1 form-control basis-1/2 bordered">
                              <label className="font-bold label">
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

                    <div className="flex flex-row justify-end mt-6">
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
