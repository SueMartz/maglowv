import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../../css/app-react.css';


const Footer = () => {

  const navigate = useNavigate();

  return (
    <footer className="footer-dom mt-auto">
      <div className="container py-5">
        <div className="row align-items-start">

          {/* LOGO */}
          <div className="col-md-4 text-center text-md-start mb-4">
            <img
              src="/img/logo.png"
              alt="Jeax"
              style={{ width: "120px" }}
            />
          </div>

          {/* INFORMACIÓN */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Jeax</h5>

            <p className="mb-2">
              Abierto todos los días de 7 a. m. a 9 p. m.
            </p>

            <p className="mb-2">
              Av. Oceania , Estado de México
            </p>

            <p className="mb-3">
              Teléfono: 55-0000-0000
            </p>

            <div className="d-flex gap-3 fs-5">

              <a
                href="https://www.facebook.com/p/Pasteler%C3%ADa-Alan-100063737013372/?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
              >
                <i className="fab fa-facebook"></i>
              </a>

              <a href="#" className="footer-social">
                <i className="fab fa-instagram"></i>
              </a>

              <a href="#" className="footer-social">
                <i className="fab fa-tiktok"></i>
              </a>

            </div>
          </div>

          {/* ENLACES */}
          <div className="col-md-4">
            <h5 className="fw-bold">Enlaces rápidos</h5>

            <ul className="footer-links">
              <li><Link to="/nosotros">Sobre nosotros</Link></li>
              <li><Link to="/locations">Contacto</Link></li>
              <li><Link to="/preguntas">Preguntas frecuentes</Link></li>
              <li><Link to="/terminos">Condiciones de servicio</Link></li>
              <li><Link to="/reembolso">Política de reembolso</Link></li>
              <li><Link to="/privacidad">Política de privacidad</Link></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="text-center pb-3 small">
        <li><a href="/">© 2026 Jeax</a></li>
      </div>
    </footer>
  );
};

export default Footer;