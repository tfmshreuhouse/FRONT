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
    navigate('/inicio');
    console.log('Botón 2 clickeado');
  };

  return (
    <div className="vista-azul">
      <div className="titulo-container">
        <h2>Que quieres hacer primero?</h2>
      </div>
      <div className="botones-container">
        <Botones
          onBoton1Click={handleBoton1Click}
          onBoton2Click={handleBoton2Click}
          imagenBoton1="companero-de-cuarto.png"
          imagenBoton2="signo-de-poste.png"
          textoBoton1="Buscar roommate"
          textoBoton2="Publicar una propiedad"
        />
      </div>
    </div>
  );
};

export default Inicio;
