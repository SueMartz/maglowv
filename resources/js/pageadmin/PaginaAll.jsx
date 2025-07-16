import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Config from "../Config";
import { Link } from "react-router-dom";

const PaginaAll = () => {
  const [paginas, setPaginas] = useState([]);

  useEffect(() => {
    getPaginas();
  }, []);

  const getPaginas = async () => {
    try {
      const response = await Config.getPaginaAll();
      setPaginas(response.data);
    } catch (error) {
      console.error("Error al obtener las páginas:", error);
    }
  };

  const deletePagina = async (id) => {
    const confirm = window.confirm("¿Deseas eliminar esta página?");
    if (!confirm) return;

    try {
      await Config.getPaginaDeleteById(id);
      getPaginas();
    } catch (error) {
      console.error("Error al eliminar la página:", error);
    }
  };

  return (
    <div className="container bg-light">
      <div className="row">
        <Sidebar />
        <div className="col-sm-9 mt-3">
          <div className="card">
            <div className="card-body">
              <Link to="/admin/pagina/create" className="btn btn-primary mb-3">
                Crear nueva página
              </Link>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Imagen</th>
                    <th>Titulo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {paginas.length === 0 ? (
                    <tr>
                      <td colSpan="4">Cargando páginas...</td>
                    </tr>
                  ) : (
                    paginas.map((p) => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>
                          {p.image ? (
                            <img src={`/img/pagina/${p.image}`} width="120" />
                          ) : (
                            "Sin imagen"
                          )}
                        </td>
                        <td>{p.title}</td>
                        <td>
                          <Link to={`/admin/pagina/edit/${p.id}`} className="btn btn-primary btn-sm me-2">
                            Editar
                          </Link>
                          <button onClick={() => deletePagina(p.id)} className="btn btn-danger btn-sm">
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

export default PaginaAll;
