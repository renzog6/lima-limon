//@/api/cajas/pagos/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { updateCajas } from "../updateCajas";
import { updateClientes } from "../../clientes/updateClientes";
import { TipoMovimiento } from "@prisma/client";

/**
 *
 * @returns Lista de Pagos
 */
export async function GET() {
  try {
    const pagos = await prisma.pago.findMany({
      take: 10,
      orderBy: {
        fecha: "desc",
      },
      include: {
        proveedor: true,
        movimiento: true,
      },
    });

    const safes = pagos.map((pago) => ({
      ...pago,
      fecha: pago.fecha !== null ? pago.fecha.toLocaleDateString() : null,
      proveedor: pago.proveedor !== null ? pago.proveedor.nombre : "none",
      importe: pago.movimiento?.importe,
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
      pagoInterno,
      pagoFecha,
      pagoImporte,
      pagoInfo,
      pagoCajaId,
      pagoClienteId,
      ventaId,
    } = data;

    // Validate the data
    if (!pagoFecha) {
      return NextResponse.json(
        { error: "Please provide an order date" },
        { status: 400 }
      );
    }

    // If el movimiento es interno, el ID es del Jefe
    let clienteId = pagoInterno ? 1 : pagoClienteId;
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
      where: { id: +pagoCajaId },
    });
    if (!tipoCaja) {
      return NextResponse.json(
        { error: "The caja does not exist" },
        { status: 404 }
      );
    }

    const pago = await prisma.pago.create({
      data: {
        fecha: pagoFecha,
        proveedor: { connect: { id: Number(clienteId) } },
        //compra: { connect: { id: Number(ventaId) } },
        //Creamos el Movimiento
        movimiento: {
          create: {
            fecha: pagoFecha,
            tipo: TipoMovimiento.Pago,
            importe: Number(pagoImporte),
            info: pagoInfo,
            caja: { connect: { id: tipoCaja.id } },
          },
        },
      },
    });

    const updateCaja = await updateCajas(tipoCaja);
    if (!updateCaja) {
      return NextResponse.json(
        { error: "The caja does not exist" },
        { status: 404 }
      );
    }

    //Actualiza el saldo del Cliente
    updateClientes(clienteId, Number(pagoImporte));

    return NextResponse.json({ data: pago }, { status: 200 });
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

    const pago = await prisma.pago.update({
      where: { id },
      data: { nombre, info },
    });

    return NextResponse.json(pago, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
*/
