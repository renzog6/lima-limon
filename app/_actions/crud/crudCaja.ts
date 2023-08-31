//@/app/actions/crudCaja.ts
"use server";

import prisma from "@/lib/prismadb";
import { Caja } from "@prisma/client";

/**
 * Funcion para obtener el listado de cajas
 *
 * @returns Caja[] Lista de cajas
 */
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
    console.log("//@/app/actions/crudCaja.ts > " + error);
    return [];
  }
}

/**
 *Funcion crear una caja
 *
 * @returns Caja
 */
export async function createCaja(caja: Caja): Promise<Caja | null> {
  try {
    const created = await prisma.caja.create({
      data: {
        nombre: caja.nombre,
        tipo: caja.tipo,
        fechaApertura: caja.fechaApertura,
        saldo: caja.saldo,
      },
    });

    return created;
  } catch (error: any) {
    console.log("//@/app/actions/crudCaja.ts > " + error);
    return null;
  }
}

/**
 *Funcion actualizar una caja
 *
 * @returns Caja
 */
export async function updateCaja(caja: Caja): Promise<Caja | null> {
  try {
    const updated = await prisma.caja.update({
      where: { id: Number(caja.id) },
      data: {
        nombre: caja.nombre,
        tipo: caja.tipo,
        fechaApertura: caja.fechaApertura,
        saldo: caja.saldo,
      },
    });
    return updated;
  } catch (error: any) {
    console.log("//@/app/actions/crudCaja.ts > " + error);
    return null;
  }
}

/**
 *Funcion borrauna caja
 *
 * @returns Caja
 */
export async function deleteCaja(cajaId: number): Promise<Caja | null> {
  try {
    const deleted = await prisma.caja.update({
      where: { id: Number(cajaId) },
      data: {
        estado: false,
      },
    });
    return deleted;
  } catch (error: any) {
    console.log("//@/app/actions/crudCaja.ts > " + error);
    return null;
  }
}
