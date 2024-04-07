import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { Fieldset } from 'primereact/fieldset';

interface User {
  nombres: string;
  apellidos: string;
  telefono: string;
  correo: string;
}

function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosTokenInfo = axios.create({
          baseURL: process.env.REACT_APP_API_URL,
          params: { token: localStorage.getItem('jwt') }
        });

        const responseAxiosTokenInfo = await axiosTokenInfo.get('/auth/Token/info');
        const userId = responseAxiosTokenInfo.data.data;
        
        const responseAxiosUserInfo = await axiosTokenInfo.get(`auth/user/info/${userId.userID}`);
        const userData = responseAxiosUserInfo.data.data;
        
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar el formulario
    console.log(user);
  };

  const navigateToHistorialPublicaciones = () => {
    navigate('/perfil/historialPublicaciones/?from=perfil');
  };

  const navigateModificar = () => {
    navigate('/perfil/modificar/1');
  };

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
                    id="nombres"
                    name="nombres"
                    value={user.nombres}
                    onChange={handleInputChange}
                    readOnly={true}
                  />
                  <label htmlFor="nombres">Nombres</label>
                </span>
              </div>
              <div className="field col-12 lg:col-12">
                <span className="p-float-label">
                  <InputText
                    id="apellidos"
                    name="apellidos"
                    value={user.apellidos}
                    onChange={handleInputChange}
                    readOnly={true}
                  />
                  <label htmlFor="inputtext">Apellidos</label>
                </span>
              </div>
              <div className="field col-12 lg:col-12">
                <span className="p-float-label">
                  <InputText
                    id="telefono"
                    name="telefono"
                    value={user.telefono}
                    onChange={handleInputChange}
                    readOnly={true}
                  />
                  <label htmlFor="inputtext">Teléfono</label>
                </span>
              </div>
              <div className="field col-12 lg:col-12">
                <span className="p-float-label">
                  <InputText
                    id="correo"
                    name="correo"
                    value={user.correo}
                    onChange={handleInputChange}
                    readOnly={true}
                  />
                  <label htmlFor="correo">Correo</label>
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
