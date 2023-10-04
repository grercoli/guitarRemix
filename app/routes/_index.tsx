import { useLoaderData } from "@remix-run/react"
import { getGuitarras } from "~/models/guitarras.server"
import { getPosts } from "~/models/posts.server"
import { getCurso } from "~/models/curso.server"
import ListadoGuitarras from "~/components/listado-guitarras"
import ListadoPosts from "~/components/listado-posts"
import Curso from "~/components/curso"
import stylesGuitarras from "~/styles/guitarras.css";
import stylesBlog from "~/styles/blog.css";
import stylesCurso from "~/styles/curso.css";

export function meta() {
  return (
    [
      { title: "GuitarLA - Nuestro Blog"},
      { description: "GuitarLA, Blog de musica y venta de guitarras" }
    ]
  )
}

export function links() {
  return [
    { 
      rel: "stylesheet",
      href: stylesGuitarras
    },
    { 
      rel: "stylesheet",
      href: stylesBlog
    },
    { 
      rel: "stylesheet",
      href: stylesCurso
    }
  ]
}

export async function loader() {
  // es un arreglo porque van a ser multiples consultas. Al Promise.all() le puedo pasar una rreglo de promises que quiero que se ejecuten
  // ambas consultas van a iniciar al mismo tiempo
  const [ guitarras, posts, curso ] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()
  ]);

  return {
    guitarras: guitarras.data,
    posts: posts.data,
    curso: curso.data
  };
}

const Index = () => {
  const { guitarras, posts, curso } = useLoaderData();

  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras guitarras={guitarras} />
      </main>

      <Curso curso={curso.attributes} />

      <section className="contenedor">
        <ListadoPosts posts={posts} />
      </section>
    </>
  )
}

export default Index;
