import React from "react";
import "./PokedexList.css";

export const PokedexList = () => {
    return (
        <aside className="container pokedex-list">
            <h1 className="pokedex-title">National dex</h1>
            <div className="search-bar">
                <input type="text" placeholder="Type here..."/>
                <button type="submit">Search</button>
            </div>
            <section className="pokemons-list"></section>
        </aside>
    )
}