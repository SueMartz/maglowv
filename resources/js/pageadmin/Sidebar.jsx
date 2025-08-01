import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaTags, FaBuilding, FaImage, FaFileAlt, FaFile } from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { to: "/admin/user", label: "Usuarios", icon: <FaUser /> },
    { to: "/admin/categoria", label: "Categorías", icon: <FaTags /> },
    { to: "/admin/producto", label: "Producto", icon: <FaTags /> },
    { to: "/admin/empresa", label: "Sucursales", icon: <FaBuilding /> },
    { to: "/admin/slide", label: "Slides", icon: <FaImage /> },
    { to: "/admin/post", label: "Posts", icon: <FaFileAlt /> },
    { to: "/admin/pagina", label: "Páginas", icon: <FaFile /> },
  ];

  return (
    <div className="col-md-3 bg-light border-end min-vh-100 py-3">
      <div className="list-group list-group-flush">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "list-group-item list-group-item-action active d-flex align-items-center gap-2"
                : "list-group-item list-group-item-action d-flex align-items-center gap-2"
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

