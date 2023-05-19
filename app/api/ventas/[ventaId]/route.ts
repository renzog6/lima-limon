import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(
  request: Request,
  { params }: { params: { ventaId: number } }
) {
  var ventaId = Number(params.ventaId);

  if (!ventaId || typeof ventaId !== "number") {
    throw new Error("Invalid ID");
  }

  const body = await request.json();
  const { nombre, info } = body;

  const res = await prisma.venta.update({
    where: {
      id: ventaId,
    },
    data: {
      //nombre,
      info,
    },
  });

  return NextResponse.json(res);
}

//Cambio de estado
export async function DELETE(
  request: Request,
  { params }: { params: { ventaId: number } }
) {
  var ventaId = Number(params.ventaId);

  if (!ventaId || typeof ventaId !== "number") {
    throw new Error("Invalid ID");
  }

  const res = await prisma.venta.update({
    where: {
      id: ventaId,
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
  { params }: { params: { ventaId: number } }
) {
  var ventaId = Number(params.ventaId);

  if (!ventaId || typeof ventaId !== "number") {
    throw new Error("Invalid ID");
  }

  const res = await prisma.venta.deleteMany({
    where: {
      id: ventaId,
    },
  });

  return NextResponse.json(res);
}
*/
