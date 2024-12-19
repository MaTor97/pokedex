import { useEffect, useState } from "react";

export default function PokemonList(){
    const [pokemonList, setPokemonList] = useState([])
    
    useEffect(() => {
        const fetchPokemonList = async () => {
            let pokemon = {
                name,
                url
            }
            try{
                const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1025")
                const data = await response.json();
                const pokemonData = await Promise.all(
                  data.results.map(
                    async (pokemon) => {
                        return {
                            name: pokemon.name,
                            url: pokemon.url
                        }
                    }
                  )  
                )
                setPokemonList(pokemonData);
            } catch(error){
                console.error("error fetch pokemonList: " + error)
            }
            fetchPokemonList();
        }
        
    },[]);

    console.log("compo " + pokemonList)
    
    return (
        <>
            <h3>Name: {pokemonList.name}</h3>
        </>
    )
}