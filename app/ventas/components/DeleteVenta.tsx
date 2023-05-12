"use client";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";

const DeleteVenta = ({ id }) => {
  const router = useRouter();

  const deleteItem = async () => {
    try {
      // Simple DELETE request with fetch
      const res = await fetch(`http://localhost:3000/api/ventas/${id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        alert("Item eliminado con exito!!!");
        //router.push("/clientes");
        router.refresh();
      } else {
        alert("Sorry, something went wrong.");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <button
      className="basis-1/4 md:basis-1/3 hover:bg-red-300 duration-300 text-white shadow p-2 rounded-lg"
      title="Eliminar item"
      onClick={deleteItem}
    >
      <RiDeleteBin5Line color="red" size={20} />
    </button>
  );
};

export default DeleteVenta;
