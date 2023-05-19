import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const productos = await prisma.producto.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
      include: {
        categoria: true,
      },
    });

    const safe = productos.map((producto) => ({
      ...producto,
      categoria: producto.categoria.nombre,
    }));
    return NextResponse.json(safe);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { nombre, info, precio, stock, categoriaId, marcaId, proveedorId } =
    body;

  // Verificar si el nombre del producto está repetido
  const existingProducto = await prisma.producto.findFirst({
    where: { nombre: nombre },
  });

  if (existingProducto) {
    return NextResponse.json(
      { error: "El nombre del producto ya está en uso" },
      { status: 400 }
    );
  }

  const res = await prisma.producto.create({
    data: {
      nombre,
      info,
      precio: Number(precio),
      stock: Number(stock),
      categoria: {
        connect: { id: Number(categoriaId) }, // Conecta con la categoría existente usando el ID
      },
      marca: {
        connect: { id: Number(marcaId) }, // Conecta con la marca existente usando el ID
      },
      proveedor: {
        connect: { id: Number(proveedorId) }, // Conecta con la marca existente usando el ID
      },
    },
  });

  console.log("routes ::: " + JSON.stringify(res));
  return NextResponse.json(res);
}
