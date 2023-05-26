import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const proveedores = await prisma.proveedor.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "asc",
      },
    });
    const safeproveedores = proveedores.map((proveedor) => ({
      ...proveedor,
      //createdAt: proveedor.createdAt.toISOString(),
    }));

    return NextResponse.json(proveedores);
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
