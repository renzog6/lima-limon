//@/app/hooks/useCobros.ts
import { Cobro } from "@prisma/client";

const apiUrl = `${process.env.apiUrl}/cajas/cobros`;

async function fetchRequest(url: string, method: string, body: any = null) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method !== "GET") {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

export async function getCobros() {
  try {
    return fetchRequest(apiUrl, "GET");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function createCobro(cobro) {
  try {
    return fetchRequest(apiUrl, "POST", cobro);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateCobro(cobro: Cobro) {
  try {
    return fetchRequest(apiUrl, "PUT", cobro);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deleteCobro(cobroId: number) {
  try {
    const res = await fetch(`${apiUrl}/${cobroId}`, {
      method: "DELETE",
    });
    return res;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
