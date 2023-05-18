import AddMarca from "./addMarca";
import DeleteMarca from "./deleteMarca";
import UpdateMarca from "./updateMarca";

import { Marca } from "@prisma/client";
import { getMarcas } from "@/app/actions/actionsMarcas";

export const metadata = {
  title: "Marcas",
};

export default async function MarcaList() {
  const marcas: Marca[] = await getMarcas();
  return (
    <div className="flex-col">
      <div className="w-full  mx-auto border rounded">
        <nav className="flex justify-start bg-amber-300  h-[50px]">
          <div className="self-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p:20">
            <label className="text-md font-bold">Marcas</label>
          </div>

          <div className=" self-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p:20">
            <input
              type="text"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Buscar..."
            />
          </div>

          <div className=" self-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p:20">
            <AddMarca />
          </div>
        </nav>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <table className="table w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Info
                </th>
                <th scope="col" className="px-6 py-3">
                  ##
                </th>
              </tr>
            </thead>
            <tbody>
              {marcas.map((marca, index) => (
                <tr key={marca.id}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {marca.nombre}
                  </th>

                  <td className="px-6 py-4">{marca.info}</td>
                  <td className="flex px-6 py-4">
                    <div className="mx-1">
                      <UpdateMarca {...marca} />
                    </div>
                    <div className="mx-1">
                      <DeleteMarca {...marca} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
