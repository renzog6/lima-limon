export const metadata = {
  title: "Ventas",
};

const LayoutVentas = ({ children }) => {
  return (
    <div className="min-h-full max-w-full">
      <div>{children}</div>
    </div>
  );
};

export default LayoutVentas;
