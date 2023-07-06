//@/app/hooks/useClientes.ts
import { Cliente } from "@prisma/client";

const apiUrl = `${process.env.apiUrl}/clientes`;

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
    //throw new Error((error as Error).message);
    return [];
  }
}

export async function getClientes() {
  try {
    return fetchRequest(apiUrl, "GET");
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getClienteById(clienteId: number) {
  try {
    const res = await fetch(`${apiUrl}/${clienteId}`, {
      method: "GET",
      cache: "no-store" as RequestCache,
    });
    const data = await res.json();
    return data as Cliente;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function createCliente(cliente) {
  try {
    return fetchRequest(apiUrl, "POST", cliente);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateCliente(cliente: Cliente) {
  try {
    return fetchRequest(apiUrl, "PUT", cliente);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deleteCliente(clienteId: number) {
  try {
    const res = await fetch(`${apiUrl}/${clienteId}`, {
      method: "DELETE",
    });
    return res;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
