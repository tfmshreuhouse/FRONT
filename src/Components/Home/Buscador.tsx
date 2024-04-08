import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const DivHome = () => {
  return (
    <div className="row">
      <div className="col-md-4 mb-3">
        <div className="form-button">
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="form-button">
          <span className="p-float-label">
            <InputText
              id="apartamento"
              name="apartamento"
            />
            <label htmlFor="firstName">TIPO DE INMUEBLE</label>
          </span>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="form-button">
          <span className="p-float-label">
            <InputText
              id="ubicacion"
              name="ubicacion"
            />
            <label htmlFor="firstName">UBICACION</label>
          </span>
        </div>
      </div>
      <div className="col-md-4 mb-3">
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
      <div className="col-md-4 mb-3">
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
      <div className="col-md-4 mb-3">
        <div className="form-button">
          <span className="p-float-label">
            <InputText
              id="precio_maximo"
              name="precio_maximo"
            />
            <label htmlFor="firstName">CALIFICACION MINIMA</label>
          </span>
        </div>
      </div>
      <div className="col-md-12 mb-3 text-center">
      <Button
        type="button"
        icon="pi pi-search"
        label="Buscar"
        className="button-red"
      />
      </div>
    </div>
  );
};

export default DivHome;
