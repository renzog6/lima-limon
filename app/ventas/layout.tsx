//@/app/ventas/layout.tsx
import Header from "@/components/Cart/Header";
import Providers from "../redux/Providers";

const LayoutVentas = ({ children }) => {
  return (
    <div className="min-h-full max-w-full">
      <Providers>
        <Header />
        {children}
      </Providers>
    </div>
  );
};

export default LayoutVentas;
