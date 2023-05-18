"use client";
import getClientes from "@/app/actions/getClientes";
import React, { useId, useEffect, useState } from "react";
import Select from "react-select";

const SelectCliente = () => {
  const [value, setValue] = useState("");
  const [optionsx, setOptionsx] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      const res = await fetch(`http://localhost:3000/api/clientes`, {
        cache: "no-store",
      });
      const clientes = await res.json();

      const formatted = clientes.map((item) => ({
        id: item.id,
        value: item.id,
        label: item.nombre + " - " + item.id,
      }));
      setOptionsx(formatted);
    };
    getAll();
  }, []);

  const x = getClientes;

  const handle = ({ e }) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Select
        instanceId={useId()}
        defaultValue={value}
        onChange={(e) => {
          handle(e.target.value);
        }}
        options={optionsx}
      />
    </>
  );
};

export default SelectCliente;
