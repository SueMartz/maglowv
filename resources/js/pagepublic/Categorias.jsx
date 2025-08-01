import React, { useEffect, useState } from 'react'
import Config from '../Config';
import { Link } from 'react-router-dom';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  useEffect((e) => {
    getCategorias();
  }, [])

  const getCategorias = async () => {
    const response = await Config.CategoriasAll()
    setCategorias(response.data);
  }

  return (
    <div className="container pt-5 pb-5">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <h1 className='text-center fw-bolder'>Línea de productos</h1>

          <div className="row">
            {
              categorias.map((categoria) => {
                return (
                  <div className="col-sm-4" key={categoria.id}>
                    <div className="card">
                      <div className="card-body">
                        <img
                          src={`/img/categoria/${categoria.urlfoto || 'foto.jpg'}`}
                          className="mx-auto d-block img-fluid"
                          style={{
                            height: '150px',
                            width: '100%',
                            objectFit: 'contain',
                            backgroundColor: '#f8f9fa',
                            padding: '10px',
                            borderRadius: '8px',           // Borde suave
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)' // Sombra ligera
                          }}
                          alt="Imagen de categoría"
                        />


                      </div>
                      <div className="card-footer">
                        <Link
                          to={`/categorias/${categoria.slug}`}
                          className='btn w-100 mb-2'
                          style={{ backgroundColor: '#e83e8c', color: 'white' }}
                        >
                          {categoria.nombre}
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              }
              )
            }

          </div>

        </div>
      </div>
    </div>

  )
}

export default Categorias
