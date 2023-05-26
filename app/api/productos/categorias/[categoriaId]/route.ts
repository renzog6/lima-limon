//@/api/productos/categorias/[categoriaId]/routes.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function DELETE(
  request: Request,
  { params }: { params: { categoriaId: number } }
) {
  try {
    var categoriaId = Number(params.categoriaId);

    if (!categoriaId || typeof categoriaId !== "number") {
      throw new Error("Invalid ID");
    }

    const res = await prisma.categoria.deleteMany({
      where: {
        id: categoriaId,
      },
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
/** 
export async function DELETE(req: NextApiRequest) {
  try {
    //const { searchParams } = new URL(req.url);
    //const id = searchParams.get("id");

    const id = req.query.id;
    console.log("XXXXXXXXXXXXXX " + id);
    await prisma.categoria.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true }, { status: 204 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
*/
