//@/api/cajas/[cajaId]/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { cajaId: number } }
) {
  try {
    const cajaId = Number(params.cajaId);
    if (!cajaId || typeof cajaId !== "number") {
      throw new Error("Invalid ID");
    }

    const movimientos = await prisma.cajaMovimiento.findMany({
      where: { cajaId: cajaId },
      orderBy: {
        fecha: "asc",
      },
      include: {
        pago: { include: { proveedor: true } },
        cobro: { include: { cliente: true } },
      },
    });

    const safes = movimientos.map((mov) => ({
      ...mov,
      fecha: mov.fecha,
      quien:
        mov.pago != null
          ? mov.pago.proveedor.nombre
          : mov.cobro != null
          ? mov.cobro.cliente.nombre
          : undefined,
      pago: undefined,
      cobro: undefined,
    }));

    return NextResponse.json(safes, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
