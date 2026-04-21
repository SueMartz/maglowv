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
              Abierto todos los días de 10 a. m. a 7 p. m.
            </p>

            <p className="mb-2">
              Av Oceanía 291, Pensador Mexicano, Venustiano Carranza, 15510 Ciudad de México, CDMX
            </p>

            <p className="mb-3">
              Teléfono: 55 48 48 82 80
            </p>

            <div className="d-flex gap-3 fs-5">

              <a
                href="https://www.facebook.com/share/1LHyDCHDrT/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
              >
                <i className="fab fa-facebook"></i>
              </a>

              <a href="https://www.instagram.com/jeax_especiality/" className="footer-social">
                <i className="fab fa-instagram"></i>
              </a>

              <a href="https://www.tiktok.com/@jeax29" className="footer-social">
                <i className="fab fa-tiktok"></i>
              </a>

            </div>
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