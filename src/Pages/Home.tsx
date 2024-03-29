
import React from 'react';
import '../index.css';
import Card from '../Components/Home/Cards';  // Aseg�rate de importar el componente correcto
import Buscadores from '../Components/Home/Buscador';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleBoton1Click = (tipo: string, id: string) => {
    navigate(`/home/infoInmueble/${tipo}/${id}`);
  };
  return (
    <div className="container">
      {/* <nav className="nva-home">
        <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxByx-LL6YeQCZP13tRoS2LbcCNQKIgOboNA&usqp=CAU" alt="Logo" />
      </nav> */}

      <Buscadores />
      <div className="row">
      <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://lajoya.ec/wp-content/uploads/2015/02/LJ-CONDOMINIO-2-SALA-COMEDOR-1108x960.png"
          buttonText="Ver detalles"
          className="col-md-4 col-sm-12"
          tipo="1"
          id="1"
        />
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://lajoya.ec/wp-content/uploads/2015/02/LJ-CONDOMINIO-2-SALA-COMEDOR-1108x960.png"
          buttonText="Contactar"
          className="col-md-4 col-sm-12"
          tipo="1"
          id="2"
        />
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://img10.naventcdn.com/avisos/18/00/64/76/56/44/720x532/340390153.jpg?isFirstImage=true"
          buttonText="Contactar"
          className="col-md-4 col-sm-12"
          tipo="1"
          id="3"
        />
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://img10.naventcdn.com/avisos/18/00/64/76/56/44/720x532/340390153.jpg?isFirstImage=true"
          buttonText="Contactar"
          className="col-md-4 col-sm-12"
          tipo="1"
          id="4"
        />
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://img10.naventcdn.com/avisos/18/00/64/76/56/44/720x532/340390153.jpg?isFirstImage=true"
          buttonText="Contactar"
          className="col-md-4 col-sm-12"
          tipo="1"
          id="5"
        />
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://img10.naventcdn.com/avisos/18/00/64/76/56/44/720x532/340390153.jpg?isFirstImage=true"
          buttonText="Contactar"
          className="col-md-4 col-sm-12"
          tipo="1"
          id="6"
        />
      </div>
    </div>
  );
};

export default Home;
