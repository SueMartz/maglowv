import React, { useEffect, useState } from 'react';
import Config from '../Config';
import Modal from '../components/Modal';
import WhatsAppButton from '../components/whatsAppButton';
import { Link } from 'react-router-dom';
import CookieConsent from "react-cookie-consent";
import ComentarioForm from './ComentarioForm';
import SliderHome from "../components/SliderHome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import '../../css/app-react.css';



const Home = () => {
  const [empresas, setEmpresas] = useState([]);
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [slides, setSlides] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriasHome, setCategoriasHome] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [paginas, setPaginas] = useState([]);
  const [selected, setSelected] = useState(null);
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    getEmpresas();
    getSlides();
    getCategoriasHome();
    getPosts();
    getPaginas();
    getComentarios();
    getCatalogo();
  }, []);

  const getCatalogo = async () => {
  const response = await Config.getCategoriasConProductos();
  setCatalogo(response.data);
  };


  const getEmpresas = async () => {
    const response = await Config.getEmpresas(5);
    setEmpresas(response.data);

    if (response.data.length > 0) {
      setSelected(response.data[0]);
    }
  };

  const search = async (e) => {
    const response = await Config.searchEmpresas({ text: e });
    setEmpresas(response.data);
  };

  const mostrarMapa = (empresa) => {
    setSelected(empresa);
  };

  const getComentarios = async () => {
    try {
      const response = await Config.getComentariosAprobados();
      setComentarios(response.data);
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
    }
  };

  const getSlides = async () => {
    const response = await Config.getSlides();
    setSlides(response.data);
  };

  const getCategoriasHome = async () => {
    const response = await Config.getCategoriasHome();
    setCategoriasHome(response.data);
  };

  const getCategorias = async () => {
    const response = await Config.getCategoriasPublic();
    setCategorias(response.data);
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
    <div className="home-container">
      <div className="maglowv-home">

  {catalogo.map((categoria, index) => (

    <section
      className={`mag-section ${index % 2 === 0 ? 'bg-light-custom' : 'bg-beige'}`}
      key={categoria.id}
    >

      <div className="container">

        {/* HEADER */}
        <div className="section-header">

          <span className="section-badge">
            {categoria.nombre}
          </span>

          <h2>
            {categoria.nombre}
          </h2>

          <p>
            {categoria.descripcion}
          </p>

        </div>

        {/* PRODUCTOS */}
        <div className="row g-4">

          {categoria.productos?.map((producto) => (

            <div className="col-md-4" key={producto.id}>

              <div className="mag-card h-100">

                <div className="mag-card-image">

                  <img
                    src={`/img/producto/${producto.image || 'foto.jpg'}`}
                    alt={producto.name}
                  />

                </div>

                <div className="mag-card-body">

                  <span className="product-tag">
                    {categoria.nombre}
                  </span>

                  <h4>
                    {producto.name}
                  </h4>

                  <div className="product-price">
                    ${producto.precio} MXN
                  </div>

                  <p>
                    {producto.descripcion}
                  </p>

                  <button
                    className="btn-maglowv"
                    onClick={(e) => {
                      e.preventDefault();
                      setModal(true);
                      setDatamodal(producto);
                    }}
                  >
                    Ver más
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  ))}

</div>

      



      <div className="pt-5 react-blog-section">
        <h2 className="text-center mb-4">📰 Blog y Contenidos</h2>

        <div className="row g-4">
          {posts.map((p) => (
            <div className="col-md-4" key={`post-${p.id}`}>
              <div className="react-card blog-card position-relative overflow-hidden h-100">

                {/* Imagen */}
                <img
                  src={`/img/post/${p.image}`}
                  className="maglowv-blog-img"
                  alt={p.title || 'Imagen del post'}
                />

                {/* Overlay oscuro */}
                <div className="blog-overlay"></div>

                {/* Contenido */}
                <div className="card-body blog-content">

                  {/* Badge */}
                  <span className="badge bg-warning text-dark mb-2">
                    🔥 Transformación
                  </span>

                  {/* Título */}
                  <h5 className="card-title fw-bold">
                    {p.title || 'Sin título'}
                  </h5>

                  {/* Descripción */}
                  <p className="card-text small">
                    {p.description?.slice(0, 90)}...
                  </p>

                  {/* Botón */}
                  <Link
                    to={`/blog/post/${p.slug}`}
                    className="btn btn-light btn-sm mt-2"
                  >
                    Ver resultado
                  </Link>

                </div>

              </div>
            </div>
          ))}

          {paginas.map((pg) => (
            <div className="col-md-4" key={`pagina-${pg.id}`}>
              <div className="react-card blog-card position-relative overflow-hidden h-100">
                <img
                  src={`/img/pagina/${pg.image}`}
                  className="maglowv-blog-img"
                  alt={pg.title || 'Imagen de la página'}
                />
                {/* Overlay oscuro */}
                <div className="blog-overlay"></div>

                {/* Contenido */}
                <div className="card-body blog-content">
                  {/* Badge */}
                  <span className="badge bg-warning text-dark mb-2">
                    🔥 Transformación
                  </span>

                  <h5 className="card-title fw-bold">{pg.title || 'Sin título'}</h5>

                  <p className="card-text">{pg.description?.slice(0, 100)}...</p>
                  <Link to={`/blog/pagina/${pg.slug}`} className="btn btn-light btn-sm mt-2">
                    Ver resultado
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="container my-4">
          <div className="text-center mb-4">
            <button className="btn-open-comment" onClick={() => setShowModal(true)}>
              ✍️ Dejar comentario
            </button>
          </div>

          <h2 className="text-center mb-4">Comentarios de Clientes</h2>

          {comentarios.length === 0 && (
            <p className="text-center">No hay comentarios aún.</p>
          )}

          {comentarios.length > 0 && (
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              navigation={true}
              autoplay={{ delay: 4000 }}
              loop={true}
              breakpoints={{
                0: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                900: { slidesPerView: 3 }
              }}
            >
              {comentarios.map((c) => (
                <SwiperSlide key={c.id}>
                  <div className="review-card">
                    <p className="review-text">{c.comentario}</p>

                    <p
                      className="text-end mb-1"
                      style={{ color: '#f4c150', fontSize: '1.2rem' }}
                    >
                      {"★".repeat(c.rating)}{"☆".repeat(5 - c.rating)}
                    </p>

                    <p className="fw-bold text-end">
                      - <a href={`mailto:${c.mail}`} className="text-decoration-none">{c.nombre}</a>
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <SliderHome slides={slides} />



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

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <ComentarioForm />
          </div>
        </div>
      )}

      <WhatsAppButton />
    </div>
  );
};

export default Home;