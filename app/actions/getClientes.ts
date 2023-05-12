export default async function getclientes() {
  try {
    const res = await fetch(`http://localhost:3000/api/clientes`, {
      cache: "no-store",
    });
    const clientes = await res.json();

    const formatted = clientes.map((item) => ({
      value: item.id,
      label: item.nombre,
    }));

    return formatted;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
