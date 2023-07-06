//@/api/cajas/[cajaId]/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { Caja } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { cajaId: number } }
) {
  try {
    const cajaId = Number(params.cajaId);
    if (!cajaId || typeof cajaId !== "number") {
      throw new Error("Invalid ID");
    }

    const caja: Caja | null = await prisma.caja.findUnique({
      where: { id: cajaId },
    });

    if (!caja) {
      throw new Error("Caja not found");
    }

    return NextResponse.json(caja, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
