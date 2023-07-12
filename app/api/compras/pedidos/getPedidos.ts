//@/app/api/compras/pedidos/getPedidos.ts
import { notFound } from "next/navigation";

const apiUrl = `${process.env.apiUrl}/compras/pedidos`;

export async function getPedidos({ compraId }: { compraId?: number } = {}) {
  try {
    const res = await fetch(
      `${apiUrl}${compraId ? `?compraId=${compraId}` : ""}`
    );

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
