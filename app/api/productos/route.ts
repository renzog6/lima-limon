//@/api/productos/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const pgnum = +(searchParams.get("pgnum") ?? 0);
    const pgsize = +(searchParams.get("pgsize") ?? 15);

    const productos = await prisma.producto.findMany({
      where: { estado: true },
      skip: pgnum * pgsize,
      take: pgsize,
      orderBy: {
        nombre: "asc",
      },
      include: {
        categoria: true,
        marca: true,
      },
    });

    const safe = productos.map((producto) => ({
      ...producto,
      categoria: producto.categoria.nombre,
      marca: producto.marca.nombre,
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
