import React, { useEffect, useState } from "react";
import Config from "../Config";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostUpdate = () => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    descripcion: "",
    order: 0,
    urlfoto: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    Config.getPostById(id).then((res) => {
      setForm(res.data);
      setImagePreview(`/img/post/${res.data.image}`);
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleQuillChange = (value) => {
    setForm({ ...form, descripcion: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, urlfoto: reader.result });
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("descripcion", form.descripcion);
    formData.append("order", form.order);
    formData.append("visits", form.visits || 0);
    if (form.urlfoto) {
      formData.append("urlfoto", form.urlfoto);
    }

    try {
      await Config.getPostUpdate(formData, id);
      navigate("/admin/post");
    } catch (error) {
      console.error("Error al actualizar el post:", error);
    }
  };

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

  if (loading) {
    return <div className="container p-4">Cargando datos del post...</div>;
  }

  return (
    <div className="container-fluid bg-light">
      <div className="row">
        <Sidebar />
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="container py-4">
                <h2>Editar Post</h2>
                <form onSubmit={handleSubmit}>
                  <label className="form-label">Nombre único (slug base)</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    className="form-control mb-2"
                    onChange={handleChange}
                    required
                  />

                  <label className="form-label">Título SEO</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    className="form-control mb-2"
                    onChange={handleChange}
                    required
                  />

                  <label className="form-label">Descripción SEO</label>
                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    className="form-control mb-2"
                    onChange={handleChange}
                    required
                  />

                  <label className="form-label">Contenido HTML</label>
                  <ReactQuill
                    theme="snow"
                    value={form.descripcion}
                    onChange={handleQuillChange}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Edita el contenido con formato"
                  />

                  <label className="form-label mt-3">Orden</label>
                  <input
                    type="number"
                    name="order"
                    value={form.order}
                    className="form-control mb-2"
                    onChange={handleChange}
                  />

                  <label className="form-label">Imagen actual</label>
                  {imagePreview && (
                    <div className="mb-2">
                      <img
                        src={imagePreview}
                        alt="Vista previa"
                        className="img-fluid"
                        width="200"
                      />
                    </div>
                  )}

                  <label className="form-label">Cambiar imagen</label>
                  <input
                    type="file"
                    name="image"
                    className="form-control mb-3"
                    onChange={handleImage}
                  />

                  <button type="submit" className="btn btn-primary">
                    Actualizar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostUpdate;
