//@/app/cajas/MovimientoEntreCajas.tsx
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, SyntheticEvent, useRef, useState } from "react";
import { HiSwitchHorizontal, HiSwitchVertical } from "react-icons/hi";
import { movimientoEntreCajas } from "../hooks/useCajas";
import { useRouter } from "next/navigation";
import { CajaSimple } from "../types";
import InputDate from "@/components/InputDate";

import React from "react";

const MovimientoEntreCajas = ({ cajas }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const initialRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());

  const [desdeCaja, setdesdeCaja] = useState<CajaSimple>(cajas[0]);
  const [hastaCaja, sethastaCaja] = useState<CajaSimple>(cajas[1]);
  const [info, setInfo] = useState("");
  const [importe, setImporte] = useState(0);

  function handleSwitchCajas() {
    if (desdeCaja.id === 1) {
      setdesdeCaja(cajas[1]);
      sethastaCaja(cajas[0]);
    } else {
      setdesdeCaja(cajas[0]);
      sethastaCaja(cajas[1]);
    }
  }

  async function handlerGuardar(e: SyntheticEvent) {
    e.preventDefault();
    const mov = {
      movimientoFecha: startDate,
      movimientoImporte: importe,
      movimientoTipo: "Interno",
      movimientoInfo: info,
      moviemientoDesdeCajaId: desdeCaja.id,
      moviemientoHastaCajaId: hastaCaja.id,
    };

    const res = await movimientoEntreCajas(mov);
    if (res.data) {
      console.log("Movimiento se ha guardado exitosamente:", res.data);
    } else {
      console.log("Error al guardar el Movimiento:", res.error);
    }

    router.refresh();
    handleChangeModal();
  }

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  function handleChangeModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={handleChangeModal}
          className="rounded-md bg-amber-500 bg-opacity-1w-20 px-1 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <div className="flex flex-row items-center justify-center min-w-32">
            <HiSwitchHorizontal color="blue" size="16" />
            <p className="hidden md:block w-14 mx-1">Mover</p>
          </div>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={handleChangeModal}
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

          <div className="fixed inset-0 ">
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
                  >
                    Movimiento entre Cajas
                  </Dialog.Title>
                  <div className="h-full w-full mt-2">
                    <div className="flex flex-col w-full">
                      <div className="bg-yellow-300 h-9 flex flex-row items-center mt-2">
                        <span className="w-1/3 mx-1">Fecha :</span>
                        <div className="h-9 w-2/3 bg-transparent border-none">
                          <InputDate
                            date={startDate}
                            onChange={handleDateChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full">
                      <div className="flex flex-row gap-2 w-full mt-2">
                        <div className="basis-4/5">
                          <div className="bg-green-300 flex flex-row items-center h-9">
                            <span className="w-20 mx-1">Desde :</span>
                            {desdeCaja.nombre}
                          </div>
                          <div className="bg-blue-300 flex flex-row items-center h-9 mt-1">
                            <span className="w-20 mx-1">Hasta :</span>
                            {hastaCaja.nombre}
                          </div>
                        </div>
                        <div className="basis-1/5 h-full flex justify-center items-center">
                          <div className="bg-red-400 flex justify-center items-center w-10 h-full">
                            <button
                              className="flex items-center justify-center"
                              onClick={handleSwitchCajas}
                            >
                              <HiSwitchVertical />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="bg-yellow-200 h-9 flex flex-row items-center mt-2">
                        <span className="w-1/3 mx-1">Importe :</span>
                        <input
                          type="number"
                          onChange={(e) => setImporte(Number(e.target.value))}
                          className="h-9 bg-transparent border-none w-2/3"
                          placeholder="0"
                        />
                      </div>
                      <div className="bg-yellow-100 h-9 flex flex-row items-center mt-2">
                        <span className="w-1/3 mx-1">Info :</span>
                        <input
                          type="text"
                          onChange={(e) => setInfo(e.target.value)}
                          className="h-9 w-2/3 bg-transparent border-none"
                          placeholder="..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="w-24 mr-1 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handleChangeModal}
                      ref={initialRef}
                    >
                      Cerrar
                    </button>
                    <button
                      type="button"
                      className="w-24 ml-1 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handlerGuardar}
                    >
                      Guardar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MovimientoEntreCajas;
