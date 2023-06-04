//@/app/ventas/pedido/ItemProducto.tsx

const ItemProducto = ({ producto }) => {
  return (
    <div className="flex flex-row items-center justify-items-center ">
      <div className="basis-1/2 columns-1 items-center">
        <div className="">
          <strong>{producto.nombre}</strong>
        </div>
        <div className="">{producto.categoria}</div>
      </div>
      <div className="basis-1/4 flex justify-center">
        <strong>{producto.precio}</strong>
      </div>
      <div className="basis-1/4 flex justify-center">{producto.stock}</div>
    </div>
  );
};

export default ItemProducto;
