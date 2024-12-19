import { useEffect, useState } from "react";
import './App.css'
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon"
import NoPage from "./pages/NoPage.jsx";
import PokemonList from "./components/PokemonList.jsx";

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    loader: async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1025");
      const data = await response.json();
      const pokemonData = data.results.map((pokemon, index) => ({
        index: index + 1,  
        name: pokemon.name,
          url: pokemon.url
      }));
      return pokemonData;
    },
  },


])

function App() {
    // const pokemonList = PokemonList();
    // console.log("app : " + pokemonList)
    return (
    <RouterProvider
      router={router}
    ></RouterProvider>

    )

{/*     
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} loader={ () => {
          const response = fetch("https://pokeapi.co/api/v2/pokemon/?limit=1025");
          const data = response.json();
          const pokemonData = data.results.map(pokemon => ({
              name: pokemon.name,
              url: pokemon.url
          }));
          return pokemonData;
        }
        } >
          <Route index element={<Home />} />
          <Route path="pokemon" element={<Pokemon />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>  */}
}

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