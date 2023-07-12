//@/app/api/proveedores/updateClienteSaldo.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function updateProveedor(proveedorId, importe) {
  try {
    const proveedor = await prisma.proveedor.findUnique({
      where: { id: Number(proveedorId) },
    });
    if (!proveedor) {
      return NextResponse.json(
        { error: "The proveedor does not exist" },
        { status: 404 }
      );
    }

    const update = await prisma.proveedor.update({
      where: { id: proveedor.id },
      data: { saldo: proveedor.saldo + importe },
    });

    return NextResponse.json(update);
  } catch (error: any) {
    throw new Error(error);
  }
}
