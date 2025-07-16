import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Config from '../Config'
import Modal from '../components/Modal'

const Categoria = () => {

  const { slug } = useParams()
  const[modal, setModal] = useState(false)
  const[datamodal,setDatamodal]= useState([])
  const [categoria, setCategoria] = useState([])
  const [empresas, setEmpresas] = useState([])
  const navigate = useNavigate()



  useEffect(() => {
    const getCategoria = async () => {
      await Config.CategoriasBySlug(slug).then(({ data }) => {
        if (data !== null) {
          setCategoria(data.categoria)
          if (data.empresas.length > 0) {
          setEmpresas(data.empresas)
          }
        }else{
          navigate("/")
        }
      })
    }
    getCategoria();
  }, [slug])

  const showModal =(e,empresa)=>{
    e.preventDefault()
    setModal(true);
    setDatamodal(empresa);

  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <div className="card mt-5 mb-5">
            <div className="card-body">
              <h1 className='text-center fw-bolder'>Sucursales {categoria.nombre}</h1>
            </div>
          </div>
          {
            empresas.map((empresa)=>{
              return(
                <div className="card-body" key={empresa.id}>
                  <h2 className="fw-bolder">
                    <span  onClick={(e)=>showModal(e,empresa)} role="button" style={{ color: '#0d6efd', cursor: 'pointer' }}>
                      {empresa.nombre} </span>
                  </h2>
                  <p>{empresa.descripcion}</p>
                </div>
              )
            })
          }
          
           {modal && <Modal datamodal={datamodal} close={setModal} />}
        </div>
      </div>
    </div>
  )
}

export default Categoria
