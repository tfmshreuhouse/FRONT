import React from 'react';
import '../index.css';
import Card from '../Components/Home/Cards'; 
import { useNavigate } from 'react-router-dom';

const MisReservas = () => {
  const navigate = useNavigate();

  const handleBoton1Click = (tipo: string, id: string) => {
    // Aquí puedes hacer lo que necesites con tipo e id antes de navegar
    navigate(`/home/infoInmueble/${tipo}/${id}`);
  };

  return (
    <div className="container">
      <h2 className="titulo-container">Mis Reservas</h2>
      <div className="row">
      <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://img10.naventcdn.com/avisos/18/00/64/76/56/44/720x532/340390153.jpg?isFirstImage=true"
          buttonText="Ver detalles"
          className="col-md-4 col-sm-12"
          tipo="1"
          id="3"
          titulo="Habitacion"
          precio="150.000 COP"
          direccion="Cra 23 n 55"
          pais="Paraguay"
          ciudad="Asuncion"
        />
         <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/18/a2/0a/9-person-cabana-with.jpg?w=700&h=-1&s=1"
          buttonText="Ver detalles"
          className="col-md-4 col-sm-12"
          tipo="1"
          id="5"
          titulo="Cabaña frente al mar"
          precio="2.550.000 COP"
          direccion="playa del carmen"
          pais="Mexico"
          ciudad="Cancun"
        />
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://arquitectopablorestrepo.com/wp-content/uploads/2023/10/Casa-moderna-en-dos-pisos-construida-14-1.jpg"
          buttonText="Ver detalles"
          className="col-md-4 col-sm-12"
          tipo="1"
          id="2"
          titulo="Casa colinas del iga"
          precio="1.500.000 COP"
          direccion="Av. boyaca cll 55"
          pais="Colombia"
          ciudad="Bogota"
        />
        {/* Agrega más tarjetas de acuerdo a tus necesidades */}
      </div>
    </div>
  );
};

export default MisReservas;
