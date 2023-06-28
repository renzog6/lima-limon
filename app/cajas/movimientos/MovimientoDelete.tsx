//@/app/cajas/movimientos/MovimientoDelete.tsx

import { FaTrash } from "react-icons/fa";

const MovimientoDelete = () => {
  function handleChange(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <button
        title="delete"
        className="text-red-500 hover:text-red-700"
        onClick={handleChange}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default MovimientoDelete;
