import { Marca } from "@prisma/client";

export async function getMarcas() {
  try {
    const res = await fetch("http://localhost:3000/api/productos/marcas", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    return [];
  }
}

export async function addMarca(marca) {
  const res = await fetch("http://localhost:3000/api/productos/marcas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: marca.nombre,
      info: marca.info,
    }),
  });
}

export async function updateCategotria(marca: Marca) {
  const res = await fetch(
    `http://localhost:3000/api/productos/marcas/${marca.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: marca.nombre,
        info: marca.info,
      }),
    }
  );
}

export async function deleteCategotria(marcaId: number) {
  await fetch(`http://localhost:3000/api/productos/marcas/${marcaId}`, {
    method: "DELETE",
  });
}
