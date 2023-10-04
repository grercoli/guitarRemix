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

export default function App() {
  return (
    <Document>
      <Outlet /> 
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
