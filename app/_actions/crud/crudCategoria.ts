//@/app/actions/crudCategoria.ts
"use server";

import prisma from "@/lib/prismadb";
import { Categoria } from "@prisma/client";

/**
 * Funcion para obtener el listado de categorias
 *
 * @returns Categoria[] Lista de categorias
 */
export async function getCategorias(): Promise<Categoria[]> {
  try {
    const categorias = await prisma.categoria.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
    });

    return categorias || [];
  } catch (error: any) {
    console.log("//@/app/actions/crudCategoria.ts > " + error);
    return [];
  }
}

/**
 *Funcion crear una categoria
 *
 * @returns Categoria
 */
export async function createCategoria(
  categoria: Categoria
): Promise<Categoria | null> {
  try {
    const created = await prisma.categoria.create({
      data: {
        nombre: categoria.nombre,
        info: categoria.info,
        estado: true,
      },
    });

    return created;
  } catch (error: any) {
    console.log("//@/app/actions/crudCategoria.ts > " + error);
    return null;
  }
}

/**
 *Funcion actualizar una categoria
 *
 * @returns Categoria
 */
export async function editCategoria(
  categoria: Categoria
): Promise<Categoria | null> {
  try {
    const updated = await prisma.categoria.update({
      where: { id: Number(categoria.id) },
      data: {
        nombre: categoria.nombre,
        info: categoria.info,
      },
    });
    return updated;
  } catch (error: any) {
    console.log("//@/app/actions/crudCategoria.ts > " + error);
    return null;
  }
}

/**
 *Funcion borrauna categoria
 *
 * @returns Categoria
 */
export async function deleteCategoria(
  categoriaId: number
): Promise<Categoria | null> {
  try {
    const deleted = await prisma.categoria.update({
      where: { id: Number(categoriaId) },
      data: {
        estado: false,
      },
    });
    return deleted;
  } catch (error: any) {
    console.log("//@/app/actions/crudCategoria.ts > " + error);
    return null;
  }
}
