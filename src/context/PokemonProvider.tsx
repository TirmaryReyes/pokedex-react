import React, { useState } from "react";
import { PokemonContext } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {
  const [number, setNumber] = useState(1);

  return (
    <PokemonContext.Provider value={{ number, setNumber }}>
      {children}
    </PokemonContext.Provider>
  );
};
