import React from "react";
import { Link } from "react-router-dom";

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

interface PokemonCardProps {
    pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    return (
        <Link to={`/pokemon/${pokemon.id}`} className="card-pokemon">
            <div className="card-img">
                {pokemon.sprites?.other?.dream_world?.front_default && (
                    <img
                        src={pokemon.sprites.other.dream_world.front_default}
                        alt={`Pokemon ${pokemon.name}`}
                    />
                )}
            </div>
            <div className="card-info">
                <span className="pokemon-id">N° {pokemon.id}</span>
                <h3>{pokemon.name}</h3>
                <div className="card-types">
                    {pokemon.types?.map((type) => (
                        <span key={type.type.name} className={type.type.name}>
                            {type.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
};
