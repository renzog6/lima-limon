//@/api/cajas/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const cajas = await prisma.caja.findMany({
      orderBy: {
        nombre: "asc",
      },
    });

    const safes = cajas.map((caja) => ({
      ...caja,
      fechaApertura:
        caja.fechaApertura !== null
          ? caja.fechaApertura.toLocaleDateString()
          : null,
    }));

    return NextResponse.json(safes, { status: 200 });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { cajaFecha, cajaMonto, clienteId } = data;

    // Validate the data
    if (!cajaFecha) {
      return NextResponse.json(
        { error: "Please provide an order date" },
        { status: 400 }
      );
    }

    // Check if the customer exists
    const customer = await prisma.cliente.findUnique({
      where: { id: Number(clienteId) },
    });
    if (!customer) {
      return NextResponse.json(
        { error: "The customer does not exist" },
        { status: 404 }
      );
    }

    const caja = await prisma.caja.create({
      data: {
        fechaApertura: cajaFecha,
        saldo: cajaMonto,
      },
    });

    return NextResponse.json({ data: caja }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

/** 
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, nombre, info } = body;

    if (!id || typeof id !== "number") {
      throw new Error("Invalid ID");
    }

    const caja = await prisma.caja.update({
      where: { id },
      data: { nombre, info },
    });

    return NextResponse.json(caja, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
*/
