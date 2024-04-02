import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

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
      <div className="card box">
        <form onSubmit={handleSubmit}>
          <div className="p-fluid grid">
            <div className="field col-12 lg:col-2"></div>
              <div className="field col-12 lg:col-8">
                <span className="p-float-label">
                    <InputText
                      id="firstName"
                      name="firstName"
                      value={formData?.firstName}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="firstName">Nombre</label>
                </span>
                <span className="p-float-label">
                    <InputText
                      id="lastName"
                      name="lastName"
                      value={formData?.lastName}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="inputtext">Apellido</label>
                </span>
                <span className="p-float-label">
                    <InputText
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData?.phoneNumber}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="inputtext">Teléfono</label>
                </span>
                <span className="p-float-label">              
                  <Password
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="password">Contraseña</label>
                </span>
            </div>          
            <div className="field col-12 lg:col-4">   
              <span style={{color:"#818ea1"}}>Estado</span>                 
              <SelectButton style={{marginTop:"10px"}}
                  value={formData.status}
                  options={[
                    { label: 'Activo', value: 'activo', className:"button-blueS"},
                    { label: 'Inactivo', value: 'inactivo', styleClass:"button-blue" },
                  ]}
                  onChange={handleStatusChange}
                />
            </div>
            <div className="p-field col-12 lg:col-8"/>
            <div className="p-field col-12 lg:col-2"/>
            <div className="field col-12 lg:col-2">
            <Button
              type="button"
              icon="pi pi-user"
              label="Modificar Datos"
              className="button-green"
              onClick={navigateModificar}
            />
            </div>
            <div className="field col-12 lg:col-2">
            <Button
              type="button"
              icon="pi pi-home"
              label="Panel de control"
              className="button-green"
              onClick={navigatePanel}
            />
            </div>
            <div className="field col-12 lg:col-2">
            <Button
              type="button"
              icon="pi pi-home"
              label="Mis Reservas"
              className="button-green"
              onClick={navigateToHistorialReservas}
            />
            </div>
            <div className="field col-12 lg:col-2">
            <Button
              type="button"
              icon="pi pi-book"
              label="Mis publicaciones"
              className="button-green"
              onClick={navigateToHistorialPublicaciones}
            />
            </div>
            <div className="field col-12 lg:col-2">
              <Button type="submit" icon="pi pi-check" label="Guardar" className="button-blue" />
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  export default Perfil;
  