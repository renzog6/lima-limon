//@/app/productos/layout.tsx
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const LayoutProductos = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-around items-center  h-[50px] bg-amber-300">
        <div className="flex items-center justify-center w-1/3 h-10 mx-1 border rounded border-amber-500">
          <Link
            className="flex items-center justify-center"
            href={"/productos"}
          >
            <strong>Productos</strong>
          </Link>
        </div>
        <div className="flex items-center justify-center w-1/3 h-10 mx-1 border rounded border-amber-500">
          <Link
            className="flex items-center justify-center"
            href="/productos/marcas"
          >
            Marcas
          </Link>
        </div>
        <div className="flex items-center justify-center w-1/3 h-10 mx-1 border rounded border-amber-500">
          <Link
            className="flex items-center justify-center"
            href="/productos/categorias"
          >
            Categorias
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default LayoutProductos;
