import React from "react";

export function createContext<A>() {
  const ctx = React.createContext<A | undefined>(undefined);
  const useContext = () => {
    const c = React.useContext(ctx);
    if (!c)
      throw new Error("useContext must be inside a Provider with a value");
    return c;
  };
  return { useContext, Provider: ctx.Provider } as const;
}
