import Link from "next/link";
import { ReactNode } from "react";

const LayoutClientes = ({ children }) => {
  return (
    <div className="min-h-full max-w-full">
      {/* <nav className="bg-gray-800 text-green-400  h-[60px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p:20">
          <Link href="/clientes/new">Nuevo</Link>
        </div>
      </nav> */}

      <main>
        <div className="sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default LayoutClientes;
