import React from 'react';
import Sidebar from './Sidebar';

const PanelAdmin = () => {
  return (
    <div className="container bg-light">
      <div className="row">
        <Sidebar />
        <div className="col-sm-9 mt-3">
          <h2>Bienvenido al Panel de Administración</h2>
          <p>Aquí puedes gestionar los contenidos del sistema.</p>
        </div>
      </div>
    </div>
  );
};

export default PanelAdmin;
