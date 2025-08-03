import React, { useEffect, useState } from 'react'
import Config from '../Config'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom';

const EmpresaAll =()=> {
  
    const   [empresa,setEmpresas] = useState([])
  
  useEffect(()=>{
      _getEmpresaAll();
  },[])
  
  const _getEmpresaAll = async () =>{
      const response = await Config.getEmpresaAll()
      setEmpresas(response.data)
  }

   const _deleteEmpresaById = async (id) => {
          const isDelete = window.confirm("¿Borrar Empresa?");
          if (isDelete) {
              try {
                  await Config.getEmpresaDeleteById(id);
                  _getEmpresaAll(); // Recargar la lista
              } catch (error) {
                  console.error("Error al eliminar la empresa:", error);
              }
          }
      };

  return(
  <div className="container bg-light">
            <div className='row'>
                <Sidebar />
                <div className="col-sm-9 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <Link to={'/admin/empresa/create'} className='btn btn-primary'>Agregar Empresa</Link>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Orden</th>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {empresa.length === 0 ? (
                                        <tr><td colSpan="3">Cargando empresas...</td></tr>
                                    ) : (
                                        empresa.map((empresa) => (
                                            <tr key={empresa.orden}>
                                                    
                                                <td>{empresa.orden}</td>
                                                <td>
                                                    {empresa.urlfoto && (
                                                        <img
                                                            src={`/img/empresa/${empresa.urlfoto}`}
                                                            alt={empresa.slug}
                                                            style={{ width: '100px' }}
                                                        />
                                                    )}
                                                </td>
                                                <td>{empresa.nombre}</td>
                                                <td>
                                                    <Link to={`/admin/empresa/edit/${empresa.id}`} className='btn btn-primary me-2'>Editar</Link>
                                                    <button
                                                        className='btn btn-danger'
                                                        onClick={() => _deleteEmpresaById(empresa.id)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default EmpresaAll
