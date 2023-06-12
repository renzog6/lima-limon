//@/app/api/cajas/updateCajas.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function updateCajas(cajaNombre) {
  try {
    const tipoCaja = await prisma.caja.findFirst({
      where: { nombre: cajaNombre },
      include: {
        ingresos: true,
        egresos: true,
      },
    });
    if (!tipoCaja) {
      return NextResponse.json(
        { error: "The caja does not exist" },
        { status: 404 }
      );
    }

    const sumIngresos = tipoCaja.ingresos.reduce(
      (sum, ingreso) => sum + ingreso.monto,
      0.0
    );

    const sumEgresos = tipoCaja.egresos.reduce(
      (sum, egreso) => sum + egreso.monto,
      0.0
    );

    const update = await prisma.caja.update({
      where: { id: tipoCaja.id },
      data: { saldo: sumIngresos - sumEgresos },
    });

    return NextResponse.json(update);
  } catch (error: any) {
    throw new Error(error);
  }
}
