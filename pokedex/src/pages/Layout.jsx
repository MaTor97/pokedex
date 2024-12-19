import { Outlet, Link, useLoaderData } from "react-router-dom";
import Input from "../components/Input"
import Display from "../components/Display"

const Layout = () => {
  const pokemonList = useLoaderData();
  return (
    <>
      <Input/>
      
      <Display pokemonList={pokemonList}/>
      <Outlet />
    </>
  )
};

export default Layout;
''