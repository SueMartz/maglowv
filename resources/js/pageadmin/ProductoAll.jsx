import React, { useEffect, useState } from 'react'
import Config from '../Config'
import { Link } from 'react-router-dom'
import Sidebar from "./Sidebar";


const ProductoAll = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    loadProductos()
  }, [])

  const loadProductos = async () => {
    try {
      const res = await Config.getProductoAll()
      // Asegúrate que sea array, si no, asigna []
      if (Array.isArray(res.data)) {
        setProductos(res.data)
      } else {
        console.error("Respuesta inesperada:", res.data)
        setProductos([])
      }
    } catch (error) {
      console.error("Error cargando productos:", error)
      setProductos([]) // fallback para evitar crash
    }
  }

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás segura de eliminar este producto?")) {
      await Config.getProductoDeleteById(id)
      loadProductos()
    }
  }

  return (
    <div className="container bg-light">
      <div className="row">
        <Sidebar />
        <div className="col-sm-9 mt-3">
          <h3>Productos</h3>
          <Link to="/admin/producto/create" className="btn btn-success mb-3">+ Nuevo producto</Link>
          <table className="table">
            <thead>
              <tr>
                <th>Orden</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.order}</td>
                  <td>
                    {p.image && (
                      <img src={`/img/producto/${p.image}`} alt={p.name} style={{ width: "100px" }} />
                    )}
                  </td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>{p.categoria?.nombre ?? 'Sin categoría'}</td>
                  <td>
                    <Link to={`/admin/producto/edit/${p.id}`} className="btn btn-sm btn-primary me-2">Editar</Link>
                    <button onClick={() => eliminarProducto(p.id)} className="btn btn-sm btn-danger">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default ProductoAll
