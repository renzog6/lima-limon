//@/app/hooks/useCajas.ts
import { Caja } from "@prisma/client";

const apiUrl = `${process.env.apiUrl}/cajas`;

async function fetchRequest(url: string, method: string, body: any = null) {
  try {
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
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getCajas() {
  try {
    return fetchRequest(apiUrl, "GET");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function createCaja(caja) {
  try {
    return fetchRequest(apiUrl, "POST", caja);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateCaja(caja: Caja) {
  try {
    return fetchRequest(apiUrl, "PUT", caja);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deleteCaja(cajaId: number) {
  try {
    const res = await fetch(`${apiUrl}/${cajaId}`, {
      method: "DELETE",
    });
    return res;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
