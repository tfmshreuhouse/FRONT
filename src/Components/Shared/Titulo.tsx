import React from 'react';

interface TituloProps {
  text: string;
}

const Titulo: React.FC<TituloProps> = ({ text }) => {
  return (
    <h2 style={{ textAlign: 'center' }}>{text}</h2>
  );
};

export default Titulo;
