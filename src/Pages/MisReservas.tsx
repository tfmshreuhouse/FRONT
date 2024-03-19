import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { SelectButton } from 'primereact/selectbutton';
import { intUserInfo } from '../Interfaces/authInterfaces'
import { Button } from 'primereact/button';
import MiReservaCard from '../Components/Reservas/MiReservaCard';

interface FormData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    status: string;
  }
  
  function MisReservas() {
    let formInitial:FormData = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      status: 'activo', // Estado por defecto
    };

    const [formData, setFormData] = useState<FormData>(formInitial);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleStatusChange = (e: { value: string }) => {
      setFormData((prevData) => ({
        ...prevData,
        status: e.value,
      }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
       //Aquí puedes manejar la lógica para enviar el formulario
      console.log(formData);
    };
  
    return (    
        <div className="card box">
            <h2>Mis reservas</h2>
            <MiReservaCard imageUrl={'https://lajoya.ec/wp-content/uploads/2015/02/LJ-CONDOMINIO-2-SALA-COMEDOR-1108x960.png'} 
                        ciudadDestino={'Paraguay'} 
                        nombrePropiedad={'Hotel Yasy'}
                        costoTotal='1.500.000 GS.'
                        fechaInicioReserva='01/03/2024'
                        fechaFinReserva='20/03/2024'
                        estado='Pagado'/>
        </div>
    );
  }
  
  export default MisReservas;
  