import React, { useEffect, useState } from "react";
import "./pokemonCard.css";
import {
  Pokemon,
  PokemonTypeBackground,
  PokemonTypeColor,
} from "../../models/pokemon";
import styled from "styled-components";

interface CardProps {
  pokemon: Pokemon;
}

interface PokemonTypes {
  types?: string;
  background?: string;
}

const TypeStyled = styled.p<PokemonTypes>`
  width: 50%;
  text-align: center;
  font-size: 1.2rem;
  color: ${(props) => props.types};
  background: ${(props) => props.background};
  border: 2px solid ${(props) => props.types};
  border-radius: 8px;
`;

export const PokemonCard = ({ pokemon }: CardProps) => {
  const [sprite, setSprite] = useState(pokemon.sprites?.front_default);
  const [spriteShiny, setSpriteShiny] = useState(pokemon.sprites?.front_shiny);

  useEffect(() => {
    setSprite(pokemon.sprites?.front_default);
    setSpriteShiny(pokemon.sprites?.front_shiny);
  }, [pokemon.sprites]);

  return (
    <section className="pokemon_card">

      <article className="pokemon_card_main">

        <div className="pokemon_card_info">
          <p className="pokemon_id">Nº {pokemon.id}</p>
          <p className="pokemon_name">{pokemon.name}</p>
        </div>

        <div className="pokemon_sprites">
          <img
            onMouseEnter={() => setSprite(pokemon.sprites?.back_default)}
            onMouseLeave={() => setSprite(pokemon.sprites?.front_default)}
            src={sprite}
            alt={pokemon.name}
          />
          <img
            onMouseEnter={() => setSpriteShiny(pokemon.sprites?.back_shiny)}
            onMouseLeave={() => setSpriteShiny(pokemon.sprites?.front_shiny)}
            src={spriteShiny}
            alt={`Shiny ${pokemon.name}`}
          />
        </div>

        <div className="pokemon_type_card">
          {pokemon.types &&
            pokemon.types.map((type, index) => {
              return (
                <TypeStyled
                  types={PokemonTypeColor[type.type.name]}
                  background={PokemonTypeBackground[type.type.name]}
                >
                  {type.type.name}
                </TypeStyled>
              );
            })}
        </div>

      </article>

      <article className="pokemon_card_stats">
        <p>Height: {pokemon.height}0cm</p>
        <p> Weight: {pokemon.weight}kg</p>
        <p>Base XP: {pokemon.base_experience}</p>
        <div>
          {pokemon.stats?.map((stat, index) => {
            return <p key={index}>{`${stat.stat.name}: ${stat.base_stat}`}</p>;
          })}
        </div>
        <div className="stats"></div>
      </article>
    </section>
  );
};
