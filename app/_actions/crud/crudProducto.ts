//@/app/actions/crudProducto.ts
"use server";

import prisma from "@/lib/prismadb";
import { Producto } from "@prisma/client";

/**
 * Funcion para obtener el listado de productos
 *
 * @returns Producto[] Lista de productos
 */
export async function getProductos(): Promise<Producto[]> {
  try {
    const productos = await prisma.producto.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
    });

    return productos || [];
  } catch (error: any) {
    console.log("//@/app/actions/crudProducto.ts > " + error);
    return [];
  }
}

/**
 * Funcion para obtener una Producto por un id
 *
 * @param productoId
 * @returns Producto
 */
export async function getProductoById(productoId: number): Promise<Producto> {
  try {
    if (!productoId || typeof productoId !== "number") {
      throw new Error("Invalid ID");
    }

    const producto = await prisma.producto.findFirst({
      where: {
        id: productoId,
      },
    });

    if (!producto) {
      return {} as Producto;
    }

    return producto;
  } catch (error: any) {
    console.log("//@/app/actions/_actionsProductos.ts > " + error);
    return {} as Producto;
  }
}

/**
 *Funcion crear una producto
 *
 * @returns Producto
 */
export async function createProducto(
  producto: Producto
): Promise<Producto | null> {
  try {
    const created = await prisma.producto.create({
      data: {
        nombre: producto.nombre,
        info: producto.info,
        precio: Number(producto.precio),
        stock: Number(producto.stock),
        categoria: {
          connect: { id: Number(producto.categoriaId) }, // Conecta con la categoría existente usando el ID
        },
        marca: {
          connect: { id: Number(producto.marcaId) }, // Conecta con la marca existente usando el ID
        },
        proveedor: {
          connect: { id: Number(producto.proveedorId) }, // Conecta con la marca existente usando el ID
        },
      },
    });

    return created;
  } catch (error: any) {
    console.log("//@/app/actions/crudProducto.ts > " + error);
    return null;
  }
}

/**
 *Funcion actualizar una producto
 *
 * @returns Producto
 */
export async function updateProducto(
  producto: Producto
): Promise<Producto | null> {
  try {
    const updated = await prisma.producto.update({
      where: { id: Number(producto.id) },
      data: {
        nombre: producto.nombre,
        info: producto.info,
      },
    });
    return updated;
  } catch (error: any) {
    console.log("//@/app/actions/crudProducto.ts > " + error);
    return null;
  }
}

/**
 *Funcion borrauna producto
 *
 * @returns Producto
 */
export async function deleteProducto(
  productoId: number
): Promise<Producto | null> {
  try {
    const deleted = await prisma.producto.update({
      where: { id: Number(productoId) },
      data: {
        estado: false,
      },
    });
    return deleted;
  } catch (error: any) {
    console.log("//@/app/actions/crudProducto.ts > " + error);
    return null;
  }
}
