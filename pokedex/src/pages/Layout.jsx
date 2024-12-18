import { Outlet, Link } from "react-router-dom";
import Input from "../Input"
//import Display from "../Display"

const Layout = () => {


  return (
    <>
      <Input/>
      
      <Display/>
      <Outlet />
    </>
  )
};

export default Layout;
//<Link to="/pokemon">Pokemon</Link>