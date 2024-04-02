// Card.js
import React from "react";
import { Button } from 'primereact/button';

interface CardProps {
  onBoton1Click: (tipo: string, id: string) => void;
  imageUrl: string;
  buttonText: string;
  className?: string;
  tipo: string;
  id: string;
}

const Card: React.FC<CardProps> = ({ onBoton1Click, imageUrl, buttonText, className, tipo, id }) => {
  const cardStyle: React.CSSProperties = {
    width: "100%", 
  };

  return (
    <div className={`p-col ${className}`}>
      <div className="card">
        <img className="imagen" src={imageUrl} alt="Propiedad" style={cardStyle}/>
        <div className="card-body">
          <p className="card-text">$1.300.000 COP</p>
          <p className="card-text">Bogota DC</p>
        </div>
        <Button
          type="button"
          label={buttonText}
          className="button-blue"
          onClick={() => onBoton1Click(tipo, id)}
        />
      </div>
    </div>
  );
};

export default Card;
