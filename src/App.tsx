import { Axios, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Pokemon, PokemonTypeColor } from "./models/pokemon";
import { Response, ResponsePokemon } from "./models/response";
import { pokedex } from "./services/pokedex";

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
      <div>
        {pokemons.map((pokemon, index) => {
          return (
            <div key={index}>
              <p>{pokemon.name}</p>
              <p>{pokemon.id}</p>
              <img src={pokemon.sprites?.front_default} alt={pokemon.name}/>
              {pokemon.types&&pokemon.types.map((type) => {
                return (
                  <p style={{backgroundColor: PokemonTypeColor[type.type.name]}}>{type.type.name}</p>
                )
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

/* const {data}: ResponsePokemon = response 

TRANSFORMAR DIV PAI EM NOVO COMPONENT (POKEMON_CARD)*/
