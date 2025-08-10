import React, { useEffect, useState } from 'react';
import Config from '../Config';
import Modal from '../components/Modal';
import WhatsAppButton from '../components/whatsAppButton';
import { Link } from 'react-router-dom';
import CookieConsent from "react-cookie-consent";
import ComentarioForm from './ComentarioForm';


const Home = () => {
  const [empresas, setEmpresas] = useState([]);
  const [modal, setModal] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [slides, setSlides] = useState([]);
  const [categoriasHome, setCategoriasHome] = useState([]);
  const [posts, setPosts] = useState([]);

  const [comentarios, setComentarios] = useState([]);

  const [paginas, setPaginas] = useState([]);

  useEffect(() => {
    getEmpresas();
    getSlides();
    getCategoriasHome();
    getPosts();
    getPaginas();
    
    getComentarios();
  }, []);

  const getEmpresas = async () => {
    const response = await Config.getEmpresas(5);
    setEmpresas(response.data);
  };

  const search = async (e) => {
    const response = await Config.searchEmpresas({ text: e });
    setEmpresas(response.data);
  };
 

  const getComentarios = async () => {
    try {
      const response = await Config.getComentariosAprobados();
      setComentarios(response.data);
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
    }
  };

  const showModal = (e, empresa) => {
    e.preventDefault();
    setModal(true);
    setDatamodal(empresa);
  };

  const getSlides = async () => {
    const response = await Config.getSlides();
    setSlides(response.data);
  };

  const getCategoriasHome = async () => {
    const response = await Config.getCategoriasHome();
    setCategoriasHome(response.data);
  };

  const getPosts = async () => {
    const res = await Config.getPublicPosts();
    setPosts(res.data);
  };

  const getPaginas = async () => {
    const res = await Config.getPublicPaginas();
    setPaginas(res.data);
  };

  return (

    <div className="container-fluid px-0">

      {/* Carrusel de slides */}
      {slides.length > 0 && (
        <div id="carouselExampleCaptions" className="carousel slide mb-5" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {slides.map((slide, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : ''}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={`/img/slide/${slide.imagen}`} className="d-block w-100 h-70 object-fit-cover" alt={`slide ${index + 1}`} />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{slide.frase}</h5>
                  {slide.link && (
                    <a href={slide.link} className="btn btn-rosa" target="_blank" rel="noopener noreferrer">
                      Ver más
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      )}

      {/* Categorías para home estilo visual refinado */}
      <div className="row justify-content-center mb-5 px-2">
        {categoriasHome.map((categoria) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={categoria.slug}>
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img
                src={`/img/categoria/${categoria.urlfoto}`}
                alt={categoria.nombre || 'Imagen de categoría'}
                className="card-img-top object-fit-cover"
                style={{ height: '200px' }}
              />
              <div className="card-body text-center d-flex flex-column justify-content-end">
                <a href={`/categorias/${categoria.slug}`} className="btn btn-rosa mt-3 rounded-pill">
                  {categoria.nombre}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Buscador y listado de empresas */}
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <h1 className="text-center text-rosa fw-bolder">Contacto</h1>

          <div className="card mb-4">
            <div className="card-body">
              <p className="text-center mt-5">BUSCADOR</p>
              <input
                type="search"
                placeholder="Ingrese Empresa:"
                onChange={(e) => search(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              {empresas.map((empresa) => (
                <div className="mt-3" key={empresa.id}>
                  <div className="card-body">
                    <h2 className="fw-bolder">
                      <button
                        onClick={(e) => showModal(e, empresa)}
                        className="btn btn-link p-0"
                        style={{ color: '#f08bb4', textDecoration: 'underline' }}
                      >
                        {empresa.nombre}
                      </button>
                    </h2>
                    <p>{empresa.descripcion}</p>
                  </div>
                </div>
              ))}
              {modal && <Modal datamodal={datamodal} close={() => setModal(false)} />}
            </div>
          </div>
        </div>
      </div>

      {/* 📰 Blog y Contenidos */}
      <div className="pt-5">
        <h2 className="text-center mb-4">📰 Blog y Contenidos</h2>
        <div className="row g-4">
          {posts.map((p) => (
            <div className="col-md-4" key={`post-${p.id}`}>
              <div className="card h-100 shadow blog-card">
                <img src={`/img/post/${p.image}`} className="card-img-top" alt={p.title || 'Imagen del post'} />
                <div className="card-body">
                  <h5 className="card-title">{p.title || 'Sin título'}</h5>
                  <p className="card-text">{p.description?.slice(0, 100)}...</p>
                  <Link to={`/blog/post/${p.slug}`} className="btn btn-outline-dark btn-sm">Leer más</Link>
                </div>
              </div>
            </div>
          ))}
          {paginas.map((pg) => (
            <div className="col-md-4" key={`pagina-${pg.id}`}>
              <div className="card h-100 shadow blog-card">
                <img src={`/img/pagina/${pg.image}`} className="card-img-top" alt={pg.title || 'Imagen de la página'} />
                <div className="card-body">
                  <h5 className="card-title">{pg.title || 'Sin título'}</h5>
                  <p className="card-text">{pg.description?.slice(0, 100)}...</p>
                  <Link to={`/blog/pagina/${pg.slug}`} className="btn btn-outline-secondary btn-sm">Leer más</Link>
                </div>

              </div>
            </div>
          ))}
        </div>
        <div>
          <ComentarioForm/>
        </div>
        {/* Comentarios de Clientes */}
        <div className="my-5">
          <h2 className="text-center mb-4">Comentarios de Clientes</h2>
          {comentarios.length === 0 && <p className="text-center">No hay comentarios aún.</p>}
          <div className="row justify-content-center">
            {comentarios.map((c) => (
              <div key={c.id} className="col-md-6 mb-3">
                <div className="card p-3 shadow-sm rounded">
                  <p className="mb-1">"{c.comentario}"</p>
                  <p className="fw-bold text-end">- {c.nombre}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <CookieConsent
          location="bottom"
          buttonText="Acepto"
          cookieName="mi_consentimiento_cookie"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#fff", background: "#2814ddff", fontSize: "13px" }}
          expires={150}
        >
          Usamos cookies para mejorar tu experiencia en nuestro sitio.{" "}
          <a href="/politica-cookies" style={{ color: "#f1d600", textDecoration: "underline" }}>
            Leer más
          </a>
        </CookieConsent>

      </div>
      <WhatsAppButton />
    </div>


  );
};

export default Home;
