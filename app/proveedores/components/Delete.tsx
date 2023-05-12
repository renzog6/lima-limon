"use client";
import { useRouter } from "next/navigation";

const DeleteProveedor = ({ id }) => {
  const router = useRouter();

  const deleteItem = async () => {
    try {
      // Simple DELETE request with fetch
      const res = await fetch(`http://localhost:3000/api/proveedores/${id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        alert("Item eliminado con exito!!!");
        //router.push("/proveedores");
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
      className="basis-1/4 md:basis-1/3 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-lg"
      title="Eliminar item"
      onClick={deleteItem}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  );
};

export default DeleteProveedor;
