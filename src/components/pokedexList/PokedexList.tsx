import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getPokemonList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPokemonList = (): void => {
    setLoader(() => true);
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
        getErrorMessage(err);
      })
      .finally(() => setLoader(() => false));
  };

  const getPokemonData = (url: string, name: string): void => {
    setLoader(() => true);
    pokedex
      .get(url)
      .then((response: AxiosResponse<Pokemon, any>) => {
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
      })
      .catch((err) => {
        getErrorMessage(err);
      })
      .finally(() => setLoader(() => false));

  };

  const getUniquePokemon = (name: string): void => {
    setLoader(() => true);
    setErrorMessage(() => "");
    pokedex
      .get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then((response: AxiosResponse<Pokemon, any>) => {
        if (pokemons.some((pokemon) => response.data.id === pokemon.id)) {
          setPokemons([...pokemons]);
        } else {
          setPokemons([...pokemons, response.data]);
        }
      })
      .catch((err) => {
        getErrorMessage(err);
      })
      .finally(() => setLoader(() => false));

  };

  const getErrorMessage = (err: any) => {
    setErrorMessage("Error " + err.response.status + ": " + err.response.data);
  };

  const pokedexNumberConvert = (num: number): string | number => {
    if (num < 10) {
      return "00" + num;
    } else if (num >= 10 && num < 100) {
      return "0" + num;
    } else {
      return num;
    }
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
      <div id="scrollableDiv">
        <InfiniteScroll
          className="pokemons-list"
          next={() => getPokemonList()}
          hasMore={currUrl !== ""}
          dataLength={pokemons.length}
          loader={
            <p className="loader">{loader ? "Loading..." : errorMessage}</p>
          }
          scrollableTarget="scrollableDiv"
        >
          {pokemons
            // eslint-disable-next-line array-callback-return
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
                <button
                  key={index}
                  className="pokemon-list_card"
                  onClick={() => props.selectedPokemon(pokemon)}
                >
                  <img
                    src={
                      pokemon.sprites?.versions["generation-vii"].icons
                        .front_default
                    }
                    alt={pokemon.name}
                  />
                  <p>{pokedexNumberConvert(pokemon.id)}</p>
                  <span>{pokemon.name}</span>
                </button>
              );
            })}
        </InfiniteScroll>
      </div>
    </aside>
  );
};
