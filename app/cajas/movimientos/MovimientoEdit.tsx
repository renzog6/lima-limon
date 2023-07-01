//@/app/cajas/movimientos/MovimientoEdit.tsx

import { FiEdit } from "react-icons/fi";

const MovimientoEdit = () => {
  function handleChange(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      {" "}
      <button
        title="edit"
        className="mr-1 text-blue-500 hover:text-blue-700"
        onClick={handleChange}
      >
        <FiEdit color="blue" />
      </button>
    </div>
  );
};

export default MovimientoEdit;
