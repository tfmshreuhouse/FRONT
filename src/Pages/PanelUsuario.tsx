import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { DataViewLayoutOptions } from 'primereact/dataview';
import '../index.css';
import { Fieldset } from 'primereact/fieldset';
import axios from 'axios';
import ErrorAlert from '../Components/Shared/ErrorAlert ';
import { Paginator } from 'primereact/paginator';
import ModalConTabla from '../Components/Denuncias/ModalConTabla';
import GeneralSuccessAlert from '../Components/Shared/GeneralSuccessAlert';
import { useNavigate } from 'react-router-dom';

interface ImagnenesInmuebles {
  URL: string;
  status: number;
}

interface Inmueble {
  Nombre: string,
  Pais: string;
  Ciudad: string;
  Direccion: string;
  ImagnenesInmuebles: Array<ImagnenesInmuebles>;
  User: User;
}

interface Publicaciones {
  id: number,
  indicaciones: string;
  costo: number;
  moneda: string;
  PAX: number;
  descripcion: string;
  image: string;
  createdAt: string;
  cantidadReservas: number;
  InmuebleId: number;
  Inmueble: Inmueble;
  Reservas: Reserva[]
}

interface Reserva {
  id: number,
  status: number;
  fechaInicio: string;
  fechaFin: number;
  createdAt: string;
  UserId: number;
  User: User;
  estado: string | undefined;
}

interface User {
  id: number,
  nombres: string;
  apellidos: string;
  correo: string;
  perfil: string;
  status: number;
  telefono: string;
}

interface ColumnConfig {
  field: string;
  header: string;
}

interface DataItem {
  [key: string]: any;
}

