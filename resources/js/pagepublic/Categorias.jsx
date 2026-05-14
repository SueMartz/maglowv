import React, { useEffect, useState } from 'react';
import Config from '../Config';
import { Link } from 'react-router-dom';

const CategoriaSkeleton = () => (
  <div className="col-6 col-sm-4 col-lg-3 mb-4">
    <div className="card h-100 border-0 shadow-sm placeholder-glow">
      <div className="card-body d-flex align-items-center justify-content-center">
        <div className="placeholder rounded" style={{ height: '150px', width: '100%' }} />
      </div>
      <div className="card-footer border-0 bg-white">
        <div className="placeholder rounded w-100" style={{ height: '38px' }} />
      </div>
    </div>
  </div>
);

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategorias();
  }, []);

  const getCategorias = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await Config.CategoriasAll();
      setCategorias(response.data);
    } catch (err) {
      setError('No se pudieron cargar las categorías. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-9">

          <h1 className="text-center fw-bolder mb-1">Línea de productos</h1>
          <p className="text-center text-muted mb-4">Explora nuestras categorías disponibles</p>

          {/* Error state */}
          {error && (
            <div className="alert alert-danger d-flex align-items-center justify-content-between" role="alert">
              <span>{error}</span>
              <button className="btn btn-sm btn-outline-danger ms-3" onClick={getCategorias}>
                Reintentar
              </button>
            </div>
          )}

          <div className="row g-4">
            {/* Loading skeletons */}
            {loading && Array.from({ length: 6 }).map((_, i) => (
              <CategoriaSkeleton key={i} />
            ))}

            {/* Empty state */}
            {!loading && !error && categorias.length === 0 && (
              <div className="col-12 text-center py-5 text-muted">
                <i className="bi bi-inbox fs-1 d-block mb-2" />
                <p>No hay categorías disponibles por el momento.</p>
              </div>
            )}

            {/* Category cards */}
            {!loading && categorias.map((categoria) => (
              <div className="col-6 col-sm-4 col-lg-3 mb-2" key={categoria.id}>
                <div className="card h-100 border-0 shadow-sm" style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div className="card-body d-flex align-items-center justify-content-center p-3">
                    <img
                      src={`/img/categoria/${categoria.urlfoto || 'foto.jpg'}`}
                      className="img-fluid"
                      style={{
                        height: '140px',
                        width: '100%',
                        objectFit: 'contain',
                        borderRadius: '6px',
                      }}
                      alt={`Categoría ${categoria.nombre}`}
                      onError={e => { e.currentTarget.src = '/img/categoria/foto.jpg'; }}
                    />
                  </div>
                  <div className="card-footer border-0 bg-white px-3 pb-3 pt-0">
                    <Link
                      to={`/categorias/${categoria.slug}`}
                      className="btn w-100 fw-semibold"
                      style={{ backgroundColor: '#FFF3C1', color: '#5f585b' }}
                    >
                      {categoria.nombre}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Categorias;