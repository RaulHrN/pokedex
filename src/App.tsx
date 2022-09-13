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
        const pokemonList = [
          ...pokemons,
          ...response.data.results.filter(
            (pokemon) =>
              !pokemons.find((pokemonFind) => {
                console.log(pokemon.id === pokemonFind.id);
                return pokemon.id === pokemonFind.id;
              })
          ),
        ];
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
        pokemonList.map((pokemon) => {
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
    <div className="App">
      <h1 className="pokedex-title">National Dex</h1>
      <div className="search-bar">
        <input
          placeholder="Type here..."
          value={pokemonFilter}
          onChange={(e) => setPokemonFilter(e.target.value)}
        />
        <button onClick={() => getUniquePokemon(pokemonFilter)}>Search</button>
      </div>

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
              return pokemon;
            } else if (pokemonFilter === "") {
              return pokemon;
            }
          })
          .sort((a, b) => a.id - b.id)
          .map((pokemon, index) => {
            return <PokemonCard pokemon={pokemon} key={index} />;
          })}
      </InfiniteScroll>
    </div>
  );
}

export default App;
