
import React, { useEffect, useState } from 'react';
import '../index.css';
import Card from '../Components/Home/Cards';
import Buscadores from '../Components/Home/Buscador';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import axios from 'axios';
import ErrorAlert from '../Components/Shared/ErrorAlert ';

interface ImagnenesInmuebles {
  URL: string;
  status: number;
}

interface Inmueble {
  Nombre: string,
  Pais: string;
  Ciudad: string;
  Direccion: string;
  ImagnenesInmuebles: Array<ImagnenesInmuebles>;
  User: User;
}

interface Publicaciones {
  id: number,
  indicaciones: string;
  costo: number;
  moneda: string;
  PAX: number;
  descripcion: string;
  image: string;
  createdAt: string;
  cantidadReservas: number;
  InmuebleId: number;
  Inmueble: Inmueble;
}

interface User {
  id: number,
  nombres: string;
  apellidos: string;
  correo: string;
  perfil: string;
  status: number;
  telefono: string;
}

interface Filtros {
  costoMinimo: number | null;
  costoMaximo: number | null;
  tipoInmueble: number | undefined;
  pais: string | undefined;
  ciudad: string | undefined;
  PAX: number | null;
  moneda: string | undefined;
}

const Home = () => {

  const navigate = useNavigate();

  const [filtros, setFiltros] = useState<Filtros>({pais:undefined, ciudad:undefined, PAX: null, tipoInmueble: undefined,
                                                    costoMaximo: null, costoMinimo: null, moneda: undefined});
  const [publicaciones, setPublicaciones] = useState<Publicaciones[]>([]);
  const [failure, setFailure] = useState<boolean>(false);

  const [first, setFirst] = useState(0); // Índice del primer elemento a mostrar
  const [rows, setRows] = useState(5); // Número de filas por página
  const [totalRecords, setTotalRecords] = useState(0); // Total de registros
  const [currentPage, setCurrentPage] = useState(0); // Página actual

  useEffect(() => { 
    fetchPublicacionesFilter(filtros);
  }, [first, rows]);

  const fetchPublicacionesFilter = async (filtros:Filtros) => {
    try {

      const axiosTokenInfo = axios.create({
        baseURL: process.env.REACT_APP_API_URL
      });

      const response = await axiosTokenInfo.post('/rest/publicacion/home/filter', filtros);
      console.log(response.data.data);
      setPublicaciones(response.data.data);

    } catch (error) {
      console.error('Error fetching user data:', error);
      setFailure(true);
    }
  };

  const handleErrorAlertClose = () => {
    setFailure(false); 
  };

  const handleBoton1Click = (tipo: string, id: number) => {
    navigate(`/home/infoInmueble/${tipo}/${id}/0`);
  };

  const handleVolverClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <Fieldset>
        <Buscadores fetchPublicacionesFilter={fetchPublicacionesFilter}/>
        {publicaciones.length === 0 ? (
          <div className="p-fluid grid">
            <div className="field col-12 lg:col-4"></div>
            <div className="field col-12 lg:col-4">
              <h2>No hay publicaciones.</h2>
            </div>
            <div className="field col-12 lg:col-4"></div>
          </div>
          
        ) : (
          <>
            <div className="row">
              {publicaciones.map((publicacion, index) => (
                <Card
                  key={index}
                  onBoton1Click={() => handleBoton1Click('1',publicacion.InmuebleId)}
                  imageUrl={publicacion.Inmueble.ImagnenesInmuebles[0].URL} 
                  buttonText="Ver detalles"
                  className="col-md-4 col-sm-12"
                  tipo="1"
                  id={publicacion.InmuebleId + ""}
                  titulo={publicacion.Inmueble.Nombre} 
                  precio={publicacion.costo + " " + publicacion.moneda + " para " + publicacion.PAX + ((publicacion.PAX>1)? " personas" : " persona")}
                  direccion={publicacion.Inmueble.Direccion}
                  pais={publicacion.Inmueble.Pais}
                  ciudad={publicacion.Inmueble.Ciudad}
                />
              ))}
            </div>
          </>
        )}
      </Fieldset>
      {failure && (
        <ErrorAlert
          header="Error"
          text="No se pudo obtener las publicaciones, vuelva a intentarlo más tarde"
          onClose={handleErrorAlertClose}
        />
      )}
    </div>
  );
};

export default Home;
