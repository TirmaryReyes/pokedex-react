import React from "react";
import { usePokemonContext } from "../context/PokemonContext";
import { PokemonCard } from "./PokemonCard";

export const PokemonList: React.FC = () => {
    const { allPokemons } = usePokemonContext();

    return (
        <div className="card-list-pokemon container">
            {allPokemons.map((pokemon) => (
                <PokemonCard pokemon={pokemon} key={pokemon.id} />
            ))}
        </div>
    );
};
