//@/app/cajas/pagos/ListPagos.tsx

const ListPagos = ({ data }) => {
  const total = data.reduce((sum, cobro) => sum + cobro.importe, 0.0);

  return (
    <>
      <div className="flex flex-row content-center px-2 h-8 bg-gradient-to-r from-green-200 to-green-500 py-1 w-full  hover:bg-gray-200 font-semibold">
        <div className="basis-1/3 ">Cliente</div>
        <div className="basis-1/3 flex justify-center">Importe</div>
        <div className="basis-1/3 flex justify-center">#</div>
      </div>
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row items-center px-2 h-14 md:h-10 bg-gradient-to-l from-green-100 to-green-400 py-1 w-full  hover:bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="basis-1/3 flex flex-col md:flex-row">
            <div className="basis-1/2 font-semibold">{row.proveedor}</div>
            <div className="basis-1/2">{row.fecha}</div>
          </div>
          <div className="basis-1/3 flex justify-center ">{row.importe}</div>
          <div className="basis-1/3 flex justify-center">Details</div>
        </div>
      ))}
      <div className="flex flex-row items-center px-2 h-8 bg-gradient-to-r from-green-200 to-green-500 py-1 w-full  hover:bg-gray-200 font-semibold">
        <div className="basis-1/3">Total</div>
        <div className="basis-1/3 flex justify-center">
          $ {total.toLocaleString()}
        </div>
        <div className="basis-1/3 flex justify-center">#</div>
      </div>
    </>
  );
};

export default ListPagos;
