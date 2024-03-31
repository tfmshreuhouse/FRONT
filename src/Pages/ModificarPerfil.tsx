import React, { useState, FormEvent } from 'react';
import InputField from '../Components/login/InputField';
import { Fieldset } from 'primereact/fieldset';
const ModificarDatosForm: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos enviados:', { nombre, apellido, edad, contrasena, ciudad, direccion });
    alert("datos ingresados exitosamente")
  };

  return (
    <div className="main-container">
      <Fieldset legend="Modificar mis datos">
        <form onSubmit={handleSubmit} style={{ textAlign: 'center', maxWidth: '400px', margin: 'auto' }}>
          <InputField label="Nombre" name="nombre" placeholder="Nombre" value={nombre} onChange={setNombre} />
          <InputField label="Apellido" name="apellido" placeholder="Apellido" value={apellido} onChange={setApellido} />
          <InputField label="Edad" name="edad" placeholder="Edad" value={edad} onChange={setEdad} />
          <InputField label="Contraseña" name="contrasena"  placeholder="Contraseña" value={contrasena} onChange={setContrasena} />
          <InputField label="Ciudad" name="ciudad" placeholder="Ciudad" value={ciudad} onChange={setCiudad} />
          <InputField label="Dirección" name="direccion" placeholder="Dirección" value={direccion} onChange={setDireccion} />
          {/* Agrega más campos según tus necesidades (email, teléfono, etc.) */}
          <div className="button-home">
            <button type="submit" className="my-button">
              Guardar Cambios
            </button>
          </div>
        </form>
      </Fieldset>
    </div>
  );
};

export default ModificarDatosForm;
