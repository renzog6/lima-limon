//@/app/actions/crudCliente.ts
"use server";

import prisma from "@/lib/prismadb";
import { Cliente } from "@prisma/client";

/**
 * Funcion para obtener el listado de clientes
 *
 * @returns Cliente[] Lista de clientes
 */
export async function getClientes(): Promise<Cliente[]> {
  try {
    const clientes = await prisma.cliente.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
    });

    return clientes || [];
  } catch (error: any) {
    console.log("//@/app/actions/crudCliente.ts > " + error);
    return [];
  }
}

/**
 * Funcion obtine un cliente por un id
 *
 * @param clienteId
 * @returns Cliente
 */
export async function getClienteById(clienteId: number): Promise<Cliente> {
  try {
    if (!clienteId || typeof clienteId !== "number") {
      throw new Error("Invalid ID");
    }

    const cliente = await prisma.cliente.findFirst({
      where: {
        id: clienteId,
      },
    });

    if (!cliente) {
      return {} as Cliente;
    }

    return cliente;
  } catch (error: any) {
    console.log("//@/app/actions/_actionsClientes.ts > " + error);
    return {} as Cliente;
  }
}

/**
 *Funcion crear una cliente
 *
 * @returns Cliente
 */
export async function createCliente(cliente: Cliente): Promise<Cliente | null> {
  try {
    const created = await prisma.cliente.create({
      data: {
        nombre: cliente.nombre,
        info: cliente.info,
        estado: true,
      },
    });

    return created;
  } catch (error: any) {
    console.log("//@/app/actions/crudCliente.ts > " + error);
    return null;
  }
}

/**
 *Funcion actualizar una cliente
 *
 * @returns Cliente
 */
export async function updateCliente(cliente: Cliente): Promise<Cliente | null> {
  try {
    const updated = await prisma.cliente.update({
      where: { id: Number(cliente.id) },
      data: {
        nombre: cliente.nombre,
        info: cliente.info,
      },
    });
    return updated;
  } catch (error: any) {
    console.log("//@/app/actions/crudCliente.ts > " + error);
    return null;
  }
}

/**
 * Funcion borra un cliente por su id
 *
 * @param clienteId number
 * @returns Cliente
 */
export async function deleteCliente(
  clienteId: number
): Promise<Cliente | null> {
  try {
    const deleted = await prisma.cliente.update({
      where: { id: Number(clienteId) },
      data: {
        estado: false,
      },
    });
    return deleted;
  } catch (error: any) {
    console.log("//@/app/actions/crudCliente.ts > " + error);
    return null;
  }
}
