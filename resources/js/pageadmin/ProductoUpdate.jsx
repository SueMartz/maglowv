import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Config from '../Config'
import Select from '../components/Select'
import Sidebar from './Sidebar'

const ProductoUpdate = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    code: '',
    stock: 0,
    price: 0,
    details: '',
    order: 0,
    categoria_id: '',
    urlfoto: '',
    image: ''
  })

  useEffect(() => {
    getProducto()
  }, [])

  const getProducto = async () => {
    const res = await Config.getProductoById(id)
    setForm({ ...res.data, urlfoto: '' }) // dejamos urlfoto vacío para no sobrescribir si no se cambia
  }

  const handleInput = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm({ ...form, urlfoto: reader.result })
    }
    reader.readAsDataURL(file)
  }

  const submitForm = async (e) => {
    e.preventDefault()
    await Config.getProductoUpdate(form, id)
    navigate('/admin/producto')
  }

  return (
    <div className="container-fluid bg-light py-4">
      <div className="row">

          <Sidebar />


        {/* Contenido principal */}
        <div className="col-md-9 px-4 overflow-auto">
          <h3>Editar Producto</h3>
          <form onSubmit={submitForm}>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label>Nombre</label>
                <input type="text" className="form-control" name="name" value={form.name} onChange={handleInput} required />
              </div>
              <div className="col-md-6 mb-2">
                <label>Título</label>
                <input type="text" className="form-control" name="title" value={form.title} onChange={handleInput} required />
              </div>
              <div className="col-md-6 mb-2">
                <label>Descripción</label>
                <input type="text" className="form-control" name="description" value={form.description} onChange={handleInput} required />
              </div>
              <div className="col-md-6 mb-2">
                <label>Detalles</label>
                <textarea className="form-control" name="details" value={form.details} onChange={handleInput}></textarea>
              </div>
              <div className="col-md-4 mb-2">
                <label>Precio</label>
                <input type="number" step="0.01" className="form-control" name="price" value={form.price} onChange={handleInput} required />
              </div>
              <div className="col-md-4 mb-2">
                <label>Stock</label>
                <input type="number" className="form-control" name="stock" value={form.stock} onChange={handleInput} />
              </div>
              <div className="col-md-4 mb-2">
                <label>Orden</label>
                <input type="number" className="form-control" name="order" value={form.order} onChange={handleInput} />
              </div>
              <div className="col-md-6 mb-2">
                <label>Código</label>
                <input type="text" className="form-control" name="code" value={form.code} onChange={handleInput} />
              </div>
              <div className="col-md-6 mb-2">
                <label>Nueva Imagen (opcional)</label>
                <input type="file" className="form-control" onChange={handleFile} accept="image/*" />
                {form.image && (
                  <img
                    src={`/img/producto/${form.image}`}
                    alt={form.name}
                    style={{ width: '100px', marginTop: '10px' }}
                  />
                )}
              </div>
              <div className="col-md-12 mb-2">
                <label>Categoría</label>
                <Select data={form.categoria_id} selected={(value) => setForm({ ...form, categoria_id: value })} />
              </div>
            </div>

            <button className="btn btn-primary mt-3" type="submit">Actualizar</button>
          </form>
        </div>

      </div>
    </div>
  )

}

export default ProductoUpdate
