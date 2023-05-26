//@/api/ventas/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const ventas = await prisma.venta.findMany({
      where: { estado: true },
      orderBy: {
        fecha: "asc",
      },
    });
    /** 
    const safe = ventas.map((venta) => ({
      ...venta,
    }));
    */
    return NextResponse.json(ventas, { status: 200 });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fecha, info, clienteId } = body;

    const venta = await prisma.venta.create({
      data: {
        fecha: fecha,
        info: info,
        cliente: {
          connect: { id: Number(clienteId) }, // Conecta con la categoría existente usando el ID
        },
      },
    });

    return NextResponse.json(venta, { status: 200 });
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
    const { id, fecha, info } = body;

    if (!id || typeof id !== "number") {
      throw new Error("Invalid ID");
    }

    const venta = await prisma.venta.update({
      where: { id },
      data: { fecha, info },
    });

    return NextResponse.json(venta, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
