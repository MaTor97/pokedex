import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";


function Display(props) {
 // console.log(props.pokemonList)
 const toLoad = 4;
  const pokemonList = props.pokemonList;
  const [display, setDisplay] = useState([])
  const [row, setRow] = useState(toLoad)
  const [nextLine, setNextLine] = useState([])

  useEffect(() => {
  //   const fetchPokemonDetails = async (pokemon) => {
  //     const pokemonFetch = await fetch(pokemon.url);
  //     const pokemonData = await pokemonFetch.json();
  //     console.log(pokemonData)
  //     return pokemonData;
  // } 
  //   setDisplay([...pokemonList.slice(0,toLoad * 4)]
  //   .map(async(pokemon) => await fetchPokemonDetails(pokemon)))
  //   setNextLine([...pokemonList.slice( (row * 4) , (row * 4 + 4) )]
  //   .map(async(pokemon) => await fetchPokemonDetails(pokemon)))
  let i = -1;
  while (++i < toLoad * 4)
  {
    fetch(pokemonList[i].url)
      .then(response => response.json())
      .then(value => setDisplay(display => [...display, value]))
    console.log(display)
  }
  },[])

  useEffect(() => {    
    // setNextLine(() => pokemonList.slice( (row * 4) , (row * 4 + 4) )
    // .map(async (pokemon) => await fetchPokemonDetails(pokemon)))
    setNextLine([])
    let i = -1;
    while (++i < toLoad){
      fetch(pokemonList[(row * 4) + i].url)
      .then(response => response.json())
      .then(value => setNextLine(nextLine => [...nextLine, value]))
    }
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


  return (
    <div className="display">
      <InfiniteScroll
        dataLength={display.length} //This is important field to render the next data
        next={fetchData}  //function returning =>  Initial data = [1, 2, 3] and then next load of data should be [1, 2, 3, 4, 5, 6].
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Time to catch them all !!!</b>
          </p>
        }
        className="display-grid"
      >
        {display.map((pokemon) => (
          <div key={pokemon.index}>
            <p> {pokemon.name} </p>
            <img src={imgUrl(pokemon.id)} ></img>
          </div>
        
        
        
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Display;
