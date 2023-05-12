import { Categoria } from "@prisma/client";

export async function getCategorias() {
  try {
    const res = await fetch("http://localhost:3000/api/productos/categorias", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    return [];
  }
}

export async function addCategoria(categoria) {
  const res = await fetch("http://localhost:3000/api/productos/categorias", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: categoria.nombre,
      info: categoria.info,
    }),
  });
}

export async function updateCategotria(categoria: Categoria) {
  const res = await fetch(
    `http://localhost:3000/api/productos/categorias/${categoria.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: categoria.nombre,
        info: categoria.info,
      }),
    }
  );
}

export async function deleteCategotria(categoriaId: number) {
  await fetch(`http://localhost:3000/api/productos/categorias/${categoriaId}`, {
    method: "DELETE",
  });
}
