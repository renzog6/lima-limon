//@/components/InputSelect.tsx
"use client";

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { CajaSafe } from "@/app/types";

const InputSelectCajas = ({ cajas, onChange }) => {
  //const cajas = data.map((item) => ({ id: item.id, nombre: item.tipo }));
  const [selected, setSelected] = useState<CajaSafe | null>(null);

  const [query, setQuery] = useState<string>("");

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCajaChange = (caja) => {
    setSelected(caja);
    onChange(caja); // Llama a la función onChange pasando el nuevo valor de la fecha
  };

  const filteredPeople =
    query === ""
      ? cajas
      : cajas.filter((caja: CajaSafe) =>
          caja.nombre
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="bg-transparent w-44">
      <Combobox value={selected} onChange={handleCajaChange}>
        <div className="relative bg-transparent">
          <div className="relative w-full overflow-hidden text-left bg-transparent rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full h-8 py-2 pr-10 leading-5 text-gray-900 bg-transparent border-none focus:ring-0"
              displayValue={(caja: CajaSafe) =>
                caja !== null ? caja.nombre : "Efectivo"
              }
              onChange={(event) => handleQueryChange}
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
            <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base rounded-md max-h-60 bg-amber-300 bg-opacity-1w-20 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((caja: CajaSafe) => (
                  <Combobox.Option
                    key={caja.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={caja}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {caja.nombre}
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
    </div>
  );
};

export default InputSelectCajas;
