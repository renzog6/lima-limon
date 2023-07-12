//@/api/pedidos/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

/**
 * GET - List All Pedidos
 *
 * @returns  {Array<Object>} An array of order objects
 */
export async function GET() {
  try {
    const pedidos = await prisma.pedido.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        producto: true,
      },
    });

    const safe = pedidos.map((pedido) => ({
      ...pedido,
    }));

    return NextResponse.json(safe);
    //return NextResponse.json({ message: "OK", safe }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
