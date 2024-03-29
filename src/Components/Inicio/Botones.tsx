// src/Components/Inicio/Botones.tsx
import React from 'react';

interface BotonesProps {
  onBoton1Click: () => void;
  onBoton2Click: () => void;
  imagenBoton1: string;
  imagenBoton2: string;
  textoBoton1: string;
  textoBoton2: string;
}

const Botones: React.FC<BotonesProps> = ({ onBoton1Click, onBoton2Click, imagenBoton1, imagenBoton2, textoBoton1, textoBoton2 }) => {
  const estiloBoton: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const estiloImagen: React.CSSProperties = {
    width: '70%',
    height: 'auto',
  };

  const estiloTexto: React.CSSProperties = {
    fontSize: '18px', // Ajusta el tamaño de la fuente según tus necesidades
    marginTop: '8px', // Ajusta el margen superior según tus necesidades
  };

  return (
    <div className="contenedor-botones">
      <button className="submit" onClick={onBoton1Click} style={estiloBoton}>
        <div>
          <img src={`/images/${imagenBoton1}`} alt="Buscar roommate" style={estiloImagen} />
        </div>
        <span style={estiloTexto}>{textoBoton1}</span>
      </button>
      <button className="submit" onClick={onBoton2Click} style={estiloBoton}>
        <div>
          <img src={`/images/${imagenBoton2}`} alt="Publicar una propiedad" style={estiloImagen} />
        </div>
        <span style={estiloTexto}>{textoBoton2}</span>
      </button>
    </div>
  );
};

export default Botones;
