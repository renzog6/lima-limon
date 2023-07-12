//@/app/hooks/useCompras.ts
import { Compra } from "@prisma/client";
import { CompraSafe } from "../types";

const apiUrl = `${process.env.apiUrl}/compras`;

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

export async function getCompras() {
  try {
    return fetchRequest(apiUrl, "GET");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getCompraById(compraId: number) {
  try {
    const res = await fetch(`${apiUrl}/${compraId}`, {
      method: "GET",
      cache: "no-store" as RequestCache,
    });
    const data = await res.json();
    return data as CompraSafe;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function createCompra(compra) {
  try {
    return fetchRequest(apiUrl, "POST", compra);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateCompra(compra: Compra) {
  try {
    return fetchRequest(apiUrl, "PUT", compra);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deleteCompra(compraId: number) {
  try {
    const res = await fetch(`${apiUrl}/${compraId}`, {
      method: "DELETE",
    });
    return res;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
