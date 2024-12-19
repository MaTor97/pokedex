import { useEffect, useState } from "react";

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);


        const fetchPokemonList = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1025");
                const data = await response.json();
                const pokemonData = data.results.map(pokemon => ({
                    name: pokemon.name,
                    url: pokemon.url
                }));
                setPokemonList(pokemonData);
            } catch (error) {
                console.error("Error fetching Pokémon list: ", error);
            }
        };

        fetchPokemonList();

    return pokemonList;
    ;
}
