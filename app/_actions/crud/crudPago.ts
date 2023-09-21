//@/app/actions/crudPago.ts
"use server";

import prisma from "@/lib/prismadb";
import { Pago, TipoMovimiento } from "@prisma/client";
import { updateClienteSaldo } from "../_actionsClientes";
import { updateCajas } from "../_actionsCajas";
import { DataPago } from "@/types";

/**
 * Funcion para obtener el listado de pagos
 *
 * @returns Pago[] Lista de pagos
 */
export async function getPagos(): Promise<Pago[]> {
  try {
    const pagos = await prisma.pago.findMany({
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

    return pagos || [];
  } catch (error: any) {
    console.log("//@/app/actions/crudPago.ts > " + error);
    return [];
  }
}

/**
 * Funcion para obtener una Pago por un id
 *
 * @param pagoId
 * @returns Pago
 */
export async function getPagoById(pagoId: number): Promise<Pago> {
  try {
    if (!pagoId || typeof pagoId !== "number") {
      throw new Error("Invalid ID");
    }

    const pago = await prisma.pago.findFirst({
      where: {
        id: pagoId,
      },
    });

    if (!pago) {
      return {} as Pago;
    }

    return pago;
  } catch (error: any) {
    console.log("//@/app/actions/_actionsPagos.ts > " + error);
    return {} as Pago;
  }
}

/**
 *Funcion crear una pago
 *
 * @returns Pago
 */
export async function createPago(data: DataPago): Promise<Pago | null> {
  try {
    // If el movimiento es interno, el ID es del Jefe
    let proveedorId = data.isInterno ? 1 : data.proveedorId;
    const proveedor = await prisma.proveedor.findUnique({
      where: { id: Number(proveedorId) },
    });
    if (!proveedor) {
      throw new Error("ClienteNo Exite!!!");
    }

    const tipoCaja = await prisma.caja.findFirst({
      where: { id: Number(data.tipoCajaId) },
    });
    if (!tipoCaja) {
      throw new Error("Caja No Exite!!!");
    }

    const created = await prisma.pago.create({
      data: {
        fecha: data.fecha,
        proveedor: { connect: { id: proveedor.id } },
        //venta: { connect: { id: Number(ventaId) } },
        //Creamos el Movimiento
        movimiento: {
          create: {
            fecha: data.fecha,
            tipo: TipoMovimiento.Pago,
            importe: +data.importe,
            info: data.info,
            caja: { connect: { id: +tipoCaja.id } },
          },
        },
      },
    });

    const updateCaja = await updateCajas(tipoCaja);
    if (!updateCaja) {
      throw new Error("Error en updateCaja()");
    }

    //Actualiza el saldo del Cliente
    updateClienteSaldo(proveedorId, Number(data.importe) * -1);

    return created;
  } catch (error: any) {
    console.log("//@/app/actions/crudPago.ts > " + error);
    return null;
  }
}

/**
 *Funcion actualizar una pago
 *
 * @returns Pago
 */
export async function updatePago(pago: Pago): Promise<Pago | null> {
  try {
    const updated = await prisma.pago.update({
      where: { id: Number(pago.id) },
      data: {
        fecha: pago.fecha,
      },
    });
    return updated;
  } catch (error: any) {
    console.log("//@/app/actions/crudPago.ts > " + error);
    return null;
  }
}

/**
 *Funcion borrauna pago
 *
 * @returns Pago
 */
export async function deletePago(pagoId: number): Promise<Pago | null> {
  try {
    const deleted = await prisma.pago.delete({
      where: { id: Number(pagoId) },
    });
    return deleted;
  } catch (error: any) {
    console.log("//@/app/actions/crudPago.ts > " + error);
    return null;
  }
}
