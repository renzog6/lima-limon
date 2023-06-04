"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { Cliente } from "@prisma/client";

interface ClienteContextProps {
  clientes: Cliente[];
  setClientes: (clientes: Cliente[]) => void;
}

const ClienteContext = createContext<ClienteContextProps>({
  clientes: [],
  setClientes: () => {},
});

export function ClienteProvider({ children }: { children: ReactNode }) {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  return (
    <ClienteContext.Provider value={{ clientes, setClientes }}>
      {children}
    </ClienteContext.Provider>
  );
}

export function useClienteContext() {
  return useContext(ClienteContext);
}
