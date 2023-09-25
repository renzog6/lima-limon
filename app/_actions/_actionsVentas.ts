//@/app/actions/_actionsVentas.ts
import prisma from "@/lib/prismadb";
import { Venta } from "@prisma/client";
import { VentaSafe } from "@/types";

export async function getVentas(): Promise<Venta[]> {
  try {
    const ventas = await prisma.venta.findMany({
      where: { estado: true },
      orderBy: {
        fecha: "desc",
      },
      include: {
        cliente: true,
      },
    });

    return ventas || [];
  } catch (error: any) {
    console.log("//@/app/actions/_actionsVentas.ts/getVentas(): > " + error);
    return [];
  }
}

export async function getVentasSafe(): Promise<VentaSafe[]> {
  try {
    const ventas = await prisma.venta.findMany({
      where: { estado: true },
      orderBy: {
        fecha: "desc",
      },
      include: {
        cliente: true,
      },
    });

    const safe: VentaSafe[] = ventas.map((venta) => ({
      id: venta.id,
      fecha: venta.fecha,
      info: venta.info,
      estado: venta.estado,
      total: venta.total,
      saldo: venta.saldo,
      cliente: {
        id: venta.cliente.id,
        nombre: venta.cliente.nombre,
        info: venta.cliente.info,
        email: venta.cliente.email,
        telefono: venta.cliente.telefono,
        saldo: venta.cliente.saldo,
      },
    }));

    return safe || [];
  } catch (error: any) {
    console.log(
      "//@/app/actions/_actionsVentas.ts/getVentasSafe(): > " + error
    );
    return [];
  }
}
