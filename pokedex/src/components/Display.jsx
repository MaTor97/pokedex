import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Display(props) {
  console.log("display" + props.pokemonList)
  const pokemonList = props.pokemonList;
  const [display, setDisplay] = useState([pokemonList.slice(0,16)])
  const [row, setRow] = useState(3)

  const fetchData = () => {
    const nextLine = pokemonList.slice( (row * 4) , (row * 4 + 4) )  // get the line to add
    setDisplay((display) => [...display, ...nextLine]) // add the line in display
    setRow(page + 1)
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
        // below props only if you need pull down functionality
        refreshFunction={this.refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
        className="display-grid"
      >
        {display.map((pokemon) => (
          <div key={pokemon.id}>
            <p> {pokemon.name} </p>
          </div>
        
        
        
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Display;
