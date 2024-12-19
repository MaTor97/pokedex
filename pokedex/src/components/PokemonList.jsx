import { useEffect, useState } from "react";

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
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
    }, []);

    return (
        <div>
            <h3>Pokémon List</h3>
            {pokemonList.length > 0 ? (
                <p>{pokemonList[0].name}</p> // Affiche le nom du premier Pokémon
            ) : (
                <p>Loading...</p> // Affiche un message de chargement jusqu'à ce que la liste soit récupérée
            )}
        </div>
    );
}
