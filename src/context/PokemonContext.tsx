import React, { createContext, useContext } from "react";

// Definimos las interfaces necesarias
interface Pokemon {
    id: number;
    name: string;
    url: string;
    sprites: {
        other: {
            dream_world: {
                front_default: string;
            };
        };
    };
    types: {
        type: {
            name: string;
        };
    }[];
}

interface PokemonContextType {
    valueSearch: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onResetForm: () => void;
    allPokemons: Pokemon[];
    globalPokemons: Pokemon[];
    getPokemonByID: (id: number) => Promise<Pokemon>;
}

// Creamos el contexto con la interfaz
export const PokemonContext = createContext<PokemonContextType | undefined>(
    undefined
);

// Exportamos un hook para usar el contexto
export const usePokemonContext = () => {
    const context = useContext(PokemonContext);
    if (!context) {
        throw new Error(
            "usePokemonContext must be used within a PokemonProvider"
        );
    }
    return context;
};
