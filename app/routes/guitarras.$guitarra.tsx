import { FormEvent, useState } from "react"
import { useLoaderData, useOutletContext } from "@remix-run/react"
import { getGuitarra } from "~/models/guitarras.server"

export async function loader({request, params}: any) {
  console.log(request);
  const guitarra = await getGuitarra(params.guitarra);

  if (guitarra.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Guitarra No Encontrada'
    })
  }

  return guitarra;
}

export function meta({data}: any) {
  if (!data) {
    return (
      [
        { title: "GuitarLA - Guitarra No Encontrada" },
        { description: `Guitarras, venta de guitarras, guitarra no encontrada` }
      ]
    )
  }

  return (
    [
      { title: `GuitarLA - ${data.data[0].attributes.nombre}` },
      { description: `Guitarras, venta de guitarras, guitarra ${data.data[0].attributes.nombre}` }
    ]
  )
}

const Guitarra = () => {
  const { agregarCarrito }: any = useOutletContext();
  const guitarra = useLoaderData();
  const [ cantidad, setCantidad ] = useState(0);

  const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (cantidad < 1) {
      alert("Debe ingresar una cantidad");

      return;
    }

    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
    }

    agregarCarrito(guitarraSeleccionada)
  }

  return (
    <div className="guitarra">
      <img className="imagen" src={imagen.data.attributes.url} alt={`Imagen de la guitarra ${nombre}`} />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>
        <form className="formulario" onSubmit={handleSubmit}>
          <label htmlFor="cantidad">Cantidad</label>
          <select name="cantidad" id="cantidad" onChange={ e => setCantidad(parseInt(e.target.value))}>
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input type="submit" value="Agregar al carrito" />
        </form>
      </div>
    </div>
  )
}

export default Guitarra