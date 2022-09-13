import React, { useEffect, useState } from "react";
import "./pokemonCard.css";
import { Pokemon, PokemonTypeColor } from "../../models/pokemon";

interface CardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: CardProps) => {
  const [sprite, setSprite] = useState(pokemon.sprites?.front_default);
  useEffect(() => {
    setSprite(pokemon.sprites?.front_default);
  }, [pokemon.sprites]);

  return (
    <div className="pokemon_card">
      <img
        onMouseEnter={() => setSprite(pokemon.sprites?.back_default)}
        onMouseLeave={() => setSprite(pokemon.sprites?.front_shiny)}
        src={sprite}
        alt={pokemon.name}
        className="pokemon_sprite"
      />
      <section className="pokemon_card_info">
        <p className="pokemon_id">Nº {pokemon.id}</p>
        <p className="pokemon_name">{pokemon.name}</p>
        <div className="pokemon_type_card">
          {pokemon.types &&
            pokemon.types.map((type, index) => {
              return (
                <p
                  className="pokemon_type"
                  style={{ backgroundColor: PokemonTypeColor[type.type.name] }}
                  key={index}
                >
                  {type.type.name}
                </p>
              );
            })}
        </div>
      </section>
      <section className="pokemon_card_stats">
        <p>Height: {pokemon.height}0cm</p>
        <p> Weight: {pokemon.weight}kg</p>
        <p>Base XP: {pokemon.base_experience}</p>
        <div>
          {pokemon.stats?.map((stat, index) => {
            return <p key={index}>{`${stat.stat.name}: ${stat.base_stat}`}</p>;
          })}
        </div>
        <div className="stats"></div>
      </section>
    </div>
  );
};
