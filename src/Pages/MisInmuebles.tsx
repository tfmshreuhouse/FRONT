import React, { useState, useEffect } from 'react';
import '../index.css';
import Card from '../Components/Home/Cards'; 
import { useNavigate } from 'react-router-dom';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import axios from 'axios';

const MisInmuebles = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const from = searchParams.get('from');
  interface Inmeubles {
    id: string;
    nombre: string;
    pais: string;
    ciudad: string;
    direccion: string;
    tipoInmueble: string;
  }
  const handleBoton1Click = (tipo: string, id: string) => {
    navigate(`/home/infoInmueble/${tipo}/${id}`);
  };
  const handleBoton2Click = () => {
    navigate(`/home/infoInmueble/crear`);
  };
  const handleBoton3Click = () => {
    if (from === 'inicio') {
      navigate('/');
    } else {
      navigate('/perfil');
    }
  };

  const [inmuebles, setInmuebles] = useState<Inmeubles[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = localStorage.getItem('jwt');

        const axiosTokenInfo = axios.create({
          baseURL: process.env.REACT_APP_API_URL,
          params: { token: token },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const responseAxiosTokenInfo = await axiosTokenInfo.get('/auth/Token/info');
        const userId = responseAxiosTokenInfo.data.data;
        
        const responseAxiosReservaInfo = await axiosTokenInfo.get(`/rest/inmuebles/user/${userId.userID}`);
        const Datos = responseAxiosReservaInfo.data.data;
        console.log(Datos);
        const inmueblesTransformados: Inmeubles[] = Datos.map((inmueble: any) => ({
          id: inmueble.id,
          nombre: inmueble.Nombre,
          pais: inmueble.Pais,
          ciudad: inmueble.Ciudad,
          direccion: inmueble.Direccion,
          tipoInmueble: inmueble.TiposInmueble ? inmueble.TiposInmueble.tipo : ''
        }));

    setInmuebles(inmueblesTransformados);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(inmuebles);
  return (
    <div className="container">
      <Fieldset legend="Mis Inmuebles">
        <div className="row">
        {inmuebles.map((inmueble, index) => (
            <Card
              key={index}
              onBoton1Click={() => handleBoton1Click('2',inmueble.id)}
              imageUrl="https://img10.naventcdn.com/avisos/18/00/64/76/56/44/720x532/340390153.jpg?isFirstImage=true" 
              buttonText="Ver detalles"
              className="col-md-4 col-sm-12"
              tipo="1"
              id={inmueble.id}
              titulo={inmueble.nombre} 
              precio={inmueble.tipoInmueble}
              direccion={inmueble.direccion}
              pais={inmueble.pais}
              ciudad={inmueble.ciudad}
            />
          ))}
        </div>
        <div className="p-fluid grid">
          <div className="field col-12 lg:col-3"></div>
          <div className="field col-12 lg:col-3">
            <Button
              type="button"
              icon="pi pi-home"
              label="Crear Nuevo Inmueble"
              className="button-red"
              onClick={handleBoton2Click}
            />
          </div>
          <div className="field col-12 lg:col-3">
            <Button
              type="button"
              icon="pi pi-angle-left"
              label="Volver"
              className="button-red"
              onClick={handleBoton3Click}
            />
          </div>
        </div>
      </Fieldset>
    </div>
  );
};

export default MisInmuebles

;
