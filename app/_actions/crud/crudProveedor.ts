//@/app/actions/crudProveedor.ts
"use server";

import prisma from "@/lib/prismadb";
import { Proveedor } from "@prisma/client";

/**
 * Funcion para obtener el listado de proveedors
 *
 * @returns Proveedor[] Lista de proveedors
 */
export async function getProveedores(): Promise<Proveedor[]> {
  try {
    const proveedors = await prisma.proveedor.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
    });

    return proveedors || [];
  } catch (error: any) {
    console.log("//@/app/actions/crudProveedor.ts > " + error);
    return [];
  }
}

/**
 * Funcion para obtener una Proveedor por un id
 *
 * @param proveedorId
 * @returns Proveedor
 */
export async function getProveedorById(
  proveedorId: number
): Promise<Proveedor> {
  try {
    if (!proveedorId || typeof proveedorId !== "number") {
      throw new Error("Invalid ID");
    }

    const proveedor = await prisma.proveedor.findFirst({
      where: {
        id: proveedorId,
      },
    });

    if (!proveedor) {
      return {} as Proveedor;
    }

    return proveedor;
  } catch (error: any) {
    console.log("//@/app/actions/_actionsProveedors.ts > " + error);
    return {} as Proveedor;
  }
}

/**
 *Funcion crear una proveedor
 *
 * @returns Proveedor
 */
export async function createProveedor(
  proveedor: Proveedor
): Promise<Proveedor | null> {
  try {
    const created = await prisma.proveedor.create({
      data: {
        nombre: proveedor.nombre,
        info: proveedor.info,
        estado: true,
      },
    });

    return created;
  } catch (error: any) {
    console.log("//@/app/actions/crudProveedor.ts > " + error);
    return null;
  }
}

/**
 *Funcion actualizar una proveedor
 *
 * @returns Proveedor
 */
export async function updateProveedor(
  proveedor: Proveedor
): Promise<Proveedor | null> {
  try {
    const updated = await prisma.proveedor.update({
      where: { id: Number(proveedor.id) },
      data: {
        nombre: proveedor.nombre,
        info: proveedor.info,
      },
    });
    return updated;
  } catch (error: any) {
    console.log("//@/app/actions/crudProveedor.ts > " + error);
    return null;
  }
}

/**
 *Funcion borrauna proveedor
 *
 * @returns Proveedor
 */
export async function deleteProveedor(
  proveedorId: number
): Promise<Proveedor | null> {
  try {
    const deleted = await prisma.proveedor.update({
      where: { id: Number(proveedorId) },
      data: {
        estado: false,
      },
    });
    return deleted;
  } catch (error: any) {
    console.log("//@/app/actions/crudProveedor.ts > " + error);
    return null;
  }
}
