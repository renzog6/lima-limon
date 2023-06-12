//@/api/cajas/cobros/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { updateCajas } from "../updateCajas";
import { updateClientes } from "../../clientes/updateClientes";

export async function GET() {
  try {
    const cobros = await prisma.cobro.findMany({
      orderBy: {
        fecha: "asc",
      },
    });

    const safes = cobros.map((cobro) => ({
      ...cobro,
      fecha: cobro.fecha !== null ? cobro.fecha.toLocaleDateString() : null,
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
    const {
      cobroFecha,
      cobroMonto,
      cobroFormaPago,
      cobroNota,
      clienteId,
      ventaId,
    } = data;

    // Validate the data
    if (!cobroFecha) {
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

    const tipoCaja = await prisma.caja.findFirst({
      where: { nombre: cobroFormaPago },
    });
    if (!tipoCaja) {
      return NextResponse.json(
        { error: "The caja does not exist" },
        { status: 404 }
      );
    }

    const cobro = await prisma.cobro.create({
      data: {
        fecha: cobroFecha,
        monto: Number(cobroMonto),
        formaPago: cobroFormaPago,
        nota: cobroNota,
        cliente: { connect: { id: Number(clienteId) } },
        venta: { connect: { id: Number(ventaId) } },
        caja: { connect: { id: tipoCaja.id } },
      },
    });

    const updateCaja = await updateCajas(cobroFormaPago);
    if (!updateCaja) {
      return NextResponse.json(
        { error: "The caja does not exist" },
        { status: 404 }
      );
    }

    //Actualiza el saldo del Cliente
    updateClientes(clienteId, Number(cobroMonto) * -1);

    return NextResponse.json({ data: cobro }, { status: 200 });
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

    const cobro = await prisma.cobro.update({
      where: { id },
      data: { nombre, info },
    });

    return NextResponse.json(cobro, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
*/
