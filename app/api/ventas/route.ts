import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

/* Code Status
200 OK
202 Accepted
204 No Content
400 Bad Request
404 Not Found
*/

export async function GET(request: Request) {
  try {
    const ventas = await prisma.venta.findMany({
      where: { estado: true },
      orderBy: {
        fecha: "asc",
      },
      include: {
        cliente: true,
      },
    });

    const safe = ventas.map((venta) => ({
      ...venta,
    }));

    return NextResponse.json(ventas);
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
