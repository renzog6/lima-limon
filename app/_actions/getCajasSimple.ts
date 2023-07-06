//@/app/actions/getDetalleClienteById.ts
import prisma from "@/lib/prismadb";

export async function getCajasSimple() {
  try {
    const cajas = await prisma.caja.findMany({
      where: { estado: true },
      orderBy: {
        tipo: "asc",
      },
      select: {
        id: true,
        nombre: true,
      },
    });

    return cajas ?? [];
  } catch (error: any) {
    console.log(error);
    return [];
  }
}
