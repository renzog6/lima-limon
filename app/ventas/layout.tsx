//@/app/ventas/layout.tsx
import Header from "@/components/Cart/Header";
import Providers from "../redux/Providers";

const LayoutVentas = ({ children }) => {
  return (
    <div className="min-h-full max-w-full">
      <Providers>
        <Header />
        <div>{children}</div>
      </Providers>
    </div>
  );
};

export default LayoutVentas;
