//@/api/clientes/[clienteId]/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { clienteId: number } }
) {
  try {
    var clienteId = Number(params.clienteId);

    if (!clienteId || typeof clienteId !== "number") {
      throw new Error("Invalid ID");
    }

    const res = await prisma.cliente.findFirst({
      where: {
        id: clienteId,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { clienteId: number } }
) {
  try {
    var clienteId = Number(params.clienteId);

    if (!clienteId || typeof clienteId !== "number") {
      throw new Error("Invalid ID");
    }

    const res = await prisma.cliente.deleteMany({
      where: {
        id: clienteId,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
