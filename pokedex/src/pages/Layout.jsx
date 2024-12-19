import { Outlet, Link } from "react-router-dom";
import Input from "../Input"
<<<<<<< HEAD
import Display from "../Display"
=======
//import Display from "../Display"

const Layout = () => {
>>>>>>> 724f297b75b739c2f3bc1996864877ac4b3a41ab

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