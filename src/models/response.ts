import { Pokemon } from "./pokemon";

export interface ResponsePokemon{
    count: number;
    next: string;
    previous: any;
    results: Pokemon[];
}

export interface Response{
    config: any;
    data: any;
    headers: any;
    request: any;
    status: number;
    statusText: string;
}