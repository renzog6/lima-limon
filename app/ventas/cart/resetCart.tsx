//@/app/ventas/cart/resetCart.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Cart/Button";
import { resetCartItems } from "@/app/redux/features/cartSlice";
import { useDispatch } from "react-redux";

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
    <div>
      <Button variant="danger" className="w-36 h-10" onClick={handleChange}>
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
            <button type="button" className="btn" onClick={handleChange}>
              Cerrar
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-warning"
              >
                Borrar
              </button>
            ) : (
              <button type="button" className="btn loading">
                Borrando...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetCart;
