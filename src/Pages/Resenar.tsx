import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Fieldset } from 'primereact/fieldset';

const ResenaView = () => {
  const [valorResena, setValorResena] = useState<number>(0);
  const navigate = useNavigate();
  
  
  const handleStarClick = (valor: number) => {
    setValorResena(valor);
  };

  const handleSubmit = () => {
    console.log(`Valor de la reseña: ${valorResena}`);
    alert(`Valor de la reseña: ${valorResena}`);
  };
  
  const handleVolverClick = () => {
    navigate('/home/infoInmueble/1/${id}');
  };

  return (
    <div className="main-container">
      <Fieldset legend="Deja tu reseña">
        <div className="p-fluid grid">
          <div className="field col-12 lg:col-2"></div>
          <div className="field col-12 lg:col-8">
            <div className="estrellas" style={{ textAlign: 'center', fontSize: '70px' }}>
              {[1, 2, 3, 4, 5].map((numero) => (
                <span
                  key={numero}
                  className={`estrella ${numero <= valorResena ? 'activa' : ''}`}
                  onClick={() => handleStarClick(numero)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="field col-12 lg:col-2"></div>

          <div className="field col-12 lg:col-2"></div>
          <div className="field col-12 lg:col-2">
            <label htmlFor="opinion" className="label-style">Opinión</label>
          </div>
          <div className="field col-12 lg:col-6" style={{ display: 'flex', alignItems: 'center' }}>
            <textarea
              name="opinion"
              className='text-area-div'
              placeholder="Escribe tu opinión"
              required
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="field col-12 lg:col-2"></div>
          <div className="field col-12 lg:col-2"></div>
          <div className="field col-12 lg:col-4">
            <Button
              type="button"
              label="Enviar Reseña"
              className="button-red"
              onClick={handleSubmit}
            />
          </div>
          <div className="field col-12 lg:col-4">
            <Button
              type="button"
              icon="pi pi-angle-left"
              label="Volver"
              className="button-red"
              onClick={handleVolverClick}
            />
          </div>
          <div className="field col-12 lg:col-2"></div>
        </div>
      </Fieldset>
    </div>
  );
};

export default ResenaView;
