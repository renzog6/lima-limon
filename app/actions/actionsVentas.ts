import { Venta } from "@prisma/client";

const apiUrl = `${process.env.apiUrl}/ventas`;

export async function getVentas() {
  try {
    const res = await fetch(apiUrl, {
      cache: "no-store",
      mode: "no-cors",
    });
    return res.json();
  } catch (error) {
    return [];
  }
}

export async function addVenta(venta) {
  const res = await fetch(apiUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(venta),
  });
  return res;
}

export async function updateVenta(venta: Venta) {
  const res = await fetch(`${apiUrl}/${venta.id}`, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(venta),
  });
  return res;
}

export async function deleteVenta(ventaId: number) {
  const res = await fetch(`${apiUrl}/${ventaId}`, {
    method: "DELETE",
    mode: "no-cors",
  });
  return res;
}
