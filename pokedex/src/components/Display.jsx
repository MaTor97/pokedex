import { useLayoutEffect,useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Display(props) {
  const toLoad = 4;
  const pokemonList = props.pokemonList;
  const [display, setDisplay] = useState([]);
  const [row, setRow] = useState(0);

  useLayoutEffect(() => {
    // Charger les premiers éléments
    const initialLoad = async () => {
      const fetchPromises = pokemonList
        .slice(0, toLoad * 5) // Charger les 20 premiers éléments
        .map((pokemon) => fetch(pokemon.url).then((response) => response.json()));

      const fetchedData = await Promise.all(fetchPromises);
      setDisplay(fetchedData);
    };

    initialLoad();
  }, [pokemonList]);


  const fetchData = async () => {
    // Charger la ligne suivante
    const nextBatch = pokemonList
      .slice(row * 4, (row + 1) * 4)
      .map((pokemon) => fetch(pokemon.url).then((response) => response.json()));

    const fetchedData = await Promise.all(nextBatch);
    setDisplay((prevDisplay) => [...prevDisplay, ...fetchedData]);
    setRow(row + 1);
  };

  const pokemonType = [];
    .types.forEach(index => {
      pokemonType.push(index.type.name);
    });

  const typeColors = pokemonType.map(type => pokemonTypes[type]);
  const backgroundStyle =
      typeColors.length === 1
        ? `background: radial-gradient(rgb(0 0 0/20%),rgb(255 255 255/30%)), ${typeColors[0]};`
        : `background: radial-gradient(${typeColors.join(", ")});`;

  const imgUrl = (pokemonID) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png`;

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
        {display.map((pokemon, index) => (
          <div key={index}>
            <p>{pokemon.id}{pokemon.name}</p>
            <img src={imgUrl(pokemon.id)} alt={pokemon.name} style={backgroundStyle}></img>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Display;
