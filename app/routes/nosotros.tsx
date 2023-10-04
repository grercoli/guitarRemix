import image from "../../public/img/nosotros.jpg"
import nosotros from "~/styles/nosotros.css"

// description es muy importante para SEO y posicionamiento
export function meta() {
  return (
    [
      { title: "GuitarLA - Nosotros"},
      { description: "Venta de guitarras, blog de musica" }
    ]
  )
}

// preload lo que hace es agregar una imagen o un video o un archivo de JS o de CSS y decirle al navegador tan pronto como cargues toda la info carga esta imagen que puede ser muy pesada. Con el "as" le especificas que es lo que estas cargando.
export function links() {
  return [
    { 
      rel: "stylesheet",
      href: nosotros
    },
    { 
      rel: "preload",
      href: image,
      as: "image"
    }
  ]
}

const Nosotros = () => {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={image} alt="Imagen sobre nosotros" />

        <div>
          <p>Vestibulum molestie faucibus dolor, non varius ex pharetra a. Sed convallis ultricies dictum. Vivamus fringilla lobortis mi sit amet vulputate. Integer in nulla libero. Suspendisse pellentesque justo sit amet ex pretium vehicula. Phasellus nec ex fermentum, commodo tellus non, interdum ipsum. Nulla fermentum porta imperdiet. Pellentesque at mollis odio. Donec tincidunt pulvinar est, at ultrices erat feugiat quis. Vivamus vitae sodales nunc. Nulla facilisi. Morbi nec ex suscipit ipsum rhoncus finibus quis sed ante. Maecenas pellentesque erat ut dui malesuada maximus.</p>
          <p>Pellentesque sit amet lacinia tellus. Etiam elementum fermentum sapien. Quisque hendrerit ultricies ipsum, quis euismod nisl aliquet ut. Phasellus eget justo fermentum tellus iaculis efficitur in rutrum sem. In vel dolor scelerisque, sagittis mauris quis, cursus urna. Nam consectetur consequat tellus, at accumsan lacus eleifend et. Cras sollicitudin sem sit amet dolor ultricies imperdiet. Nam molestie, nisi sagittis dapibus aliquam, odio sapien blandit eros, vel vestibulum nunc libero in metus. Proin eget ante massa. Mauris id augue sit amet libero convallis egestas. Donec tincidunt lectus leo, quis posuere ligula placerat et. Pellentesque iaculis nisi arcu. Suspendisse convallis tempus neque eget porta. Mauris facilisis mi justo, non congue odio interdum a. Curabitur ligula nisl, egestas quis molestie vel, sagittis vel elit. Donec et leo non justo euismod dignissim.</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros
