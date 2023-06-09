import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const proveedores = await prisma.proveedor.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
      include: {
        marcas: {
          include: {
            marcas: true,
          },
        },
      },
    });

    const safeProveedores = proveedores.map((proveedor) => ({
      ...proveedor,
      marcas: proveedor.marcas.map((proveedorMarca) => proveedorMarca.marcas),
      proveedores_marcas: undefined, // Eliminar el campo proveedores_marcas
    }));

    return NextResponse.json(safeProveedores);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function POST(request: Request) {
  /*  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
*/
  const body = await request.json();
  const { nombre, info } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const res = await prisma.proveedor.create({
    data: {
      nombre,
      info,
    },
  });

  return NextResponse.json(res);
}
