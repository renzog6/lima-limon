//@/app/api/clientes/updateClientes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function updateClientes(clienteId, importe) {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(clienteId) },
    });
    if (!cliente) {
      return NextResponse.json(
        { error: "The cliente does not exist" },
        { status: 404 }
      );
    }

    const update = await prisma.cliente.update({
      where: { id: cliente.id },
      data: { saldo: cliente.saldo + importe },
    });

    return NextResponse.json(update);
  } catch (error: any) {
    throw new Error(error);
  }
}
