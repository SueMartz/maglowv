import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Config from '../Config';
import { Link } from 'react-router-dom';

const SlideAll = () => {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        getSlidesAll();
    }, []);

    const getSlidesAll = async () => {
        try {
            const response = await Config.getSlidesAll();
            setSlides(response.data);
        } catch (error) {
            console.error("Error al obtener slides:", error);
        }
    };

    const deleteSlide = async (id) => {
        const isDelete = window.confirm("¿Borrar Slide?");
        if (isDelete) {
            try {
                await Config.getSlideDeleteById(id);  // <-- Aquí la función correcta
                getSlidesAll(); // Refrescar la lista
            } catch (error) {
                console.error("Error al eliminar el Slide:", error);
                alert('No se pudo eliminar el slide.');
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
                            <Link to={'/admin/slide/create'} className='btn btn-primary mb-3'>Agregar Slide</Link>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Orden</th>
                                        <th>Imagen</th>
                                        <th>Frase</th>
                                        <th>Link</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {slides.length === 0 ? (
                                        <tr><td colSpan="5">Cargando Slides...</td></tr>
                                    ) : (
                                        slides.map((slide) => (
                                            <tr key={slide.id}>
                                                <td>{slide.posicion}</td>
                                                <td>
                                                    {slide.imagen && (
                                                        <img
                                                            src={`/img/slide/${slide.imagen}`}
                                                            alt={slide.frase}
                                                            style={{ width: '100px' }}
                                                        />
                                                    )}
                                                </td>
                                                <td>{slide.frase}</td>
                                                <td>{slide.link}</td>
                                                <td>
                                                    <Link to={`/admin/slide/edit/${slide.id}`} className='btn btn-primary me-2'>Editar</Link>
                                                    <button
                                                        className='btn btn-danger'
                                                        onClick={() => deleteSlide(slide.id)}
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

export default SlideAll;
