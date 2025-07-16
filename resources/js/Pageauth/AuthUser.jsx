import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthUser = () => {
  const navigate = useNavigate();

  const getToken = () => {
    return sessionStorage.getItem('token'); // sin JSON.parse
  };

  const getUser = () => {
    const userString = sessionStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  };

  const getRol = () => {
    return sessionStorage.getItem('rol'); // sin JSON.parse si es string
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [rol, setRol] = useState(getRol());

  const saveToken = (user, token, rol) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('rol', rol);

    setUser(user);
    setToken(token);
    setRol(rol);

    if (rol === 'admin') navigate('/admin');
    if (rol === 'cliente') navigate('/cliente');
  };

  const getLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return {
    setToken: saveToken,
    token,
    user,
    rol,
    getToken,
    getRol,
    getUser,
    getLogout,
  };
};

export default AuthUser;
