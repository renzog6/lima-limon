import Link from "next/link";
import { ReactNode } from "react";

const LayoutClientes = ({ children }) => {
  return (
    <div className="container mx-auto">
      <nav className="bg-gray-800 text-green-400  h-[60px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p:20">
          <Link href="/productos/categorias">Categorias</Link>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default LayoutClientes;
