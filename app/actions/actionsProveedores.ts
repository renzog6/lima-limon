import { Proveedor } from "@prisma/client";

const apiUrl = `${process.env.apiUrl}/proveedores`;

export async function getProveedores() {
  try {
    const res = await fetch(apiUrl, {
      mode: "no-cors",
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    return [];
  }
}

export async function addProveedor(proveedor) {
  const res = await fetch(apiUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proveedor),
  });
  return res;
}

export async function updateProveedor(proveedor: Proveedor) {
  const res = await fetch(`${apiUrl}/${proveedor.id}`, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(proveedor),
  });
  return res;
}

export async function deleteProveedor(proveedorId: number) {
  const res = await fetch(`${apiUrl}/${proveedorId}`, {
    method: "DELETE",
    mode: "no-cors",
  });
  return res;
}
