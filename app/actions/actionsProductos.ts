import { Producto } from "@prisma/client";

const apiUrl = `${process.env.apiUrl}/productos`;

export async function getProductos() {
  try {
    const res = await fetch(apiUrl, {
      //cache: "no-store",
    });
    return res.json();
  } catch (error) {
    return [];
  }
}

export async function addProducto(producto) {
  try {
    const res = await fetch(apiUrl, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, data };
    } else {
      const error = await res.json();
      return { success: false, error };
    }
  } catch (error) {
    // Captura cualquier excepción lanzada durante la solicitud
    return { success: false, error: "Error en la solicitud" };
  }
}

export async function updateProducto(producto: Producto) {
  const res = await fetch(`${apiUrl}/${producto.id}`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });
  return res;
}

export async function deleteProducto(productoId: number) {
  const res = await fetch(`${apiUrl}/${productoId}`, {
    method: "DELETE",
  });
  return res;
}
