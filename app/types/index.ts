import { Categoria, Producto } from "@prisma/client";

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
