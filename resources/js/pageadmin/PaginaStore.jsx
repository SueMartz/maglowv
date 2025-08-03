import React, { useState } from "react";
import Config from "../Config";
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PaginaStore = () => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    texttop: "",
    textbottom: "",
    order: 0,
    urlfoto: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleQuillChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, urlfoto: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Config.getPaginaStore(form);
      navigate("/admin/pagina");
    } catch (error) {
      console.error("Error al crear la página:", error);
    }
  };

  return (
    <div className="container bg-light">
      <div className="row">
        <Sidebar />
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h2>Crear Página</h2>
              <form onSubmit={handleSubmit}>
                <label className="form-label">Nombre único (slug base)</label>
                <input
                  type="text"
                  name="name"
                  className="form-control mb-2"
                  placeholder="Nombre (único)"
                  onChange={handleChange}
                  required
                />

                <label className="form-label">Título SEO</label>
                <input
                  type="text"
                  name="title"
                  className="form-control mb-2"
                  placeholder="Título SEO"
                  onChange={handleChange}
                  required
                />

                <label className="form-label">Descripción SEO</label>
                <input
                  type="text"
                  name="description"
                  className="form-control mb-2"
                  placeholder="Descripción SEO"
                  onChange={handleChange}
                  required
                />

                <label className="form-label">Contenido Superior</label>
                <ReactQuill
                  className="mb-3"
                  value={form.texttop}
                  onChange={(value) => handleQuillChange("texttop", value)}
                />

                <label className="form-label">Contenido Inferior</label>
                <ReactQuill
                  className="mb-3"
                  value={form.textbottom}
                  onChange={(value) => handleQuillChange("textbottom", value)}
                />

                <label className="form-label">Orden</label>
                <input
                  type="number"
                  name="order"
                  className="form-control mb-2"
                  placeholder="Orden"
                  onChange={handleChange}
                />

                <label className="form-label">Imagen</label>
                <input
                  type="file"
                  name="image"
                  className="form-control mb-3"
                  onChange={handleImage}
                />

                <button type="submit" className="btn btn-success">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginaStore;
