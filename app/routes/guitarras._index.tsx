import { useLoaderData } from "@remix-run/react"
import { getGuitarras } from "~/models/guitarras.server"
import ListadoGuitarras from "~/components/listado-guitarras"

export function meta() {
  return (
    [
      { title: "GuitarLA - Tienda de Guitarras"},
      { description: "Nuestra coleccion de guitarras" }
    ]
  )
}

// al exportarlo se manda a llamar en automatico, todo esto corre en el servidor y al ponerle export ya sabe que es lo que tiene que hacer
// loader es lo que utilizas cuando el componente carga y el action es cuando envias datos desde un form
export async function loader() {
  const guitarras = await getGuitarras();

  return guitarras.data;
}

const Tienda = () => {
  const guitarras = useLoaderData();

  return (
    <ListadoGuitarras guitarras={guitarras} />
  )
}

export default Tienda
