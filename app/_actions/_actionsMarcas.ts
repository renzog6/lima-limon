//@/app/actions/_actionsMarcas.ts
"use server";

import { Marca, Prisma } from "@prisma/client";
import { MarcaSafe } from "../types";
import prisma from "@/lib/prismadb";

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
    console.log("//@/app/actions/_actionsMarcas.ts > " + error);
    return [];
  }
}

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

export async function createMarca(marca: MarcaSafe) {
  try {
    const created = await prisma.marca.create({
      data: {
        nombre: marca.nombre,
        info: marca.info,
      },
    });

    return created || null;
  } catch (error: any) {
    console.log("//@/app/actions/_actionsMarcas.ts/createMarca(): > " + error);
    return null;
  }
}

export async function updateMarca(marca: Marca) {
  try {
    const updated = await prisma.marca.update({
      where: { id: marca.id },
      data: { nombre: marca.nombre, info: marca.info },
    });

    return updated || null;
  } catch (error: any) {
    console.log("//@/app/actions/_actionsMarcas.ts/updateMarca(): > " + error);
    return null;
  }
}

export async function deleteMarca(marcaId: number) {
  try {
    if (!marcaId || typeof marcaId !== "number") {
      throw new Error("Invalid ID");
    }

    const deleted = await prisma.marca.delete({
      where: {
        id: marcaId,
      },
    });

    if (!deleted) {
      throw new Error("Marca no encontrado");
    }

    return deleted;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // El marca no existe
      if (error.code === "P2025") {
        throw new Error("Marca no encontrado");
      }
    }
    throw error;
  }
}
