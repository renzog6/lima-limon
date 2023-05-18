import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(
  request: Request,
  { params }: { params: { proveedorId: number } }
) {
  var proveedorId = Number(params.proveedorId);

  if (!proveedorId || typeof proveedorId !== "number") {
    throw new Error("Invalid ID");
  }

  const body = await request.json();
  const { nombre, info } = body;

  const res = await prisma.proveedor.update({
    where: {
      id: proveedorId,
    },
    data: {
      nombre,
      info,
    },
  });

  return NextResponse.json(res);
}

//Cambio de estado
export async function DELETE(
  request: Request,
  { params }: { params: { proveedorId: number } }
) {
  var proveedorId = Number(params.proveedorId);

  if (!proveedorId || typeof proveedorId !== "number") {
    throw new Error("Invalid ID");
  }

  const res = await prisma.proveedor.update({
    where: {
      id: proveedorId,
    },
    data: {
      estado: false,
    },
  });

  return NextResponse.json(res);
}

/* Borrado definitivo
export async function DELETE(
  request: Request,
  { params }: { params: { proveedorId: number } }
) {
  var proveedorId = Number(params.proveedorId);

  if (!proveedorId || typeof proveedorId !== "number") {
    throw new Error("Invalid ID");
  }

  const res = await prisma.proveedor.deleteMany({
    where: {
      id: proveedorId,
    },
  });

  return NextResponse.json(res);
}
*/
