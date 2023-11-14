import { useState, useEffect } from "react"
import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useRouteError,
  isRouteErrorResponse,
  Link
} from "@remix-run/react";
import styles from "~/styles/index.css";
import Header from "~/components/header";
import Footer from "~/components/footer";

// la informacion que se va a inyectar en la parte de meta en nuestro <head></head>
// esta funcion de meta solo funciona con los archivos que defina en la carpeta routes osea puedo modificarlo
// desde un archivo que se encuentra dentro de routes
export function meta() {
  return [
    { charset: "utf-8" },
    { title: "GuitarLA - Remix" },
    { viewport: "width=device-width, initial-scale=1" }
  ]
}

// en esta funcion de links tambien se pueden añadir imagenes para aplicarle un prefetch o un preload para mejorar la perf
// lo que se cargue aca en root se carga en todas las paginas y en todos los componentes
// para usar estilos pequeños dependiendo de cada componente se puede exportar este mismo links y editarlo en otros lugares
// el orden importa, por lo tanto primero carga el reset de normalize, luego las fonts de google y luego nuestra hoja de estilos
export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com"
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true"
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap"
    },
    { 
      rel: "stylesheet",
      href: styles
    }
  ]
}

// En el outlet declaro context de esa forma voy a atar codigo al context que ya viene en Remix, siempre es un objeto, se puede pasar lo que yo desee. Este context que yo declare aca solo va a funcionar en el PRIMER NIVEL de rutas, es decir no en rutas hijas o anidadas.
export default function App() {
  const carritoLS = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("carrito")) ?? [] : null;
  
  const [ carrito, setCarrito ] = useState(carritoLS);

  // todo lo que se coloque dentro de un useEffect en Remix se va a ejecutar del lado del cliente
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito])

  const agregarCarrito = (guitarra: any) => {
    // itera sobre los elementos que hay en el carrito y nos devuelve un true en caso de que uno de los elementos del array cumpla con la condicion
    if (carrito.some((guitarraState: any) => guitarraState.id === guitarra.id)) {
      // Iterar sobre el arreglo e identificar al elemento duplicado, tener en cuenta que el map te retorna un arreglo nuevo
      const carritoActualizado = carrito.map((guitarState: any) => {
        if (guitarState.id === guitarra.id) {
          // Reescribir la cantidad
          guitarState.cantidad = guitarra.cantidad;
        }
        return guitarState;
      });

      setCarrito(carritoActualizado);
    } else {
      // Registro nuevo, agregar al carrito
      setCarrito([...carrito, guitarra]);
    }
  }

  const actualizarCantidad = (guitarra: any) => {
    const carritoActualizado = carrito.map((guitarState: any) => {
      if (guitarState.id === guitarra.id) {
        // Reescribir la cantidad
        guitarState.cantidad = guitarra.cantidad;
      }
      return guitarState;
    });

    setCarrito(carritoActualizado);
  }

  const eliminarGuitarra = (id: any) => {
    const carritoActualizado = carrito.filter((guitarState: any) => guitarState.id !== id);

    setCarrito(carritoActualizado);
  }

  return (
    <Document>
      <Outlet 
        context={{
          agregarCarrito,
          carrito,
          actualizarCantidad,
          eliminarGuitarra
        }}
      /> 
    </Document>
  )
}

// layout principal
function Document({children}: any){
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        
        {/* contiene las optimizaciones de Remix, hay que ponerlo */}
        <Scripts />

        {/* para no tener que recargar la pagina cada vez meto un cambio en el codigo, es para modo dev */}
        <LiveReload />
      </body>
    </html>
  )
}

// Herramienta para el manejo de errores
export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <p className="error">{error.status} {error.statusText}</p>
        <Link className="error-enlace" to="/">Tal vez quieras volver a la pagina principal</Link>
      </Document>
    );
  }
}
