//@/api/ventas/[ventaId]/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function DELETE(
  request: Request,
  { params }: { params: { ventaId: number } }
) {
  try {
    var ventaId = Number(params.ventaId);

    if (!ventaId || typeof ventaId !== "number") {
      throw new Error("Invalid ID");
    }

    const res = await prisma.venta.deleteMany({
      where: {
        id: ventaId,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
