export interface Pokemon {
  name: string;
  url: string;
  height: number;
  id: number;
  sprites?: {
    front_default: string;
  };
  types?: PokemonType[];
  weight: number;
}

interface PokemonType{
    slot: number;
    type: {
        name: PokemonTypes;
    }
}

type PokemonTypes = "dark" | "dragon" | "electric" | "fairy" | "fighting" | "fire" | "flying" | "ghost" | "grass" | "ground" | "ice" | "bug" | "normal"  | "poison" | "psychic" | "rock" | "steel" |  "water";

export enum PokemonTypeColor {
  dark = "#707070",
  dragon = "#f16e57",
  electric = "#eed535",
  fairy = "#fdb9e9",
  fighting = "#d56723",
  fire = "#fd7d24",
  flying = "#3dc7ef",
  ghost = "#7b62a3",
  grass = "#9bcc50",
  ground = "#f7de3f",
  ice = "#51c4e7",
  bug = "#729f3f",
  normal = "#a4acaf",
  poison = "#b97fc9",
  psychic = "#f366b9",
  rock = "#a38c21",
  steel = "#9eb7b8",
  water = "#4592c4"
}
