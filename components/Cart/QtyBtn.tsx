//@/components/Cart/QtyBtn.tsx
import { Button } from "../ui/Button";
import { FiMinusCircle, FiPlusCircle, FiTrash2 } from "react-icons/fi";
interface Props {
  onIncrease: () => void;
  onDecrease: () => void;
  qty: number;
}
const QtyBtn = (props: Props) => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <Button variant="danger" className="w-8 h-8" onClick={props.onDecrease}>
        {props.qty === 1 ? <FiTrash2 size={17} /> : <FiMinusCircle size={17} />}
      </Button>
      <p>{props.qty}</p>
      <Button className="w-8 h-8" variant="success" onClick={props.onIncrease}>
        <FiPlusCircle size={17} />
      </Button>
    </div>
  );
};

export default QtyBtn;
