import React, { useState } from 'react';
import Config from '../Config';
import { useNavigate } from 'react-router-dom';

const SlideStore = () => {
  const [frase, setFrase] = useState('');
  const [link, setLink] = useState('');
  const [posicion, setPosicion] = useState('');
  const [urlfoto, setUrlfoto] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUrlfoto(reader.result);
    };
  };

  const submitStore = async (e) => {
    e.preventDefault();

    try {
      await Config.getSlideStore({ frase, link, posicion, urlfoto });
      setMessage('Slide creado exitosamente.');
      navigate('/admin/slide');
    } catch (error) {
      console.error('Error al crear slide:', error);
      setMessage('Error al crear slide, revise datos o conexión.');
    }
  };

  return (
    <div className="container bg-light pt-5">
      <div className="row">
        <div className="col-sm-6 mx-auto">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="mb-4 text-center">Crear Slide</h3>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={submitStore}>
                <div className="mb-3">
                  <label className="form-label">Imagen</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Frase</label>
                  <input
                    type="text"
                    className="form-control"
                    value={frase}
                    onChange={(e) => setFrase(e.target.value)}
                    maxLength={255}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Link</label>
                  <input
                    type="url"
                    className="form-control"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Posición</label>
                  <input
                    type="number"
                    className="form-control"
                    value={posicion}
                    onChange={(e) => setPosicion(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Crear Slide
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideStore;
