import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { InputNumber } from 'primereact/inputnumber';

interface Filtros {
  costoMinimo: number | null;
  costoMaximo: number | null;
  tipoInmueble: number | undefined;
  pais: string | undefined;
  ciudad: string | undefined;
  PAX: number | null;
}
interface ChildProps {
  fetchPublicacionesFilter: (filtros:Filtros) => void;
}

const DivHome:React.FC<ChildProps> = ({fetchPublicacionesFilter}) => {

  const [tipoInmueble, setTipoInmueble] = useState(null);
  const [tipoInmuebleOptions, setTipoInmuebleOptions] = useState<{ value: number; label: string }[]>([]);
  const token: string | null = localStorage.getItem('jwt');
  const [filtros, setFiltros] = useState<Filtros>({pais:undefined, ciudad:undefined, PAX: null, tipoInmueble: undefined,
                                                    costoMaximo: null, costoMinimo: null});

  useEffect(() => { 
    cargarTipoInmueble();
  }, []); 

  const cargarTipoInmueble = async () => {
      try {

          const response = await axios.get<{ success: boolean; data: { id: number; tipo: string }[] }>(
              process.env.REACT_APP_API_URL + "/rest/tipos-inmuebles"
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
          <span className="p-field p-grid">
          <label htmlFor="pais" className="p-col-fixed" style={{ width: '100%' }}>PAIS</label>   
            <InputText
              id="pais"
              name="pais"
              value={filtros.pais}
              onChange={(e) => {
                setFiltros({...filtros, pais: e.target.value});
                fetchPublicacionesFilter({...filtros, pais: e.target.value});
              }}
            />
          </span>
      </div>
      <div className="field col-12 lg:col-4">
          <span className="p-field p-grid">
          <label htmlFor="ciudad" className="p-col-fixed" style={{ width: '100%' }}>CIUDAD</label>   
            <InputText
              id="ciudad"
              name="ciudad"
              value={filtros.ciudad}
              onChange={(e) => {
                setFiltros({...filtros, ciudad: e.target.value});
                fetchPublicacionesFilter({...filtros, ciudad: e.target.value})
              }}
            />
          </span>
      </div>
      <div className="field col-12 lg:col-4">
          <span className="p-field p-grid">   
            <label htmlFor="precio_minimo" className="p-col-fixed" style={{ width: '100%' }}>Tipo de Inmueble</label>                                  
              <Dropdown
                  value={filtros.tipoInmueble}
                  options={tipoInmuebleOptions}
                  onChange={(e) => {setTipoInmueble(e.value); setFiltros({...filtros, tipoInmueble: e.target.value}); fetchPublicacionesFilter({...filtros, tipoInmueble: e.target.value})}}                                        
                  optionLabel="label"
                  placeholder="Seleccione"
                  className="TipoInmueble"
              />
          </span>
      </div>
      <div className="field col-12 lg:col-4">
          <span className="p-field p-grid">
          <label htmlFor="precio_minimo" className="p-col-fixed" style={{ width: '100%' }}>PRECIO MINIMO</label>
            <InputNumber
              id="precio_minimo"
              name="precio_minimo"
              value={filtros.costoMinimo}
              onChange={(e) => {
                setFiltros({...filtros, costoMinimo: e.value});
                fetchPublicacionesFilter({...filtros, costoMinimo: e.value})
              }}
              className="Precio" 
              useGrouping={false} min={0} 
            />
          </span>
      </div>
      <div className="field col-12 lg:col-4">
      <span className="p-field p-grid">
          <label htmlFor="precio_maximo" className="p-col-fixed" style={{ width: '100%' }}>PRECIO MAXIMO</label>
          <InputNumber 
                value={filtros.costoMaximo} 
                onValueChange={(e: any) => {
                  setFiltros({...filtros, costoMaximo: e.value});
                  fetchPublicacionesFilter({...filtros, costoMaximo: e.value})
                }} 
                className="Precio" 
                useGrouping={false} min={0} 
          />
      </span>
      </div>
      <div className="field col-12 lg:col-4">
          <span className="p-field p-grid">
          <label htmlFor="precio_maximo" className="p-col-fixed" style={{ width: '100%' }}>CANTIDAD DE PERSONAS</label>
            <InputNumber
              id="PAX"
              name="PAX"
              value={filtros.PAX}
              onChange={(e) => {
                setFiltros({...filtros, PAX: e.value});
                fetchPublicacionesFilter({...filtros, PAX: e.value})
              }}
            />
          </span>
      </div>
    </div>
  );
};

export default DivHome;
