import AddCategoria from "./addCategoria";
import DeleteCategoria from "./deleteCategoria";
import UpdateCategoria from "./updateCategoria";

import { Categoria } from "@prisma/client";
import { getCategorias } from "@/app/actions/actionsCategorias";

export const metadata = {
  title: "Categorias",
};

export default async function CategoriaList() {
  const categorias: Categoria[] = await getCategorias();
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddCategoria />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Info</th>
            <th>##</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria, index) => (
            <tr key={categoria.id}>
              <td>{index + 1}</td>
              <td>{categoria.nombre}</td>
              <td>{categoria.info}</td>
              <td className="flex">
                <div className="mr-1">
                  <UpdateCategoria {...categoria} />
                </div>

                <DeleteCategoria {...categoria} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
