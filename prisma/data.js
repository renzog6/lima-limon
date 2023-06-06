const { Prisma } = require("@prisma/client");

const clientes = [
  {
    nombre: "Cliente 11",
    info: "Test",
  },
  {
    nombre: "Cliente 22",
    info: "Test",
  },
];

const proveedores = [
  {
    nombre: "Proveedor 00",
    info: "Test",
  },
  {
    nombre: "Proveedor 33",
    info: "Test",
  },
];

const categorias = [
  {
    nombre: "Textil - 250ml",
    info: "Test",
  },
  {
    nombre: "Difusor - 500ml",
    info: "Test",
  },
  {
    nombre: "Sahumerio - x 6u",
    info: "Test",
  },
];

const marcas = [
  {
    nombre: "Saphirus",
    info: "",
  },
  {
    nombre: "AMBAR",
    info: "",
  },
  {
    nombre: "Test",
    info: "Test",
  },
];

const productos = [
  {
    nombre: "Cacao 11",
    info: "Test",
    categoriaId: 1,
    marcaId: 1,
    proveedorId: 1,
    stock: 6,
    precio: 500,
  },
  {
    nombre: "Limon 33",
    info: "Test",
    categoriaId: 2,
    marcaId: 2,
    proveedorId: 1,
    stock: 9,
    precio: 900,
  },
  {
    nombre: "Bambu 55",
    info: "Test",
    categoriaId: 3,
    marcaId: 1,
    proveedorId: 1,
    stock: 15,
    precio: 300,
  },
];

module.exports = {
  clientes,
  proveedores,
  categorias,
  marcas,
  productos,
};
