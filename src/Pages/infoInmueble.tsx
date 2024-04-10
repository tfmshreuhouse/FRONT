import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
// import Carousel from '../Components/Shared/Carousel';
import '../index.css';
import Imagenes from '../Components/Shared/imagenes';
import { Galleria } from 'primereact/galleria';
import { data } from '../assets/data';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import axios from "axios";

function InfoInmueble() {
    // Supongamos que recibes la información del inmueble como un objeto JSON
    const [inmuebleInfo, setInmuebleInfo] = useState<any>(null);
    const { tipo, id, reservaId } = useParams();

    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    let idInmueble = !isNaN(parseInt(id + "")) ? parseInt(id+"") : 0;

    const token: string | null = localStorage.getItem('jwt');

    const [Images, setImages] = useState<any[]>([]);

      const itemTemplate = (item: any) => {
        return (
          <div className="custom-item">
            <img src={item} />
          </div>
        );
      };

      useEffect(() => {
        const obtenerDatosTipoInmueble = async () => {            
            
            if (idInmueble != 0) {
                
                try {
    
                    const response = await axios.get<{ success: boolean; data: any }>(
                        process.env.REACT_APP_API_URL + "/rest/inmuebles/"+ idInmueble,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                    console.log(response);

                    const responseimg = await axios.get<{ success: boolean; data: any }>(
                        process.env.REACT_APP_API_URL + "/rest/ImagnenesInmuebles/"+ idInmueble,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );              
                    
                    const images = responseimg.data.data.map((image: any) => image.URL);
                    setImages(images);

                    const responsePubc = await axios.get<{ success: boolean; data: any }>(
                        process.env.REACT_APP_API_URL + "/rest/publicacion/"+ idInmueble,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                    const inmuebleInfo = {
                        publicacionId: response.data.data.Publicaciones?.[0]?.id,
                        id: response.data.data.id,
                        pais: response.data.data.Pais,
                        ciudad: response.data.data.Ciudad,
                        pisos: response.data.data.DetallesInmueble.pisos,
                        habitaciones: response.data.data.DetallesInmueble.habitaciones,
                        banosCompletos: response.data.data.DetallesInmueble.banosCompletos,
                        banosMedios: response.data.data.DetallesInmueble.banosMedios,
                        cocina: parseInt(response.data.data.DetallesInmueble.cocina),
                        lavado: parseInt(response.data.data.DetallesInmueble.lavado),
                        patio: parseInt(response.data.data.DetallesInmueble.patio),
                        balcon: parseInt(response.data.data.DetallesInmueble.balcon),
                        estacionamiento: parseInt(response.data.data.DetallesInmueble.estacionamiento),
                        elevador: parseInt(response.data.data.DetallesInmueble.elevador),
                        piscina: parseInt(response.data.data.DetallesInmueble.piscina),
                        areasPublicas: parseInt(response.data.data.DetallesInmueble.areasPublicas),
                        fumar: parseInt(response.data.data.DetallesInmueble.fumar),
                        mascotas: parseInt(response.data.data.DetallesInmueble.mascotas),
                        reuniones: parseInt(response.data.data.DetallesInmueble.reuniones),
                        descripcion: response.data.data.DetallesInmueble.descripcion,
                        indicaciones: response.data.data.DetallesInmueble.indicaciones,
                        status: response.data.data.DetallesInmueble.status,
                        Direccion: response.data.data.Direccion,
                        Nombre: response.data.data.Nombre,
                        costo: responsePubc.data.data.costo,
                        capacidad: responsePubc.data.data.PAX

                    };
    

                    setInmuebleInfo(inmuebleInfo);

                } catch (error) {
                    console.error('Error al cargar tipos de inmueble:', error);
                }
            }
        };

        obtenerDatosTipoInmueble();
    }, []);

    const renderButtons = () => {
        if (inmuebleInfo && tipo === '1') {
            return (
                <Fragment>
                    {(reservaId === '0') ? 
                        <>
                            <div className="field col-12 lg:col-3"></div>
                            <div className="field col-12 lg:col-3">
                                <Button
                                    type="button"
                                    label="Reservar"
                                    className="button-blue"
                                    onClick={() => window.location.href=`/home/infoInmueble/nuevaReserva/${id}`}
                                />
                            </div>
                            <div className="field col-12 lg:col-3">
                                <Button
                                    type="button"
                                    label="Volver"
                                    className="button-blue"
                                    onClick={() => window.location.href=`/home`}
                                />
                            </div>
                        </> :
                        <>
                        <div className="field col-12 lg:col-2"></div>
                        <div className="field col-12 lg:col-2">
                            <Button
                                type="button"
                                label="Reservar"
                                className="button-blue"
                                onClick={() => window.location.href=`/home/infoInmueble/nuevaReserva/${id}`}
                            />
                        </div>
                        <div className="field col-12 lg:col-2">
                            <Button
                                type="button"
                                label="Reseñar"
                                className="button-blue"
                                onClick={() => window.location.href=`/home/infoInmueble/resena/${reservaId}`}
                            />
                        </div>
                        <div className="field col-12 lg:col-2">
                            <Button
                                type="button"
                                label="Denunciar"
                                className="button-blue"
                                onClick={() => window.location.href=`/home/infoInmueble/denuncia/${inmuebleInfo.publicacionId}`}
                            />
                        </div>
                        <div className="field col-12 lg:col-3">
                            <Button
                                type="button"
                                label="Volver"
                                className="button-blue"
                                onClick={() => window.location.href=`/home`}
                            />
                        </div>
                        </> 
                    }
                </Fragment>
            );
        } else if (inmuebleInfo && tipo === '2') {
            return (
                <Fragment>
                    <div className="field col-12 lg:col-2"></div>
                    <div className="field col-12 lg:col-4">
                        <Button
                            type="button"
                            label="Editar inmueble"
                            className="button-blue"
                            onClick={() => window.location.href=`/home/infoInmueble/editar/${id}`}
                        />
                    </div>
                    <div className="field col-12 lg:col-4">
                    <Button
                            type="button"
                            label="Volver"
                            className="button-blue"
                            onClick={() => window.location.href=`/perfil/historialPublicaciones/`}
                        />
                    </div>
                </Fragment>
            );
        }

        return null;
    };

    return (
            <div className="main-container">
                <Fieldset legend="Detalles del inmueble">
                    <div className="p-fluid grid">
                        <div className="field col-12 lg:col-1"></div>
                        <div className="field col-12 lg:col-10">
                            <div className="image-container">
                                {inmuebleInfo && (
                                    <Galleria
                                    value={Images} 
                                    style={{ maxWidth: '100%', height: 'auto' }}  
                                    showThumbnails={false} 
                                    showIndicators 
                                    item={itemTemplate} 
                                    className="galleria-container"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="field col-12 lg:col-1"></div>

                        <div className="field col-12 lg:col-1"></div>
                        <div className="field col-12 lg:col-10">
                            <div className="infoPrincipal-box">
                                {inmuebleInfo && (
                                    <div className="title-box">
                                        <h2>{inmuebleInfo.Nombre}</h2>
                                        <p>{inmuebleInfo.ciudad}, {inmuebleInfo.pais}</p>
                                    </div>
                                )}
                                {inmuebleInfo && (
                                    <div className="description-box">
                                        <h2>Descripcion</h2>
                                        <p>{inmuebleInfo.descripcion}</p>
                                    </div>
                                )}
                            </div>
                         </div>
                         <div className="field col-12 lg:col-1"></div>

                         <div className="field col-12 lg:col-1"></div>
                         <div className="field col-12 lg:col-10">
                            <Fieldset legend="Especificaciones">
                                {inmuebleInfo && (  
                                    <div className="details-box">
                                        <p>Pisos: {inmuebleInfo.pisos}</p>
                                        <p>Habitaciones: {inmuebleInfo.habitaciones}</p>
                                        <p>Baños Completos: {inmuebleInfo.banosCompletos}</p>
                                        <p>Baños Medios: {inmuebleInfo.banosMedios}</p>
                                        <p>Cocina: {inmuebleInfo.cocina === 1 ? 'Sí' : 'No'}</p>
                                        <p>Lavado: {inmuebleInfo.lavado === 1 ? 'Sí' : 'No'}</p>
                                        <p>Patio: {inmuebleInfo.patio === 1 ? 'Sí' : 'No'}</p>
                                        <p>Balcón: {inmuebleInfo.balcon === 1 ? 'Sí' : 'No'}</p>
                                        <p>Estacionamiento: {inmuebleInfo.estacionamiento === 1 ? 'Sí' : 'No'}</p>
                                        <p>Elevador: {inmuebleInfo.elevador === 1 ? 'Sí' : 'No'}</p>
                                        <p>Piscina: {inmuebleInfo.piscina === 1 ? 'Sí' : 'No'}</p>
                                        <p>Áreas Públicas: {inmuebleInfo.areasPublicas === 1 ? 'Sí' : 'No'}</p>
                                        <p>Fumar: {inmuebleInfo.fumar === 1 ? 'Sí' : 'No'}</p>
                                        <p>Mascotas: {inmuebleInfo.mascotas === 1 ? 'Sí' : 'No'}</p>
                                        <p>Reuniones: {inmuebleInfo.reuniones === 1 ? 'Sí' : 'No'}</p>
                                        <p>Status: {inmuebleInfo.status === 1 ? 'Disponible' : 'No Disponible'}</p>
                                        <p>Costo: {inmuebleInfo.costo}</p>
                                        <p>Capacidad: {inmuebleInfo.capacidad}</p>
                                    </div>
                                )}
                                <div className="button-container">
                                    <div className="p-fluid grid">
                                        {renderButtons()}
                                    </div>
                                </div>
                            </Fieldset>
                        </div>   
                        
                    </div>
                </Fieldset>
            </div>
    );
}

export default InfoInmueble;