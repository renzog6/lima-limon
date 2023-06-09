//@/api/ventas/pedidos/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    var ventaId = Number(searchParams.get("ventaId")); //Number(params.ventaId);

    if (!ventaId || typeof ventaId !== "number") {
      throw new Error("Invalid ID");
    }

    const pedidos = await prisma.pedido.findMany({
      where: { ventaId: ventaId },
      include: {
        producto: true,
      },
    });

    const safe = pedidos.map((item) => ({
      ...item,
      producto: item.producto.nombre,
    }));

    return NextResponse.json(safe);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fecha, info, clienteId, total, cartItems } = body;

    const venta = await prisma.venta.create({
      data: {
        fecha: fecha,
        info: info,
        estado: true,
        total: total,
        cliente: {
          connect: { id: Number(clienteId) }, // Conecta con la categoría existente usando el ID
        },
      },
    });
    const listPedidos = cartItems.map((item) => ({
      productoId: item.product.id,
      cantidad: item.qty,
      precio: item.product.precio,
      ventaId: venta.id,
    }));

    const resPedido = await prisma.pedido.createMany({
      data: listPedidos,
    });

    return NextResponse.json(venta, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, fecha, info } = body;

    if (!id || typeof id !== "number") {
      throw new Error("Invalid ID");
    }

    const venta = await prisma.venta.update({
      where: { id },
      data: { fecha, info },
    });

    return NextResponse.json(venta, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
