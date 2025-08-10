import React, { useState } from 'react';
import Config from '../Config';

const ComentarioForm = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    comentario: ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Config.ComentariosAdd(form);
      setMensaje('Gracias por tu comentario. Está pendiente de aprobación.');
      setForm({ nombre: '', email: '', comentario: '' });
    } catch (error) {
      setMensaje('Error al enviar el comentario. Intenta de nuevo.');
      console.error(error);
    }
  };

  return (
    <div className="row justify-content-center">
        <div className="col-sm-8">
          

          <div className="card mb-4">
            <div className="card-body">
              <h1 className="text-center mb-4">Deja tu comentario</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre *</label>
          <input type="text" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Comentario *</label>
          <textarea name="comentario" className="form-control" value={form.comentario} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-rosa">Enviar Comentario</button>
      </form>
      {mensaje && <p className="mt-3">{mensaje}</p>}
    </div>
    </div>
    </div>
    </div>
  );
};

export default ComentarioForm;