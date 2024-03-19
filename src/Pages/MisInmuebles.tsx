import React from 'react';
import '../index.css';
import Card from '../Components/Home/Cards'; 
import { useNavigate } from 'react-router-dom';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';

const MisInmuebles = () => {
  const navigate = useNavigate();

  const handleBoton1Click = (tipo: string, id: string) => {
    // Aquí puedes hacer lo que necesites con tipo e id antes de navegar
    navigate(`/home/infoInmueble/${tipo}/${id}`);
  };
  const handleBoton2Click = () => {
    navigate(`/crear`);
  };
  return (
    <div className="container">
      <Fieldset legend="Mis Inmuebles">
        <div className="row">
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://lajoya.ec/wp-content/uploads/2015/02/LJ-CONDOMINIO-2-SALA-COMEDOR-1108x960.png"
          buttonText="Ver detalles"
          className="col-md-4 col-sm-12"
          tipo="2"
          id="1"
          titulo="Apartamento maria paula"
          precio="800.000 COP"
          direccion="Cra 5 a 16-86"
          pais="Colombia"
          ciudad="Neiva"
        />
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://arquitectopablorestrepo.com/wp-content/uploads/2023/10/Casa-moderna-en-dos-pisos-construida-14-1.jpg"
          buttonText="Ver detalles"
          className="col-md-4 col-sm-12"
          tipo="2"
          id="2"
          titulo="Casa colinas del iga"
          precio="1.500.000 COP"
          direccion="Av. boyaca cll 55"
          pais="Colombia"
          ciudad="Bogota"
        />
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://img10.naventcdn.com/avisos/18/00/64/76/56/44/720x532/340390153.jpg?isFirstImage=true"
          buttonText="Ver detalles"
          className="col-md-4 col-sm-12"
          tipo="2"
          id="3"
          titulo="Habitacion"
          precio="150.000 COP"
          direccion="Cra 23 n 55"
          pais="Paraguay"
          ciudad="Asuncion"
        />
        <Card
          onBoton1Click={handleBoton1Click}
          imageUrl="https://cf.bstatic.com/xdata/images/hotel/max1024x768/450159926.jpg?k=9b5bb60fad6df4fbbe81b9bd8ad0f49988e379fc1713442ce92a7c8507983d5c&o=&hp=1"
          buttonText="Ver detalles"
          className="col-md-4 col-sm-12"
          tipo="2"
          id="4"
          titulo="Aparta estudio"
          precio="750.000 COP"
          direccion="Cll 35 N 34-18"
          pais="Mexico"
          ciudad="Ciudad de Mexico"
        />
        </div>
        <div className="col-md-12 mb-3 text-center">
        <Button
          type="button"
          icon="pi pi-angle-left"
          label="Crear Nuevo Inmueble"
          className="button-red"
          onClick={handleBoton2Click}
        />
      </div>
      </Fieldset>
    </div>
  );
};

export default MisInmuebles

;
