import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { Pokemon } from "../../models/pokemon";
import { ResponsePokemon } from "../../models/response";
import { pokedex } from "../../services/pokedex";
import "./PokedexList.css";

interface PokemonsProps {
  selectedPokemon: (pokemon: Pokemon) => void;
}

export const PokedexList = (props: PokemonsProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonFilter, setPokemonFilter] = useState<string>("");
  const [currUrl, setCurrUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon"
  );

  useEffect(() => {
    getPokemonList();
  }, []);

  const getPokemonList = (): void => {
    pokedex
      .get(currUrl)
      .then((response: AxiosResponse<ResponsePokemon, any>) => {
        const pokemonList = [...pokemons, ...response.data.results];
        setPokemons(pokemonList);
        setCurrUrl(response.data.next);
        pokemonList.forEach((pokemon) => {
          if (!pokemon.id) getPokemonData(pokemon.url, pokemon.name);
        });
      })
      .catch((err) => {
        console.error("O pokemon não existe: " + err);
      });
  };

  const getPokemonData = (url: string, name: string): void => {
    pokedex.get(url).then((response: AxiosResponse<Pokemon, any>) => {
      setPokemons((pokemonList) =>
        pokemonList
          .filter(
            (pokemon, index, pokemonList) =>
              index ===
              pokemonList.findIndex(
                (t) => t.id === pokemon.id && t.name === pokemon.name
              )
          )
          .map((pokemon) => {
            if (name === pokemon.name) {
              return { ...response.data, ...pokemon };
            }
            return pokemon;
          })
      );
    });
  };

  const getUniquePokemon = (name: string): void => {
    pokedex
      .get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then((response: AxiosResponse<Pokemon, any>) => {
        if (pokemons.some((pokemon) => response.data.id === pokemon.id)) {
          setPokemons([...pokemons]);
        } else {
          setPokemons([...pokemons, response.data]);
        }
      });
  };
  return (
    <aside className="container pokedex-list">
      <h1 className="pokedex-title">National dex</h1>
      <div className="search-bar">
        <input
          placeholder="Type here..."
          value={pokemonFilter}
          onChange={(e) => setPokemonFilter(e.target.value)}
        />
        <button onClick={() => getUniquePokemon(pokemonFilter)}>Search</button>
      </div>
      <section className="pokemons-list">
        {pokemons
          .filter((pokemon) => {
            if (
              pokemon.name.toLowerCase().includes(pokemonFilter.toLowerCase())
            ) {
              return pokemon;
            } else if (pokemonFilter === "") {
              return pokemon;
            }
          })
          .sort((a, b) => a.id - b.id)
          .map((pokemon, index) => {
            return (
              <div key={index} onClick={() => props.selectedPokemon(pokemon)}>
                <span>{pokemon.id}</span>
                <span>{pokemon.name}</span>
              </div>
            );
          })}
      </section>
    </aside>
  );
};
