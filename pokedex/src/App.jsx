import { useEffect, useState } from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon"
import NoPage from "./pages/NoPage.jsx";
import PokemonList from "./components/PokemonList.jsx";

function App() {
    // const pokemonList = PokemonList();
    // console.log("app : " + pokemonList)
    return (
    <>
    <PokemonList />
    
      {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} pokemonList={pokemonList} >
          <Route index element={<Home />} />
          <Route path="pokemon" element={<Pokemon />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter> */}
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