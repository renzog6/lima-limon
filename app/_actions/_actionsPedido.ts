//@/app/actions/getDetalleCompraById.ts
import prisma from "@/lib/prismadb";
import { PedidoSafe } from "../types";

export async function getDetalleCompraById(
  compraId: number,
  pgnumIdx?: number,
  pgsizeIdx?: number
): Promise<PedidoSafe[]> {
  try {
    const validCompraId = Number(compraId);
    if (isNaN(validCompraId)) {
      throw new Error("El compraId debe ser un número válido.");
    }

    const pgnum = +(pgnumIdx ?? 0);
    const pgsize = +(pgsizeIdx ?? 15);
    if (isNaN(pgnum) || isNaN(pgsize)) {
      throw new Error("pgnumIdx y pgsizeIdx deben ser números válidos.");
    }

    const pedidos = await prisma.pedido.findMany({
      where: { compraId: validCompraId },
      skip: pgnum * pgsize,
      take: pgsize,
      include: {
        producto: { include: { categoria: true, marca: true } },
      },
    });

    const safePedidos = pedidos.map((pedido) => ({
      id: pedido.id,
      precio: pedido.precio,
      cantidad: pedido.cantidad,
      producto: {
        id: pedido.producto.id,
        nombre: pedido.producto.nombre,
        info: pedido.producto.info,
        precio: pedido.producto.precio,
        stock: pedido.producto.stock,
        categoria: {
          id: pedido.producto.categoria.id,
          nombre: pedido.producto.categoria.nombre ?? "S/N",
          info: pedido.producto.marca.nombre ?? "",
        },
        marca: {
          id: pedido.producto.marca.id,
          nombre: pedido.producto.marca.nombre ?? "S/N",
          info: pedido.producto.marca.nombre ?? "",
        },
      },
    }));

    return safePedidos;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

export async function getDetalleVentaById(
  ventaId: number,
  pgnumIdx?: number,
  pgsizeIdx?: number
): Promise<PedidoSafe[]> {
  try {
    const validVentaId = Number(ventaId);
    if (isNaN(validVentaId)) {
      throw new Error("El ventaId debe ser un número válido.");
    }

    const pgnum = +(pgnumIdx ?? 0);
    const pgsize = +(pgsizeIdx ?? 15);
    if (isNaN(pgnum) || isNaN(pgsize)) {
      throw new Error("pgnumIdx y pgsizeIdx deben ser números válidos.");
    }

    const pedidos = await prisma.pedido.findMany({
      where: { ventaId: validVentaId },
      skip: pgnum * pgsize,
      take: pgsize,
      include: {
        producto: { include: { categoria: true, marca: true } },
      },
    });

    const safePedidos = pedidos.map((pedido) => ({
      id: pedido.id,
      precio: pedido.precio,
      cantidad: pedido.cantidad,
      producto: {
        id: pedido.producto.id,
        nombre: pedido.producto.nombre,
        info: pedido.producto.info,
        precio: pedido.producto.precio,
        stock: pedido.producto.stock,
        categoria: {
          id: pedido.producto.categoria.id,
          nombre: pedido.producto.categoria.nombre ?? "S/N",
          info: pedido.producto.marca.info || "",
        },
        marca: {
          id: pedido.producto.marca.id,
          nombre: pedido.producto.marca.nombre ?? "S/N",
          info: pedido.producto.marca.info || "",
        },
      },
    }));

    return safePedidos;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

export async function sumarCantidadStockPedido(
  productoId: number,
  newStock: number
) {
  await prisma.producto.update({
    where: { id: productoId },
    data: { stock: newStock },
  });
}
