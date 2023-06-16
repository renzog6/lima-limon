//@/app/hooks/usePagos.ts
import { Pago } from "@prisma/client";

const apiUrl = `${process.env.apiUrl}/cajas/pagos`;

async function fetchRequest(url: string, method: string, body: any = null) {
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
}

export async function getPagos() {
  try {
    return fetchRequest(apiUrl, "GET");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function createPago(pago) {
  try {
    return fetchRequest(apiUrl, "POST", pago);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updatePago(pago: Pago) {
  try {
    return fetchRequest(apiUrl, "PUT", pago);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deletePago(pagoId: number) {
  try {
    const res = await fetch(`${apiUrl}/${pagoId}`, {
      method: "DELETE",
    });
    return res;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
