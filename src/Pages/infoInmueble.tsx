import React, { useState, useEffect, Fragment } from 'react';
import datosInmueble from '../../src/assets/inmueble.json'; 
import './inmuebles.css';
import Imagenes from '../Components/Shared/imagenes';

function InfoInmueble() {
    // Supongamos que recibes la información del inmueble como un objeto JSON
    const [inmuebleInfo, setInmuebleInfo] = useState<any>(null);
    
    useEffect(() => {
        /*async function fetchInmuebleInfo() {
            try {
                
                const response = await fetch('url');
                const data = await response.json();
                setInmuebleInfo(data);
            } catch (error) {
                console.error('Error al obtener la información del inmueble:', error);
            }
        }

        fetchInmuebleInfo();*/
        setInmuebleInfo(datosInmueble);
    }, []);

    return (
        <Fragment>            
            <div className="main-container">
                <div className="image-container">
                    {inmuebleInfo && (
                        <Imagenes/>
                    )}
                </div>
                <div className="content-container">
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
                    {inmuebleInfo && (    
                        <div className="details-box">                  
                            <h1>Especificaciones</h1>
                            <p></p>
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
                            <p>Indicaciones: {inmuebleInfo.indicaciones}</p>
                        </div>
                    )}
                </div>   
            </div>
        </Fragment>
    );
}

export default InfoInmueble;
