import React, { useEffect, useState } from "react";
import "./PokemonInfo.css";
import {
  Pokemon,
  PokemonTypeBackground,
  PokemonTypeColor,
} from "../../models/pokemon";
import styled from "styled-components";
import { PokemonStats } from "../pokemonStats/PokemonStats";

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

export const PokemonInfo = ({ pokemon }: CardProps) => {
  const [sprite, setSprite] = useState(pokemon.sprites?.front_default);
  const [spriteShiny, setSpriteShiny] = useState(pokemon.sprites?.front_shiny);

  useEffect(() => {
    setSprite(pokemon.sprites?.front_default);
    setSpriteShiny(pokemon.sprites?.front_shiny);
  }, [pokemon.sprites]);

  return (
    <section className="pokemon_info">
      <article className="pokemon_info-main">
        <div className="pokemon_info-name">
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

        <div className="pokemon_types">
          {pokemon.types &&
            pokemon.types.map((type) => {
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

      <article className="pokemon_stats">
        <div className="stats">
          <p>Height: {pokemon.height}0cm</p>
          <p> Weight: {pokemon.weight}kg</p>
          <p>Base XP: {pokemon.base_experience}</p>
        </div>
        <div className="basic_stats">
          {pokemon.stats?.map((stat, index) => {
            return <PokemonStats stats={stat} key={index}></PokemonStats>;
          })}
        </div>
      </article>
    </section>
  );
};
