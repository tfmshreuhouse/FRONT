import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
// import Carousel from '../Components/Shared/Carousel';
import datosInmueble from '../../src/assets/inmueble.json'; 
import '../index.css';
import Imagenes from '../Components/Shared/imagenes';
import { Galleria } from 'primereact/galleria';
import { data } from '../assets/data';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';

function InfoInmueble() {
    // Supongamos que recibes la información del inmueble como un objeto JSON
    const [inmuebleInfo, setInmuebleInfo] = useState<any>(null);
    const { tipo, id } = useParams();
      interface GalleryItem {
        id: number;
        imgUrl: string;
      }
      const itemTemplate = (item: GalleryItem) => {
        return (
          <div className="custom-item">
            <img src={item.imgUrl} alt={item.id.toString()} />
          </div>
        );
      };
    useEffect(() => {
        setInmuebleInfo(datosInmueble);
    }, []);

    const renderButtons = () => {
        if (inmuebleInfo && tipo === '1') {
            return (
                <Fragment>
                    <div className="field col-12 lg:col-2"></div>
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
                            label="Denunciar"
                            className="button-blue"
                            onClick={() => window.location.href=`/home/infoInmueble/denuncia/${id}`}
                        />
                    </div>
                    <div className="field col-12 lg:col-3">
                        <Button
                            type="button"
                            label="Reseñar"
                            className="button-blue"
                            onClick={() => window.location.href=`/home/infoInmueble/resena/${id}`}
                        />
                    </div>
                </Fragment>
            );
        } else if (inmuebleInfo && tipo === '2') {
            return (
                <div className="field col-12 lg:col-12">
                    <Button
                        type="button"
                        label="Editar inmueble"
                        className="button-blue"
                        onClick={() => window.location.href=`/home/infoInmueble/editar/${id}`}
                    />
                </div>
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
                                    value={data} 
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
                                        <h2>{inmuebleInfo.title}</h2>
                                        <p>Habitaciones {inmuebleInfo.habitaciones}, Baños {inmuebleInfo.banosCompletos}</p>
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
                                        <p>Indicaciones: {inmuebleInfo.indicaciones}</p>
                                    </div>
                                )}
                            </Fieldset>
                        </div>   
                        <div className="button-container">
                            <div className="p-fluid grid">
                                {renderButtons()}
                            </div>
                        </div>
                    </div>
                </Fieldset>
            </div>
    );
}

export default InfoInmueble;