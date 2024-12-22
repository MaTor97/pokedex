import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Modal(){
    const { id: pokemonID } = useParams();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState(null);
    const [shouldDisplay, setShouldDisplay] = useState(false);


    useEffect(() => {
        const asyncFetch = async () => {
            const pokemonData = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
            .then(response => response.json())
            const pokemonDetails = await Promise.all([pokemonData])
            setPokemon(pokemonDetails[0])
            console.log(pokemonDetails[0].name)
        }
        if(pokemonID)
            asyncFetch();
        return () => {setPokemon(null);};
      }, [pokemonID]);


    const handleOnClose = () => {
        navigate('/');
      };
    
      return (
        <>
          {pokemon && (
            <div className="modal">
              <div className="modal-content">
                
                <p>{pokemon.name}</p>
                <button onClick={handleOnClose}>Close {pokemon.name}</button>
              </div>
            </div>
          )}
        </>
      );
}