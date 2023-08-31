//@/app/actions/_actionsProveedores.ts
"use server";

import prisma from "@/lib/prismadb";

/**
 *
 * @param proveedorId
 * @param importe
 * @returns
 */
export async function updateSaldoProveedor(proveedorId, importe) {
  try {
    const proveedor = await prisma.proveedor.findUnique({
      where: { id: Number(proveedorId) },
    });

    if (!proveedor) {
      throw new Error("Provedor No exite!!!");
    }

    const update = await prisma.proveedor.update({
      where: { id: proveedor.id },
      data: { saldo: proveedor.saldo + importe },
    });

    return update;
  } catch (error: any) {
    throw new Error(error);
  }
}
