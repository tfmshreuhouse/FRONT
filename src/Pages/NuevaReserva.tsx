import React, { useState } from 'react';
import { Fieldset } from 'primereact/fieldset';
import { Calendar } from 'primereact/calendar';
import { useTranslation } from 'react-i18next';
import { CalendarChangeEvent } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NuevaReserva() {
  const { t } = useTranslation();
  const [FechaInicio, setDateInicio] = useState<Date | Date[] | null>(null);
  const [FechaFin, setDateFin] = useState<Date | Date[] | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const token: string | null = localStorage.getItem('jwt');
  const navigate = useNavigate();
  const { id } = useParams();
  const ChangeInicio = (e: CalendarChangeEvent) => {
    setDateInicio(e.value as Date | Date[]);
  };

  const ChangeFin = (e: CalendarChangeEvent) => {
    setDateFin(e.value as Date | Date[]);
  };
  
  const GuardarReserva = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(id);
    if (!token) {
      console.error('Token de autorización no encontrado en el localStorage');
      return;
    }
    if (!FechaInicio || !FechaFin) {
      setShowAlert(true);
      return;
    }
  };
  const handleVolverClick = () => {
    navigate(-1);
  };
  const cardStyle: React.CSSProperties = {
    width: "100%", 
    height: "250px"
  };
  return (
    <div className="main-container">
      <Fieldset legend={t('Reservar')}>
        <div className="p-fluid grid">
          <div className="field col-12 lg:col-1"></div>
          <div className="field col-12 lg:col-4">
          <div className="card">
          <img className="imagen" src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/450159926.jpg?k=9b5bb60fad6df4fbbe81b9bd8ad0f49988e379fc1713442ce92a7c8507983d5c&o=&hp=1" alt="Propiedad" style={cardStyle}/>
          <div className="card-body">
            <p className="card-text">Aparta estudio</p>
            <p className="card-text">750.000 COP</p>
            <p className="card-text">Cll 35 N 34-18</p>
            <p className="card-text">Colombia, Neiva</p>
          </div>
        </div>
          </div>
          <div className="field col-12 lg:col-6">
            <form onSubmit={GuardarReserva}>
              <div className="p-fluid grid">
                <div className="field col-12 lg:col-12"></div>
                <div className="field col-12 lg:col-6">
                  <span className="p-float-label">
                    <Calendar value={FechaInicio} onChange={ChangeInicio} />
                    <label htmlFor="inicio">Fecha inicio</label>
                  </span>
                </div>
                <div className="field col-12 lg:col-6">
                  <span className="p-float-label">
                    <Calendar value={FechaFin} onChange={ChangeFin} />
                    <label htmlFor="inicio">Fecha fin</label>
                  </span>
                </div>
                <div className="field col-12 lg:col-4"></div>
                <div className="field col-12 lg:col-4">
                  <Button 
                      type="submit" 
                      label="Guardar" 
                      icon="pi pi-check"
                  />
                </div>
              </div>
            </form>
            {showAlert && (
              <Message severity="error" text="Debe seleccionar ambas fechas." />
            )}
          </div>
          <div className="field col-12 lg:col-1"></div>
          <div className="field col-12 lg:col-5"></div>
          <div className="field col-12 lg:col-2">
            <Button 
              type="button" 
              icon="pi pi-angle-left"
              label="Volver"
              className="button-red"
              onClick={handleVolverClick}
            />
          </div>
        </div>
      </Fieldset>
    </div>
  );
}

export default NuevaReserva;
