export interface Pokemon {
  name: string;
  url: string;
  height: number;
  id: number;
  sprites?: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    versions: Versions;
  };
  types?: PokemonType[];
  base_experience: number;
  weight: number;
  stats: Stats[];
}

interface Versions {
  "generation-vii": {
    icons: {
      front_default: string;
    };
  };
}

export interface Stats {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonType {
  slot: number;
  type: {
    name: PokemonTypes;
  };
}

type PokemonTypes =
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "bug"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

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
  water = "#4592c4",
}

export enum PokemonTypeBackground {
  dark = "rgba(112, 112, 112, 0.3)",
  dragon = "rgba(241, 110, 87, 0.3)",
  electric = "rgba(238, 213, 53 , 0.3)",
  fairy = "rgba(253, 185, 233 , 0.3)",
  fighting = "rgba(213, 103, 35 , 0.3)",
  fire = "rgba(253, 125, 36 , 0.3)",
  flying = "rgba(61, 199, 239 , 0.3)",
  ghost = "rgba(123, 98, 163 , 0.3)",
  grass = "rgba(155, 204, 80 , 0.3)",
  ground = "rgba(247, 222, 63 , 0.3)",
  ice = "rgba(81, 196, 231 , 0.3)",
  bug = "rgba(114, 159, 63 , 0.3)",
  normal = "rgba(164, 172, 175 , 0.3)",
  poison = "rgba(185, 127, 201 , 0.3)",
  psychic = "rgba(243, 102, 185 , 0.3)",
  rock = "rgba(163, 140, 33 , 0.3)",
  steel = "rgba(158, 183, 184 , 0.3)",
  water = "rgba(69, 146, 196 , 0.3)",
}
