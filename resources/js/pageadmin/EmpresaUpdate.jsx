import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Config from '../Config';
import Sidebar from './Sidebar';

const EmpresaUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [orden, setOrden] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [website, setWebsite] = useState('');
    const [facebook, setFacebook] = useState('');
    const [youtube, setYoutube] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [urlfoto, setUrlfoto] = useState('foto.jpg');
    const [file, setFile] = useState('');

    const handleInputChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => setFile(event.target.result);
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    useEffect(() => {
        const getEmpresa = async () => {
            try {
                const { data } = await Config.getEmpresaById(id);
                setNombre(data.nombre ?? '');
                setEmail(data.email ?? '');
                setTelefono(data.telefono ?? '');
                setDireccion(data.direccion ?? '');
                setLatitud(data.latitud ?? '');
                setLongitud(data.longitud ?? '');
                setOrden(data.orden != null ? data.orden.toString() : '');
                setDescripcion(data.descripcion ?? '');
                setWebsite(data.website ?? '');
                setFacebook(data.facebook ?? '');
                setYoutube(data.youtube ?? '');
                setTiktok(data.tiktok ?? '');
                setUrlfoto(data.urlfoto ?? 'foto.jpg');
            } catch (err) {
                console.error('Error al cargar empresa:', err);
            }
        };
        getEmpresa();
    }, [id]);

    const submitUpdate = async (ev) => {
        ev.preventDefault();
        await Config.getEmpresaUpdate(
            { nombre, email, telefono, direccion, latitud, longitud, orden, descripcion, website, facebook, youtube, tiktok, file },
            id
        );
        navigate('/admin/empresa');
    };

    return (
        <div className="container bg-light py-4">
            <div className="row">
                <Sidebar />
                <div className="col-sm-9 mt-3 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form onSubmit={submitUpdate}>
                                {/* Primera fila: nombre y email */}
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label>Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>E-mail</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Segunda fila: teléfono, orden, website */}
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label>Teléfono</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label>Orden</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={orden}
                                            onChange={(e) => setOrden(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label>Website</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            value={website}
                                            onChange={(e) => setWebsite(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Tercera fila: dirección, latitud, longitud */}
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label>Dirección</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={direccion}
                                            onChange={(e) => setDireccion(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label>Latitud</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={latitud}
                                            onChange={(e) => setLatitud(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label>Longitud</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={longitud}
                                            onChange={(e) => setLongitud(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Descripción */}
                                <div className="mb-3">
                                    <label>Descripción</label>
                                    <textarea
                                        className="form-control"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                {/* Redes sociales: facebook, youtube, tiktok */}
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label>Facebook</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            value={facebook}
                                            onChange={(e) => setFacebook(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label>Youtube</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            value={youtube}
                                            onChange={(e) => setYoutube(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label>Tiktok</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            value={tiktok}
                                            onChange={(e) => setTiktok(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Imagen */}
                                <div className="mb-4">
                                    <label>Imagen:</label>
                                    <div className="d-flex align-items-center gap-3">
                                        <img
                                            src={urlfoto ? `/img/empresa/${urlfoto}` : "/img/placeholder.jpg"}
                                            className="img-thumbnail"
                                            alt="Empresa"
                                            style={{ width: 120, height: 90, objectFit: "cover" }}
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="form-control-file"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <Link to="/admin/empresa" className="btn btn-secondary">
                                        Volver
                                    </Link>
                                    <button type="submit" className="btn btn-primary">
                                        Actualizar Empresa
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpresaUpdate;
