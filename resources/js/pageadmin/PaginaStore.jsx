import React, { useState } from "react";
import Config from "../Config";
import { useNavigate } from "react-router-dom";

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
    <div className="container py-4">
      <h2>Crear Página</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" className="form-control mb-2" placeholder="Nombre (único)" onChange={handleChange} required />
        <input type="text" name="title" className="form-control mb-2" placeholder="Título SEO" onChange={handleChange} required />
        <input type="text" name="description" className="form-control mb-2" placeholder="Descripción SEO" onChange={handleChange} required />
        <textarea name="texttop" className="form-control mb-2" placeholder="Contenido Superior" onChange={handleChange} required></textarea>
        <textarea name="textbottom" className="form-control mb-2" placeholder="Contenido Inferior" onChange={handleChange} required></textarea>
        <input type="number" name="order" className="form-control mb-2" placeholder="Orden" onChange={handleChange} />
        <input type="file" name="image" className="form-control mb-3" onChange={handleImage} />
        <button type="submit" className="btn btn-success">Guardar</button>
      </form>
    </div>
  );
};

export default PaginaStore;
