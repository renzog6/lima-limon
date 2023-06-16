import { Categoria, Pedido, Producto, Venta } from "@prisma/client";

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

export type FormaPago = {
  Efectivo;
  Transferecia;
};

/*
export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "res"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  res: SafeListing;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
*/
