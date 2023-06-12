//@/api/ventas/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { updateClientes } from "../clientes/updateClientes";

export async function GET() {
  try {
    const ventas = await prisma.venta.findMany({
      where: { estado: true },
      orderBy: {
        fecha: "asc",
      },
      include: {
        pedidos: true,
        cliente: true,
      },
    });

    const safe = ventas.map((venta) => ({
      ...venta,
      fecha: venta.fecha !== null ? venta.fecha.toLocaleDateString() : null,
      cliente: venta.cliente.nombre,
    }));

    return NextResponse.json(safe);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { fecha, info, clienteId, total, saldo, cartItems } = data;

    // Validate the data
    if (!fecha) {
      return NextResponse.json(
        { error: "Please provide an order date" },
        { status: 400 }
      );
    }
    if (!clienteId) {
      return NextResponse.json(
        { error: "Please provide a customer id" },
        { status: 400 }
      );
    }
    if (!Number.isInteger(total) || total <= 0) {
      return NextResponse.json(
        { error: "Please provide a positive order total" },
        { status: 400 }
      );
    }

    // Check if the customer exists
    const customer = await prisma.cliente.findUnique({
      where: { id: Number(clienteId) },
    });
    if (!customer) {
      return NextResponse.json(
        { error: "The customer does not exist" },
        { status: 404 }
      );
    }

    // Create the order
    const order = await prisma.venta.create({
      data: {
        fecha: fecha,
        cliente: { connect: { id: Number(clienteId) } },
        total: total,
        saldo: saldo,
        info: info,
      },
    });

    // Create the order details
    for (const item of cartItems) {
      await prisma.pedido.create({
        data: {
          productoId: item.product.id,
          cantidad: item.qty,
          precio: item.product.precio,
          ventaId: order.id,
        },
      });
    }

    // Update the stock
    for (const item of cartItems) {
      await prisma.producto.update({
        where: { id: item.product.id },
        data: { stock: item.product.stock - item.qty },
      });
    }

    //Actualiza el saldo del Cliente
    updateClientes(clienteId, total);

    return NextResponse.json({ data: order }, { status: 201 });
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
