import QtyBtn from "./QtyBtn";
import { decrement, increment } from "@/app/redux/features/cartSlice";
import { useAppDispatch } from "@/app/redux/store";
import { CartItem } from "@/app/types";

interface Props {
  cartItem: CartItem;
}
const CartItemCard = ({ cartItem }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-row items-center justify-items-center h-[50px] bg-emerald-100 border border-gray-300">
      <strong className="basis-1/4 flex justify-center">
        {cartItem.product.nombre}
      </strong>
      <strong className="basis-1/4 flex justify-center">
        {cartItem.product.precio}{" "}
      </strong>
      <div className="basis-1/4 flex justify-center items-center">
        <QtyBtn
          qty={cartItem.qty}
          onDecrease={() => dispatch(decrement(cartItem.product))}
          onIncrease={() => dispatch(increment(cartItem.product))}
        />
      </div>

      <strong className="basis-1/4 flex justify-center">
        {cartItem.qty * cartItem.product.precio}
      </strong>
    </div>
  );
};

export default CartItemCard;
