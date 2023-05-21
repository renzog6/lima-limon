//@app/actions/actionsCategorias.ts
import { Categoria } from "@prisma/client";

const apiUrl = `${process.env.apiUrl}/productos/categorias`;

export async function getCategorias() {
  try {
    const res = await fetch(apiUrl, {
      cache: "no-store",
      mode: "no-cors",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
}

export async function addCategoria(categoria) {
  const res = await fetch(apiUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  });
  return res;
}

export async function updateCategotria(categoria: Categoria) {
  const res = await fetch(`${apiUrl}/${categoria.id}`, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  });
  return res;
}

export async function deleteCategotria(categoriaId: number) {
  const res = await fetch(`${apiUrl}/${categoriaId}`, {
    mode: "no-cors",
    method: "DELETE",
  });
  return res;
}
