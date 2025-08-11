import React, { useEffect, useState } from "react";
import Config from "../Config"; // ajusta la ruta si hace falta
import Sidebar from './Sidebar'

export default function ComentarioAdmin() {
  const [pendientes, setPendientes] = useState([]);

  const cargarPendientes = () => {
    Config.getComentariosPendientes()
      .then((res) => setPendientes(res.data))
      .catch((e) => console.error(e));
  };

  const aprobar = async (id) => {
    try {
      await Config.aprobarComentario(id);
      cargarPendientes();
    } catch (error) {
      console.error(error);
    }
  };

  const eliminar = async (id) => {
    try {
      await Config.eliminarComentario(id);
      cargarPendientes();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarPendientes();
  }, []);

  return (
    <div className="container bg-light pt-5">
      <div className="row">
        <Sidebar />
        <div className="col-sm-6 mx-auto">
          <div className="card shadow">
            <div className="card-body"></div>

            <h2 className="text-xl font-bold mb-4">Comentarios Pendientes</h2>
            {pendientes.length > 0 ? (
              pendientes.map((c) => (
                <div key={c.id} className="p-3 mb-3 bg-yellow-100 rounded shadow">
                  <p className="font-semibold">{c.nombre}</p>
                  {/* Aquí agregamos las estrellas */}
                  <p className="text-end mb-1" style={{ color: '#f4c150', fontSize: '1.2rem' }}>
                    {"★".repeat(c.rating)}{"☆".repeat(5 - c.rating)}
                  </p>

                  <p className="font-semibold">{c.email}</p>
                  <p>{c.comentario}</p>
                  <div className="mt-2">
                    <button
                      onClick={() => aprobar(c.id)}
                      className="btn btn-primary me-2"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => eliminar(c.id)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay comentarios pendientes.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}