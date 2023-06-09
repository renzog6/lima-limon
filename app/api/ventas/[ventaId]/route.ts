//@/api/ventas/[ventaId]/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { VentaSafe } from "@/app/types";

export async function GET(
  request: Request,
  { params }: { params: { ventaId: number } }
) {
  try {
    var ventaId = Number(params.ventaId);

    if (!ventaId || typeof ventaId !== "number") {
      throw new Error("Invalid ID");
    }

    const venta = await prisma.venta.findFirst({
      where: {
        id: ventaId,
      },
      include: {
        cliente: true,
        pedidos: true,
      },
    });

    if (!venta) {
      throw new Error("Venta NO Existe!!!");
    }

    const ventaSafe = {
      ...venta,
    } as VentaSafe;

    return NextResponse.json(ventaSafe, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { ventaId: number } }
) {
  try {
    var ventaId = Number(params.ventaId);

    if (!ventaId || typeof ventaId !== "number") {
      throw new Error("Invalid ID");
    }

    const venta = await prisma.venta.findUnique({
      where: { id: ventaId },
      include: { pedidos: { include: { producto: true } } },
    });

    venta?.pedidos.map((item) => {
      sumarCantidadStockPedido(
        item.productoId,
        item.cantidad + item.producto.stock
      );
    });

    const res = await prisma.venta.delete({
      where: {
        id: ventaId,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

async function sumarCantidadStockPedido(productoId: number, newStock: number) {
  await prisma.producto.update({
    where: { id: productoId },
    data: { stock: newStock },
  });
}
