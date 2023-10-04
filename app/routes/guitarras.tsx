import { Outlet } from "@remix-run/react"
import guitarras from "~/styles/guitarras.css"

// carga el mismo CSS para las rutas hijas
export function links() {
  return [
    { 
      rel: "stylesheet",
      href: guitarras
    }
  ]
}

const Tienda = () => {
  return (
    <main className="contenedor">
      <Outlet />
    </main>
  )
}

export default Tienda
