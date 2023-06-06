const { PrismaClient } = require("@prisma/client");
const {
  clientes,
  proveedores,
  categorias,
  marcas,
  productos,
} = require("./data.js");
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.producto.deleteMany();
    console.log("Deleted records in productos table");
    await prisma.$queryRaw`ALTER TABLE Productos AUTO_INCREMENT = 1`;
    console.log("reset Productos auto increment to 1");

    await prisma.cliente.deleteMany();
    console.log("Deleted records in clientes table");
    await prisma.$queryRaw`ALTER TABLE Clientes AUTO_INCREMENT = 1`;
    console.log("reset Cliente auto increment to 1");

    await prisma.proveedor.deleteMany();
    console.log("Deleted records in proveedores table");
    await prisma.$queryRaw`ALTER TABLE Proveedores AUTO_INCREMENT = 1`;
    console.log("reset Proveedores auto increment to 1");

    await prisma.categoria.deleteMany();
    console.log("Deleted records in categorias table");
    await prisma.$queryRaw`ALTER TABLE Categorias AUTO_INCREMENT = 1`;
    console.log("reset Categorias auto increment to 1");

    await prisma.marca.deleteMany();
    console.log("Deleted records in marcas table");
    await prisma.$queryRaw`ALTER TABLE Marcas AUTO_INCREMENT = 1`;
    console.log("reset Marcas auto increment to 1");

    await prisma.cliente.createMany({
      data: clientes,
    });
    console.log("Added clientes data");
    await prisma.proveedor.createMany({
      data: proveedores,
    });
    console.log("Added proveedores data");
    await prisma.categoria.createMany({
      data: categorias,
    });
    console.log("Added categorias data");
    await prisma.marca.createMany({
      data: marcas,
    });
    console.log("Added marcas data");
    await prisma.producto.createMany({
      data: productos,
    });
    console.log("Added productos data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
