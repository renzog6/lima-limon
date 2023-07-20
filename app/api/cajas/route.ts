//@/api/cajas/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { tipoCaja, cajaFecha, cajaSaldo, clienteId } = data;

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
        tipo: tipoCaja,
        nombre: tipoCaja,
        fechaApertura: cajaFecha,
        saldo: cajaSaldo,
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
