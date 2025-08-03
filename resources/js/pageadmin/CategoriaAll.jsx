import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Config from '../Config';
import { Link } from 'react-router-dom';

const CategoriaAll = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        _getCategoriaAll();
    }, []);

    const _getCategoriaAll = async () => {
        const response = await Config.getCategoriaAll();
        setCategorias(response.data);
    };

    const _deleteCategoriaById = async (id) => {
        const isDelete = window.confirm("¿Borrar categoría?");
        if (isDelete) {
            try {
                await Config.getCategoriaDeleteById(id);
                _getCategoriaAll(); // Recargar la lista
            } catch (error) {
                console.error("Error al eliminar la categoría:", error);
            }
        }
    };

    return (
        <div className="container bg-light">
            <div className='row'>
                <Sidebar />
                <div className="col-sm-9 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <Link to={'/admin/categoria/create'} className='btn btn-primary mb-3'>Agregar categoría</Link>
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
                                    {categorias.length === 0 ? (
                                        <tr><td colSpan="3">Cargando categorías...</td></tr>
                                    ) : (
                                        categorias.map((categoria) => (
                                            <tr key={categoria.id}>
                                                <td>{categoria.orden}</td>
                                                <td>
                                                    {categoria.urlfoto && (
                                                        <img
                                                            src={`/img/categoria/${categoria.urlfoto}`}
                                                            alt={categoria.slug}
                                                            style={{ width: '100px' }}
                                                        />
                                                    )}
                                                </td>
                                                <td>{categoria.slug}</td>
                                                <td>
                                                    <Link to={`/admin/categoria/edit/${categoria.id}`} className='btn btn-primary me-2'>Editar</Link>
                                                    <button
                                                        className='btn btn-danger'
                                                        onClick={() => _deleteCategoriaById(categoria.id)}
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
    );
};

export default CategoriaAll;
