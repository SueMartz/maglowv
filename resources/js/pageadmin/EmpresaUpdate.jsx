import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Config from '../Config';
import Sidebar from './Sidebar';

const EmpresaUpdate = () => {
 const navigate =useNavigate()
 const { id } = useParams();
 const[nombre, setNombre] = useState("")
 const[orden, setOrden] = useState("")
 const[publicado, setPublicado]= useState(false)

 useEffect(() => {
         const _getEmpresaUpdate = async () => {
             Config.getEmpresaById(id)
                 .then(({ data }) => {
                     console.log("Datos recibidos:", data);
                     const empresa = Array(data)? data[0]:data;
                     setNombre(data.nombre ?? "")
                     setOrden(data.orden != null ? data.orden.toString() : "")
                     setPublicado(!!data.publicado) 
                 })
         };
         _getEmpresaUpdate();
     }, [])

     const submitUpdate = async(ev)=>{
        ev.preventDefault();
        await Config.getEmpresaUpdate({nombre,orden,publicado},id)
        navigate('/admin/empresa')

     }

  return (
     <div className="conteiner bg-light">
            <div className="row">
                <Sidebar />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={submitUpdate}>
                                <div className="form-group row">
                                    <div className="mt-3">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={publicado}
                                                onChange={(e) => setPublicado(e.target.checked)}
                                                id="publicado"
                                            />
                                            <label className="form-check-lable" htmlFor='publicado'>Publicado?</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <label>Nombre</label>
                                        <input className='form-control' disabled value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' />
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Orden</label>
                                        <input
                                            className="form-control"
                                            value={orden ?? ""}
                                            onChange={(e) => setOrden(e.target.value)}
                                            type="number"
                                        />
                                    </div>
                                </div>
                                
                                <div className="btn-group mt-3">
                                    <Link to={-1} className='btn btn-secondary'>Back</Link>
                                    <button type='submit' className="btn btn-primary">Actualizar Empresa</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default EmpresaUpdate
