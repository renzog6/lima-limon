//@/app/api/ventas/pedidos/getPedidos.ts
import { notFound } from "next/navigation";

const apiUrl = `${process.env.apiUrl}/ventas/pedidos`;

export async function getPedidos({ ventaId }: { ventaId?: number } = {}) {
  try {
    const res = await fetch(`${apiUrl}${ventaId ? `?ventaId=${ventaId}` : ""}`);

    if (!res.ok) {
      // Render the closest `error.js` Error Boundary
      throw new Error("Something went wrong!");
    }

    const pedidos = await res.json();

    if (pedidos.length === 0) {
      // Render the closest `not-found.js` Error Boundary
      notFound();
    }

    return pedidos;
  } catch (error) {
    return [];
  }
}
