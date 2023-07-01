//@/app/cajas/movimientos/MovimientoDetail.tsx

import { FiList } from "react-icons/fi";

const MovimientoDetail = () => {
  function handleChange(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      {" "}
      <button
        title="edit"
        className="mr-1 text-green-700 hover:text-blue-700"
        onClick={handleChange}
      >
        <FiList />
      </button>
    </div>
  );
};

export default MovimientoDetail;
