//@/app/actions/crudCobro.ts
"use server";

import prisma from "@/lib/prismadb";
import { Cobro, TipoMovimiento } from "@prisma/client";
import { updateClienteSaldo } from "../_actionsClientes";
import { updateCajas } from "../_actionsCajas";
import { DataCobro } from "@/types";

/**
 * Funcion para obtener el listado de cobros
 *
 * @returns Cobro[] Lista de cobros
 */
export async function getCobros(): Promise<Cobro[]> {
  try {
    const cobros = await prisma.cobro.findMany({
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

    return cobros || [];
  } catch (error: any) {
    console.log("//@/app/actions/crudCobro.ts > " + error);
    return [];
  }
}

/**
 * Funcion para obtener una Cobro por un id
 *
 * @param cobroId
 * @returns Cobro
 */
export async function getCobroById(cobroId: number): Promise<Cobro> {
  try {
    if (!cobroId || typeof cobroId !== "number") {
      throw new Error("Invalid ID");
    }

    const cobro = await prisma.cobro.findFirst({
      where: {
        id: cobroId,
      },
    });

    if (!cobro) {
      return {} as Cobro;
    }

    return cobro;
  } catch (error: any) {
    console.log("//@/app/actions/_actionsCobros.ts > " + error);
    return {} as Cobro;
  }
}

/**
 *Funcion crear una cobro
 *
 * @returns Cobro
 */
export async function createCobro(data: DataCobro): Promise<Cobro | null> {
  try {
    // If el movimiento es interno, el ID es del Jefe
    let clienteId = data.isInterno ? 1 : data.clienteId;
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(clienteId) },
    });
    if (!cliente) {
      throw new Error("ClienteNo Exite!!!");
    }

    const tipoCaja = await prisma.caja.findFirst({
      where: { id: Number(data.tipoCajaId) },
    });
    if (!tipoCaja) {
      throw new Error("Caja No Exite!!!");
    }

    const created = await prisma.cobro.create({
      data: {
        fecha: data.fecha,
        cliente: { connect: { id: cliente.id } },
        //venta: { connect: { id: Number(ventaId) } },
        //Creamos el Movimiento
        movimiento: {
          create: {
            fecha: data.fecha,
            tipo: TipoMovimiento.Cobro,
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
    updateClienteSaldo(clienteId, Number(data.importe) * -1);

    return created;
  } catch (error: any) {
    console.log("//@/app/actions/crudCobro.ts > " + error);
    return null;
  }
}

/**
 *Funcion actualizar una cobro
 *
 * @returns Cobro
 */
export async function updateCobro(cobro: Cobro): Promise<Cobro | null> {
  try {
    const updated = await prisma.cobro.update({
      where: { id: Number(cobro.id) },
      data: {
        fecha: cobro.fecha,
      },
    });
    return updated;
  } catch (error: any) {
    console.log("//@/app/actions/crudCobro.ts > " + error);
    return null;
  }
}

/**
 *Funcion borrauna cobro
 *
 * @returns Cobro
 */
export async function deleteCobro(cobroId: number): Promise<Cobro | null> {
  try {
    const deleted = await prisma.cobro.delete({
      where: { id: Number(cobroId) },
    });
    return deleted;
  } catch (error: any) {
    console.log("//@/app/actions/crudCobro.ts > " + error);
    return null;
  }
}
