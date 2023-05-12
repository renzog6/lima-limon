import Link from "next/link";
import { ReactNode } from "react";

const LayoutVentas = ({ children }) => {
  return (
    <div>
      <main>
        <div className="sm:px-6 lg:px-8 overflow-x-auto">{children}</div>
      </main>
    </div>
  );
};

export default LayoutVentas;
