//@/app/actions/_actionsClientes.ts
import prisma from "@/lib/prismadb";

export async function updateClienteSaldo(clienteId, importe) {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(clienteId) },
    });
    if (!cliente) {
      throw new Error("Cliente NO Exite.");
    }

    const updated = await prisma.cliente.update({
      where: { id: cliente.id },
      data: { saldo: cliente.saldo + importe },
    });

    return updated;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getDetalleClienteById(
  clienteId: number,
  pgnumIdx?: number,
  pgsizeIdx?: number
) {
  try {
    const validClienteId = Number(clienteId);
    if (isNaN(validClienteId)) {
      throw new Error("El clienteId debe ser un número válido.");
    }

    const pgnum = +(pgnumIdx ?? 0);
    const pgsize = +(pgsizeIdx ?? 15);
    if (isNaN(pgnum) || isNaN(pgsize)) {
      throw new Error("pgnumIdx y pgsizeIdx deben ser números válidos.");
    }

    const ventas = await prisma.venta.findMany({
      where: { clienteId: validClienteId, estado: true },
      skip: pgnum * pgsize,
      take: pgsize,
      orderBy: {
        fecha: "desc",
      },
      include: {
        pedidos: true,
      },
    });

    const safeVentas = ventas.map((venta) => ({
      fecha: venta.fecha,
      tipo: "Venta",
      importe: venta.total,
      saldo: venta.saldo,
    }));

    const cobros = await prisma.cobro.findMany({
      where: { clienteId: +clienteId },
      skip: pgnum * pgsize,
      take: pgsize,
      orderBy: {
        fecha: "desc",
      },
      include: {
        movimiento: true,
      },
    });

    const safeCobros = cobros.map((cobro) => ({
      fecha: cobro.fecha,
      tipo: "Cobro",
      importe: cobro.movimiento?.importe ?? 0,
      saldo: 0,
    }));

    const mergedData = safeVentas.concat(safeCobros);
    mergedData.sort((a, b) => (a.fecha > b.fecha ? -1 : 1));

    return mergedData;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}
