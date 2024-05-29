import React, { Dispatch, SetStateAction } from "react";

interface PokemonContextType {
  number: number;
  setNumber: Dispatch<SetStateAction<number>>;
}

export const PokemonContext = React.createContext<PokemonContextType>({
  number: 0,
  setNumber: () => {},
});
