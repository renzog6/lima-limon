import { Categoria, Producto } from "@prisma/client";

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

export type SafeCategoria = Omit<Categoria, "estado"> & {
  estado: true;
};

export interface Product {
  id: number;
  name: string;
  price: number;
  imagePath: string;
}

export interface CartItem {
  product: Producto;
  qty: number;
}

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
