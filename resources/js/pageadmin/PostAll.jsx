import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Config from "../Config";
import { Link } from "react-router-dom";

const PostAll = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await Config.getPostAll();
      setPosts(response.data);
    } catch (error) {
      console.error("Error al obtener los posts:", error);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("¿Deseas eliminar este post?")) return;
    try {
      await Config.getPostDeleteById(id);
      getPosts();
    } catch (error) {
      console.error("Error al eliminar el post:", error);
    }
  };

  return (
    <div className="container bg-light">
      <div className="row">
        <Sidebar />
        <div className="col-sm-9 mt-3">
          <div className="card">
            <div className="card-body">
              <Link to="/admin/post/create" className="btn btn-primary mb-3">
                Crear nuevo post
              </Link>
              <table className="table">
                <thead>
                  <tr>
                    <th>Orden</th>
                    <th>Imagen</th>
                    <th>Título</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length === 0 ? (
                    <tr>
                      <td colSpan="4">Cargando posts...</td>
                    </tr>
                  ) : (
                    posts.map((p) => (
                      <tr key={p.id}>
                        <td>{p.order}</td>
                        <td>
                          {p.image ? (
                            <img src={`/img/post/${p.image}`} width="120" />
                          ) : (
                            "Sin imagen"
                          )}
                        </td>
                        <td>{p.title}</td>
                        
                        
                        <td>
                          <Link to={`/admin/post/edit/${p.id}`} className="btn btn-primary btn-sm me-2">
                            Editar
                          </Link>
                          <button onClick={() => deletePost(p.id)} className="btn btn-danger btn-sm">
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

export default PostAll;
