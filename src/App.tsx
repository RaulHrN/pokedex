import React, { useState } from "react";
import { PokemonCard } from "./components/pokemonCard/PokemonCard";
import { Pokemon } from "./models/pokemon";
import "./app.css";
import { PokedexList } from "./components/pokedexList/PokedexList";
import { Initial } from "./components/initial/Initial";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  return (
    <div className="App">
      {!pokemon && <Initial/>}
      {!!pokemon && <PokemonCard pokemon={pokemon} />}

      <PokedexList selectedPokemon={(pokemon) => setPokemon(pokemon)} />
    </div>
  );
}

export default App;
