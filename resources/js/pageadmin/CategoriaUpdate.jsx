import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Config from '../Config'
import Sidebar from './Sidebar'

const CategoriaUpdate = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [orden, setOrden] = useState("")
    const [urlfoto, setUrlfoto] = useState("foto.jpg")
    const [file, setFile] = useState("")
    const [menu, setMenu] = useState(false);

    const handleInputChange = async (e) => {
        let files = e.target.files
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            setFile(e.target.result)
        }
    }

    useEffect(() => {
        const _getCategoriaUpdate = async () => {
            Config.getCategoriaById(id)
                .then(({ data }) => {
                    console.log("Datos recibidos:", data);
                    setNombre(data.nombre ?? "")
                    setDescripcion(data.descripcion ?? "")
                    setOrden(data.orden != null ? data.orden.toString() : "")
                    setUrlfoto(data.urlfoto ?? "")
                    setMenu(!!data.menu)
                })
        };
        _getCategoriaUpdate();
    }, [])


    const submitUpdate = async (ev) => {
        ev.preventDefault()
        await Config.getCategoriaUpdate({ nombre, descripcion, orden, file, urlfoto, menu }, id);
        navigate('/admin/categoria')

    }

    return (
  <div className="container bg-light py-4">
    <div className="row">
      <Sidebar />
      <div className="col-sm-9 mt-3 mb-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={submitUpdate}>
              <div className="form-row align-items-center mb-3">
                <div className="col-auto">
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={menu}
                      onChange={(e) => setMenu(e.target.checked)}
                      id="menu"
                    />
                    <label className="form-check-label" htmlFor="menu">
                      Portada?
                    </label>
                  </div>
                </div>
                <div className="col-md-7">
                  <label htmlFor="nombre" className="font-weight-bold">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    type="text"
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="orden" className="font-weight-bold">
                    Orden
                  </label>
                  <input
                    id="orden"
                    className="form-control"
                    value={orden ?? ""}
                    onChange={(e) => setOrden(e.target.value)}
                    type="number"
                    min="1"
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="descripcion" className="font-weight-bold">
                  Descripción:
                </label>
                <textarea
                  id="descripcion"
                  className="form-control"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="form-group mb-4">
                <label className="font-weight-bold d-block mb-2">Imagen:</label>
                <div className="d-flex align-items-center gap-3">
                  <img
                    <img
  src={urlfoto 
    ? `/img/categoria/${urlfoto}?t=${new Date().getTime()}` 
    : "/img/placeholder.jpg"}
  className="img-thumbnail"
  alt="Imagen de categoría"
  style={{ width: 120, height: 90, objectFit: "cover" }}
/>
                    className="img-thumbnail"
                    alt="Imagen de categoría"
                    style={{ width: 120, height: 90, objectFit: "cover" }}
                  />
                  <input
                    className="form-control-file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <Link to={-1} className="btn btn-secondary">
                  Volver
                </Link>
                <button type="submit" className="btn btn-primary">
                  Actualizar Categoría
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default CategoriaUpdate
