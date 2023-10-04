import { Link } from "@remix-run/react"

interface Guitarra {
  descripcion: string;
  imagen: any;
  precio: string;
  url: string;
  nombre: string;
}

interface GuitarraProps {
  guitarra: Guitarra;
}

const Guitarra = ({ guitarra }: GuitarraProps) => {
  const { descripcion, imagen, precio, url, nombre } = guitarra;

  return (
    <div className="guitarra">
      <img src={imagen.data.attributes.formats.medium.url} alt={`Imagen guitarra ${nombre}`} />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="descripcion">{descripcion}</p>
        <p className="precio">${precio}</p>

        {/* Apunta a guitarras entonces hay que crear un routing en la carpeta "routes" llamado guitarras */}
        <Link className="enlace" to={`/guitarras/${url}`}>Ver Producto</Link>
      </div>
    </div>
  )
}

export default Guitarra
