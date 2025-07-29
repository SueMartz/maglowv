import React, { useEffect, useState } from "react";
import Config from "../Config";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from './Sidebar'

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
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    Config.getPostById(id).then((res) => {
      setForm(res.data);
      setImagePreview(`/img/post/${res.data.image}`);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
    formData.append('name', form.name);
    formData.append('slug', form.slug); // solo si lo usas manualmente
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('descripcion', form.descripcion);
    formData.append('order', form.order);
    formData.append('visits', form.visits || 0); // si aplica

    if (form.urlfoto) {
      formData.append('urlfoto', form.urlfoto); // si es base64
    }

    try {
      await Config.getPostUpdate(formData, id);
      navigate("/admin/post");
    } catch (error) {
      console.error("Error al actualizar el post:", error);
      console.log("Detalles:", error.response?.data?.errors);
    }
  };

  return (
    <div className="conteiner bg-light">
      <div className="row">
        <Sidebar />
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card">
            <div className="card-body"></div>
            <div className="container py-4">
              <h2>Editar Post</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={form.name} className="form-control mb-2" onChange={handleChange} required />
                <input type="text" name="title" value={form.title} className="form-control mb-2" onChange={handleChange} required />
                <input type="text" name="description" value={form.description} className="form-control mb-2" onChange={handleChange} required />
                <textarea name="descripcion" value={form.descripcion} className="form-control mb-2" onChange={handleChange} required></textarea>
                <input type="number" name="order" value={form.order} className="form-control mb-2" onChange={handleChange} />
                {imagePreview && <img src={imagePreview} alt="Vista previa" className="img-fluid mb-2" width="200" />}
                <input type="file" name="image" className="form-control mb-3" onChange={handleImage} />
                <button type="submit" className="btn btn-primary">Actualizar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostUpdate;
