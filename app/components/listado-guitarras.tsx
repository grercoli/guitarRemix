import Guitarra from "./guitarra"

const ListadoGuitarras = ({ guitarras }: any) => {
  return (
    <>
      <h2 className="heading">Nuestra coleccion</h2>

      {guitarras?.length && (
        <div className="guitarras-grid">
          {guitarras.map((guitarra: any) => (
            <Guitarra key={`${guitarra?.attributes.url}${guitarra?.id}`} guitarra={guitarra?.attributes} />
          ))}
        </div>
      )}
    </>
  )
}

export default ListadoGuitarras
