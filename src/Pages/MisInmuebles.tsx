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
  interface Inmuebles {
    id: string;
    nombre: string;
    pais: string;
    ciudad: string;
    direccion: string;
    tipoInmueble: string;
    imagen: string;
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

  const [inmuebles, setInmuebles] = useState<Inmuebles[]>([]);
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
  
        const inmueblesTransformados: Inmuebles[] = await Promise.all(Datos.map(async (inmueble: any) => {
          const responseimg = await axiosTokenInfo.get<{ success: boolean; data: any }>(
            `/rest/ImagnenesInmuebles/${inmueble.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          
          const firstImageURL = responseimg.data.data[0]?.URL; // Obtener la URL del primer registro de imágenes
  
          return {
            id: inmueble.id,
            nombre: inmueble.Nombre,
            pais: inmueble.Pais,
            ciudad: inmueble.Ciudad,
            direccion: inmueble.Direccion,
            tipoInmueble: inmueble.TiposInmueble ? inmueble.TiposInmueble.tipo : '',
            imagen: firstImageURL // Asignar la URL del primer registro de imágenes al objeto de inmueble transformado
          };
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
        {inmuebles.length === 0 ? (
          <div className="p-fluid grid">
            <div className="field col-12 lg:col-4"></div>
            <div className="field col-12 lg:col-5">
              <h2>Aun no tienes inmuebles.</h2>
            </div>
            <div className="field col-12 lg:col-3"></div>
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
        ) : (
          <>
            <div className="row">
              {inmuebles.map((inmueble, index) => (
                <Card
                  key={index}
                  onBoton1Click={() => handleBoton1Click('2', inmueble.id)}
                  imageUrl={inmueble.imagen} 
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
          </>
        )}
      </Fieldset>
    </div>
  );
}
export default MisInmuebles;
