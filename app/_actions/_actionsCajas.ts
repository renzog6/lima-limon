//@/app/actions/_actionsCajas.ts
"use server";

import prisma from "@/lib/prismadb";
import { Caja, CajaMovimiento, TipoMovimiento } from "@prisma/client";
import { CajaSafe } from "../types";
import { NextResponse } from "next/server";

/**
 * Funcion para obtener el listado de cajas
 *
 * @returns Caja Lista de cajas
 */
export async function getCajaById(cajaId: number): Promise<Caja | null> {
  try {
    const caja: Caja | null = await prisma.caja.findUnique({
      where: { id: cajaId },
    });
    return caja;
  } catch (error: any) {
    console.log("//@/app/actions/_actionsCajas.ts > " + error);
    return null;
  }
}

/**
 * Funcion para obtener el listado de cajas
 *
 * @returns CajaSafe[]
 */
export async function getCajasSafe(): Promise<CajaSafe[]> {
  try {
    const cajas = await prisma.caja.findMany({
      where: { estado: true },
      orderBy: {
        tipo: "asc",
      },
      select: {
        id: true,
        tipo: true,
        nombre: true,
        saldo: true,
      },
    });

    return (cajas as unknown as CajaSafe[]) ?? [];
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

/**
 * Funcion para actualizar el saldo de una caja especifica.
 *
 * @param tipoCaja Caja a Actulizar el Saldo
 * @param importe Importe que suma o restar dependiendo del tipo de movimeniento
 * @returns void
 */
export async function updateCajaSaldo(tipoCaja, importe) {
  try {
    const cajaToUpdate = await prisma.caja.findFirst({
      where: { tipo: tipoCaja },
    });
    if (!cajaToUpdate) {
      throw new Error("La Caja NO Exite.");
    }

    const update = await prisma.caja.update({
      where: { id: cajaToUpdate.id },
      data: { saldo: cajaToUpdate.saldo + importe },
    });

    return update;
  } catch (error: any) {
    throw new Error(error);
  }
}

/**
 * Funcion para actualizar el saldo de la caja tomando
 * todos los moviminetos.
 *
 * @param tipoCaja enum TipoCaja
 * @returns void
 */
export async function updateCajas(tipoCaja) {
  try {
    const cajaToUpdate = await prisma.caja.findFirst({
      where: { id: Number(tipoCaja.id) },
      include: {
        movimientos: true,
      },
    });
    if (!cajaToUpdate) {
      throw new Error("La Caja NO Exite.");
    }

    const sumMovimientos = cajaToUpdate.movimientos.reduce(
      (sum, mov) =>
        mov.tipo === TipoMovimiento.Cobro
          ? sum + mov.importe
          : sum - mov.importe,
      0.0
    );

    const update = await prisma.caja.update({
      where: { id: cajaToUpdate.id },
      data: { saldo: sumMovimientos },
    });

    return update;
  } catch (error: any) {
    throw new Error(error);
  }
}

/**
 * Funcion para el movimiento entre cajas
 *
 * @param data
 * @returns
 */
export async function createMovimientoEntreCajas(data) {
  try {
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
      "Intermo: De " + desdeCaja.nombre + " a " + hastaCaja.nombre;

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

    return JSON.parse('{"data": "OK"}');
  } catch (error: any) {
    return JSON.parse('{"data": "ERROR"}');
  }
}

/**
 * Funcion devueleve todos los movimientos de una caja
 *
 * @param cajaIdx
 * @returns
 */
export async function getCajaMoviminetos(cajaIdx: number) {
  try {
    const cajaId = +cajaIdx;
    if (!cajaId || typeof cajaId !== "number") {
      throw new Error("Invalid ID");
    }

    const movimientos = await prisma.cajaMovimiento.findMany({
      where: { cajaId: cajaId },
      orderBy: {
        fecha: "asc",
      },
      include: {
        pago: { include: { proveedor: true } },
        cobro: { include: { cliente: true } },
      },
    });

    const safes = movimientos.map((mov) => ({
      ...mov,
      fecha: mov.fecha,
      quien:
        mov.pago != null
          ? mov.pago.proveedor.nombre
          : mov.cobro != null
          ? mov.cobro.cliente.nombre
          : undefined,
      pago: undefined,
      cobro: undefined,
    }));

    return safes;
  } catch (error: unknown) {
    console.log((error as Error).message);
    return [];
  }
}

/**
 * Funcion para obtener el listado de cajas
 *
 * @returns Caja Lista de cajas
 */
export async function getCajaMovimientoById(
  movimiemtoIdId: number
): Promise<CajaMovimiento | null> {
  try {
    const movimiemto: CajaMovimiento | null =
      await prisma.cajaMovimiento.findUnique({
        where: { id: movimiemtoIdId },
      });
    return movimiemto;
  } catch (error: any) {
    console.log("//@/app/actions/_actionsCajas.ts > " + error);
    return null;
  }
}
