//@/app/types/index.ts
import { Caja, Categoria, Pedido, Producto, Venta } from "@prisma/client";

/**
 * Model Producto
 *
 */
export type ProductoToCart = Omit<
  Producto,
  "createdAt" | "updatedAt" | "ventaId" | "proveedorId"
> & {
  id: number;
  nombre: string;
  info: string | null;
  precio: number;
  stock: number;
  marca: string;
  categoria: string;
  estado: boolean | null;
};

export type SafePedido = Omit<
  Pedido,
  "createdAt" | "updatedAt" | "ventaId" | "proveedorId"
> & {
  id: number;
  precio: number;
  cantidad: number;
  producto: string;
};

export type SafeVenta = Omit<Venta, "createdAt" | "updatedAt" | "clienteId"> & {
  id: number;
  fecha: Date;
  info: string;
  estado: boolean;
  total: number;
  saldo: number;
  cliente: String;
};

export type SafeCategoria = Omit<Categoria, "estado"> & {
  estado: true;
};
export interface CartItem {
  product: Producto;
  qty: number;
}

export interface CajaSimple {
  id: number;
  nombre: string | "";
}

export type FormaPago = {
  Efectivo;
  Transferecia;
};

export type CajaMovimientoSafe = {
  fecha: Date;
  tipo: string;
  importe: number;
  info: string | null;
  desdeCajaId: number;
  hastaCajaId: number;
};
