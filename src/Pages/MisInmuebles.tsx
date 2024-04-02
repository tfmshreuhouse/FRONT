import React from 'react';
import '../index.css';
import Card from '../Components/Home/Cards'; 
import { useNavigate } from 'react-router-dom';

const MisInmuebles = () => {
  const navigate = useNavigate();

  const handleBoton1Click = (tipo: string, id: string) => {
    // Aquí puedes hacer lo que necesites con tipo e id antes de navegar
    navigate(`/home/infoInmueble/${tipo}/${id}`);
  };

  return (
    <div className="container">
      <h2 className="titulo-container"><i className="pi pi-times"></i>Mis Inmuebles</h2>
      <div className="row">
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://lajoya.ec/wp-content/uploads/2015/02/LJ-CONDOMINIO-2-SALA-COMEDOR-1108x960.png"
          buttonText="Ver detalles"
          className="col-md-4 col-sm-12"
          tipo="2"
          id="1"
        />
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://lajoya.ec/wp-content/uploads/2015/02/LJ-CONDOMINIO-2-SALA-COMEDOR-1108x960.png"
          buttonText="Contactar"
          className="col-md-4 col-sm-12"
          tipo="2"
          id="2"
        />
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://img10.naventcdn.com/avisos/18/00/64/76/56/44/720x532/340390153.jpg?isFirstImage=true"
          buttonText="Contactar"
          className="col-md-4 col-sm-12"
          tipo="2"
          id="3"
        />
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://img10.naventcdn.com/avisos/18/00/64/76/56/44/720x532/340390153.jpg?isFirstImage=true"
          buttonText="Contactar"
          className="col-md-4 col-sm-12"
          tipo="2"
          id="4"
        />
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://img10.naventcdn.com/avisos/18/00/64/76/56/44/720x532/340390153.jpg?isFirstImage=true"
          buttonText="Contactar"
          className="col-md-4 col-sm-12"
          tipo="2"
          id="5"
        />
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://img10.naventcdn.com/avisos/18/00/64/76/56/44/720x532/340390153.jpg?isFirstImage=true"
          buttonText="Contactar"
          className="col-md-4 col-sm-12"
          tipo="2"
          id="6"
        />
      </div>
    </div>
  );
};

export default MisInmuebles

;
