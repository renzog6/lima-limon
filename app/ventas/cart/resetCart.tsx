//@/app/ventas/cart/resetCart.tsx
"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { resetCartItems } from "@/app/redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";

const ResetCart = () => {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  async function handleDelete() {
    setIsMutating(true);
    dispatch(resetCartItems());
    setIsMutating(false);
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    /*  <div>
      <Button variant="danger" className="w-24 h-10" onClick={handleChange}>
        Vaciar
      </Button>
      <input
        aria-label="modal-delete"
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Seguro que desea VACIAR el carrito ?
          </h3>
          <div className="modal-action">
            <Button
              variant="primary"
              className="w-24 h-10"
              onClick={handleChange}
            >
              Cerrar
            </Button>
            {!isMutating ? (
              <Button
                variant="danger"
                onClick={handleDelete}
                className="w-24 h-10"
              >
                Borrar
              </Button>
            ) : (
              <Button variant="danger" type="submit" className="w-24 h-10">
                Borrando...
              </Button>
            )}
          </div>
        </div>
      </div>
    </div> */
    <>
      <div className="">
        <Button
          id="btnDlgVaciar"
          variant="danger"
          className="w-32 h-10"
          onClick={handleChange}
        >
          Vaciar
        </Button>
        <input
          aria-label="modal-delete"
          type="checkbox"
          checked={modal}
          onChange={handleChange}
          className="modal-toggle"
        />
        <Transition appear show={modal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={handleChange}>
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
                  <Dialog.Panel className="w-24ll max-w-24 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Vaciar Carrito...
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Seguro que desea VACIAR el carrito ?
                      </p>
                    </div>

                    <div className="mt-4 ">
                      <Button
                        id="btnCerrar"
                        variant="primary"
                        className="w-24 h-10"
                        onClick={handleChange}
                      >
                        Cerrar
                      </Button>
                      {!isMutating ? (
                        <Button
                          id="btnVaciar"
                          variant="danger"
                          onClick={handleDelete}
                          className="w-24  h-10 ml-1"
                        >
                          Vaciar
                        </Button>
                      ) : (
                        <Button
                          id="btnVaciando"
                          variant="danger"
                          type="submit"
                          className="w-24 h-10 ml-1"
                        >
                          Vaciando...
                        </Button>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default ResetCart;
