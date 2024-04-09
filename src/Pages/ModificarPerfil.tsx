import React, { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import GeneralSuccessAlert from '../Components/Shared/GeneralSuccessAlert';
import ErrorAlert from '../Components/Shared/ErrorAlert ';
const ModificarDatosForm: React.FC = () => {
  
  interface User {
    nombres: string;
    apellidos: string;
    telefono: string;
    correo: string;
    UserId:number;
  }

  interface UserPass {
    actual: string;
    password: string;
    passwordConfird: string;
    correo: string;
    UserId:number;
  }
  const navigate = useNavigate();
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [failureA, setFailureA] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    nombres: '',
    apellidos: '',
    telefono: '',
    correo: '',
    UserId: 1
  });
  const [userPass, setUserPass] = useState<UserPass>({
    actual: '',
    password: '',
    passwordConfird: '',
    correo: '',
    UserId: 1
  });
  const token: string | null = localStorage.getItem('jwt');
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
        userPass.correo = userData.correo;
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

  const handleInputChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserPass((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleSuccessAlertClose = () => {
    navigate(-1);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const axiosTokenInfo = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      params: { token: localStorage.getItem('jwt') }
    });
    const responseAxiosTokenInfo = await axiosTokenInfo.get('/auth/Token/info');
    const tokenInfo = responseAxiosTokenInfo.data.data;

    user.UserId = tokenInfo.userID;
    try {
        const responsePublicaion = await axios.put(
        process.env.REACT_APP_API_URL + "/auth/UpdateUser",
        user,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

      setSuccess(true);
      return responsePublicaion;
  } catch (error) {
      setFailure(true);
      console.error('Error al enviar los datos de la reseña: ', error);
  }
  };
  const handleSubmitPass = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("hola");
    console.log(userPass);
    if (userPass.password !== userPass.passwordConfird) {
      setFailureA(true);
    } else {
      const axiosTokenInfo = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      params: { token: localStorage.getItem('jwt') }
      });
      const responseAxiosTokenInfo = await axiosTokenInfo.get('/auth/Token/info');
      const tokenInfo = responseAxiosTokenInfo.data.data;

      userPass.UserId = tokenInfo.userID;
      try {
          const responsePublicaion = await axios.put(
          process.env.REACT_APP_API_URL + "/auth/UpdatePass",
          userPass,
          {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
      );

        setSuccess(true);
        return responsePublicaion;
    } catch (error) {
        setFailure(true);
        console.error('Error al enviar los datos de la reseña: ', error);
    }
  }
  };
  const handleVolverClick = () => {
    navigate(-1);
  };
  const handleErrorAlertClose = () => {
    setFailure(false); 
  };
  return (
    <div className="main-container">
      <Fieldset legend="Actualizar mis datos" toggleable>
        <form onSubmit={handleSubmit}>
        <div className="p-fluid grid">
            <div className="field col-12 lg:col-2"></div>
            <div className="field col-12 lg:col-8">
              <div className="field col-12 lg:col-12">
                <span className="p-float-label">
                  <InputText 
                    name="nombres" 
                    placeholder="nombres" 
                    value={user.nombres} 
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="nombres">Nombres</label>
                </span>
              </div>
              <div className="field col-12 lg:col-12">
                <span className="p-float-label">
                  <InputText 
                    name="apellidos" 
                    placeholder="apellidos" 
                    value={user.apellidos} 
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="apellidos">Apellidos</label>
                </span>
              </div>
              <div className="field col-12 lg:col-12">
                <span className="p-float-label">
                  <InputText 
                    name="telefono" 
                    placeholder="telefono" 
                    value={user.telefono} 
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="telefono">Teléfono</label>
                </span>
              </div>
              <div className="field col-12 lg:col-12">
                <span className="p-float-label">
                  <InputText  
                    name="correo" 
                    placeholder="correo" 
                    value={user.correo} 
                    onChange={handleInputChange}
                    readOnly={true}
                  />
                   <label htmlFor="correo">Correo</label>
                </span>
              </div>
            </div>
            <div className="field col-12 lg:col-3"></div>
            <div className="field col-12 lg:col-3">
              <Button
                type="submit"
                icon="pi pi-user"
                label="Actualizar"
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

      <Fieldset legend="Modificar mi contraseña" toggleable>
        <form onSubmit={handleSubmitPass}>
        <div className="p-fluid grid">
            <div className="field col-12 lg:col-2"></div>
            <div className="field col-12 lg:col-8">
              <div className="field col-12 lg:col-12">
                <span className="p-float-label">
                  <InputText 
                    name="actual" 
                    placeholder="actual" 
                    type='password'
                    onChange={handleInputChangePass}
                    required
                  />
                  <label htmlFor="actual">Contraseña actual</label>
                </span>
              </div>
              <div className="field col-12 lg:col-12">
                <span className="p-float-label">
                  <InputText
                    id="password"
                    name="password"
                    type='password'
                    onChange={handleInputChangePass}
                    required
                  />
                  <label htmlFor="inputtext">Nueva contraseña</label>
                </span>
              </div>
              <div className="field col-12 lg:col-12">
                <span className="p-float-label">
                <InputText
                  id="passwordConfird"
                  name="passwordConfird"
                  type='password'
                  onChange={handleInputChangePass}
                  required
                />
                  <label htmlFor="inputtext">Confirmar contraseña</label>
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
      {success ? <GeneralSuccessAlert header="Actualizacion de datos" text='Datos actualizados exitosamente' onClose={handleSuccessAlertClose}/> : <div></div>}
      {failure && (
        <ErrorAlert
          header="Error al actualizar datos"
          text="Por favor intentelo nuevamente"
          onClose={handleErrorAlertClose}
        />
      )}
      {failureA && (
        <ErrorAlert
          header="Error al actualizar datos"
          text="Las contraseñas no coniciden"
          onClose={handleErrorAlertClose}
        />
      )}
    </div>
  );
};

export default ModificarDatosForm;
