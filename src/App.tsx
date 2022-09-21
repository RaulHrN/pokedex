import React, { useState } from "react";
import { PokemonInfo } from "./components/pokemonInfo/PokemonInfo";
import { Pokemon } from "./models/pokemon";
import "./app.css";
import { PokedexList } from "./components/pokedexList/PokedexList";
import { Initial } from "./components/initial/Initial";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  return (
    <div className="App">
      {!pokemon && <Initial/>}
      {!!pokemon && <PokemonInfo pokemon={pokemon} />}

      <PokedexList selectedPokemon={(pokemon) => setPokemon(pokemon)} />
    </div>
  );
}

export default App;
