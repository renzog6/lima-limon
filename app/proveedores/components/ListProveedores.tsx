import React from "react";

const ListProveedores = async () => {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/proveedores`, {
    cache: "no-store",
  });
  const list = await res.json();

  return (
    <div>
      ListProveedores
      <div>{JSON.stringify(list)}</div>
    </div>
  );
};

export default ListProveedores;
