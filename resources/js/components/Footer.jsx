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
              alt="maglowv"
              style={{ width: "100px" }}
            />
          </div>

          {/* INFORMACIÓN */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">MaGlowV</h5>

            <p className="mb-2">
              Abierto todos los días 
            </p>


            <p className="mb-3">
              Teléfono: 55 48 48 82 80
            </p>

            <div className="d-flex gap-3 fs-5">

              <a
                href="https://www.facebook.com/maglowv/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
              >
                <i className="fab fa-facebook"></i>
              </a>

              <a href="https://www.instagram.com/maglowv/" className="footer-social">
                <i className="fab fa-instagram"></i>
              </a>

              <a href="https://www.tiktok.com/@maglowv" className="footer-social">
                <i className="fab fa-tiktok"></i>
              </a>

            </div>
          </div>

          {/* ENLACES */}
          <div className="col-md-4">
            <h5 className="fw-bold">Enlaces rápidos</h5>

            <ul className="footer-links">
              <li><a href="/nosotros">Sobre nosotros</a></li>
              <li><a href="/contacto">Contacto</a></li>
              <li><a href="/preguntas">Preguntas frecuentes</a></li>
              <li><a href="/terminos">Condiciones de servicio</a></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="text-center pb-3 small">
        <li><a href="/">© 2026 maglowv</a></li>
      </div>
    </footer>
  );
};

export default Footer;