import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { PokemonCard } from "./components/pokemonCard/PokemonCard";
import { Pokemon } from "./models/pokemon";
import { ResponsePokemon } from "./models/response";
import { pokedex } from "./services/pokedex";
import "./app.css";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
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
        setPokemons([...pokemons, ...response.data.results]);
        response.data.results.forEach((pokemon) => {
          setCurrUrl(response.data.next);
          return getPokemonData(pokemon.url, pokemon.name);
        });
      })
      .catch((err) => {
        console.error("O pokemon não existe: " + err);
      });
  };

  const getPokemonData = (url: string, name: string): void => {
    pokedex.get(url).then((response: AxiosResponse<Pokemon, any>) => {
      setPokemons((pokemonList) =>
        pokemonList.map((pokemon) => {
          console.log(pokemon)
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
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response: AxiosResponse<Pokemon, any>) => {
        setPokemons((pokemonList) =>
          pokemonList.map((pokemon) => {
            if (pokemon.name) {
              return { ...response.data, ...pokemon };
            }
            return pokemon;
          })
        );
      });
  };
  return (
    <div className="App">
      <input placeholder="Pokemon Search..." value={pokemonFilter} onChange={(e) => setPokemonFilter(e.target.value)} />

      <InfiniteScroll
        className="pokemons_cards"
        dataLength={pokemons.length}
        next={() => getPokemonList()}
        hasMore={currUrl ? true : false}
        loader={<p>Loading...</p>}
      >
        {pokemons
          .filter((pokemon) => {
            if (
              pokemon.name.toLowerCase().includes(pokemonFilter.toLowerCase())
            ) {
              console.log(pokemonFilter);
              return pokemon;
            } else if (pokemonFilter === "") {
              return pokemon;
            } else if (pokemon === null || pokemon === undefined){
              getUniquePokemon(pokemonFilter);
            }
            let teste = () => getUniquePokemon(pokemonFilter);
            return teste;
          })
          .map((pokemon, index) => {
            return <PokemonCard pokemon={pokemon} key={index} />;
          })}
      </InfiniteScroll>
    </div>
  );
}

export default App;
