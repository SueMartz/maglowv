import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Config from '../Config'
import Select from '../components/Select'

const EmpresaUpdate = () => {

    const navigate = useNavigate()
    const { id } = useParams()
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
    const [categoria_id, setCategoria_id] = useState(0)
    const [file, setFile] = useState("")

    const handleInputChange = async (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
            setFile(e.target.result)
        }
    }

    useEffect(() => {
        const getEmpresa = async () => {
            try{
            Config.getEmpresaByIdClient(id)
                .then(({ data }) => {
                    setNombre(data.nombre||'')
                    setEmail(data.email||'')
                    setDescripcion(data.descripcion||'')
                    setOrden(data.orden||0)
                    setTelefono(data.telefono||'')
                    setDireccion(data.direccion||'')
                    setWebsite(data.website||'')
                    setFacebook(data.facebook||'')
                    setYoutube(data.youtube||'')
                    setTiktok(data.tiktok||'')
                    setUrlfoto(data.urlfoto||'')
                    setCategoria_id(data.categoria_id||0)

                })
            } catch (err){
                console.error("Error al cargar empresa:", err)
            }

        };
        getEmpresa();
    }, [])


    const getCategoriaId = (v) => {
        setCategoria_id(v)
    }

    const submitUpdate = async (ev) => {
            ev.preventDefault()
            await Config.getEmpresaUpdateClient({ nombre, email, descripcion, orden, telefono, direccion, website, facebook, youtube, tiktok, file, categoria_id },id)
            navigate('/cliente/empresa')
        }

    return (
        <div className="col-sm-9">
            <div className="card mt-5 mb-5">
                    <div className="card-header">Editar Empresa</div>
                    <div className="card-body">
                        <form onSubmit={submitUpdate}>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <label>Nombre</label>
                                    <input className='form-control' value={nombre||''} onChange={(e) => setNombre(e.target.value)} type='text' />
                                </div>
                                <div className="col-sm-3">
                                    <label>E-mail</label>
                                    <input className='form-control' value={email||''} onChange={(e) => setEmail(e.target.value)} type='email' />
                                </div>
                                <div className="col-sm-3">
                                    <label>Telefono</label>
                                    <input className='form-control' value={telefono||''} onChange={(e) => setTelefono(e.target.value)} type='tel' />
                                </div>
                            </div>
                            <div className="form-group row mt-3">
                                <div className="col-sm-6">
                                    <label>Direccion</label>
                                    <input className='form-control' value={direccion||''} onChange={(e) => setDireccion(e.target.value)} type='text' />
                                </div>
                                <div className="col-sm-3">
                                    <label>Orden</label>
                                    <input className='form-control' value={String(orden)} onChange={(e) => setOrden(e.target.value)} type='text' />
                                </div>
                                <div className='col-sm-3'>
                                    <label>Categoria Id</label>
                                    <Select data={categoria_id} selected={getCategoriaId} />
                                </div>
                            </div>
                            <div className='form-group row mt-3'>
                                <div className="col-sm-3">
                                    <label>Website</label>
                                    <input className='form-control' value={website||''} onChange={(e) => setWebsite(e.target.value)} type='url' />
                                </div>
                                <div className="col-sm-3">
                                    <label>Facebook</label>
                                    <input className='form-control' value={facebook||''} onChange={(e) => setFacebook(e.target.value)} type='url' />
                                </div>
                                <div className="col-sm-3">
                                    <label>Youtube</label>
                                    <input className='form-control' value={youtube||''} onChange={(e) => setYoutube(e.target.value)} type='url' />
                                </div>
                                <div className="col-sm-3">
                                    <label>Tiktok</label>
                                    <input className='form-control' value={tiktok||''} onChange={(e) => setTiktok(e.target.value)} type='url' />
                                </div>
                            </div>    
                                <div className="mt-3">
                                    <label>Descripcion</label>
                                    <textarea className='form-control' value={descripcion||''} onChange={(e) => setDescripcion(e.target.value)} type='text' />
                                </div>

                                <div className="col-sm-8">
                                    <label>Imagen:</label>
                                    <img src={`/img/empresa/${urlfoto || 'foto.jpg'}`} loading='lazy' width={200} height={200} className="img-fluid img-thumbnail" alt="Imagen empresa" />
                                    <input className="form-control" type="file" onChange={(e) => handleInputChange(e)} />
                                </div>

                                <div className="btn-group mt-3">
                                    <Link to={-1} className='btn btn-secundary'>Back</Link>
                                    <button type='submit' className="btn btn-primary">Actualizar Empresa</button>

                                </div>
                        </form>
                    </div>
                </div>
            </div>


            )
}

export default EmpresaUpdate
