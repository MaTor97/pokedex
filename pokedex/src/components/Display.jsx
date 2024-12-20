import { useEffect, useState, useLayoutEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Display(props) {

 const toLoad = 5;
  const pokemonList = props.pokemonList;
  const [display, setDisplay] = useState([])
  const [row, setRow] = useState(toLoad)
  const [nextLine, setNextLine] = useState([])

  useLayoutEffect(() => {
    const asyncLoad = async ()=> {
     const toDisplay = pokemonList.slice(0, toLoad*row)
     .map((pokemon) => fetch(pokemon.url).then(response => response.json()))
      
    
      const syncToDisplay = await Promise.all(toDisplay)
      setDisplay(syncToDisplay)
  
      const toNextLine = pokemonList.slice(row*toLoad, row*toLoad + toLoad)
      .map((pokemon) =>fetch(pokemon.url).then(response => response.json()))
    
    const syncToNextLine = await Promise.all(toNextLine)
    setNextLine(syncToNextLine)
    }
 asyncLoad();
      

  },[pokemonList])

  useLayoutEffect( () => {    

    setNextLine([])
    const asyncLoad = async ()=> {
      const toNextLine = pokemonList.slice(row*toLoad, row*toLoad + toLoad)
      .map((pokemon) =>fetch(pokemon.url).then(response => response.json()))
    
    const syncToNextLine = await Promise.all(toNextLine)
    setNextLine(syncToNextLine)
  }
  asyncLoad();
  },[row])

  const fetchData = () => {
 //   const nextLine = pokemonList.slice( (row * 4) , (row * 4 + 4) )  // get the line to add
    setDisplay((display) => [...display, ...nextLine]) // add the line in display
    setRow(row + 1)

    return display;
  }

  function imgUrl(pokemonID){
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png`
  }

  const pokemonTypes = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
  };

  const getTypeStyle = (types) => {
    const typeColors = types.map((t) => pokemonTypes[t.type.name]);
    return typeColors.length === 1
      ? { background: `radial-gradient(circle, ${typeColors[0]}, #fff)` }
      : { background: `radial-gradient(circle, ${typeColors.join(", ")})` };
  };
  

  return (
    <div className="display">
      <InfiniteScroll
        dataLength={display.length}
        next={fetchData}
        hasMore={row * 4 < pokemonList.length} // Condition pour arrêter le scroll infini
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Time to catch them all !!!</b>
          </p>
        }
        className="display-grid"
      >
        {display.map((pokemon) => (
          <div key={pokemon.id} >
            <p> {pokemon.name} {pokemon.id} </p>
            <img src={imgUrl(pokemon.id)} alt={pokemon.name} style={
              getTypeStyle(pokemon.types)
            }></img>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Display;
