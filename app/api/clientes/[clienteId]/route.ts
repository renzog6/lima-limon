import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(
  request: Request,
  { params }: { params: { clienteId: number } }
) {
  var clienteId = Number(params.clienteId);

  if (!clienteId || typeof clienteId !== "number") {
    throw new Error("Invalid ID");
  }

  const body = await request.json();
  const { nombre, info } = body;

  const res = await prisma.cliente.update({
    where: {
      id: clienteId,
    },
    data: {
      nombre,
      info,
    },
  });

  return NextResponse.json(res);
}

//Cambio de estado
export async function DELETE(
  request: Request,
  { params }: { params: { clienteId: number } }
) {
  var clienteId = Number(params.clienteId);

  if (!clienteId || typeof clienteId !== "number") {
    throw new Error("Invalid ID");
  }

  const res = await prisma.cliente.update({
    where: {
      id: clienteId,
    },
    data: {
      estado: false,
    },
  });

  return NextResponse.json(res);
}

/* Borrado definitivo
export async function DELETE(
  request: Request,
  { params }: { params: { clienteId: number } }
) {
  var clienteId = Number(params.clienteId);

  if (!clienteId || typeof clienteId !== "number") {
    throw new Error("Invalid ID");
  }

  const res = await prisma.cliente.deleteMany({
    where: {
      id: clienteId,
    },
  });

  return NextResponse.json(res);
}
*/
