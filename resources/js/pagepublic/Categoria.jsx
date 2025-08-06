import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Config from '../Config'
import Modal from '../components/Modal'

const Categoria = () => {
  const { slug } = useParams()
  const [modal, setModal] = useState(false)
  const [datamodal, setDatamodal] = useState([])
  const [categoria, setCategoria] = useState([])
  const [productos, setProductos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getCategoria = async () => {
      await Config.CategoriasBySlug(slug).then(({ data }) => {
        if (data !== null) {
          setCategoria(data.categoria)
          if (data.productos && data.productos.length > 0) {
            setProductos(data.productos)
          }
        } else {
          navigate("/")
        }
      })
    }
    getCategoria();
  }, [slug])

  const showModal = (e, producto) => {
    e.preventDefault()
    setModal(true);
    setDatamodal(producto);
  }

  return (
  <div className="container pt-5 pb-5">
    <div className="row justify-content-center">
      <div className="col-sm-12">
        <h1 className='text-center fw-bolder mb-4 text-rosa'>
          Productos por categoría: {categoria.nombre}
        </h1>

        <p className="small text-center">{categoria.descripcion}</p>

        <div className="row">
          {productos.map((producto) => (
            <div className="col-sm-4 mb-4" key={producto.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <img
                    src={`/img/producto/${producto.image || 'foto.jpg'}`}
                    alt={producto.name}
                    className="mx-auto d-block img-fluid mb-3"
                    style={{
                      height: '150px',
                      width: '100%',
                      objectFit: 'contain',
                      backgroundColor: '#f8f9fa',
                      padding: '10px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <h5 className="text-center ">{producto.name}</h5>
                  <p className="small text-center">{producto.descripcion}</p>
                </div>
                <div className="card-footer bg-white border-0">
                  <button
                    className="btn w-100 "
                    style={{
                      backgroundColor: '#e83e8c',
                      color: 'white',
                      borderRadius: '6px',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={(e) => showModal(e, producto)}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modal && <Modal datamodal={datamodal} close={setModal} />}
      </div>
    </div>
  </div>
)
}

export default Categoria
