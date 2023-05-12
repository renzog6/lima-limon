//import getClientes from "@/app/actions/getClientes";
import { BsSearch } from "react-icons/bs";
import DeleteCliente from "./DeleteCliente";
import Link from "next/link";

const ListClientes = async () => {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/clientes`, {
    cache: "no-store",
  });
  const clientes = await res.json();

  if (clientes.length === 0) {
    return <></>;
  }
  return (
    <>
      <div className="flex flex-col overflow-x-auto mt-8">
        <div className="inline-flex border rounded w-full h-8 bg-transparent justify-around">
          <div className="flex w-full h-full justify-center align-middle text-center bg-green-400">
            <p className="flex-1 inline-block align-middle text-center text-xl ">
              Clientes
            </p>
          </div>

          <div className="flex w-full h-full justify-center align-middle text-center text-lg bg-green-200">
            <Link className="inline-block align-middle" href="/clientes/new">
              Nuevo
            </Link>
          </div>

          <div className="flex flex-wrap items-stretch w-full h-full">
            <div className="flex">
              <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                <BsSearch color="green" size={16} />
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
          <table className="min-w-full ">
            <thead>
              <tr>
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
              {clientes.map((cliente: any) => (
                <tr key={cliente.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium leading-5 text-gray-900">
                          {cliente.nombre}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-500">
                      {cliente.info}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                      {cliente.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    <DeleteCliente id={cliente.id} />
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

export default ListClientes;
