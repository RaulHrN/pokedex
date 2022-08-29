import { Axios, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Pokemon } from "./models/pokemon";
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
        //setPokemons(response.data.results);
        response.data.results.forEach((pokemon) => getPokemonData(pokemon.url))
      })
      .catch((err) => {
        console.error("O pokemon não existe: " + err);
      });
  };

  const getPokemonData = (url: string): void => {
    pokedex.get(url).then((response: AxiosResponse<any, any>) => {
      console.log(response)
    })
  }

  return (
    <div className="App">
      <div>
        {pokemons.map((pokemon) => {
          return <div>{pokemon.name}</div>;
        })}
      </div>
    </div>
  );
}

export default App;

/* const {data}: ResponsePokemon = response 

COLOCAR NO SETPOKEMON TODOS OS POKEMONS QUE RETORNAREM NO RESPONSE*/
