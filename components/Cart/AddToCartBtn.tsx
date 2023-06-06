"use client";

import {
  productQtyInCartSelector,
  increment,
  decrement,
} from "@/app/redux/features/cartSlice";
import { useAppSelector, useAppDispatch } from "@/app/redux/store";
import { Button } from "./Button";
import QtyBtn from "./QtyBtn";
import { Producto } from "@prisma/client";
import { BsCartPlus } from "react-icons/bs";

interface Props {
  product: Producto;
}

const AddToCartBtn = (props: Props) => {
  const qty = useAppSelector((state) =>
    productQtyInCartSelector(state, props.product.id)
  );
  const dispatch = useAppDispatch();

  if (!qty)
    return (
      <div className="flex justify-center">
        <Button onClick={() => dispatch(increment(props.product))}>
          <BsCartPlus size={20} />
        </Button>
      </div>
    );
  return (
    <QtyBtn
      onDecrease={() => dispatch(decrement(props.product))}
      onIncrease={() => dispatch(increment(props.product))}
      qty={qty}
    />
  );
};

export default AddToCartBtn;
