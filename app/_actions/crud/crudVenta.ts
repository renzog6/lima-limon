//@/app/actions/crudVenta.ts
"use server";

import { VentaSafe, DataVenta } from "@/app/types";
import prisma from "@/lib/prismadb";
import { Venta } from "@prisma/client";
import { updateClienteSaldo } from "../_actionsClientes";

/**
 * Funcion para obtener el listado de ventas
 *
 * @returns Venta[] Lista de ventas
 */
export async function getVentas(): Promise<VentaSafe[]> {
  try {
    const ventas = await prisma.venta.findMany({
      where: { estado: true },
      orderBy: {
        fecha: "asc",
      },
      include: {
        pedidos: true,
        cliente: true,
      },
    });

    return ventas || [];
  } catch (error: any) {
    console.log("//@/app/actions/crudVenta.ts > " + error);
    return [];
  }
}

/**
 * Funcion para obtener una Venta por un id
 *
 * @param ventaId
 * @returns Venta
 */
export async function getVentaById(ventaId: number): Promise<VentaSafe> {
  try {
    if (!ventaId || typeof ventaId !== "number") {
      throw new Error("Invalid ID");
    }

    const venta = await prisma.venta.findFirst({
      where: {
        id: ventaId,
      },
    });

    if (!venta) {
      return {} as VentaSafe;
    }

    return venta as unknown as VentaSafe;
  } catch (error: any) {
    console.log("//@/app/actions/_actionsVentas.ts > " + error);
    return {} as VentaSafe;
  }
}

/**
 *Funcion crear una venta
 *
 * @returns Venta
 */
export async function createVenta(data: DataVenta): Promise<Venta | null> {
  try {
    // Check if the customer exists
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(data.clienteId) },
    });
    if (!cliente) {
      throw new Error("Error: En al buscar el cliente.");
    }

    const created = await prisma.venta.create({
      data: {
        fecha: data.fecha,
        info: data.info ? data.info : "",
        cliente: { connect: { id: Number(data.clienteId) } },
        total: data.total,
        saldo: data.saldo,
        estado: true,
      },
    });
    if (!created) {
      throw new Error("Error: En crear la venta.");
    }

    // Create the order details
    for (const item of data.cartItems) {
      await prisma.pedido.create({
        data: {
          productoId: item.product.id,
          cantidad: item.qty,
          precio: item.product.precio,
          ventaId: created.id,
        },
      });
    }

    // Update the stock
    for (const item of data.cartItems) {
      await prisma.producto.update({
        where: { id: item.product.id },
        data: { stock: item.product.stock - item.qty },
      });
    }

    //Actualiza el saldo del Cliente
    updateClienteSaldo(cliente.id, data.total);

    return created;
  } catch (error: any) {
    console.log("//@/app/actions/crudVenta.ts > " + error);
    return null;
  }
}

/**
 *Funcion actualizar una venta
 *
 * @returns Venta
 */
export async function updateVenta(venta: Venta): Promise<Venta | null> {
  try {
    const updated = await prisma.venta.update({
      where: { id: Number(venta.id) },
      data: {
        fecha: venta.fecha,
        info: venta.info,
      },
    });
    return updated;
  } catch (error: any) {
    console.log("//@/app/actions/crudVenta.ts > " + error);
    return null;
  }
}

/**
 *Funcion borrauna venta
 *
 * @returns Venta
 */
export async function deleteVenta(ventaId: number): Promise<Venta | null> {
  try {
    const deleted = await prisma.venta.update({
      where: { id: Number(ventaId) },
      data: {
        estado: false,
      },
    });
    return deleted;
  } catch (error: any) {
    console.log("//@/app/actions/crudVenta.ts > " + error);
    return null;
  }
}
