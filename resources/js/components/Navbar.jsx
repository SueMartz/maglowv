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
          <Link className="react-nav-link text-rosa" to="/login">
            Login
          </Link>
        </li>
      );
    }
  };

  return (
    <><nav className="navbar react-navbar">
  <div className="container-fluid nav-grid">

    {/* IZQUIERDA */}
    <div className="nav-left d-none d-lg-flex">
      <Link to="/">Inicio</Link>
      <Link to="/cuadros">Cuadros</Link>
      <Link to="/unas">Uñas</Link>
      <Link to="/bisuteria">Bisutería</Link>
      <Link to="/me">Sobre mí</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/categorias">Categorías</Link>
    </div>

    {/* CENTRO LOGO */}
    <div className="nav-center">
      <Link to="/">
        <img src="/img/logo.png" alt="logo" />
      </Link>
    </div>

    {/* DERECHA (LOGIN) */}
    <div className="nav-right">
      {renderLinks()}
    </div>

  </div>
</nav><div className="promo-bar">
        <div className="promo-track">
          <span>💅✨ Diseños que enamoran, cuadros con personalidad y bisutería que ilumina tu estilo. MaGlowV 💎 haciendo que cada detalle brille contigo.</span>

        </div>
      </div></>
  );
};

export default Navbar;
