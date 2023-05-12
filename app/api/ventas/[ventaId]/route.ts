import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

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
      // userId: currentUser.id,
    },
  });

  return NextResponse.json(res);
}
