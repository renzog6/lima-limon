//@/app/cajas/MoviminetoEgresoDeCajas.tsx
"use client";

import { Fragment, SyntheticEvent, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { HiArrowUp } from "react-icons/hi";
import InputDate from "@/components/InputDate";
import InputSelectCajas from "@/components/InputSelectCajas";
import { createPago } from "../hooks/usePagos";

const MovimientoEgresoDeCajas = ({ cajas }) => {
  const router = useRouter();
  const initialRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [cajaEgreso, setCajaEgreso] = useState(cajas[0]);

  const [info, setInfo] = useState("");
  const [importe, setImporte] = useState(0);

  async function handlerGuardar(e: SyntheticEvent) {
    e.preventDefault();
    const mov = {
      pagoInterno: true,
      pagoFecha: startDate,
      pagoImporte: importe,
      pagoInfo: info,
      pagoCajaId: cajaEgreso.id,
    };

    const res = await createPago(mov);
    if (res.data) {
      console.log("Egreso se ha guardado exitosamente:", res.data);
    } else {
      console.log("Error al guardar el Egreso:", res.error);
    }

    router.refresh();
    handleChangeModal();
  }

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleCajaChange = (caja) => {
    setCajaEgreso(caja);
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
            <HiArrowUp color="red" size="16" />
            <p className="hidden md:block w-14 mx-1">Egresar</p>
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
                    Egreso de una Caja
                  </Dialog.Title>
                  <div className="h-full w-full mt-2">
                    <div className="flex flex-col w-full">
                      <div className="bg-yellow-400 h-9 flex flex-row items-center mt-2">
                        <span className="w-1/3 mx-1">Fecha :</span>
                        <div className="h-9 w-2/3 bg-transparent border-none">
                          <InputDate
                            date={startDate}
                            onChange={handleDateChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="bg-yellow-300 h-9 flex flex-row items-center mt-2">
                        <span className="w-1/3 mx-1">Caja :</span>
                        <div className="h-9 w-2/3 bg-transparent border-none">
                          <InputSelectCajas
                            cajas={cajas}
                            onChange={handleCajaChange}
                          />
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
                      id="btnCerrar"
                      type="button"
                      className="w-24 mr-1 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handleChangeModal}
                      ref={initialRef}
                    >
                      Cerrar
                    </button>
                    <button
                      id="btnGuardar"
                      type="button"
                      disabled={importe === 0}
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

export default MovimientoEgresoDeCajas;
