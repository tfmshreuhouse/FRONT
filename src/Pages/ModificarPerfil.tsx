import React, { useState, FormEvent } from 'react';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const ModificarDatosForm: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos enviados:', { nombre, apellido, edad, contrasena, correo, telefono });
    alert("datos ingresados exitosamente")
  };
  const handleVolverClick = () => {
    navigate(-1);
  };
  return (
    <div className="main-container">
      <Fieldset legend="Modificar mis datos">
        <form onSubmit={handleSubmit}>
        <div className="p-fluid grid">
            <div className="field col-12 lg:col-2"></div>
            <div className="field col-12 lg:col-8">
              <div className="field col-12 lg:col-12">
                <span className="p-float-label">
                  <InputText 
                    name="nombre" 
                    placeholder="Nombre" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                  />
                  <label htmlFor="nombres">Nombres</label>
                </span>
              </div>
              <div className="field col-12 lg:col-12">
                <span className="p-float-label">
                  <InputText 
                    name="apellido" 
                    placeholder="Apellido" 
                    value={apellido} 
                    onChange={(e) => setApellido(e.target.value)} 
                  />
                  <label htmlFor="inputtext">Apellidos</label>
                </span>
              </div>
              <div className="field col-12 lg:col-12">
                <span className="p-float-label">
                  <InputText 
                    name="correo" 
                    placeholder="Correo" 
                    value={correo} 
                    onChange={(e) => setCorreo(e.target.value)} 
                  />
                  <label htmlFor="inputtext">Teléfono</label>
                </span>
              </div>
              <div className="field col-12 lg:col-12">
                <span className="p-float-label">
                  <InputText  
                    name="telefono" 
                    placeholder="Dirección" 
                    value={telefono} 
                    onChange={(e) => setTelefono(e.target.value)} 
                  />
                   <label htmlFor="correo">Correo</label>
                </span>
              </div>
            </div>
            <div className="field col-12 lg:col-3"></div>
            <div className="field col-12 lg:col-3">
              <Button
                type="submit"
                icon="pi pi-home"
                label="Guardar"
                className="button-green"
              />
              </div>
            <div className="field col-12 lg:col-3">
              <Button
                type="button"
                icon="pi pi-angle-left"
                label="Volver"
                className="button-red"
                onClick={handleVolverClick}
              />
            </div>
            <div className="field col-12 lg:col-3"></div>
          </div>
        </form>
      </Fieldset>
    </div>
  );
};

export default ModificarDatosForm;
