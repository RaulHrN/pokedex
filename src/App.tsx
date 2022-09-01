import { Axios, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { PokemonCard } from "./components/pokemonCard/PokemonCard";
import { Pokemon} from "./models/pokemon";
import { ResponsePokemon } from "./models/response";
import { pokedex } from "./services/pokedex";
import "./app.css";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    getPokemonList();
  }, []);

  const getPokemonList = (): void => {
    pokedex
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response: AxiosResponse<ResponsePokemon, any>) => {
        setPokemons(response.data.results);
        response.data.results.forEach((pokemon) =>
          getPokemonData(pokemon.url, pokemon.name)
        );
      })
      .catch((err) => {
        console.error("O pokemon não existe: " + err);
      });
  };

  const getPokemonData = (url: string, name: string): void => {
    pokedex.get(url).then((response: AxiosResponse<Pokemon, any>) => {
      setPokemons((pokemonList) =>
        pokemonList.map((pokemon) => {
          if (name === pokemon.name) {
            return { ...response.data, ...pokemon };
          }
          return pokemon;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="pokemons_cards">
      {pokemons.map((pokemon, index) => {
        return <PokemonCard pokemon = {pokemon} key={index}/>
      })}
    </div>
    </div>
  );
}

export default App;
