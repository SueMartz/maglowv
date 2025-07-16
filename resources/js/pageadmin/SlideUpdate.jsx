import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Config from '../Config';
import Sidebar from './Sidebar';

const SlideUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [frase, setFrase] = useState('');
    const [imagen, setImagen] = useState('');
    const [fileBase64, setFileBase64] = useState('');
    const [posicion, setPosicion] = useState('');
    const [link, setLink] = useState('');

    const handleInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFileBase64(reader.result);
            };
        }
    };

    useEffect(() => {
        const getSlideUpdate = async () => {
            try {
                const { data } = await Config.getSlideById(id);
                setFrase(data.frase || '');
                setImagen(data.imagen || '');
                setPosicion(data.posicion != null ? data.posicion.toString() : '');
                setLink(data.link || '');
            } catch (err) {
                console.error("Error al cargar el slide:", err);
            }
        };
        getSlideUpdate();
    }, [id]);

    const submitUpdate = async (e) => {
        e.preventDefault();

        const data = {
            frase,
            posicion,
            link,
        };

        // Si hay nueva imagen en base64
        if (fileBase64) {
            data.urlfoto = fileBase64;
        }

        try {
            await Config.getSlideUpdate(data, id); // usa POST con _method=PUT internamente
            alert("Slide actualizado correctamente");
            navigate('/admin/slide');
        } catch (err) {
            console.error("Error al actualizar slide:", err);
        }
    };

    return (
        <div className="container bg-light">
            <div className="row">
                <Sidebar />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={submitUpdate}>
                                <div className="mb-3">
                                    <label>Frase:</label>
                                    <input
                                        className="form-control"
                                        value={frase}
                                        onChange={(e) => setFrase(e.target.value)}
                                        type="text"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Posición:</label>
                                    <input
                                        className="form-control"
                                        value={posicion}
                                        onChange={(e) => setPosicion(e.target.value)}
                                        type="number"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Link:</label>
                                    <input
                                        className="form-control"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        type="url"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Imagen actual:</label><br />
                                    {imagen && (
                                        <img
                                            src={`/img/slide/${imagen}`}
                                            alt="Imagen actual"
                                            className="img-fluid img-thumbnail mb-2"
                                            style={{ maxWidth: '300px' }}
                                        />
                                    )}
                                    <input className="form-control" type="file" onChange={handleInputChange} />
                                </div>

                                <div className="btn-group mt-3">
                                    <Link to={-1} className="btn btn-secondary">Volver</Link>
                                    <button type="submit" className="btn btn-primary">Actualizar Slide</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideUpdate;
