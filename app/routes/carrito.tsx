import { useState, useEffect } from "react"
import { useOutletContext } from "@remix-run/react"
import { ClientOnly } from "remix-utils"
import carrito from "~/styles/carrito.css"

export function links() {
  return [
    { 
      rel: "stylesheet",
      href: carrito
    }
  ]
}

export function meta() {
  return (
    [
      { title: "GuitarLA - Carrito de Compras"},
      { description: "Venta de guitarras, musica, blog, carrito de compras, tienda" }
    ]
  )
}

const Carrito = () => {
  const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext();
  const [ total, setTotal ] = useState(0);

  useEffect(() => {
    const calculoTotal = carrito.reduce((total: any, producto: any) => total + (producto.cantidad * producto.precio), 0);

    setTotal(calculoTotal);
  }, [carrito])

  return (
    <ClientOnly fallback="cargando...">
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de Compras</h1>

          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>

              {carrito?.length === 0 ? "Carrito Vacio" : (
                carrito?.map((producto: any) => (
                  <div key={producto.id} className="producto">
                    <div>
                      <img src={producto.imagen} alt={`Imagen del producto ${producto.nombre}`} />
                    </div>

                    <div>
                      <p className="nombre">{producto.nombre}</p>
                      <p>Cantidad:</p>
                      {/* no es necesario un form ya que al selecionar la cantidad estaremos haciendo los ajustes */}
                      <select 
                        name="cantidadGuitarras"
                        id="cantidadGuitarras"
                        value={producto.cantidad}
                        className="select"
                        onChange={e => actualizarCantidad({
                          cantidad: parseInt(e.target.value),
                          id: producto.id
                        })}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>

                      <p className="precio">$ <span>{producto.precio}</span></p>
                      <p className="subtotal">Subtotal: $ <span>{producto.cantidad * producto.precio}</span></p>

                      <button type="button" className="btn_eliminar" onClick={() => eliminarGuitarra(producto.id)}>X</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <aside className="resumen">
              <h3>Resumen del Pedido</h3>
              <p>Total a pagar: $ {total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  )
}

export default Carrito
