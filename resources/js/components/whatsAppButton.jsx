
import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = '5215548488280'; // ← Tu número
  const message = encodeURIComponent('¡Hola! Necesito Información,');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      className="whatsapp-button d-flex align-items-center justify-content-center"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        backgroundColor: '#25D366',
        color: 'white',
        borderRadius: '50px',
        padding: '10px 18px',
        fontSize: '16px',
        textDecoration: 'none',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        zIndex: 9999,
        fontFamily: 'Poppins, sans-serif',
        fontSize: '16px',
        fontWeight: '100',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#1EBE57';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#25D366';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <span style={{ marginRight: '10px' }}>Agenda Hoy 📅</span>
      <img
        src="/img/whatsapp--v1.png" // ← Cambia este archivo si quieres otro logo
        alt="WhatsApp"
        style={{ width: '32px', height: '32px' }}
      />
    </a>
  );
};

export default WhatsAppButton;
