import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(
  request: Request,
  { params }: { params: { categoriaId: number } }
) {
  var categoriaId = Number(params.categoriaId);

  if (!categoriaId || typeof categoriaId !== "number") {
    throw new Error("Invalid ID");
  }

  const body = await request.json();
  const { nombre, info } = body;

  const res = await prisma.categoria.update({
    where: {
      id: categoriaId,
    },
    data: {
      nombre,
      info,
    },
  });

  return NextResponse.json(res);
}

export async function DELETE(
  request: Request,
  { params }: { params: { categoriaId: number } }
) {
  var categoriaId = Number(params.categoriaId);

  if (!categoriaId || typeof categoriaId !== "number") {
    throw new Error("Invalid ID");
  }

  const res = await prisma.categoria.deleteMany({
    where: {
      id: categoriaId,
    },
  });

  return NextResponse.json(res);
}
