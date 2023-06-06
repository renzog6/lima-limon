//@/app/ventas/layout.tsx
import Header from "@/components/Cart/Header";

const LayoutVentas = ({ children }) => {
  return (
    <div className="min-h-full max-w-full">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default LayoutVentas;
