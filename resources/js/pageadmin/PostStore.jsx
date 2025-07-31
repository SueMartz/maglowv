import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Config from "../Config";

const PostStore = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    descripcion: "",
    order: 0,
    urlfoto: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleQuillChange = (value) => {
    setForm({ ...form, descripcion: value });
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
      await Config.getPostStore(form);
      navigate("/admin/post");
    } catch (error) {
      console.error("Error al crear el post:", error);
    }
  };

  // OPCIONES DEL MENÚ DE HERRAMIENTAS DE EDICIÓN
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "image",
  ];

  return (
    <div className="container py-4">
      <h2>Crear Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" className="form-control mb-2" placeholder="Nombre único (slug base)" onChange={handleChange} required />
        <input type="text" name="title" className="form-control mb-2" placeholder="Título SEO" onChange={handleChange} required />
        <input type="text" name="description" className="form-control mb-2" placeholder="Descripción SEO" onChange={handleChange} required />
        
        <label className="form-label">Contenido HTML:</label>
        <div className="mb-3">
          <ReactQuill
            theme="snow"
            value={form.descripcion}
            onChange={handleQuillChange}
            modules={quillModules}
            formats={quillFormats}
            placeholder="Escribe el contenido del post con formato"
          />
        </div>

        <input type="number" name="order" className="form-control mb-2" placeholder="Orden" onChange={handleChange} />
        <input type="file" name="image" className="form-control mb-3" onChange={handleImage} />

        <button type="submit" className="btn btn-success">Guardar</button>
      </form>
    </div>
  );
};

export default PostStore;
