//@/api/compras/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

/**
 * GET - List All Compras
 *
 * @returns  {Array<Object>} An array of order objects
 */
export async function GET() {
  try {
    const compras = await prisma.compra.findMany({
      where: { estado: true },
      orderBy: {
        fecha: "asc",
      },
      include: {
        pedidos: true,
        proveedor: true,
      },
    });

    const safe = compras.map((compra) => ({
      ...compra,
      //fecha: compra.fecha !== null ? compra.fecha.toLocaleDateString() : null,
      //proveedor: compra.proveedor.nombre,
    }));

    return NextResponse.json(safe);
    //return NextResponse.json({ message: "OK", safe }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

/**
 * POST /compras - Create a new Compra
 *
 * @param req Datos para crear la compra
 * @returns {Object} The created order object
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { fecha, info, compraId, total, saldo, cartItems } = data;

    // Validate the data
    if (!fecha) {
      return NextResponse.json(
        { error: "Please provide an order date" },
        { status: 400 }
      );
    }
    if (!compraId) {
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
      where: { id: Number(compraId) },
    });
    if (!customer) {
      return NextResponse.json(
        { error: "The customer does not exist" },
        { status: 404 }
      );
    }

    // Create the order
    const order = await prisma.compra.create({
      data: {
        fecha: fecha,
        proveedor: { connect: { id: Number(compraId) } },
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
          compraId: order.id,
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
    updateClienteSaldo(compraId, total);

    return NextResponse.json({ data: order }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

/**
 * PUT /compras/:id - Update an existing compra
 *
 * @param req
 * @returns {Object} The updated compra
 */
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, fecha, info, compraId, total, saldo, cartItems } = data;

    if (!id || typeof id !== "number") {
      throw new Error("Invalid ID");
    }

    const compra = await prisma.compra.update({
      where: { id },
      data: {
        fecha: fecha,
        proveedor: { connect: { id: Number(compraId) } },
        info: info,
      },
    });

    return NextResponse.json(compra, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
function updateClienteSaldo(compraId: any, total: any) {
  throw new Error("Function not implemented.");
}
