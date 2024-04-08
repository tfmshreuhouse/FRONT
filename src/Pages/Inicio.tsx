// src/Pages/Inicio.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Botones from '../Components/Inicio/Botones';

const Inicio: React.FC = () => {
  const navigate = useNavigate();
  const handleBoton1Click = () => {
    navigate('/home');
  };

  const handleBoton2Click = () => {
    navigate('/perfil/historialPublicaciones/?from=inicio');
    console.log('Bot�n 2 clickeado');
  };

  return (
    <div className="vista-azul">
      <div className="titulo-container">
        <h1>¿Qué quieres hacer primero?</h1>
      </div>
      <div className="botones-container">
        <Botones
          onBoton1Click={handleBoton1Click}
          onBoton2Click={handleBoton2Click}
          imagenBoton1="companero-de-cuarto.png"
          imagenBoton2="signo-de-poste.png"
          textoBoton1="Buscar propiedad"
          textoBoton2="Publicar una propiedad"
        />
      </div>
    </div>
  );
};

export default Inicio;
