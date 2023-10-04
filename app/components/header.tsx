import { Link } from "@remix-run/react";
import Navigation from "./navigation";
import logo from "../../public/img/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="contenedor barra">
        <Link to="/">
          <img className="logo" src={logo} alt="Imagen logo" />
        </Link>
        <Navigation />
      </div>
    </header>
  )
}

export default Header
