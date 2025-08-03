import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Config from "../Config";

const PaginaDetail = () => {
  const { slug } = useParams();
  const [pagina, setPagina] = useState(null);

  useEffect(() => {
    Config.getPaginaBySlug(slug).then(res => setPagina(res.data));
  }, [slug]);

  if (!pagina) return <div className="container py-5">Cargando...</div>;

  return (
    <div className="container py-5">
      <h1 className="mb-4">{pagina.title}</h1>
      {pagina.image && (
        <img
          src={`/img/pagina/${pagina.image}`}
          alt={`Imagen de ${pagina.title}`}
          className="img-fluid mb-4"
          style={{
            maxHeight: "300px",
            width: "auto",
            objectFit: "cover",
            borderRadius: "8px"
          }}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: pagina.texttop }} />
      <hr />
      <div dangerouslySetInnerHTML={{ __html: pagina.textbottom }} />
    </div>
  );
};

export default PaginaDetail;
