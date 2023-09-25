//@/app/actions/crudMarca.ts
"use server";

import prisma from "@/lib/prismadb";
import { Marca } from "@prisma/client";

/**
 * Funcion para obtener el listado de marcas
 *
 * @returns Marca[] Lista de marcas
 */
export async function getMarcas(): Promise<Marca[]> {
  try {
    const marcas = await prisma.marca.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
    });

    return marcas || [];
  } catch (error: any) {
    console.log("//@/app/actions/crudMarca.ts > " + error);
    return [];
  }
}

/**
 * Funcion para obtener una Marca por un id
 *
 * @param marcaId
 * @returns Marca
 */
export async function getMarcaById(marcaId: number): Promise<Marca> {
  try {
    if (!marcaId || typeof marcaId !== "number") {
      throw new Error("Invalid ID");
    }

    const marca = await prisma.marca.findFirst({
      where: {
        id: marcaId,
      },
    });

    if (!marca) {
      return {} as Marca;
    }

    return marca;
  } catch (error: any) {
    console.log("//@/app/actions/_actionsMarcas.ts > " + error);
    return {} as Marca;
  }
}

/**
 *Funcion crear una marca
 *
 * @returns Marca
 */
export async function createMarca(marca: Marca): Promise<Marca | null> {
  try {
    const created = await prisma.marca.create({
      data: {
        nombre: marca.nombre,
        info: marca.info,
        estado: true,
      },
    });

    return created;
  } catch (error: any) {
    console.log("//@/app/actions/crudMarca.ts > " + error);
    return null;
  }
}

/**
 *Funcion actualizar una marca
 *
 * @returns Marca
 */
export async function editMarca(marca: Marca): Promise<Marca | null> {
  try {
    const updated = await prisma.marca.update({
      where: { id: Number(marca.id) },
      data: {
        nombre: marca.nombre,
        info: marca.info,
      },
    });
    return updated;
  } catch (error: any) {
    console.log("//@/app/actions/crudMarca.ts > " + error);
    return null;
  }
}

/**
 *Funcion borrauna marca
 *
 * @returns Marca
 */
export async function deleteMarca(marcaId: number): Promise<Marca | null> {
  try {
    const deleted = await prisma.marca.update({
      where: { id: Number(marcaId) },
      data: {
        estado: false,
      },
    });
    return deleted;
  } catch (error: any) {
    console.log("//@/app/actions/crudMarca.ts > " + error);
    return null;
  }
}
