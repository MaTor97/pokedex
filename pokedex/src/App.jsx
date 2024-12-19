import { useEffect, useState } from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon"
import NoPage from "./pages/NoPage.jsx";

function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    async function grabData(){
      setIsLoading(true)
      console.log("2")
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1025`)
      let pokemonData = await response.json();
      setPokemonList(pokemonData.results)
      setIsLoading(false)
      console.log("3")
    }
    grabData();
  }, [])
  /*const fetchData = () => {
  const fetchPokemon = async () => {
    console.log("test")
    let pokemonList;
    try {
      const pokemonData = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1025`);
      pokemonList = await pokemonData.json();
      setPokemonList(()=> pokemonList.results)
    } catch (error) {
      console.error("fetchPokemon Failed")
      }
  }
    fetchPokemon();
  }
  fetchData();
  console.log(pokemonList)*/
  

    return (
    <>
      {isLoading && <h2>Loading Data...</h2>}
      {!isLoading &&
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} pokemonList={pokemonList} >
          <Route index element={<Home />} />
          <Route path="pokemon" element={<Pokemon />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    }
    </>
  )}

export default App


/*
  if(isLoading === false){ 
    console.log("test")
    return (
    <>
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} pokemonList={pokemonList} >
          <Route index element={<Home />} />
          <Route path="pokemon" element={<Pokemon />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )}
  else {
    console.log("is loading")
    return <><h2>Loading Data...</h2></>
  } */