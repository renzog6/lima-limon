//import getClientes from "@/app/actions/getClientes";

import DeleteProducto from "./Delete";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";

const ListProductos = async () => {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/productos`, {
    cache: "no-store",
  });
  const productos = await res.json();

  if (productos.length === 0) {
    return <></>;
  }
  return (
    <>
      <div className="flex flex-col overflow-x-auto mt-8">
        <div className="inline-flex border rounded w-full bg-transparent justify-around">
          <div className="flex w-full h-full justify-center align-middle items-center text-center">
            <p className="flex-1 self-center text-center text-xl ">Productos</p>
          </div>
          <div className="flex w-full h-full justify-center align-middle items-center text-center bg-gray-100">
            <Link href="/clientes/new">Nuevo</Link>
          </div>
          <div className="flex flex-wrap items-stretch w-full h-full">
            <div className="flex">
              <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                Icon
              </span>
            </div>
            <input
              type="text"
              className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs  text-gray-800 font-thin"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Tipo
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Nombre
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Info
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Edit
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              <tr></tr>
              {productos.map((item: any) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-500">
                      {item.categoria.nombre}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium leading-5 text-gray-900">
                          {item.nombre}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-500">
                      {item.info}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                      {item.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    <FiEdit color="blue" size={20} />
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    <DeleteProducto id={item.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListProductos;
