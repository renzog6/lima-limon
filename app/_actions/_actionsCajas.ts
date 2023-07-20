//@/app/actions/_actionsCajas.ts
import prisma from "@/lib/prismadb";
import { Caja, TipoMovimiento } from "@prisma/client";
import { CajaSafe } from "../types";

export async function getCajas(): Promise<Caja[]> {
  try {
    const cajas = await prisma.caja.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
    });

    return cajas || [];
  } catch (error: any) {
    console.log("//@/app/actions/_actionsCajas.ts > " + error);
    return [];
  }
}

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
