import { Categoria } from "@prisma/client";

export type SafeCategoria = Omit<Categoria, "estado"> & {
  estado: true;
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
