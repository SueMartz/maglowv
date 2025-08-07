import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-rosa-pastel mt-auto">
      <div className="pt-4 pb-2 text-center">
        <p className="text-white mb-3 fw-semibold">
          &copy; Derechos reservados | Esplendor Verde | 2025
        </p>

        <div className="d-flex justify-content-center gap-4 mb-2">
          <a href="https://www.facebook.com/share/1CzhTf7RwB/" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/esplendorverde.arte/" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="http://tiktok.com/@esplendor.verde" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
            <i className="fab fa-tiktok"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
