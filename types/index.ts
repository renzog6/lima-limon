//@/app/types/index.ts
import { Producto } from "@prisma/client";

/**
 * Type Categoria
 */
export type CategoriaSafe = {
  id: number;
  nombre: string;
  info: string;
};

/**
 * Type Marca
 */
export type MarcaSafe = {
  id: number;
  nombre: string;
  info: string;
};

/**
 * Type Producto
 */
export type ProductoSafe = {
  id: number;
  nombre: string;
  info: string;
  precio: number;
  stock: number;

  marca: MarcaSafe;
  categoria: CategoriaSafe;
};

/**
 * Type Proveedor
 */
export type ProveedorSafe = {
  id: number;
  nombre: string;
  info: string | null;
  email: string | null;
  telefono: string | null;
  saldo: number;
};

/**
 * Type Cliente
 */
export type ClienteSafe = {
  id: number;
  nombre: string;
  info: string | null;
  email: string | null;
  telefono: string | null;
  saldo: number;
};

/**
 * Type Pedido
 */
export type PedidoSafe = {
  id: number;
  precio: number;
  cantidad: number;
  producto: ProductoSafe;
};

/**
 * Type Compra
 */
export type CompraSafe = {
  id: number;
  fecha: Date;
  info: string | null;
  total: number;
  proveedor: ProveedorSafe;
};

/**
 * Type Venta
 */
export type VentaSafe = {
  id: number;
  fecha: Date;
  info: string | "";
  estado: boolean;
  total: number;
  saldo: number;
  cliente: ClienteSafe;
};

/** 
import { NestedPick } from "ts-essentials";
export type VentaX = NestedPick<
  Prisma.VentaGetPayload<{ include: { cliente: true } }>,
  {
    id: true;
    fecha: true;
    total: true;
    saldo: true;
    cliente: {
      select: ClienteSafe;
    };
  }
>; 

export type ClienteSafe = Pick<Cliente, "id" | "nombre" | "info" | "saldo">;
*/

/**
 * Model Producto To Cart
 */
export type ProductoToCart = {
  id: number;
  nombre: string;
  info: string | null;
  precio: number;
  stock: number;
  marca: string;
  categoria: string;
};

export interface CartItem {
  product: Producto;
  qty: number;
}

export type CajaSafe = {
  id: number;
  tipo: TipoCaja;
  nombre: string;
  saldo: number;
};

enum TipoCaja {
  Efectivo,
  Electronico,
  Otra,
}

export type FormaPago = {
  Efectivo: any;
  Transferecia: any;
};

export type DataCobro = {
  isInterno: boolean;
  tipoCajaId: number;
  info: string;
  importe: number;
  fecha: Date;
  clienteId: number;
  ventaId: number;
  movimientoId: number;
};

export type DataPago = {
  isInterno: boolean;
  tipoCajaId: number;
  info: string;
  importe: number;
  fecha: Date;
  proveedorId: number;
  compraId: number;
  movimientoId: number;
};

export type DataCompra = {
  fecha: Date;
  info: string | null;
  proveedorId: number;
  total: number;
  saldo: number;
  cartItems: CartItem[];
};

export type DataVenta = {
  fecha: Date;
  info: string | null;
  clienteId: number;
  total: number;
  saldo: number;
  cartItems: CartItem[];
};

export type CajaMovimientoSafe = {
  fecha: Date;
  tipo: string;
  importe: number;
  info: string | null;
  desdeCajaId: number;
  hastaCajaId: number;
};
