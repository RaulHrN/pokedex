import axios from "axios";

export const pokedex = axios.create({
    baseURL: "https://pokeapi.co/api/v2/pokemon"
});
