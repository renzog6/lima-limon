//@/app/actions/actionsVentas.ts
import { Venta } from "@prisma/client";

const apiUrl = `${process.env.apiUrl}/ventas`;

async function fetchRequest(url: string, method: string, body: any = null) {
  try {
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
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getVentas() {
  try {
    return fetchRequest(apiUrl, "GET");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function createVenta(venta) {
  try {
    return fetchRequest(apiUrl, "POST", venta);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateVenta(venta: Venta) {
  try {
    return fetchRequest(apiUrl, "PUT", venta);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deleteVenta(ventaId: number) {
  try {
    const res = await fetch(`${apiUrl}/${ventaId}`, {
      method: "DELETE",
    });
    return res;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
