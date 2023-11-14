import { Link, useLocation } from "@remix-run/react";
import carrito from "../../public/img/carrito.png"

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="navegacion">
      <Link className={location.pathname === "/" ? "active" : ""} to="/">Inicio</Link>
      <Link className={location.pathname === "/nosotros" ? "active" : ""} to="/nosotros">Nosotros</Link>
      <Link className={location.pathname === "/guitarras" ? "active" : ""} to="/guitarras">Tienda</Link>
      <Link className={location.pathname === "/blog" ? "active" : ""} to="/blog">Blog</Link>
      <Link to="/carrito"><img src={carrito} alt="carrito de compras" /></Link>
    </nav>
  )
}

export default Navigation
