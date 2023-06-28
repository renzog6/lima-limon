//@/api/cajas/movimientos/routes.ts
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { updateCajaSaldo, updateCajas } from "../updateCajas";

import { TipoMovimiento } from "@prisma/client";

export async function GET(req: Request) {
  try {
    /** 
    const movimientos = await prisma.cajaMovimiento.findMany({
      take: 10,
      orderBy: {
        fecha: "desc",
      },
    });

    const safes = movimientos.map((movimiento) => ({
      ...movimiento,
      fecha:
        movimiento.fecha !== null
          ? movimiento.fecha.toLocaleDateString()
          : null,
    }));

    return NextResponse.json(safes, { status: 200 });
    */
    const cobros = await prisma.cobro.findMany({
      include: {
        movimiento: true, // Incluir la relación con el modelo Caja en Cobro
      },
    });
    const cobrosSafes = cobros.map((cobro) => ({
      ...cobro,
      tipo: "Cobro",
    }));

    const pagos = await prisma.pago.findMany({
      include: {
        movimiento: true, // Incluir la relación con el modelo Caja en Pago
      },
    });
    const pagosSafes = pagos.map((pago) => ({
      ...pago,
      tipo: "Pago",
    }));

    const cobrosYpagosMixtos = [...cobrosSafes, ...pagosSafes];
    return NextResponse.json(cobrosYpagosMixtos, { status: 200 });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      movimientoFecha,
      movimientoImporte,
      movimientoTipo,
      movimientoInfo,
      moviemientoDesdeCajaId,
      moviemientoHastaCajaId,
    } = data;

    //ID del Jefe para el movimientos interno
    //El Jefe esta como Cliente y Proveedor {1}
    const jefeId: number = 1;

    //Check caja desde
    const desdeCaja = await prisma.caja.findFirst({
      where: { id: moviemientoDesdeCajaId },
    });
    if (!desdeCaja) {
      return NextResponse.json(
        { error: "The caja does not exist" },
        { status: 404 }
      );
    }

    //Check caja hasta
    const hastaCaja = await prisma.caja.findFirst({
      where: { id: moviemientoHastaCajaId },
    });
    if (!hastaCaja) {
      return NextResponse.json(
        { error: "The caja does not exist" },
        { status: 404 }
      );
    }

    const infoMovimineto =
      "Intermo - Desde: " + desdeCaja.nombre + "  Hasta: " + hastaCaja.nombre;

    //Creamos Egresos
    const pago = await prisma.pago.create({
      data: {
        fecha: movimientoFecha,
        proveedor: { connect: { id: jefeId } },

        //Creamos el Movimiento
        movimiento: {
          create: {
            fecha: movimientoFecha,
            tipo: TipoMovimiento.Pago,
            importe: Number(movimientoImporte),
            info: infoMovimineto,
            caja: { connect: { id: desdeCaja.id } },
          },
        },
      },
    });

    const updateCajaDesde = await updateCajaSaldo(
      desdeCaja.nombre,
      movimientoImporte * -1
    );
    if (!updateCajaDesde) {
      return NextResponse.json(
        { error: "The caja does not exist" },
        { status: 404 }
      );
    }

    //Creamos Egresos
    const cobro = await prisma.cobro.create({
      data: {
        fecha: movimientoFecha,
        cliente: { connect: { id: jefeId } },

        //Creamos el Movimiento
        movimiento: {
          create: {
            fecha: movimientoFecha,
            tipo: TipoMovimiento.Cobro,
            importe: Number(movimientoImporte),
            info: infoMovimineto,
            caja: { connect: { id: hastaCaja.id } },
          },
        },
      },
    });

    const updateCajaHasta = await updateCajaSaldo(
      hastaCaja.nombre,
      movimientoImporte
    );
    if (!updateCajaHasta) {
      return NextResponse.json(
        { error: "The caja does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: "Movimineto OK" }, { status: 200 });
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

    const movimiento = await prisma.movimiento.update({
      where: { id },
      data: { nombre, info },
    });

    return NextResponse.json(movimiento, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
*/
