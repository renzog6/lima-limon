//@/app/cajas/movimientos/MovimientoDetail.tsx

import { getCajaMovimientoById } from "@/app/_actions/_actionsCajas";
import { FiList } from "react-icons/fi";

const MovimientoDetail = async ({ movimientoId }) => {
  //const mov = await getCajaMovimientoById(Number(movimientoId));

  function handleChange(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
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
