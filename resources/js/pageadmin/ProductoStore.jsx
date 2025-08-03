import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import Config from '../Config'
import Select from '../components/Select'

const ProductoStore = () => {
  const navigate = useNavigate()

  // Estado por campo
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [code, setCode] = useState('')
  const [stock, setStock] = useState(0)
  const [price, setPrice] = useState(0)
  const [details, setDetails] = useState('')
  const [order, setOrder] = useState(0)
  const [visits, setVisits] = useState(0)
  const [categoria_id, setCategoria_id] = useState('')
  const [message, setMessage] = useState('')

  const handleImageChange = (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setImage(reader.result)
    }
  }

  const submitStore = async (e) => {
    e.preventDefault()

    try {
      await Config.getProductoStore({
        name,
        title,
        description,
        urlfoto: image,
        code,
        stock: parseInt(stock),
        price: parseFloat(price),
        details,
        order: parseInt(order),
        categoria_id: parseInt(categoria_id),
        visits: 0,
      })
      setMessage('Producto creado exitosamente.')
      navigate('/admin/producto')
    } catch (error) {

      setMessage('Error al crear producto, revise los datos o la conexión.')
    }
  }

  return (
    <div className="container-fluid bg-light">
      
      <div className="row">
        <Sidebar />
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h3>Nuevo Producto</h3>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={submitStore}>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label>Nombre</label>
                    <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label>Slug</label>
                    <input className="form-control" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label>Título</label>
                    <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label>Descripción</label>
                    <input className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                  </div>
                  <div className="col-md-12 mb-2">
                    <label>Detalles</label>
                    <textarea className="form-control" value={details} onChange={(e) => setDetails(e.target.value)} />
                  </div>
                  <div className="col-md-4 mb-2">
                    <label>Precio</label>
                    <input type="number" step="0.01" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                  </div>
                  <div className="col-md-4 mb-2">
                    <label>Stock</label>
                    <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} />
                  </div>
                  <div className="col-md-4 mb-2">
                    <label>Orden</label>
                    <input
                      type="number"
                      className="form-control"
                      value={order}
                      onChange={(e) => setOrder(Number(e.target.value))} // guarda como número
                      min="0"
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label>Código</label>
                    <input className="form-control" value={code} onChange={(e) => setCode(e.target.value)} />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label>Imagen</label>
                    <input className="form-control" type="file" onChange={handleImageChange} accept="image/*" />
                  </div>
                  <div className="col-md-12 mb-2">
                    <label>Categoría</label>
                    <Select data={categoria_id} selected={(value) => setCategoria_id(parseInt(value))} />
                  </div>
                </div>
                <div className="btn-group mt-3">
                  <Link to={-1} className="btn btn-secondary">Volver</Link>
                  <button type="submit" className="btn btn-primary">Crear Producto</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductoStore
