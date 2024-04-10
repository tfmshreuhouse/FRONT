import React, { useState, useEffect } from 'react';
import '../index.css';
import Card from '../Components/Home/Cards'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import { useParams } from 'react-router-dom';

const Notificacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  interface Notificaciones {
    text: string;
    titulo: string;
  }
  
  const [notificacion, setNotificacion] = useState<Notificaciones[]>([]);
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
       
        const responseAxiosReservaInfo = await axiosTokenInfo.get(`/rest/notificaciones/id/${id}`);
        const Datos = responseAxiosReservaInfo.data.data;

        const response = await axiosTokenInfo.patch(
            process.env.REACT_APP_API_URL + `/rest/notificaciones/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setNotificacion(Datos);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);
  const handleVolverClick = () => {
    navigate(-1);
  };
  return (
    <div className="container">
      <Fieldset legend="Mis notificaciones">
        {notificacion.length === 0 ? (
          <div className="p-fluid grid">
            <div className="field col-12 lg:col-4"></div>
            <div className="field col-12 lg:col-4">
              <h2>Aun no tienes notificaciones.</h2>
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
              {notificacion.map((noti, index) => (
            //     <Card
            //       key={index}
            //       onBoton1Click={() => handleBoton1Click('1',reserva.inmuebleId, reserva.reservaId)}
            //   imageUrl={reserva.Url} 
            //       buttonText="Ver detalles"
            //       className="col-md-4 col-sm-12"
            //       tipo="1"
            //       id={reserva.inmuebleId}
            //       titulo={reserva.nombreInmueble} 
            //       precio={reserva.costo}
            //       direccion={reserva.direccion}
            //       pais={reserva.pais}
            //       ciudad={reserva.ciudad}
            //     />
                <div className="p-fluid grid">
                <div className="field col-12 lg:col-1"></div>
                <div className="field col-12 lg:col-10" style={{textAlign: 'center'}}>
                   <h3>{noti.text}</h3>
                </div>
                </div>
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


export default Notificacion;
