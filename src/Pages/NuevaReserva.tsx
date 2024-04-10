import React, { useState, useEffect } from 'react';
import { Fieldset } from 'primereact/fieldset';
import { Calendar } from 'primereact/calendar';
import { useTranslation } from 'react-i18next';
import { CalendarChangeEvent } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GeneralSuccessAlert from '../Components/Shared/GeneralSuccessAlert';
import ErrorAlert from '../Components/Shared/ErrorAlert ';
import axios, { AxiosError } from "axios";

interface ErrorData {
  error: {message:string;};
  success: boolean;
}

interface ErrorResponse {
  data : ErrorData;
  code: string;
  message: string;
}

function NuevaReserva() {
  const { t } = useTranslation();
  const [FechaInicio, setDateInicio] = useState<Date | undefined>(undefined);
  const [FechaFin, setDateFin] = useState<Date | Date[] | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const token: string | null = localStorage.getItem('jwt');
  const navigate = useNavigate();
  const { id } = useParams();

  const [Nombre, setNombre] = useState('');
  const [Precio, setPrecio] = useState<string>("");
  const [tipoInmueble, setTipoInmueble] = useState(null);
  const [datosUserName, setDatosUserName] = useState(null);
  const [datosUserApellido, setDatosUserApellido] = useState(null);
  const [datosUserId, setDatosUserId] = useState(null);
  const [Direccion, setDireccion] = useState('');
  const [Images, setImages] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [idpublicacion, setIdPublicacion] = useState<number | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [errorAlertText, setErrorAlertText] = useState<string>("");
  const [formData, setFormData] = useState({
    status: 1,
    PublicacioneId: '',
    UserId: 1,
    fechaInicio: '',
    fechaFin: ''
  });
  const currentDate: Date = new Date();
  const [formNotificacion, setFormNotificacion] = useState<{
    text: string;
    UserId: number | null; 
    titulo: string;
    fecha: string;
  }>({
    text: '',
    UserId: 1,
    titulo: 'Uno de tus inmuebles tiene una nueva reserva',
    fecha: currentDate.toISOString() 
  });
  
  const [formDataPublicacion, setFormDataPublicacion] = useState({
    status: 2,
    id: '',
    Inmuebles: id
  });
  const handleErrorAlertClose = () => {
    setFailure(false); 
  };
  const handleSuccessAlertClose = () => {
    navigate(-1);
  };
  useEffect(() => {
    const obtenerDatosTipoInmueble = async () => {
      try {
        if (!token) {
          console.error('Token de autorización no encontrado en el localStorage');
          return;
        }
        const axiosTokenInfo = axios.create({
          baseURL: process.env.REACT_APP_API_URL,
          params: { token: localStorage.getItem('jwt') }
        });

        const response = await axiosTokenInfo.get("/rest/inmuebles/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setNombre(response.data.data.Nombre);
        setDireccion(response.data.data.Direccion);
        setTipoInmueble(response.data.data.TiposInmueble.tipo);
        setSelectedCountry(response.data.data.Pais);
        setSelectedCity(response.data.data.Ciudad);
        setDatosUserName(response.data.data.User.nombres);
        setDatosUserApellido(response.data.data.User.apellidos);
        setDatosUserId(response.data.data.UserId);
        const responseimg = await axiosTokenInfo.get("/rest/ImagnenesInmuebles/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const images = responseimg.data.data.map((image: any) => image.URL);
        setImages(images);

        const responsePubc = await axiosTokenInfo.get("/rest/publicacion/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setPrecio(responsePubc.data.data.costo + " " + responsePubc.data.data.moneda);
        setIdPublicacion(responsePubc.data.data.id);
      } catch (error) {
        console.error('Error al cargar tipos de inmueble:', error);
      }
    };
    obtenerDatosTipoInmueble();
  }, []);


  const ChangeInicio = (e: CalendarChangeEvent) => {
    setDateInicio(e.value as Date);
  };

  const ChangeFin = (e: CalendarChangeEvent) => {
    setDateFin(e.value as Date | Date[]);
  };

  const GuardarReserva = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      console.error('Token de autorización no encontrado en el localStorage');
      return;
    }
    if (!FechaInicio || !FechaFin) {
      setShowAlert(true);
      return;
    }
    const axiosTokenInfo = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      params: { token: localStorage.getItem('jwt') }
    });
    const responseAxiosTokenInfo = await axiosTokenInfo.get('/auth/Token/info');
    const tokenInfo = responseAxiosTokenInfo.data.data;
    formData.UserId = tokenInfo.userID;
    formData.PublicacioneId = idpublicacion ? idpublicacion.toString() : '';
    formData.fechaInicio =  FechaInicio.toString();
    formData.fechaFin =  FechaFin.toString();
    formDataPublicacion.id = idpublicacion ? idpublicacion.toString() : '';
    formNotificacion.UserId=datosUserId;
    formNotificacion.fecha= currentDate.toISOString() ;
    formNotificacion.text=datosUserName+' '+datosUserApellido+' tienes una reserva en tu '+ tipoInmueble+ ' '+Nombre+', puedes aceptarla o rechazarla.';
    createReserva(formData); 
  };

  const createReserva = async (formData: any) => {

    if (!token) {
        console.error('Token de autorización no encontrado en el localStorage');
        return;
    }
    
    try {
        const response = await axios.post(
            process.env.REACT_APP_API_URL + "/rest/reservas",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const responsePublicaion = await axios.patch(
          process.env.REACT_APP_API_URL + "/rest/publicacion",
          formDataPublicacion,
          {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
      );
      const notificacion = await axios.post(
        process.env.REACT_APP_API_URL + "/rest/notificaciones",
        formNotificacion,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
      );
        setSuccess(true);
        return responsePublicaion;
    } catch (error) {
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
  };

  const handleVolverClick = () => {
    navigate(-1);
  };
  const cardStyle: React.CSSProperties = {
    width: "100%",
    height: "250px"
  };
  return (
    <div className="main-container">
      <Fieldset legend={t('Reservar')}>
        <div className="p-fluid grid">
          <div className="field col-12 lg:col-1"></div>
          <div className="field col-12 lg:col-4">
            <div className="card">
              <img className="imagen" src={Images[0]} alt="Propiedad" style={cardStyle} />
              <div className="card-body">
                <p className="card-text">{Nombre}</p>
                <p className="card-text">{tipoInmueble}</p>
                <p className="card-text">{Precio}</p>
                <p className="card-text">{Direccion}</p>
                <p className="card-text">{selectedCountry}, {selectedCity}</p>
              </div>
            </div>
          </div>
          <div className="field col-12 lg:col-6">
            <form onSubmit={GuardarReserva}>
              <div className="p-fluid grid">
                <div className="field col-12 lg:col-12"></div>
                <div className="field col-12 lg:col-6">
                  <span className="p-float-label">
                    <Calendar value={FechaInicio} onChange={ChangeInicio} dateFormat="dd/mm/yy" minDate={new Date()}/>
                    <label htmlFor="inicio">Fecha inicio</label>
                  </span>
                </div>
                <div className="field col-12 lg:col-6">
                  <span className="p-float-label">
                    <Calendar value={FechaFin} onChange={ChangeFin} dateFormat="dd/mm/yy" minDate={FechaInicio}/>
                    <label htmlFor="inicio">Fecha fin</label>
                  </span>
                </div>
                <div className="field col-12 lg:col-2"></div>
                <div className="field col-12 lg:col-4">
                  <Button
                    type="submit"
                    label="Guardar"
                    icon="pi pi-check"
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
            {showAlert && (
              <Message severity="error" text="Debe seleccionar ambas fechas." />
            )}
          </div>
        </div>
      </Fieldset>
      {success ? <GeneralSuccessAlert header="Creacion de reserva" text='La reserva fue creada exitosamente' onClose={handleSuccessAlertClose}/> : <div></div>}
      {failure && (
        <ErrorAlert
          header="Error al guardar la reserva"
          text={errorAlertText}
          onClose={handleErrorAlertClose}
        />
      )}
    </div>
  );
}

export default NuevaReserva;
