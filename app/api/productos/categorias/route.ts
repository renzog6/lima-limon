//@/api/productos/categorias/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
    });
    /** 
    const safe = categorias.map((categoria) => ({
      ...categoria,
    }));
    */
    return NextResponse.json(categorias, { status: 200 });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, info } = body;

    const categoria = await prisma.categoria.create({
      data: {
        nombre,
        info,
      },
    });

    return NextResponse.json(categoria, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, nombre, info } = body;

    if (!id || typeof id !== "number") {
      throw new Error("Invalid ID");
    }

    const categoria = await prisma.categoria.update({
      where: { id },
      data: { nombre, info },
    });

    return NextResponse.json(categoria, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
