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
import axios from "axios";

function NuevaReserva() {
  const { t } = useTranslation();
  const [FechaInicio, setDateInicio] = useState<Date | Date[] | null>(null);
  const [FechaFin, setDateFin] = useState<Date | Date[] | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const token: string | null = localStorage.getItem('jwt');
  const navigate = useNavigate();
  const { id } = useParams();

  const [Nombre, setNombre] = useState('');
  const [Precio, setPrecio] = useState<number>(0);
  const [tipoInmueble, setTipoInmueble] = useState(null);
  const [Direccion, setDireccion] = useState('');
  const [Images, setImages] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [idpublicacion, setIdPublicacion] = useState<number | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    status: 1,
    PublicacioneId: '',
    UserId: 1,
    fechaInicio: '',
    fechaFin: ''
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
        setTipoInmueble(response.data.data.TiposInmueble.id);
        setSelectedCountry(response.data.data.Pais);
        setSelectedCity(response.data.data.Ciudad);
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

        setPrecio(responsePubc.data.data.costo);
        setIdPublicacion(responsePubc.data.data.id);
      } catch (error) {
        console.error('Error al cargar tipos de inmueble:', error);
      }
    };
    obtenerDatosTipoInmueble();
  }, []);


  const ChangeInicio = (e: CalendarChangeEvent) => {
    setDateInicio(e.value as Date | Date[]);
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

        setSuccess(true);
        return responsePublicaion;
    } catch (error) {
        setFailure(true);
        console.error('Error al enviar los datos de la reseña: ', error);
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
                <p className="card-text">{Precio} COP</p>
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
                    <Calendar value={FechaInicio} onChange={ChangeInicio} />
                    <label htmlFor="inicio">Fecha inicio</label>
                  </span>
                </div>
                <div className="field col-12 lg:col-6">
                  <span className="p-float-label">
                    <Calendar value={FechaFin} onChange={ChangeFin} />
                    <label htmlFor="inicio">Fecha fin</label>
                  </span>
                </div>
                <div className="field col-12 lg:col-4"></div>
                <div className="field col-12 lg:col-4">
                  <Button
                    type="submit"
                    label="Guardar"
                    icon="pi pi-check"
                  />
                </div>
              </div>
            </form>
            {showAlert && (
              <Message severity="error" text="Debe seleccionar ambas fechas." />
            )}
          </div>
          <div className="field col-12 lg:col-1"></div>
          <div className="field col-12 lg:col-5"></div>
          <div className="field col-12 lg:col-2">
            <Button
              type="button"
              icon="pi pi-angle-left"
              label="Volver"
              className="button-red"
              onClick={handleVolverClick}
            />
          </div>
        </div>
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
}

export default NuevaReserva;
