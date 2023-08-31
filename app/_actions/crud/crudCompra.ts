//@/app/actions/crudCompra.ts
"use server";

import { CompraSafe, DataCompra } from "@/app/types";
import prisma from "@/lib/prismadb";
import { Compra } from "@prisma/client";
import { updateClienteSaldo } from "../_actionsClientes";

/**
 * Funcion para obtener el listado de compras
 *
 * @returns Compra[] Lista de compras
 */
export async function getCompras(): Promise<CompraSafe[]> {
  try {
    const compras = await prisma.compra.findMany({
      where: { estado: true },
      orderBy: {
        fecha: "asc",
      },
      include: {
        pedidos: true,
        proveedor: true,
      },
    });

    return compras || [];
  } catch (error: any) {
    console.log("//@/app/actions/crudCompra.ts > " + error);
    return [];
  }
}

/**
 * Funcion para obtener una Compra por un id
 *
 * @param compraId
 * @returns Compra
 */
export async function getCompraById(compraId: number): Promise<CompraSafe> {
  try {
    if (!compraId || typeof compraId !== "number") {
      throw new Error("Invalid ID");
    }

    const compra = await prisma.compra.findFirst({
      where: {
        id: compraId,
      },
    });

    if (!compra) {
      return {} as CompraSafe;
    }

    return compra as unknown as CompraSafe;
  } catch (error: any) {
    console.log("//@/app/actions/_actionsCompras.ts > " + error);
    return {} as CompraSafe;
  }
}

/**
 *Funcion crear una compra
 *
 * @returns Compra
 */
export async function createCompra(data: DataCompra): Promise<Compra | null> {
  try {
    // Check if the customer exists
    const proveedor = await prisma.proveedor.findUnique({
      where: { id: Number(data.proveedorId) },
    });
    if (!proveedor) {
      throw new Error("Error: En al buscar el proveedor.");
    }

    const created = await prisma.compra.create({
      data: {
        fecha: data.fecha,
        info: data.info ? data.info : "",
        proveedor: { connect: { id: Number(data.proveedorId) } },
        total: data.total,
        saldo: data.saldo,
        estado: true,
      },
    });
    if (!created) {
      throw new Error("Error: En crear la compra.");
    }

    // Create the order details
    for (const item of data.cartItems) {
      await prisma.pedido.create({
        data: {
          productoId: item.product.id,
          cantidad: item.qty,
          precio: item.product.precio,
          compraId: created.id,
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
    updateClienteSaldo(proveedor.id, data.total);

    return created;
  } catch (error: any) {
    console.log("//@/app/actions/crudCompra.ts > " + error);
    return null;
  }
}

/**
 *Funcion actualizar una compra
 *
 * @returns Compra
 */
export async function updateCompra(compra: Compra): Promise<Compra | null> {
  try {
    const updated = await prisma.compra.update({
      where: { id: Number(compra.id) },
      data: {
        fecha: compra.fecha,
        info: compra.info,
      },
    });
    return updated;
  } catch (error: any) {
    console.log("//@/app/actions/crudCompra.ts > " + error);
    return null;
  }
}

/**
 *Funcion borrauna compra
 *
 * @returns Compra
 */
export async function deleteCompra(compraId: number): Promise<Compra | null> {
  try {
    const deleted = await prisma.compra.update({
      where: { id: Number(compraId) },
      data: {
        estado: false,
      },
    });
    return deleted;
  } catch (error: any) {
    console.log("//@/app/actions/crudCompra.ts > " + error);
    return null;
  }
}
