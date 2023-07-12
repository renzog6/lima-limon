//@/app/actions/_actionsClientes.ts
import prisma from "@/lib/prismadb";
import { Cliente, Prisma } from "@prisma/client";

export async function getClientes(): Promise<Cliente[]> {
  try {
    const clientes = await prisma.cliente.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
    });

    if (!clientes) {
      return [];
    }

    return clientes;
  } catch (error: any) {
    console.log("//@/app/actions/_actionsClientes.ts > " + error);
    return [];
  }
}

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

export async function updateClienteSaldo(clienteId, importe) {
  try {
    if (!clienteId || typeof clienteId !== "number") {
      throw new Error("Invalid ID");
    }

    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(clienteId) },
    });
    if (!cliente) {
      throw new Error("Cliente NO Exite.");
    }

    const updated = await prisma.cliente.update({
      where: { id: cliente.id },
      data: { saldo: cliente.saldo + importe },
    });

    return updated;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteCliente(clienteId: number) {
  try {
    if (!clienteId || typeof clienteId !== "number") {
      throw new Error("Invalid ID");
    }

    const deleted = await prisma.cliente.delete({
      where: {
        id: clienteId,
      },
    });

    if (!deleted) {
      throw new Error("Cliente no encontrado");
    }

    return deleted;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // El cliente no existe
      if (error.code === "P2025") {
        throw new Error("Cliente no encontrado");
      }
    }
    throw error;
  }
}
