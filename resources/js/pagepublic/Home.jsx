import React, { useEffect, useState } from 'react';
import Config from '../Config';
import Modal from '../components/Modal';

const Home = () => {
  const [empresas, setEmpresas] = useState([]);
  const [modal, setModal] = useState(false);
  const [datamodal, setDatamodal] = useState([]);
  const [slides, setSlides] = useState([]);
  const [categoriasHome, setCategoriasHome] = useState([]);

  useEffect(() => {
    getEmpresas();
    getSlides();
    getCategoriasHome();
  }, []);

  const getEmpresas = async () => {
    const response = await Config.getEmpresas(5);
    setEmpresas(response.data);
  };

  const search = async (e) => {
    const response = await Config.searchEmpresas({ text: e });
    setEmpresas(response.data);
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

  return (
    <div className="container pt-5 pb-5">

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
                <img src={`http://localhost:8000/img/slide/${slide.imagen}`} className="d-block w-100" alt={`slide ${index + 1}`} />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{slide.frase}</h5>
                  <p>{slide.link}</p>
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

      {/* Categorías para home */}
      <div className="row justify-content-center mb-5">
        {categoriasHome.map((categoria) => (
          <div className="col-sm-4 mb-4" key={categoria.slug}>
            <div className="card shadow-sm border-0 h-100">
              <img
                src={`http://localhost:8000/img/categoria/${categoria.urlfoto}`}
                alt={categoria.nombre}
                className="card-img-top img-fluid"
              />
              <div className="card-body text-center">
                <a href={`/${categoria.slug}`} className="btn btn-outline-dark d-block">
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
          <h1 className="text-center text-rosa fw-bolder">Sucursales</h1>

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
                      <a href="*" onClick={(e) => showModal(e, empresa)} style={{ color: '#f08bb4' }}>
                        {empresa.nombre}
                      </a>
                    </h2>
                    <p>{empresa.descripcion}</p>
                  </div>
                </div>
              ))}
              {modal && <Modal datamodal={datamodal} close={setModal} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
