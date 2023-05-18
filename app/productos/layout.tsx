import Link from "next/link";
import { ReactNode } from "react";

const LayoutClientes = ({ children }) => {
  return (
    <div className="container mx-auto">
      <nav className="flex justify-start  bg-gray-800 text-green-400  h-[60px]">
        <div className="self-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p:20">
          <Link href="/productos">Productos</Link>
        </div>
        <div className="self-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p:20">
          <Link href="/productos/categorias">Categorias</Link>
        </div>
        <div className="self-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p:20">
          <Link href="/productos/marcas">Marcas</Link>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default LayoutClientes;
