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
    <nav className="navbar navbar-expand-lg bg-rosa-pastel shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={`/img/logo.png`} alt="Logo DirEmp" style={{ maxHeight: '60px' }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-3">
            <li className="nav-item">
              <Link className="nav-link text-rosa" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-rosa" to="/categorias">Categorías</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-rosa" to="/blog">Blog</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {renderLinks()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
