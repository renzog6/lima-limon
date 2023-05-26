//@/api/productos/marcas/[marcaId]/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function DELETE(
  request: Request,
  { params }: { params: { marcaId: number } }
) {
  try {
    var marcaId = Number(params.marcaId);

    if (!marcaId || typeof marcaId !== "number") {
      throw new Error("Invalid ID");
    }

    const res = await prisma.marca.deleteMany({
      where: {
        id: marcaId,
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
