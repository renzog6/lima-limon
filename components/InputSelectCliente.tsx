//@/componet/InputSelect.tsx

import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { getClientes } from "@/app/_actions/crud/crudCliente";
import { ClienteSafe } from "@/types";

interface Props {
  onSelectChange: (cliente: ClienteSafe) => void;
  className?: string;
}

const initialCliente: ClienteSafe = {
  id: 0,
  nombre: "Empty",
  info: null,
  email: null,
  telefono: null,
  saldo: 0,
};

export const InputSelectCliente = ({ onSelectChange, className }: Props) => {
  const [clientes, setClientes] = useState<ClienteSafe[]>([]);
  const [selected, setSelected] = useState<ClienteSafe>(initialCliente);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    async function fetchClientes() {
      try {
        const data = await getClientes();
        setClientes(data);
        //setSelected(data[0] || null);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    }
    fetchClientes();
  }, []);

  const filteredPeople =
    query === ""
      ? clientes
      : clientes.filter((cliente: ClienteSafe) =>
          cliente.nombre
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <>
      <Combobox
        value={selected}
        onChange={(cliente) => {
          setSelected(cliente);
          onSelectChange(cliente);
        }}
      >
        <div className="relative mt-1">
          <div className="relative w-full overflow-hidden text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none focus:ring-0"
              displayValue={(cliente: ClienteSafe) => cliente.nombre}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((cliente: ClienteSafe) => (
                  <Combobox.Option
                    key={cliente.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={cliente}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {cliente.nombre}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </>
  );
};
