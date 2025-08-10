import React, { useEffect, useState } from "react";
import Config from "../Config";

export default function ComentarioList() {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    getComentarios();
  }, []);

  const getComentarios = async () => {
    const response = await Config.ComentariosAll();
    setComentarios(response.data);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4">Comentarios de clientes</h3>
      {comentarios.length > 0 ? (
        comentarios.map((c) => (
          <div key={c.id} className="p-3 mb-3 bg-white rounded shadow">
            <p className="font-semibold">{c.nombre}</p>
            <p>{c.comentario}</p>
            <small className="text-gray-500">
              {new Date(c.created_at).toLocaleDateString()}
            </small>
          </div>
        ))
      ) : (
        <p>No hay comentarios aún.</p>
      )}
    </div>
  );
}
