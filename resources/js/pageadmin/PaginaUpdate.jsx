import React, { useEffect, useState } from "react";
import Config from "../Config";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PaginaUpdate = () => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    order: 0,
    urlfoto: "",
  });

  const [texttop, setTexttop] = useState("");
  const [textbottom, setTextbottom] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    Config.getPaginaById(id).then((res) => {
      setForm({
        name: res.data.name,
        title: res.data.title,
        description: res.data.description,
        order: res.data.order,
        urlfoto: res.data.urlfoto,
      });
      setTexttop(res.data.texttop || "");
      setTextbottom(res.data.textbottom || "");
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
    formData.append("name", form.name);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("texttop", texttop);
    formData.append("textbottom", textbottom);
    formData.append("order", form.order);

    if (form.urlfoto) {
      formData.append("urlfoto", form.urlfoto);
    }

    try {
      await Config.getPaginaUpdate(formData, id);
      navigate("/admin/pagina");
    } catch (error) {
      console.error("Error al actualizar la página:", error);
    }
  };

  return (
    <div className="container bg-light">
      <div className="row">
        <Sidebar />
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h2>Editar Página</h2>
              <form onSubmit={handleSubmit}>
                <label className="form-label">Nombre único (slug)</label>
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

                <label className="form-label">Contenido Superior</label>
                <ReactQuill
                  value={texttop}
                  onChange={setTexttop}
                  className="mb-2"
                />

                <label className="form-label">Contenido Inferior</label>
                <ReactQuill
                  value={textbottom}
                  onChange={setTextbottom}
                  className="mb-2"
                />

                <label className="form-label">Orden</label>
                <input
                  type="number"
                  name="order"
                  value={form.order}
                  className="form-control mb-2"
                  onChange={handleChange}
                />

                <label className="form-label">Imagen</label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="img-fluid mb-2"
                    width="200"
                  />
                )}
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
  );
};

export default PaginaUpdate;
