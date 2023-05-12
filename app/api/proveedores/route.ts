import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const proveedores = await prisma.proveedor.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
    });

    const safeclientes = proveedores.map((cliente) => ({
      ...cliente,
      //createdAt: cliente.createdAt.toISOString(),
    }));

    return NextResponse.json(proveedores);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { nombre, info } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.proveedor.create({
    data: {
      nombre,
      info,
    },
  });

  return NextResponse.json(listing);
}
