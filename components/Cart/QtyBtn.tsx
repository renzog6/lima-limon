import React from "react";

import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "./Button";
import { BsPlusCircle } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";
interface Props {
  onIncrease: () => void;
  onDecrease: () => void;
  qty: number;
}
const QtyBtn = (props: Props) => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <Button variant="danger" className="w-8 h-8" onClick={props.onDecrease}>
        {props.qty === 1 ? (
          <TrashIcon className="w-4" />
        ) : (
          <FiMinusCircle size={17} />
        )}
      </Button>
      <p>{props.qty}</p>
      <Button className="w-8 h-8" variant="success" onClick={props.onIncrease}>
        <BsPlusCircle size={17} />
      </Button>
    </div>
  );
};

export default QtyBtn;
