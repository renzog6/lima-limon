import { Marca } from "@prisma/client";

const apiUrl = `${process.env.apiUrl}/productos/marcas`;

export async function getMarcas() {
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

export async function addMarca(marca) {
  const res = await fetch(apiUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(marca),
  });
}

export async function updateCategotria(marca: Marca) {
  const res = await fetch(`${apiUrl}/${marca.id}`, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(marca),
  });
  return res;
}

export async function deleteCategotria(marcaId: number) {
  const res = await fetch(`${apiUrl}/${marcaId}`, {
    mode: "no-cors",
    method: "DELETE",
  });
  return res;
}
