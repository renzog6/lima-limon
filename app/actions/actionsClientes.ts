import { Cliente } from "@prisma/client";

//const URL = "http://localhost:3000/api"

export async function getClientes() {
  try {
    const res = await fetch("http://localhost:3000/api/clientes", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    return [];
  }
}

export async function addCliente(cliente) {
  const res = await fetch("http://localhost:3000/api/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: cliente.nombre,
      info: cliente.info,
    }),
  });
}

export async function updateCliente(cliente: Cliente) {
  const res = await fetch(`http://localhost:3000/api/clientes/${cliente.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: cliente.nombre,
      info: cliente.info,
    }),
  });
}

export async function deleteCliente(clienteId: number) {
  await fetch(`http://localhost:3000/api/clientes/${clienteId}`, {
    method: "DELETE",
  });
}
