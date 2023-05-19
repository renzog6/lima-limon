import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const ventas = await prisma.venta.findMany({
      // where: { estado: true },
      orderBy: {
        id: "asc",
      },
    });
    const safeventas = ventas.map((venta) => ({
      ...venta,
      //createdAt: venta.createdAt.toISOString(),
    }));

    return NextResponse.json(ventas);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
