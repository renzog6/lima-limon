//@/app/actions/actionsCategorias.ts
import { Categoria } from "@prisma/client";

const apiUrl = `${process.env.apiUrl}/productos/categorias`;

async function fetchRequest(url: string, method: string, body: any = null) {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store" as RequestCache,
    };

    if (method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getCategorias() {
  try {
    return fetchRequest(apiUrl, "GET");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function createCategoria(categoria) {
  try {
    return fetchRequest(apiUrl, "POST", categoria);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateCategoria(categoria: Categoria) {
  try {
    return fetchRequest(apiUrl, "PUT", categoria);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deleteCategoria(categoriaId: number) {
  try {
    const res = await fetch(`${apiUrl}/${categoriaId}`, {
      method: "DELETE",
    });
    return res;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
