//@/app/hooks/useMarcas.ts
import { Marca } from "@prisma/client";

const apiUrl = `${process.env.apiUrl}/productos/marcas`;

async function fetchRequest(url: string, method: string, body: any = null) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    // cache: "no-store" as RequestCache,
  };

  if (method !== "GET") {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

export async function getMarcas() {
  try {
    return fetchRequest(apiUrl, "GET");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function createMarca(marca) {
  try {
    return fetchRequest(apiUrl, "POST", marca);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateMarca(marca: Marca) {
  try {
    return fetchRequest(apiUrl, "PUT", marca);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deleteMarca(marcaId: number) {
  try {
    const res = await fetch(`${apiUrl}/${marcaId}`, {
      method: "DELETE",
    });
    return res;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
