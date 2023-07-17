//@/app/ventas/cart/page.tsx
"use client";
import { TotalPriceSelector } from "@/app/redux/features/cartSlice";
import { useAppSelector } from "@/app/redux/store";
import CartItemCard from "@/components/Cart/CartItemCard";

import SaveCart from "./saveCart";
import ResetCart from "./resetCart";

//export const dynamic = "force-dynamic";

const CartPage = async () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector(TotalPriceSelector);

  return (
    <>
      <div className="flex flex-row items-center justify-items-center h-[50px] bg-emerald-600 border border-gray-300">
        <strong className="flex justify-center basis-1/4">Producto</strong>
        <strong className="flex justify-center basis-1/4">Precio</strong>
        <strong className="flex justify-center basis-1/4">Cantidad</strong>
        <strong className="flex justify-center basis-1/4">Total</strong>
      </div>
      {cartItems.map((item) => (
        <CartItemCard key={item.product.id} cartItem={item} />
      ))}
      <div className="flex flex-row items-end justify-items-end h-[40px] bg-emerald-600 border border-gray-300">
        <p className="ml-auto mr-4 text-slate-600 justify-items-center">
          Total $ <span className="font-bold text-slate-900">{totalPrice}</span>
        </p>
      </div>
      <div className="flex flex-row justify-around h-[50px] bg-emerald-100 border border-gray-300">
        <ResetCart />
        <SaveCart />
      </div>
    </>
  );
};

export default CartPage;
