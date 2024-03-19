import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { Fieldset } from 'primereact/fieldset';

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  status: string;
}

function Perfil() {
  let formInitial: FormData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    status: 'activo', // Estado por defecto
  };

  const [formData, setFormData] = useState<FormData>(formInitial);
  const navigate = useNavigate();

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
    // Aquí puedes manejar la lógica para enviar el formulario
    console.log(formData);
  };

  const navigateToHistorialPublicaciones = () => {
    navigate('/perfil/historialPublicaciones/1');
  };
  const navigateModificar = () => {
    navigate('/perfil/modificar/1');
  }
  const navigatePanel = () => {
    navigate('/perfil/panel/1');
  };
  const navigateToHistorialReservas = () => {
    navigate('/perfil/historialReservas/1');
  };

  return (
      <div className="main-container">
        <Fieldset legend="Perfil">
          <div style={{ textAlign: 'center' }}>
            <Avatar image="https://e0.pxfuel.com/wallpapers/442/989/desktop-wallpaper-perfil-boy-face.jpg" size="xlarge" shape="circle" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-fluid grid">
              <div className="field col-12 lg:col-2"></div>
                <div className="field col-12 lg:col-8">
                  <div className="field col-12 lg:col-12">
                    <span className="p-float-label">
                        <InputText
                          id="firstName"
                          name="firstName"
                          value={formData?.firstName}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="firstName">Nombre</label>
                    </span>
                  </div>
                  <div className="field col-12 lg:col-12">
                    <span className="p-float-label">
                        <InputText
                          id="lastName"
                          name="lastName"
                          value={formData?.lastName}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="inputtext">Apellido</label>
                    </span>
                  </div>
                  <div className="field col-12 lg:col-12">
                    <span className="p-float-label">
                        <InputText
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData?.phoneNumber}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="inputtext">Teléfono</label>
                    </span>
                  </div>
                  <div className="field col-12 lg:col-12">
                    <span className="p-float-label">              
                      <InputText
                        id="mail"
                        name="mail"
                        onChange={handleInputChange}
                      />
                      <label htmlFor="Correo">Correo</label>
                    </span>
                  </div>
                  <div className="field col-12 lg:col-12">
                    <span className="p-float-label">              
                      <InputText
                        id="direccion"
                        name="direccion"
                        onChange={handleInputChange}
                      />
                      <label htmlFor="Direccion">Direccion</label>
                    </span>
                  </div>
              </div>          
              <div className="field col-12 lg:col-3">                 
                <Button
                  type="button"
                  icon="pi pi-user"
                  label="Modificar mis datos"
                  className="button-green"
                  onClick={navigateModificar}
                />
              </div>
              <div className="field col-12 lg:col-3">
              <Button
                type="button"
                icon="pi pi-home"
                label="Panel de control"
                className="button-green"
                onClick={navigatePanel}
              />
              </div>
              <div className="field col-12 lg:col-3">
              <Button
                type="button"
                icon="pi pi-home"
                label="Mis Reservas"
                className="button-green"
                onClick={navigateToHistorialReservas}
              />
              </div>
              <div className="field col-12 lg:col-3">
              <Button
                type="button"
                icon="pi pi-book"
                label="Mis publicaciones"
                className="button-green"
                onClick={navigateToHistorialPublicaciones}
              />
              </div>
            </div>
          </form>
        </Fieldset>
      </div>
    );
  }
  
  export default Perfil;
  