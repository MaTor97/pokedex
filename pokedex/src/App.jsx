import { useEffect, useState } from "react";
import './App.css'
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon"
import NoPage from "./pages/NoPage.jsx";
import PokemonList from "./components/PokemonList.jsx";
import Modal from "./components/Modal.jsx"
import Display from "./components/Display.jsx";

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
    children:[
      {
    
          path:"pokemon/:id",
          element:null,
      }
    ]
  },
  {
    path:"pokemon:pokemonID",
    element:<Layout />
  }


])

function App() {
    // const pokemonList = PokemonList();
    // console.log("app : " + pokemonList)
    return (
    <RouterProvider
      router={router}
    ></RouterProvider>

    )
}

export default App