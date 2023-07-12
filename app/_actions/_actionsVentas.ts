//@/app/actions/_actionsVentas.ts
import prisma from "@/lib/prismadb";
import { Venta } from "@prisma/client";

export async function getVentas(): Promise<Venta[]> {
  try {
    const ventas = await prisma.venta.findMany({
      where: { estado: true },
      orderBy: {
        fecha: "asc",
      },
      include: {
        cliente: true,
      },
    });

    return ventas || [];
  } catch (error: any) {
    console.log("//@/app/actions/_actionsVentas.ts > " + error);
    return [];
  }
}
