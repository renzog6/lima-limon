import { Cliente } from "@prisma/client";

const apiUrl = `${process.env.apiUrl}/clientes`;

export async function getClientes() {
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

export async function addCliente(cliente) {
  const res = await fetch(apiUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });
  return res;
}

export async function updateCliente(cliente: Cliente) {
  const res = await fetch(`${apiUrl}/${cliente.id}`, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });
  return res;
}

export async function deleteCliente(clienteId: number) {
  const res = await fetch(`http://localhost:3000/api/clientes/${clienteId}`, {
    method: "DELETE",
    mode: "no-cors",
  });
  return res;
}
