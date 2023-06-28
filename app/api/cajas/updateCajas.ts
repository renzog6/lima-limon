//@/app/api/cajas/updateCajas.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { TipoMovimiento } from "@prisma/client";

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
      return NextResponse.json(
        { error: "The caja does not exist" },
        { status: 404 }
      );
    }

    const update = await prisma.caja.update({
      where: { id: cajaToUpdate.id },
      data: { saldo: cajaToUpdate.saldo + importe },
    });

    return NextResponse.json(update);
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
      return NextResponse.json(
        { error: "The caja does not exist" },
        { status: 404 }
      );
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

    return NextResponse.json(update);
  } catch (error: any) {
    throw new Error(error);
  }
}
