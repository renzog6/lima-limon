import { Proveedor } from "@prisma/client";

//const URL = "http://localhost:3000/api"

export async function getProveedores() {
  try {
    const res = await fetch("http://localhost:3000/api/proveedores", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    return [];
  }
}

export async function addProveedor(proveedor) {
  const res = await fetch("http://localhost:3000/api/proveedores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: proveedor.nombre,
      info: proveedor.info,
    }),
  });
}

export async function updateProveedor(proveedor: Proveedor) {
  const res = await fetch(
    `http://localhost:3000/api/proveedores/${proveedor.id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: proveedor.nombre,
        info: proveedor.info,
      }),
    }
  );
}

export async function deleteProveedor(proveedorId: number) {
  await fetch(`http://localhost:3000/api/proveedores/${proveedorId}`, {
    method: "DELETE",
  });
}
