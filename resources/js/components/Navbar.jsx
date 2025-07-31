import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthUser from '../Pageauth/AuthUser';
import Config from '../Config';

const Navbar = () => {
  const { getRol, getLogout, getToken, user } = AuthUser();
  const navigate = useNavigate();

  const logoutUser = (e) => {
    e.preventDefault();
    Config.getLogout('/logout')
      .then(() => {
        getLogout();
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  };

  const renderLinks = () => {
    if (getToken()) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link text-rosa" to={`/${getRol()}`}>
              Administración | {user.name}
            </Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-rosa" onClick={logoutUser}>
              Logout
            </a>
          </li>
        </>
      );
    } else {
      return (
        <li className="nav-item">
          <Link className="nav-link text-rosa" to="/login">
            Login
          </Link>
        </li>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg  shadow-sm py-3">
      <div className="container d-flex justify-content-between align-items-center position-relative">

        {/* Nav izquierda */}
        <div className="d-none d-lg-flex gap-3">
          <Link className="nav-link text-rosa" to="/">Inicio</Link>
          <Link className="nav-link text-rosa" to="/categorias">Categorías</Link>
          <Link className="nav-link text-rosa" to="/blog">Blog</Link>
        </div>

        {/* Logo centrado */}
        <Link className="navbar-brand position-absolute top-50 start-50 translate-middle" to="/">
          <img src={`/img/logo.png`} alt="Logo DirEmp" style={{ maxHeight: '50px' }} />
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces móviles + login/logout */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-3 mt-3 mt-lg-0">
            <li className="nav-item d-lg-none">
              <Link className="nav-link text-rosa" to="/">Inicio</Link>
            </li>
            <li className="nav-item d-lg-none">
              <Link className="nav-link text-rosa" to="/categorias">Categorías</Link>
            </li>
            <li className="nav-item d-lg-none">
              <Link className="nav-link text-rosa" to="/blog">Blog</Link>
            </li>
            {renderLinks()}
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
