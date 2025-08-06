import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = '5215576087760'; // ← Reemplaza con tu número (con lada y sin espacios)
  const message = encodeURIComponent('¡Hola! Quiero más información.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="/img/whatsapp--v1.png"
        alt="WhatsApp"
        style={{
          width: '60px',
          height: '60px',
        }}
      />
    </a>
  );
};

export default WhatsAppButton;