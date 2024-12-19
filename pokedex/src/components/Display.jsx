import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Display(props) {
 // console.log(props.pokemonList)
  const pokemonList = props.pokemonList;
  const [display, setDisplay] = useState([...pokemonList.slice(0,16)])
  const [row, setRow] = useState(4)
  console.log(`Display: ${display}`)

  const fetchData = () => {
    const nextLine = pokemonList.slice( (row * 4) , (row * 4 + 4) )  // get the line to add
    setDisplay((display) => [...display, ...nextLine]) // add the line in display
    setRow(row + 1)
    
    return display;
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
          </div>
        
        
        
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Display;
