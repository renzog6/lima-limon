import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(
  request: Request,
  { params }: { params: { productoId: number } }
) {
  var productoId = Number(params.productoId);

  if (!productoId || typeof productoId !== "number") {
    throw new Error("Invalid ID");
  }

  const body = await request.json();
  const { nombre, info } = body;

  const res = await prisma.producto.update({
    where: {
      id: productoId,
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
  { params }: { params: { productoId: number } }
) {
  var productoId = Number(params.productoId);

  if (!productoId || typeof productoId !== "number") {
    throw new Error("Invalid ID");
  }

  const res = await prisma.producto.update({
    where: {
      id: productoId,
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
  { params }: { params: { productoId: number } }
) {
  var productoId = Number(params.productoId);

  if (!productoId || typeof productoId !== "number") {
    throw new Error("Invalid ID");
  }

  const res = await prisma.producto.deleteMany({
    where: {
      id: productoId,
    },
  });

  return NextResponse.json(res);
}
*/
