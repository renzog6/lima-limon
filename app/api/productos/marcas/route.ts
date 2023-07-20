//@/api/productos/marcas/routes.ts

/**  Code Status
200 OK
202 Accepted
204 No Content
400 Bad Request
404 Not Found
****************/
import { NextResponse } from "next/server";
import { MarcaSafe } from "@/app/types";
import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const marcas = await prisma.marca.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
    });

    if (!marcas) {
      throw new Error("Marcas NO Existe!!!");
    }

    const safes = marcas.map(
      (marca) =>
        ({
          id: marca.id,
          nombre: marca.nombre,
          info: marca.info,
        } as MarcaSafe)
    );

    return NextResponse.json(safes, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
