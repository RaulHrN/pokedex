import React, { useEffect, useState } from "react";
import { pokedex } from "./services/pokedex";

function App() {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    pokedex
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => setPokemon(response.data))
      .catch((err) => {
        console.error("O seguinte pokemon não existe: " + err);
      });
  }, []);
console.log(pokemon)
  return (
    <div className="App">
      <div>{pokemon}</div>
    </div>
  );
}

export default App;
