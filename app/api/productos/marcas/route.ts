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
    const marcas = await prisma.marca.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
    });

    const safe = marcas.map((marca) => ({
      ...marca,
    }));

    return NextResponse.json(marcas);
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

  const listing = await prisma.marca.create({
    data: {
      nombre,
      info,
    },
  });

  return NextResponse.json(listing);
}
