import { useLoaderData } from "@remix-run/react"
import { getPost } from "~/models/posts.server"
import { formatearFecha } from "~/utils/helpers";

export async function loader({request, params}: any) {
  console.log(request);
  const post = await getPost(params.post);

  if (post.data.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Post No Encontrado'
    })
  }

  return post;
}

export function meta({data}: any) {
  if (!data) {
    return (
      [
        { title: "GuitarLA - Post No Encontrado" },
        { description: `Guitarras, venta de guitarras, post no encontrado` }
      ]
    )
  }

  return (
    [
      { title: `GuitarLA - ${data.data[0].attributes.titulo}` },
      { description: `Guitarras, venta de guitarras, post ${data.data[0].attributes.titulo}` }
    ]
  )
}

const Post = () => {
  const post = useLoaderData();

  const { titulo, contenido, imagen, publishedAt } = post.data[0].attributes;

  return (
    <article className="post mt-3">
      <img src={imagen.data.attributes.url} alt={`imagen blog ${titulo}`} />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  )
}

export default Post