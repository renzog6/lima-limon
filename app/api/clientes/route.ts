import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const clientes = await prisma.cliente.findMany({
      // where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
    });
    const safeclientes = clientes.map((cliente) => ({
      ...cliente,
      //createdAt: cliente.createdAt.toISOString(),
    }));

    return NextResponse.json(clientes);
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

  const res = await prisma.cliente.create({
    data: {
      nombre,
      info,
    },
  });

  return NextResponse.json(res);
}
