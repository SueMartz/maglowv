import React, { useState } from 'react';

const WhatsAppButton = () => {
  const [hover, setHover] = useState(false);

  const phoneNumber = '5215539418612';
  const message = encodeURIComponent('¡Hola! Necesito información');

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
      }}
    >
      {/* Tooltip moderno */}
      {hover && (
        <div
          style={{
            position: 'absolute',
            right: '75px',
            bottom: '18px',
            backgroundColor: '#fff',
            color: '#111',
            padding: '8px 12px',
            borderRadius: '20px',
            fontSize: '13px',
            whiteSpace: 'nowrap',
            boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
            opacity: hover ? 1 : 0,
            transform: 'translateX(0)',
            transition: 'all 0.2s ease',
          }}
        >
          Cotiza y agenda
        </div>
      )}

      {/* Botón */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: '65px',
          height: '65px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgb(237, 231, 231)',
          transition: 'all 0.3s ease',
          transform: hover ? 'scale(1.12)' : 'scale(1)',
        }}
      >
        <img
          src="/img/whatsapp--v1.png"
          alt="WhatsApp"
          style={{ width: '32px', height: '32px' }}
        />
      </a>
    </div>
  );
};

export default WhatsAppButton;