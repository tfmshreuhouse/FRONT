import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { Fieldset } from 'primereact/fieldset';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GeneralSuccessAlert from '../Components/Shared/GeneralSuccessAlert';
import ErrorAlert from '../Components/Shared/ErrorAlert ';

const ResenaView = () => {
  const { id } = useParams();
  const token: string | null = localStorage.getItem('jwt');
  const [rating, setValorResena] = useState<number>(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rating: '',
    descripcion: '',
    ReservaId: '',
    UserId: 1
  });
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSuccessAlertClose = () => {
    navigate('/home/infoInmueble/1/'+id);
  };
  
  const handleStarClick = (valor: number) => {
    setValorResena(valor);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(`Valor de la reseña: ${rating}`);
    e.preventDefault();
    const axiosTokenInfo = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      params: { token: localStorage.getItem('jwt') }
    });

    const responseAxiosTokenInfo = await axiosTokenInfo.get('/auth/Token/info');
    const tokenInfo = responseAxiosTokenInfo.data.data;
    formData.UserId = tokenInfo.userID;
    formData.ReservaId = id || '';
    formData.rating =  rating.toString();
    createResena(formData);   
  };
  
  const createResena = async (formData: any) => {

    if (!token) {
        console.error('Token de autorización no encontrado en el localStorage');
        return;
    }
    
    try {
        debugger;
        const response = await axios.post(
            process.env.REACT_APP_API_URL + "/rest/resenas",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setSuccess(true);
        return response;
    } catch (error) {
        setFailure(true);
        console.error('Error al enviar los datos de la reseña: ', error);
    }
  };

  const handleVolverClick = () => {
    navigate('/home/infoInmueble/1/'+id);
  };
  const handleErrorAlertClose = () => {
    setFailure(false); 
  };
  return (
    <div className="main-container">
      <Fieldset legend="Deja tu reseña">
        <form onSubmit={handleSubmit}>
          <div className="p-fluid grid">
            <div className="field col-12 lg:col-4"></div>
            <div className="field col-12 lg:col-6">
              <div className="estrellas" style={{ textAlign: 'center', fontSize: '70px' }}>
                {[1, 2, 3, 4, 5].map((numero) => (
                  <span
                    key={numero}
                    className={`estrella ${numero <= rating ? 'activa' : ''}`}
                    onClick={() => handleStarClick(numero)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="field col-12 lg:col-2"></div>

            <div className="field col-12 lg:col-2"></div>
            <div className="field col-12 lg:col-2">
              <label htmlFor="opinion" className="label-style">Opinión</label>
            </div>
            <div className="field col-12 lg:col-6" style={{ display: 'flex', alignItems: 'center' }}>
              <InputTextarea
                name="descripcion"
                className='text-area-div'
                placeholder="Ingrese su opinion"
                onChange={handleChange}
                required
                rows={5} 
                cols={30}
              />
            </div>
            <div className="field col-12 lg:col-2"></div>
            <div className="field col-12 lg:col-2"></div>
            <div className="field col-12 lg:col-4">
              <Button
                type="submit"
                label="Enviar Reseña"
                className="button-red"
              />
            </div>
            <div className="field col-12 lg:col-4">
              <Button
                type="button"
                icon="pi pi-angle-left"
                label="Volver"
                className="button-red"
                onClick={handleVolverClick}
              />
            </div>
            <div className="field col-12 lg:col-2"></div>
          </div>
        </form>
      </Fieldset>
      {success ? <GeneralSuccessAlert header="Creacion de reseña" text='La reseña fue creada exitosamente' onClose={handleSuccessAlertClose}/> : <div></div>}
      {failure && (
        <ErrorAlert
          header="Error al guardar reseña"
          text="Por favor, complete todos los campos requeridos y vuelva a intentarlo mas tarde"
          onClose={handleErrorAlertClose}
        />
      )}
    </div>
  );
};

export default ResenaView;
