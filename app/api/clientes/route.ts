//@/api/clientes/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
    });
    /** 
    const safe = clientes.map((cliente) => ({
      ...cliente,
    }));
    */
    return NextResponse.json(clientes, { status: 200 });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, info } = body;

    const cliente = await prisma.cliente.create({
      data: {
        nombre,
        info,
      },
    });

    return NextResponse.json(cliente, { status: 200 });
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

    const cliente = await prisma.cliente.update({
      where: { id },
      data: { nombre, info },
    });

    return NextResponse.json(cliente, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
