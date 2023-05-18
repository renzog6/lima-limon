import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(
  request: Request,
  { params }: { params: { marcaId: number } }
) {
  var marcaId = Number(params.marcaId);

  if (!marcaId || typeof marcaId !== "number") {
    throw new Error("Invalid ID");
  }

  const body = await request.json();
  const { nombre, info } = body;

  const res = await prisma.marca.update({
    where: {
      id: marcaId,
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
  { params }: { params: { marcaId: number } }
) {
  var marcaId = Number(params.marcaId);

  if (!marcaId || typeof marcaId !== "number") {
    throw new Error("Invalid ID");
  }

  const res = await prisma.marca.deleteMany({
    where: {
      id: marcaId,
    },
  });

  return NextResponse.json(res);
}
