import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Config from '../Config'
import Select from '../components/Select'



const EmpresaStore = () => {

  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [orden, setOrden] = useState(0)
  const [descripcion, setDescripcion] = useState("")
  const [telefono, setTelefono] = useState("")
  const [direccion, setDireccion] = useState("")
  const [latitud, setLatitud] = useState("")
  const [longitud, setLongitud] = useState("")
  const [website, setWebsite] = useState("")
  const [facebook, setFacebook] = useState("")
  const [youtube, setYoutube] = useState("")
  const [tiktok, setTiktok] = useState("")
  const [urlfoto, setUrlfoto] = useState("")

  
  const [errors, setErrors] = useState({});

  const navigate = useNavigate()

  const handleInputChange = async (e) => {
    let files = e.target.files
    let reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = (e) => {
      setUrlfoto(e.target.result)
    }
  }



  const submitStore = async (e) => {
    e.preventDefault();
    try {
      await Config.getEmpresaStoreAdmin({
        nombre, email, telefono, direccion, website, facebook, youtube, tiktok,
        descripcion, orden, urlfoto, latitud, longitud, publicado: true, visitas: 0
      });
      navigate('/admin/empresa');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);  // guarda errores por campo
      } else {
        console.log("Otro error:", error);
      }
    }
  }

  return (
    <div className="container bg-light">
      <div className="row">
        <Sidebar />
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={submitStore}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Nombre</label>
                    <input className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' />
                    {errors.nombre && <small className="text-danger">{errors.nombre[0]}</small>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>E-mail</label>
                    <input className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
                    {errors.email && <small className="text-danger">{errors.email[0]}</small>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Telefono</label>
                    <input className='form-control' value={telefono} onChange={(e) => setTelefono(e.target.value)} type='tel' />
                    {errors.telefono && <small className="text-danger">{errors.telefono[0]}</small>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Direccion</label>
                    <input className='form-control' value={direccion} onChange={(e) => setDireccion(e.target.value)} type='text' />
                    {errors.direccion && <small className="text-danger">{errors.direccion[0]}</small>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Latitud</label>
                    <input className='form-control' value={latitud} onChange={(e) => setLatitud(e.target.value)} type='text' />
                    {errors.latitud && <small className="text-danger">{errors.latitud[0]}</small>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Longitud</label>
                    <input className='form-control' value={longitud} onChange={(e) => setLongitud(e.target.value)} type='text' />
                    {errors.longitud && <small className="text-danger">{errors.longitud[0]}</small>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Website</label>
                    <input className='form-control' value={website} onChange={(e) => setWebsite(e.target.value)} type='url' />
                    {errors.website && <small className="text-danger">{errors.website[0]}</small>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Facebook</label>
                    <input className='form-control' value={facebook} onChange={(e) => setFacebook(e.target.value)} type='url' />
                    {errors.facebook && <small className="text-danger">{errors.facebook[0]}</small>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Youtube</label>
                    <input className='form-control' value={youtube} onChange={(e) => setYoutube(e.target.value)} type='url' />
                    {errors.youtube && <small className="text-danger">{errors.youtube[0]}</small>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Tiktok</label>
                    <input className='form-control' value={tiktok} onChange={(e) => setTiktok(e.target.value)} type='url' />
                    {errors.tiktok && <small className="text-danger">{errors.tiktok[0]}</small>}
                  </div>

                  <div className="col-md-12 mb-3">
                    <label>Descripcion</label>
                    <textarea className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    {errors.descripcion && <small className="text-danger">{errors.descripcion[0]}</small>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Orden</label>
                    <input className='form-control' value={orden} onChange={(e) => setOrden(e.target.value)} type='text' />
                    {errors.orden && <small className="text-danger">{errors.orden[0]}</small>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Url foto</label>
                    <input className="form-control" type="file" onChange={handleInputChange} />
                    {errors.urlfoto && <small className="text-danger">{errors.urlfoto[0]}</small>}
                  </div>


                </div>

                <div className="btn-group mt-3">
                  <Link to={-1} className='btn btn-secondary'>Back</Link>
                  <button type='submit' className="btn btn-primary">Crear Empresa</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

}

export default EmpresaStore