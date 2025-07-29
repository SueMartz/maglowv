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
    const [website, setWebsite] = useState("")
    const [facebook, setFacebook] = useState("")
    const [youtube, setYoutube] = useState("")
    const [tiktok, setTiktok] = useState("")
    const [urlfoto, setUrlfoto] = useState("")
    const [categoria_id, setCategoria_id] = useState()
    
    const navigate = useNavigate()

    const handleInputChange = async (e) => {
        let files = e.target.files
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            setUrlfoto(e.target.result)
        }
    }
    const getCategoriaId = (v) =>{
        setCategoria_id(v)
    }


    const submitStore = async (e) => {
        e.preventDefault()
        await Config.getEmpresaStoreAdmin({ nombre, email, telefono, direccion, website, facebook, youtube, tiktok, descripcion, orden, urlfoto, categoria_id })
        navigate('/admin/empresa')
    }

    return (
        <div className="conteiner bg-light">
            <div className="row">
                <Sidebar />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={submitStore}>
                                <div className="form-group">
                                    <div className="col-sm-8">
                                        <label>Nombre</label>
                                        <input className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' />
                                    </div>
                                    <div className="col-sm-8">
                                        <label>E-mail</label>
                                        <input className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
                                    </div>
                                    <div className="col-sm-8">
                                        <label>Telefono</label>
                                        <input className='form-control' value={telefono} onChange={(e) => setTelefono(e.target.value)} type='tel' />
                                    </div>

                                    <div className="col-sm-8">
                                        <label>Direccion</label>
                                        <input className='form-control' value={direccion} onChange={(e) => setDireccion(e.target.value)} type='text' />
                                    </div>
                                    <div className="col-sm-8">
                                        <label>Website</label>
                                        <input className='form-control' value={website} onChange={(e) => setWebsite(e.target.value)} type='url' />
                                    </div>
                                    <div className="col-sm-8">
                                        <label>Facebook</label>
                                        <input className='form-control' value={facebook} onChange={(e) => setFacebook(e.target.value)} type='url' />
                                    </div>
                                    <div className="col-sm-8">
                                        <label>Youtube</label>
                                        <input className='form-control' value={youtube} onChange={(e) => setYoutube(e.target.value)} type='url' />
                                    </div>
                                    <div className="col-sm-8">
                                        <label>Tiktok</label>
                                        <input className='form-control' value={tiktok} onChange={(e) => setTiktok(e.target.value)} type='url' />
                                    </div>
                                    <div className="col-sm-8">
                                        <label>Descripcion</label>
                                        <textarea className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} type='text' />
                                    </div>
                                    <div className="col-sm-8">
                                        <label>Orden</label>
                                        <input className='form-control' value={orden} onChange={(e) => setOrden(e.target.value)} type='text' />
                                    </div>
                                    <div className="col-sm-8">
                                        <label>Url foto</label>
                                        <input className="form-control" type="file" onChange={(e) => handleInputChange(e)} />
                                    </div>
                                    <label>Categoria Id</label>
                                    <Select selected ={getCategoriaId}></Select>
                                </div>
                                <div className="btn-group mt-3">
                                    <Link to={-1} className='btn btn-secundary'>Back</Link>
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