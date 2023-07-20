//@/app/productos/addProductos.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Categoria, Marca, Proveedor } from "@prisma/client";
import { addProducto } from "@/app/hooks/useProductos";
import { getCategorias } from "@/app/hooks/useCategorias";
import { getProveedores } from "@/app/hooks/useProveedores";
import { getMarcas } from "@/app/_actions/_actionsMarcas";

export default function AddProducto() {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // you can do async server request and fill up form
    setTimeout(() => {
      reset({
        precio: 0.0,
        stock: 0,
      });
    }, 1000);

    //Carga Lista de Categorias
    async function fetchCategorias() {
      const categorias = await getCategorias();
      setCategorias(categorias);
    }
    fetchCategorias();

    //Carga Lista de Marcas
    async function fetchMarcas() {
      const marcas = await getMarcas();
      setMarcas(marcas);
    }
    fetchMarcas();

    //Carga Lista de Proveedores
    async function fetchProveedores() {
      const proveedores = await getProveedores();
      setProveedores(proveedores);
    }
    fetchProveedores();
  }, [reset]);

  async function onSubmit(data) {
    setIsMutating(true);

    const producto = {
      nombre: data.nombre,
      info: data.info,
      precio: data.precio,
      stock: data.stock,
      categoriaId: data.categoriaId,
      marcaId: data.marcaId,
      proveedorId: data.proveedorId,
    };

    const res = await addProducto(producto);
    if (res.success) {
      // La solicitud fue exitosa, puedes acceder a los datos con res.data
      console.log("El producto se ha guardado exitosamente:", res.data);
    } else {
      // Hubo un error en la solicitud, puedes acceder al objeto de error con res.error
      console.log("Error al guardar el producto:", res.error);
    }

    router.refresh();
    setIsMutating(false);
    reset();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-sm btn-secondary" onClick={handleChange}>
        Agregar
      </button>

      <input
        id="modal"
        aria-label="modal"
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Agregar Producto</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="font-bold label">Proveedor</label>
              <select
                {...register("proveedorId", { required: true })}
                className="w-full input input-bordered"
              >
                <option value="">Proveedor</option>
                {proveedores.map((proveedor) => (
                  <option key={proveedor.id} value={proveedor.id}>
                    {proveedor.id} - {proveedor.nombre}
                  </option>
                ))}
              </select>
              {errors.marcaId && (
                <span className="text-red-500 error">*Requerido</span>
              )}
            </div>
            <div className="form-control">
              <label className="font-bold label">Marca</label>
              <select
                {...register("marcaId", { required: true })}
                className="w-full input input-bordered"
              >
                <option value="">Seleccione una Marca</option>
                {marcas.map((marca) => (
                  <option key={marca.id} value={marca.id}>
                    {marca.id} - {marca.nombre}
                  </option>
                ))}
              </select>
              {errors.marcaId && (
                <span className="text-red-500 error">*Requerido</span>
              )}
            </div>
            <div className="form-control">
              <label className="font-bold label">Categoría</label>
              <select
                {...register("categoriaId", { required: true })}
                className="w-full input input-bordered"
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.id} - {categoria.nombre}
                  </option>
                ))}
              </select>
              {errors.categoriaId && (
                <span className="text-red-500 error">*Requerido</span>
              )}
            </div>
            <div className="form-control">
              <label className="font-bold label">Nombre</label>
              <input
                type="text"
                {...register("nombre", { required: true })}
                className="w-full input input-bordered"
                placeholder="Nombre del producto"
              />
              {errors.nombre && <span className="error">*Requerido</span>}
            </div>
            <div className="flex flex-row form-control">
              <div className="pr-1 form-control basis-1/2">
                <label className="font-bold label">Precio</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("precio")}
                  className="w-full input input-bordered"
                  placeholder="Precio"
                />
                {errors.precio && <span className="error">*Requerido</span>}
              </div>
              <div className="pl-1 form-control basis-1/2">
                <label className="font-bold label">Cantidad</label>
                <input
                  type="number"
                  {...register("stock")}
                  className="w-full input input-bordered"
                  placeholder="Cantidad"
                />
                {errors.stock && <span className="error">*Requerido</span>}
              </div>
            </div>
            <div className="form-control">
              <label className="font-bold label">Info</label>
              <input
                type="text"
                {...register("info")}
                className="w-full input input-bordered"
                placeholder="Info"
              />
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Cerrar
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Guardando...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