const PanelUsuario = () => {

  const estaReserva:Map<number,string> = new Map();
  estaReserva.set(1, 'Solicitada por huesped');
  estaReserva.set(2, 'Aceptada por arrendador');
  estaReserva.set(3, 'Cancelada por arrendador');
  estaReserva.set(4, 'Cancelada por huesped');

  const [misReservas, setMisReservas] = useState([]);
  const [misSolicitudesReservas, setMisSolicitudesReservas] = useState([]);
  const [headerTabla, setHeaderTabla] = useState('');
  const [reservaData, setReservaData] = useState<Reserva[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const token: string | null = localStorage.getItem('jwt');
  const [first, setFirst] = useState(0); // Índice del primer elemento a mostrar
  const [rows, setRows] = useState(5); // Número de filas por página
  const [totalRecords, setTotalRecords] = useState(0); // Total de registros
  const [currentPage, setCurrentPage] = useState(0); // Página actual
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(0);
  const [textoExito, setTextoExito] = useState<string>('');
  const [reservaColumns, setReservaColumns] = useState<ColumnConfig[]>([{ field: 'User.nombres', header: 'Nombres' },
                                                                  { field: 'User.apellidos', header: 'Apellidos' },
                                                                  { field: 'User.correo', header: 'Correo' },
                                                                  { field: 'dias', header: 'Cantidad días' },
                                                                  { field: 'fechaInicio', header: 'Fecha Inicio' },
                                                                  { field: 'fechaFin', header: 'Fecha Fin' },
                                                                  { field: 'estado', header: 'Estado Reserva' }]);
  const handleAcceptReserva = async (reserva:Reserva) => {
    fetchPublicacionesReservas();
    setTextoExito('Se ha aceptado la reserva exitosamente');
    await updateReservaStatus(reserva.id, 2);
    // Aquí modificas los datos según la lógica de tu aplicación
    const updatedData = reservaData.map(item => {
      if (item.id === reserva.id) {
          return { ...item, status: 2, estado: estaReserva.get(2) }; // Cambia el valor de la columna
      }
      return item;
    });
    setReservaData(updatedData);
  };
  const navigate = useNavigate();

  const handleRejectReserva = async (reserva:Reserva) => {
    fetchPublicacionesReservas();
    setTextoExito('Se ha cancelado la reserva!');
    await updateReservaStatus(reserva.id, 3);
    // Aquí modificas los datos según la lógica de tu aplicación
    const updatedData = reservaData.map(item => {
      if (item.id === reserva.id) {
          return { ...item, status: 3, estado: estaReserva.get(3) }; // Cambia el valor de la columna
      }
      return item;
    });
    setReservaData(updatedData);
  };

  const handleIrInmuebe = async (inmuebleId: number) => {
    navigate(`/home/infoInmueble/1/${inmuebleId}/0`);
  };

  const handleReservaByUser = async (reserva:Reserva, status:number) => {
    if(status == 4){
      setTextoExito('Reserva cancelada!');
    } else {
      setTextoExito('Reserva reanudada!');
    }
    
    await updateReservaStatus(reserva.id, status);
    fetchPublicacionesReservas();
  };

  const actionButtonsReserva = [
    { icon: 'pi pi-check', onClick: handleAcceptReserva, className: 'p-button-success' },
    { icon: 'pi pi-times', onClick: handleRejectReserva, className: 'p-button-danger' }
  ];

  useEffect(() => { 
    fetchPublicacionesReservas();
  }, [first, rows]); // Se ejecuta cuando cambia el índice del primer elemento o el número de filas por página

  const fetchUserId = async () => {
    const axiosTokenInfo = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      params: { token: localStorage.getItem('jwt') }
    });

    const responseAxiosTokenInfo = await axiosTokenInfo.get('/auth/Token/info');
    const userId = responseAxiosTokenInfo.data.data;
    setUserId(userId.userID);
    return userId.userID;
  };

  const fetchPublicacionesReservas = async () => {
    try {

      let userId = await fetchUserId();

      const axiosTokenInfo = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const response = await axiosTokenInfo.get('/rest/reservas/mis-reservas?userId=' + userId);
      console.log(response.data.data);
      setMisReservas(response.data.data);

      const responseSolic = await axiosTokenInfo.get('/rest/reservas/reservas-en-mis-inmuebles?userId=' + userId);
      console.log(responseSolic.data.data);      
      setMisSolicitudesReservas(responseSolic.data.data);

    } catch (error) {
      console.error('Error fetching user data:', error);
      setFailure(true);
    }
  };

  const updateReservaStatus = async (reservaId: number, status: number) => {

    if (!token) {
        console.error('Token de autorización no encontrado en el localStorage');
        return;
    }
    
    try {
        debugger;
        const response = await axios.put(
            process.env.REACT_APP_API_URL + "/rest/reservas/status?id=" + reservaId + "&status=" + status,
            {},
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
        console.error('Error al actualizar estado de la reserva: ', error);
    }
  };

  const toggleModal = async (publicacion:Publicaciones) => {
    setHeaderTabla("Reservas en " + publicacion.Inmueble.Nombre + " - " + publicacion.descripcion);
    const updatedData = publicacion.Reservas.map(item => {
      return { ...item, estado: estaReserva.get(item.status) };
    });
    setReservaData(updatedData);
    setShowModal(!showModal);
  };

  const toggleModalVoid = () => {
    setShowModal(!showModal);setShowModal(!showModal);
  };

  const handleErrorAlertClose = () => {
    setFailure(false); 
  };

  const handleSuccessAlertClose = () => {
    setSuccess(false); 
  };

  const onPageChange = (event: { first: React.SetStateAction<number>; page: React.SetStateAction<number>; }) => {
    // Manejar el cambio de página
    setFirst(event.first); // Actualizar el índice del primer elemento
    setCurrentPage(event.page); // Actualizar la página actual
  };

  const renderListReservasEnMisInmuebles = (publicacion: Publicaciones) => (    
    <div className="field col-12 lg:col-12 publicacion-grid-item border-1 row">
      <h3>{publicacion.descripcion}</h3>
      <div className="field col-12 lg:col-2" style={{ marginTop: '12px', height:'150px' }}>
        <img 
          src={`${publicacion.Inmueble.ImagnenesInmuebles?.[0]?.URL}`} 
          alt={publicacion.Inmueble.Nombre} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
      <div className="field col-12 lg:col-8">        
        <div className="publicacion-name">{publicacion.indicaciones}</div>
        <div className="publicacion-description"><b>PAX: </b> {publicacion.PAX}</div>
        <p><i className="pi pi-dollar" /><span className="publicacion-category">{publicacion.costo + " " + publicacion.moneda}</span></p>
        <p><i className="pi pi-calendar" /><span className="publicacion-category"><b> Cantidad de reservas: </b>{publicacion.Reservas.length}</span></p>
      </div>
      <div className="field col-12 lg:col-2 d-flex flex-column justify-content-between">
        <div style={{ marginBottom: '8px' }}>
          <Button type="submit" className="button-blue" label="Ver Reservas" icon="pi pi-calendar" onClick={() => toggleModal(publicacion)}/>
        </div>
      </div>
    </div>
  );

  const renderListMisReservas = (publicacion: Publicaciones) => (
    <div className="field col-12 lg:col-12 publicacion-grid-item border-1 row">
      {publicacion.Reservas.map(reserva => (
      <React.Fragment key={reserva.id}>
        <h3>{publicacion.Inmueble.Nombre}</h3>
        <div className="field col-12 lg:col-2" style={{ marginTop: '12px', height:'150px' }}>
          <img 
            src={`${publicacion.Inmueble.ImagnenesInmuebles?.[0]?.URL}`} 
            alt={publicacion.Inmueble.Nombre} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        <div className="field col-12 lg:col-4">        
          <div className="publicacion-name"><p>{publicacion.descripcion}</p></div>
          <div className="publicacion-description"><p><b>PAX: </b> {publicacion.PAX} - <b>Costo: </b> {publicacion.costo} {publicacion.moneda}</p></div>
          <p><i className="pi pi-user" /><span className="publicacion-category"><b> Arrendador</b> {publicacion.Inmueble.User.nombres} {publicacion.Inmueble.User.apellidos}</span></p>
          <p><i className="pi pi-inbox" /><span className="publicacion-category"><b> Correo del arrendador:</b> {publicacion.Inmueble.User.correo}</span></p>
          <p><i className="pi pi-phone" /><span className="publicacion-category"><b> Telefono del arrendador:</b> {publicacion.Inmueble.User.telefono}</span></p>
        </div>
        <div className="field col-12 lg:col-4"> 
          <p><i className="pi pi-calendar" /><span className="publicacion-category"><b> Fecha reservada: </b>{reserva.fechaInicio} / {reserva.fechaFin}</span></p>
          <p><i className="pi pi-calendar" /><span className="publicacion-category"><b> Fecha de la reserva: </b>{reserva.createdAt}</span></p>
          <p><i className="pi pi-calendar" /><span className="publicacion-category"><b> Estado: </b>{estaReserva.get(reserva.status)}</span></p>
        </div>
        <div className="field col-12 lg:col-2 d-flex flex-column justify-content-between">
          <div style={{ marginBottom: '8px' }}>
            <Button type="button" className="button-blue" label="Volver a reservar" icon="pi pi-calendar" onClick={() => handleIrInmuebe(publicacion.InmuebleId)}/>
            <br/><br/>
            <Button type="submit" className="button-blue" severity="danger" disabled={!(reserva.status === 1)} label="Cancelar" onClick={() => handleReservaByUser(reserva, 4)} icon="pi pi-times" />
          </div>
        </div>
      </React.Fragment>
      ))}
  </div>
    
  );
  

  return (
    <div className="main-container">
      <Fieldset legend="Mis Reservas" toggleable>
        <p className="m-0">
              <DataView value={misReservas} layout={'grid'} itemTemplate={renderListMisReservas} />
        </p>
      </Fieldset>
      <Paginator
        first={first} // Índice del primer elemento a mostrar
        rows={rows} // Número de filas por página
        totalRecords={totalRecords} // Total de registros
        onPageChange={onPageChange} // Función de cambio de página
        pageLinkSize={5} // Tamaño del enlace de página
        rowsPerPageOptions={[5, 10, 20]} // Opciones de número de filas por página
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} publicaciones" // Plantilla para el reporte de la página actual
      />

      <Fieldset legend="Solicitudes de reservas en mis publicaciones" toggleable>
        <p className="m-0">
              <DataView value={misSolicitudesReservas} layout={'grid'} itemTemplate={renderListReservasEnMisInmuebles} />
        </p>
      </Fieldset>
      <Paginator
        first={first} // Índice del primer elemento a mostrar
        rows={rows} // Número de filas por página
        totalRecords={totalRecords} // Total de registros
        onPageChange={onPageChange} // Función de cambio de página
        pageLinkSize={5} // Tamaño del enlace de página
        rowsPerPageOptions={[5, 10, 20]} // Opciones de número de filas por página
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} publicaciones" // Plantilla para el reporte de la página actual
      />

      {failure && (
        <ErrorAlert
          header="Error"
          text="No se pudo realizar la operación, vuelva a intentarlo mas tarde"
          onClose={handleErrorAlertClose}
        />
      )}
      {/* Modal component */}
      <ModalConTabla
        visible={showModal} // Pass the state that controls the visibility of the modal
        onHide={toggleModalVoid} // Pass the function to toggle the modal visibility
        data={reservaData}
        columns={reservaColumns}
        header={headerTabla}
        actionButtons={actionButtonsReserva}
      />
      {success ? <GeneralSuccessAlert header="Operación exitosa" text={textoExito} onClose={handleSuccessAlertClose}/> : <div></div>}
  </div>
  );
};

export default PanelUsuario;
