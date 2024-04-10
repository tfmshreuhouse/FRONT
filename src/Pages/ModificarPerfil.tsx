import React, { useState, FormEvent, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import GeneralSuccessAlert from '../Components/Shared/GeneralSuccessAlert';
import ErrorAlert from '../Components/Shared/ErrorAlert ';
import * as yup from "yup";
import { useTranslation } from 'react-i18next';

const ModificarDatosForm: React.FC = () => {

  const { t } = useTranslation();
  
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

  interface ErrorData {
    error: {message:string;};
    success: boolean;
  }

  const navigate = useNavigate();
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [errorAlertText, setErrorAlertText] = useState<string>("");
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
  const [loadingPass, setLoadingPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string}>({});

  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;// min 8 max 15 characters, 1 upper case letter,  1 numeric digit and 1 special.

  const schema = yup.object().shape({
    password: yup
        .string()
        .min(9, "authYupErrorsText5")
        .max(15, "authYupErrorsText6")
        .matches(regexPassword, "authYupErrorsText7")
        .required("authYupErrorsText1")
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

  const handleInputChangePass = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserPass((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    let userPassVal = {
      ...userPass,
      [name]: value,
    }

    try {
      await schema.validate(userPassVal, { abortEarly: false });
      // Si la validación pasa, continúa con el envío del formulario
      console.log('Formulario válido, enviando...');
      setErrors({});
    } catch (err) {
      // Si hay errores de validación, actualiza el estado de los errores
      if (err instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach(error => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
    
  };
  const handleSuccessAlertClose = () => {
    navigate(-1);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
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
      setLoading(false);
      return responsePublicaion;
  } catch (error) {
      setFailure(true);
      setLoading(false);
      console.error('Error al enviar los datos de la reseña: ', error);
  }
  };
  const handleSubmitPass = async (e: FormEvent<HTMLFormElement>) => {
    setLoadingPass(true);
    e.preventDefault();
    console.log(userPass);
    if (userPass.password !== userPass.passwordConfird) {
      setErrorAlertText("La contraseña nueva no coincide con la contraseña de confirmación")
      setFailure(true);
      setLoadingPass(false);
      return;
    } else if (Object.keys(errors).length > 0) {
      setErrorAlertText("Verifique que la nueva contraseña cumpla con los requerimientos establecidos")
      setFailure(true);
      setLoadingPass(false);
      return;
    } else {
      const axiosTokenInfo = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      params: { token: localStorage.getItem('jwt') }
      });
      const responseAxiosTokenInfo = await axiosTokenInfo.get('/auth/Token/info');
      const tokenInfo = responseAxiosTokenInfo.data.data;

      let userPassData = {
        id: tokenInfo.userID,
        oldPassword: userPass.actual,
        newPassword: userPass.password
      }

      try {
          const responsePublicaion = await axios.put(
          process.env.REACT_APP_API_URL + "/auth/UpdatePass",
          userPassData,
          {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
      );

        setSuccess(true);
        setLoadingPass(false);
        return responsePublicaion;
    } catch (error) {
      setLoadingPass(false);
        let textError = "Por favor, verifique que todos los campos requeridos estén completos y vuelva a intentarlo más tarde";
        if (axios.isAxiosError(error)) {
          // Verificar si el error es un error de Axios
          const axiosError = error as AxiosError;
          if (axiosError.response) {
            console.log('Error de servidor:', axiosError.response.data);
            let errorData = axiosError.response.data as ErrorData;
            textError = errorData.error.message;
          } else if (axiosError.request) {
            // La solicitud se hizo pero no se recibió una respuesta
            textError = 'No hay respuesta del servidor';
          } else {
            textError = 'Error al enviar la solicitud, vuelva a intentarlo más tarde';
          }
        } else {
          // Manejar otros tipos de errores
          console.log('Otro tipo de error:', error);
        }
        setFailure(true);
        setErrorAlertText(textError);
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
                loading={loading}
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
                {errors.password && <small className="p-error">{t(errors.password)}</small>}
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
                loading={loadingPass}
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
          text={errorAlertText}
          onClose={handleErrorAlertClose}
        />
      )}
    </div>
  );
};

export default ModificarDatosForm;
