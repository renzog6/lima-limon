import prisma from "@/lib/prismadb";

export interface IclientesParams {
  nombre?: string;
  info?: string;
  estado?: boolean;
}

export default async function getclientes() {
  try {
    // const { nombre, info, estado, } = params;

    let query: any = {};
    /*
    if (userId) {
      query.userId = userId;
    }
*/

    const clientes = await prisma.cliente.findMany({
      where: { estado: true },
      orderBy: {
        nombre: "desc",
      },
    });

    const safeclientes = clientes.map((cliente) => ({
      ...cliente,
      //createdAt: cliente.createdAt.toISOString(),
    }));

    return safeclientes;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
