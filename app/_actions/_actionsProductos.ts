//@/app/actions/_actionsProductos.ts
"use server";

import prisma from "@/lib/prismadb";
import { ProductoToCart } from "@/types";

export async function getProductosToCart() {
  try {
    //const pgnum = +(searchParams.get("pgnum") ?? 0);
    //const pgsize = +(searchParams.get("pgsize") ?? 15);

    const productos = await prisma.producto.findMany({
      where: {
        estado: true,
        stock: {
          not: {
            equals: 0,
          },
        },
      },
      //skip: pgnum * pgsize,
      //take: pgsize,
      orderBy: {
        nombre: "asc",
      },
      include: {
        categoria: true,
        marca: true,
      },
    });

    const safe: ProductoToCart[] = productos.map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      info: producto.info,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria.nombre,
      marca: producto.marca.nombre,
    }));
    return safe as ProductoToCart[];
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
