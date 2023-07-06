//@/app/actions/getCajaAllMoviminetos.ts
import prisma from "@/lib/prismadb";

export async function getCajaAllMoviminetos(cajaIdx: number) {
  try {
    const cajaId = +cajaIdx;
    if (!cajaId || typeof cajaId !== "number") {
      throw new Error("Invalid ID");
    }

    const movimientos = await prisma.cajaMovimiento.findMany({
      where: { cajaId: cajaId },
      orderBy: {
        fecha: "asc",
      },
      include: {
        pago: { include: { proveedor: true } },
        cobro: { include: { cliente: true } },
      },
    });

    const safes = movimientos.map((mov) => ({
      ...mov,
      fecha: mov.fecha,
      quien:
        mov.pago != null
          ? mov.pago.proveedor.nombre
          : mov.cobro != null
          ? mov.cobro.cliente.nombre
          : undefined,
      pago: undefined,
      cobro: undefined,
    }));

    return safes;
  } catch (error: unknown) {
    console.log((error as Error).message);
    return [];
  }
}
