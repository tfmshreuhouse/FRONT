// Card.js
import React, {useRef} from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";

interface ReservaCardProps {
  imageUrl: string;
  ciudadDestino: string;
  nombrePropiedad: string,
  fechaInicioReserva?: string;
  fechaFinReserva?: string;
  estado?: string;
  costoTotal?: string;
}

const MiReservaCard: React.FC<ReservaCardProps> = ({ imageUrl, ciudadDestino, nombrePropiedad, fechaInicioReserva, 
                                                        fechaFinReserva, estado, costoTotal }) => {
    const menu = useRef(null);
    const toast = useRef(null);
    const navigate = useNavigate();

  const items = [
    {
      label: 'Eliminar Reserva',
      icon: 'pi pi-trash',
      command: () => {
        // Lógica para eliminar la reserva
      }
    },
    {
      label: 'Volver a reservar',
      icon: 'pi pi-calendar-plus',
      command: () => {
        // Lógica para volver a reservar
      }
    },
    {
      label: 'Ver detalles',
      icon: 'pi pi-book',
      command: () => {
        navigate('/detalles')
      }
    }
  ];

  const menuModel = [
    {
      label: '',
      icon: 'pi pi-ellipsis-v',
      items: items
    }
  ];

  const header = (
    <div className="grid">
      <div className="col-12 lg:col-2">
        <img alt="Card" src={imageUrl} 
        onError={(e) => e.currentTarget.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} 
        style={{ width: '150px', margin: '20px' }}/>        
        </div>
        <div className="col-12 lg:col-9">
          <h3>{nombrePropiedad}</h3>
          <p>{ciudadDestino}, {fechaInicioReserva} - {fechaFinReserva}</p>
          <p>{estado}</p>
        </div>
        <div className="col-12 lg:col-1" style={{paddingTop: "25px"}}>
        <Menu model={items} popup ref={menu} />
        <Button icon="pi pi-bars" className="button-blue" onClick={(event) => menu.current.toggle(event)}/>
      </div>
    </div>
  );

  return (
    <div>
        <Card style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '20px' }} header={header}>
        </Card>
    </div>
        
  );
};

export default MiReservaCard;
