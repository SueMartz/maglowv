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
      <div className="hero-jeax">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-6">
              <div className="hero-content">
                <span className="hero-badge">⭐ Servicio Premium en Rines</span>

                <h1>Deja tus rines como nuevos</h1>

                <p>
                  Expertos en reparación, restauración y personalización de rines.
                  Dale a tu vehículo un acabado profesional y de alto nivel.
                </p>

                <ul>
                  <li>Enderezado y nivelado profesional</li>
                  <li>Diamantado, pintura y pulido</li>
                  <li>Personalización y venta de rines deportivos</li>
                </ul>

                <div className="hero-buttons">
                  <a href="#categorias" className="btn-gold">Ver servicios</a>
                  <a href="#contacto" className="btn-outline">Agendar cita</a>
                </div>
              </div>
            </div>

            <div className="col-md-6 text-center">
              <img
                src="/img/Escarabajo.jpeg"
                alt="Rines premium"
                className="hero-img"
              />
            </div>

          </div>
        </div>
      </div>

      {categoriasHome.map((categoria, index) => (
        <SwiperSlide key={categoria.id}>
          <div className="service-card">

            <span className="card-number">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="card-icon">
              <img
                src={`/img/categoria/${categoria.urlfoto || 'foto.jpg'}`}
                alt={categoria.nombre}
              />
            </div>

            <div className="card-title">
              {categoria.nombre}
            </div>

            <div className="card-description">
              {categoria.descripcion || 'Descripción de la categoría'}
            </div>

          </div>
        </SwiperSlide>
      ))}

      
      <div className="sucursales-hero py-5">
        <h2 className="text-center mb-4 fw-bold">
          Selecciona tu sucursal
        </h2>

        <div className="row">
          <div className="col-lg-7 mb-4">
            {selected && (
              <iframe
                title="mapa"
                width="100%"
                height="520"
                style={{ border: 0, borderRadius: "12px" }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${selected.latitud},${selected.longitud}&z=14&output=embed`}
              ></iframe>
            )}
          </div>

          <div className="col-lg-5">
            <div className="locations-list">
              {empresas.map((empresa) => (
                <div
                  key={empresa.id}
                  className="list-group-item p-3 mb-3 shadow-sm rounded"
                >
                  <div className="d-flex">
                    <img
                      src={`/img/empresa/${empresa.urlfoto}`}
                      alt={empresa.nombre}
                      style={{
                        width: "150x",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginRight: "15px"
                      }}
                    />

                    <div>
                      <h5 className="mb-1">{empresa.nombre}</h5>

                      <p className="mb-1 small">{empresa.direccion}</p>
                      <p className="mb-1 small">{empresa.telefono}</p>
                      <p className="mb-1 small">{empresa.descripcion}</p>
                      <p className="mb-1 small">
                        Horario de la tienda
                        de 10 a. m. a 7 p. m. todos los días.
                      </p>

                      <div className="d-flex gap-2 mt-2">
                        <button
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => mostrarMapa(empresa)}
                        >
                          Ver ubicación
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
                  className="jeax-blog-img"
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
                  className="jeax-blog-img"
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