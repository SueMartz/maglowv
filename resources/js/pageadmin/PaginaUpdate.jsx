import React, { useEffect, useState } from "react";
import Config from "../Config";
import { useNavigate, useParams } from "react-router-dom";

const PaginaUpdate = () => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    texttop: "",
    textbottom: "",
    order: 0,
    urlfoto: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    Config.getPaginaById(id).then((res) => {
      setForm(res.data);
      setImagePreview(`/img/pagina/${res.data.image}`);
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
  formData.append('title', form.title);
  formData.append('description', form.description);
  formData.append('texttop', form.texttop);
  formData.append('textbottom', form.textbottom);
  formData.append('order', form.order);

  if (form.urlfoto) {
    formData.append('urlfoto', form.urlfoto);
  }

  try {
    await Config.getPaginaUpdate(formData, id);
    navigate("/admin/pagina");
  } catch (error) {
    console.error("Error al actualizar la página:", error);
    console.log("Detalles:", error.response?.data?.errors);
  }
};

  return (
    <div className="container py-4">
      <h2>Editar Página</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={form.name} className="form-control mb-2" onChange={handleChange} required />
        <input type="text" name="title" value={form.title} className="form-control mb-2" onChange={handleChange} required />
        <input type="text" name="description" value={form.description} className="form-control mb-2" onChange={handleChange} required />
        <textarea name="texttop" value={form.texttop} className="form-control mb-2" onChange={handleChange} required></textarea>
        <textarea name="textbottom" value={form.textbottom} className="form-control mb-2" onChange={handleChange} required></textarea>
        <input type="number" name="order" value={form.order} className="form-control mb-2" onChange={handleChange} />
        {imagePreview && <img src={imagePreview} alt="Vista previa" className="img-fluid mb-2" width="200" />}
        <input type="file" name="image" className="form-control mb-3" onChange={handleImage} />
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
};

export default PaginaUpdate;
