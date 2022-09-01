import react from "react";
import "./pokemonCard.css";
import { Pokemon, PokemonTypeColor } from "../../models/pokemon";

interface CardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: CardProps) => {

  console.log(pokemon.sprites)
  return (
    <div className="pokemon_card">
      <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
      <p className="pokemon_id">Nº {pokemon.id}</p>
      <p className="pokemon_name">{pokemon.name}</p>
      <div className="pokemon_type_card">
        {pokemon.types &&
          pokemon.types.map((type) => {
            return (
              <p
                className="pokemon_type"
                style={{ backgroundColor: PokemonTypeColor[type.type.name] }}
              >
                {type.type.name}
              </p>
            );
          })}
      </div>
    </div>
  );
};
