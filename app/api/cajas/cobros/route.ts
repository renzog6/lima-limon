//@/api/cajas/cobros/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { updateCajas } from "../updateCajas";
import { updateClientes } from "../../clientes/updateClientes";
import { TipoMovimiento } from "@prisma/client";

/**
 *GET- List Cobros
 
 * @returns Lista de Cobros
 */
export async function GET() {
  try {
    const cobros = await prisma.cobro.findMany({
      take: 20,
      orderBy: {
        fecha: "desc",
      },
      include: {
        cliente: true,
        movimiento: true,
      },
    });

    const safes = cobros.map((cobro) => ({
      ...cobro,
      fecha: cobro.fecha !== null ? cobro.fecha.toLocaleDateString() : null,
      cliente: cobro.cliente !== null ? cobro.cliente.nombre : "none",
      importe: cobro.movimiento?.importe,
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
      cobroInterno,
      cobroFecha,
      cobroImporte,
      cobroInfo,
      cobroCajaId,
      cobroClienteId,
      ventaId,
    } = data;

    // Validate the data
    if (!cobroFecha) {
      return NextResponse.json(
        { error: "Please provide an order date" },
        { status: 400 }
      );
    }

    // If el movimiento es interno, el ID es del Jefe
    let clienteId = cobroInterno ? 1 : cobroClienteId;
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
      where: { id: Number(cobroCajaId) },
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
        cliente: { connect: { id: Number(clienteId) } },
        //venta: { connect: { id: Number(ventaId) } },
        //Creamos el Movimiento
        movimiento: {
          create: {
            fecha: cobroFecha,
            tipo: TipoMovimiento.Cobro,
            importe: Number(cobroImporte),
            info: cobroInfo,
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
    updateClientes(clienteId, Number(cobroImporte) * -1);

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
