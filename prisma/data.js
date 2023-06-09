//@/prisma/data.js

const clientes = [
  {
    nombre: "Vale - Lima Limon",
    info: "Para uso Interno",
  },
  {
    nombre: "Cliente 22",
    info: "Test",
  },
];

const proveedores = [
  {
    nombre: "Vale - Lima Limon",
    info: "Para uso Interno",
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

const cajas = [
  {
    id: 1,
    tipo: "Efectivo",
    nombre: "Efectivo",
    saldo: 0,
    estado: true,
    fechaApertura: new Date("2023-01-01 00:00:00.00"),
    fechaCierre: null,
  },
  {
    id: 2,
    tipo: "Electronico",
    nombre: "Electronico",
    saldo: 0,
    estado: true,
    fechaApertura: new Date("2023-01-01 00:00:00.00"),
    fechaCierre: null,
  },
];

module.exports = {
  clientes,
  proveedores,
  categorias,
  marcas,
  productos,
  cajas,
};
