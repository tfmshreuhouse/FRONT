import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

const DivHome = () => {

  const [tipoInmueble, setTipoInmueble] = useState(null);
  const [tipoInmuebleOptions, setTipoInmuebleOptions] = useState<{ value: number; label: string }[]>([]);
  const token: string | null = localStorage.getItem('jwt');

  useEffect(() => { 
    cargarTipoInmueble();
  }, []); 

  const cargarTipoInmueble = async () => {
      try {

          const response = await axios.get<{ success: boolean; data: { id: number; tipo: string }[] }>(
              process.env.REACT_APP_API_URL + "rest/tipos-inmuebles"
          );

          const optionstipo = [];

          for(let i=0; i<response.data.data.length; i++){
              let label = response.data.data[i].tipo
              let value = response.data.data[i].id
              optionstipo.push({ label: `${label}`, value: value });
          }

          setTipoInmuebleOptions(optionstipo);
      } catch (error) {
          console.error('Error al cargar tipos de inmueble:', error);
      }
  };

  return (
    <div className="p-fluid grid">  
    <div className="field col-12 lg:col-12 text-center"></div>
      <div className="field col-12 lg:col-12 text-center">
        <h2>¡Encuentra tu próximo hogar con simples pasos!</h2>
      </div>
      <div className="field col-12 lg:col-4">
        <div className="form-button">
          <span className="p-float-label">
            <InputText
              id="pais"
              name="pais"
            />
            <label htmlFor="firstName">PAIS</label>
          </span>
        </div>
      </div>
      <div className="field col-12 lg:col-4">
        <div className="form-button">
          <span className="p-float-label">
            <InputText
              id="ciudad"
              name="ciudad"
            />
            <label htmlFor="firstName">CIUDAD</label>
          </span>
        </div>
      </div>
      <div className="field col-12 lg:col-4">
        <div className="form-button">
          <span className="p-float-label">                                     
              <Dropdown
                  value={tipoInmueble}
                  options={tipoInmuebleOptions}
                  onChange={(e) => setTipoInmueble(e.value)}                                        
                  optionLabel="label"
                  placeholder="Seleccione"
                  className="TipoInmueble"
              />
              <label>Tipo de Inmueble</label>
          </span>
        </div>
      </div>
      <div className="field col-12 lg:col-4">
        <div className="form-button">
          <span className="p-float-label">
            <InputText
              id="precio_minimo"
              name="precio_minimo"
            />
            <label htmlFor="firstName">PRECIO MINIMO</label>
          </span>
        </div>
      </div>
      <div className="field col-12 lg:col-4">
        <div className="form-button">
          <span className="p-float-label">
            <InputText
              id="precio_maximo"
              name="precio_maximo"
            />
            <label htmlFor="firstName">PRECIO MAXIMO</label>
          </span>
        </div>
      </div>
      <div className="field col-12 lg:col-4">
        <div className="form-button">
          <span className="p-float-label">
            <InputText
              id="PAX"
              name="PAX"
            />
            <label htmlFor="firstName">CANTIDAD DE PERSONAS</label>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DivHome;
