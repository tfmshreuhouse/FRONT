import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const DivHome = () => {
  return (
    <div className="row">
      <div className="col-md-4 mb-3">
        <div className="form-button">
          <label htmlFor="venta" className="label-style">CATEGORIA</label>
          <input type="text" className='input-div' name="venta" placeholder="venta" />
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="form-button">
          <label htmlFor="apartamento" className="label-style">TIPO DE INMUEBLE</label>
          <input type="text" className='input-div' name="apartamento" placeholder="APARTAMENTO" />
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="form-button">
          <label htmlFor="ubicacion" className="label-style">UBICACION</label>
          <input type="text" className='input-div' name="ubicacion" placeholder="Bogota, Colombia" />
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="form-button">
          <label htmlFor="precio" className="label-style">PRECIO MINIMO</label>
          <input type="text" className='input-div' name="precio_minimo" placeholder="precio minimo" />
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="form-button">
          <label htmlFor="precio" className="label-style">PRECIO MAXIMO</label>
          <input type="text" className='input-div' name="precio_mazimo" placeholder="precio maximo" />
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="form-button">
          <label htmlFor="estrato" className="label-style">ESTRATO</label>
          <select className='select-div' name="estrato">
            <option value=''>selecione</option>
            <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
          </select>
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
