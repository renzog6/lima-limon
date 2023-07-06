//@/api/cajas/[movimiemtoId]/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { movimiemtoId: number } }
) {
  try {
    const movimiemtoId = Number(params.movimiemtoId);
    if (!movimiemtoId || typeof movimiemtoId !== "number") {
      throw new Error("Invalid ID");
    }

    const movimiemto = await prisma.cajaMovimiento.findFirst({
      where: { id: movimiemtoId },
    });

    if (!movimiemto) {
      throw new Error("Movimiento not found");
    }

    return NextResponse.json(movimiemto, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
