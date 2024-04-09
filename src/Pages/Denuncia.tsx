import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../index.css';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Fieldset } from 'primereact/fieldset';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import GeneralSuccessAlert from '../Components/Shared/GeneralSuccessAlert';
import ErrorAlert from '../Components/Shared/ErrorAlert ';
import { Message } from 'primereact/message';

const DenunciaView = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    motivo: '',
    justificacion: '',
    PublicacioneId: 1,
    UserId: 1
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [publicacionId, setPublicacionId] = useState<number | 0>(0);

  const token: string | null = localStorage.getItem('jwt');

  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);

  useEffect(() => {
    const urlParts = location.pathname.split('/');
    const idFromUrl = urlParts[urlParts.length - 1];
    setPublicacionId(Number(idFromUrl));
  }, [location.pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    setShowAlert(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const options = [
    { label: 'acoso', value: 'acoso' },
    { label: 'fraude', value: 'fraude' },
    { label: 'otro', value: 'otro' }
  ];

  const createDenuncia = async (formData: any) => {

    if (!token) {
        console.error('Token de autorización no encontrado en el localStorage');
        return;
    }
    
    if (!formData.motivo || !formData.justificacion) {
      setShowAlert(true);
      return;
    }

    try {
        debugger;
        const response = await axios.post(
            process.env.REACT_APP_API_URL + "/rest/denuncias",
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
        console.error('Error al enviar los datos de la denuncia: ', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const axiosTokenInfo = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      params: { token: localStorage.getItem('jwt') }
    });

    const responseAxiosTokenInfo = await axiosTokenInfo.get('/auth/Token/info');
    const tokenInfo = responseAxiosTokenInfo.data.data;
    formData.UserId = tokenInfo.userID;
    formData.PublicacioneId = publicacionId;
    formData.motivo = selectedOption;
    console.log(formData);
    createDenuncia(formData);    
  };

  const handleVolverClick = () => {
    navigate(-1);
  };

  const handleErrorAlertClose = () => {
    setFailure(false); 
  };

  const handleSuccessAlertClose = () => {
    setSuccess(false); 
    setFormData({
      ...formData,
      motivo: '',
      justificacion: ''
    });
    setSelectedOption('');
    navigate(-1);
  };

  const [selectedOption, setSelectedOption] = useState<string | ''>('');
  return (
    <div className="main-container">
      <Fieldset legend="Denunciar publicacion">
        <form onSubmit={handleSubmit}>
          <div className="p-fluid grid">
            <div className="field col-12 lg:col-2"></div>
            <div className="field col-12 lg:col-4">
                <label htmlFor="motivo" className="label-style">Motivo de Denuncia</label>
            </div>
            <div className="field col-12 lg:col-4">
              <Dropdown
                value={selectedOption} // Establece el valor seleccionado
                options={options}     // Establece las opciones
                onChange={(e) => {setSelectedOption(e.value); setShowAlert(false);}}
                optionLabel="label"
                placeholder="Selecione el motivo"
              />
            </div>
            <div className="field col-12 lg:col-2"></div>

            <div className="field col-12 lg:col-2"></div>
            <div className="field col-12 lg:col-4">
                <label htmlFor="justificacion" className="label-style">Justificación de la Denuncia</label>
            </div>
            <div className="field col-12 lg:col-4">
                <InputTextarea
                  name="justificacion"
                  className='text-area-div'
                  placeholder="Ingrese justificación"
                  value={formData.justificacion}
                  onChange={handleChange}
                  rows={5} 
                  cols={30}
                />
            </div>
            <div className="field col-12 lg:col-2"></div>
            {showAlert && (
              <>
                <div className="field col-12 lg:col-2"></div>
                <div className="field col-12 lg:col-8">
                  <Message severity="error" text="Debe completar ambos campos." />
                </div>
                <div className="field col-12 lg:col-2"></div>
              </>
            )}

            <div className="field col-12 lg:col-2"></div>
            <div className="field col-12 lg:col-4">
                <Button
                  type="submit"
                  label="Denunciar"
                  className="button-blue"
                />
            </div>
            <div className="field col-12 lg:col-4">
                <Button
                  type="submit"
                  icon="pi pi-times"
                  severity="danger"
                  label="Cancelar"
                  className="button-blue"
                  onClick={handleVolverClick}
                />
            </div>
            <div className="field col-12 lg:col-2"></div>
          </div>
        </form>
      </Fieldset>
      {success ? <GeneralSuccessAlert header="Creacion de denuncia" text='La denuncia fue creada exitosamente' onClose={handleSuccessAlertClose}/> : <div></div>}
      {failure && (
        <ErrorAlert
          header="Error al guardar denuncia"
          text="Por favor, complete todos los campos requeridos y vuelva a intentarlo mas tarde"
          onClose={handleErrorAlertClose}
        />
      )}

    </div>
  );
};

export default DenunciaView;