import React, { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext";
import { useForm } from "../hook/useForm";

interface Pokemon {
  name: string;
  url: string;
}

export const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);

  const [globalPokemons, setGlobalPokemons] = useState<Pokemon[]>([]);
  const [currentOffset, setCurrentOffset] = useState(0);

  useForm({
    valueSearch: "",
  });

  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  const fetchAllPokemons = async (pokemonLimit = 50) => {
    const API_BASE_URL = "https://pokeapi.co/api/v2/";
    const ENDPOINT_POKEMON = "pokemon";

    const response = await fetch(
      `${API_BASE_URL}${ENDPOINT_POKEMON}?limit=${pokemonLimit}&offset=${currentOffset}`
    );

    const pokemonList = await response.json();

    const pokemonDataPromises = pokemonList.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      return pokemonData;
    });

    const allPokemonData = await Promise.all(pokemonDataPromises);

    setAllPokemons([...allPokemons, ...allPokemonData]);
    setLoading(false);
  };

  const getGlobalPokemons = async () => {
    const API_BASE_URL = "https://pokeapi.co/api/v2/";
    const ENDPOINT_POKEMON = "pokemon";

    const response = await fetch(
      `${API_BASE_URL}${ENDPOINT_POKEMON}?limit=100000&offset=0`
    );

    const pokemonList = await response.json();

    const pokemonDataPromises = pokemonList.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      return pokemonData;
    });

    const allPokemonData = await Promise.all(pokemonDataPromises);

    setGlobalPokemons(allPokemonData);
    setLoading(false);
  };

  const getPokemonByID = async (id) => {
    const API_BASE_URL = "https://pokeapi.co/api/v2/";
    const response = await fetch(`${API_BASE_URL}pokemon/${id}`);
    const pokemonData = await response.json();
    return pokemonData;
  };

  useEffect(() => {
    fetchAllPokemons();
  }, [currentOffset]);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  return (
    <PokemonContext.Provider value={{ useForm }}>
      {children}
    </PokemonContext.Provider>
  );
};
