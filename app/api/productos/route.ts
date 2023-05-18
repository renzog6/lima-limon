import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const productos = await prisma.producto.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
      include: {
        categoria: true,
      },
    });

    const safeclientes = productos.map((producto) => ({
      ...producto,
    }));
    return NextResponse.json(productos);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function POST(request: Request) {
  /*  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
*/
  const body = await request.json();
  const { nombre, info } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.cliente.create({
    data: {
      nombre,
      info,
    },
  });

  return NextResponse.json(listing);
}
