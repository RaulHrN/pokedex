import React from "react";
import pokeball from "../../assets/pokeball.png";
import "./Initial.css";

export const Initial = () => {
    return (
        <section className="pokemon_card">
            <img src={pokeball} alt="pokeball" className="pokeball"/>
        </section>
    )
}