import React, { useEffect, useState } from "react";
import Config from "../Config";
import { Link } from "react-router-dom";


const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [paginas, setPaginas] = useState([]);

  useEffect(() => {
    getPosts();
    getPaginas();
  }, []);

  const getPosts = async () => {
    const res = await Config.getPublicPosts(); // <--- nuevo
    setPosts(res.data);
  };

  const getPaginas = async () => {
    const res = await Config.getPublicPaginas(); // <--- nuevo
    setPaginas(res.data);
  };
  return (
    <div className="container py-4">
      <h2 className="mb-4">📰 Blog y Contenidos</h2>
      <div className="row g-4">
        {posts.map((p) => (
          <div className="col-md-4" key={`post-${p.id}`}>
            <div className="card h-100 shadow blog-card">
              <img src={`/img/post/${p.image}`} className="card-img-top" alt={p.title} />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">{p.description.slice(0, 100)}...</p>
                <Link to={`/blog/post/${p.slug}`} className="btn btn-outline-dark btn-sm">Leer más</Link>
              </div>
            </div>
          </div>
        ))}
        {paginas.map((pg) => (
          <div className="col-md-4" key={`pagina-${pg.id}`}>
            <div className="card h-100 shadow blog-card">
              <img src={`/img/pagina/${pg.image}`} className="card-img-top" alt={pg.title} />
              <div className="card-body">
                <h5 className="card-title">{pg.title}</h5>
                <p className="card-text">{pg.description.slice(0, 100)}...</p>
                <Link to={`/blog/pagina/${pg.slug}`} className="btn btn-outline-secondary btn-sm">Leer más</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
