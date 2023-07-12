//@/api/compras/[compraId]/routes.ts
import { NextResponse } from "next/server";
import { CompraSafe } from "@/app/types";

import prisma from "@/lib/prismadb";

export async function GET(
  request: Request,
  { params }: { params: { compraId: number } }
) {
  try {
    var compraId = Number(params.compraId);

    if (!compraId || typeof compraId !== "number") {
      throw new Error("Invalid ID");
    }

    const compra = await prisma.compra.findFirst({
      where: {
        id: compraId,
      },
      include: {
        proveedor: true,
        pedidos: true,
      },
    });

    if (!compra) {
      throw new Error("Compra NO Existe!!!");
    }

    const compraSafe = {
      ...compra,
    } as CompraSafe;

    return NextResponse.json(compraSafe, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { compraId: number } }
) {
  try {
    var compraId = Number(params.compraId);

    if (!compraId || typeof compraId !== "number") {
      throw new Error("Invalid ID");
    }

    const compra = await prisma.compra.findUnique({
      where: { id: compraId },
      include: { pedidos: { include: { producto: true } } },
    });

    compra?.pedidos.map((item) => {
      sumarCantidadStockPedido(
        item.productoId,
        item.cantidad + item.producto.stock
      );
    });

    const res = await prisma.compra.delete({
      where: {
        id: compraId,
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
