import { Outlet, Link } from "react-router-dom";
import Input from "../components/Input"
import Display from "../components/Display"

const Layout = (props) => {
  console.log("layout " + props.pokemonList)
  return (
    <>
      <Input/>
      
      <Display pokemonList={props.pokemonList} />
      <Outlet />
    </>
  )
};

export default Layout;
//<Link to="/pokemon">Pokemon</Link>