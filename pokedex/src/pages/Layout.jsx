import { Outlet, Link } from "react-router-dom";
import Input from "../Input"
import Display from "../Display"

const Layout = (props) => {

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