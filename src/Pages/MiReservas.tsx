import React, { useState, useEffect } from 'react';
import '../index.css';
import Card from '../Components/Home/Cards'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';

const MisReservas = () => {
  const navigate = useNavigate();
  interface Reserva {
    reservaId: string;
    inmuebleId: string;
    fechaInicio: string;
    fechaFin: string;
    fechaActiva: string;
    fechaInActiva: string;
    costo: string;
    direccion: string;
    pais: string;
    ciudad: string;
    nombreInmueble: string;
    Url: string;
    moneda: string;
  }
  
  const [reservas, setReservas] = useState<Reserva[]>([]);
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
        
        const responseAxiosReservaInfo = await axiosTokenInfo.get(`/rest/reservas/User/${userId.userID}`);
        const Datos = responseAxiosReservaInfo.data.data;
        console.log(Datos);
        setReservas(Datos);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);
  const handleBoton1Click = (tipo: string, id: string, reservaId: string) => {
    navigate(`/home/infoInmueble/${tipo}/${id}/${reservaId}`);
  };
  const handleVolverClick = () => {
    navigate('/perfil');
  };
  return (
    <div className="container">
      <Fieldset legend="Mis reservas">
        {reservas.length === 0 ? (
          <div className="p-fluid grid">
            <div className="field col-12 lg:col-4"></div>
            <div className="field col-12 lg:col-4">
              <h2>Aun no tienes reservas.</h2>
            </div>
            <div className="field col-12 lg:col-4"></div>
            <div className="field col-12 lg:col-4"></div>
            <div className="field col-12 lg:col-4">
              <Button
                  type="button"
                  icon="pi pi-angle-left"
                  label="Volver"
                  className="button-red"
                  onClick={handleVolverClick}
                />
            </div>
            <div className="field col-12 lg:col-4"></div>
          </div>
          
        ) : (
          <>
            <div className="row">
              {reservas.map((reserva, index) => (
                <Card
                  key={index}
                  onBoton1Click={() => handleBoton1Click('1',reserva.inmuebleId, reserva.reservaId)}
                  imageUrl={reserva.Url} 
                  buttonText="Ver detalles"
                  className="col-md-4 col-sm-12"
                  tipo="1"
                  id={reserva.inmuebleId}
                  titulo={reserva.nombreInmueble} 
                  precio={reserva.fechaInicio + " / " + reserva.fechaFin}
                  direccion={reserva.costo + " " + reserva.moneda}
                  pais={reserva.pais}
                  ciudad={reserva.ciudad}
                />
              ))}
            </div>
            <div className="p-fluid grid">
              <div className="field col-12 lg:col-4"></div>
              <div className="field col-12 lg:col-3">
                <Button
                  type="button"
                  icon="pi pi-angle-left"
                  label="Volver"
                  className="button-red"
                  onClick={handleVolverClick}
                />
              </div>
            </div>
          </>
        )}
      </Fieldset>
    </div>
    
  );
}


export default MisReservas;
