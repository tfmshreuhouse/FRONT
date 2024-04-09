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
}

interface Publicaciones {
  id: number,
  indicaciones: string;
  costo: number;
  PAX: number;
  descripcion: string;
  image: string;
  createdAt: string;
  cantidadUsuarios: number;
  cantidadDenuncias: number;
  InmuebleId: number;
  Inmueble: Inmueble;
}

interface Denuncias {
  id: number,
  motivo: string;
  justificacion: string;
  PublicacioneId: number;
  UserId: number;
  User: User;
}

interface User {
  id: number,
  nombres: string;
  apellidos: string;
  correo: string;
  perfil: string;
  status: number;
}

interface ColumnConfig {
  field: string;
  header: string;
}

interface DataItem {
  [key: string]: any;
}

const PanelAdmin = () => {

  const [publicaciones, setPublicaciones] = useState([]);
  const [headerTabla, setHeaderTabla] = useState('');
  const [dynamicData, setDynamicData] = useState([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const token: string | null = localStorage.getItem('jwt');
  const [first, setFirst] = useState(0); // Índice del primer elemento a mostrar
  const [rows, setRows] = useState(5); // Número de filas por página
  const [totalRecords, setTotalRecords] = useState(0); // Total de registros
  const [currentPage, setCurrentPage] = useState(0); // Página actual
  const [showModal, setShowModal] = useState(false);
  const [denunciaColumns, setDenunciaColumns] = useState<ColumnConfig[]>([{ field: 'motivo', header: 'Motivo' },
                                                                          { field: 'justificacion', header: 'Justificación' },
                                                                          { field: 'User.nombres', header: 'Nombres Usuario' },
                                                                          { field: 'User.apellidos', header: 'Apellidos Usuario' },
                                                                          { field: 'User.correo', header: 'Correo Usuario' }]);

  const [userColumns, setUserColumns] = useState<ColumnConfig[]>([{ field: 'User.nombres', header: 'Nombres' },
                                                                  { field: 'User.apellidos', header: 'Apellidos' },
                                                                  { field: 'User.correo', header: 'Correo' },
                                                                  { field: 'User.perfil', header: 'Perfil' },
                                                                  { field: 'totalDenuncias', header: 'Total Denuncias' }]);

  const [dynamicColumns, setDynamicColumns] = useState<ColumnConfig[]>([]);


  useEffect(() => { 
    fetchPublicacionesDenunciadas();
  }, [first, rows]); // Se ejecuta cuando cambia el índice del primer elemento o el número de filas por página

  const fetchPublicacionesDenunciadas = async () => {
    try {
      const axiosTokenInfo = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const response = await axiosTokenInfo.get('/rest/denuncias/publicaciones');
      console.log(response.data.data);      
      setPublicaciones(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setFailure(true);
    }
  };

  const fetchDenunciadasFilter = async (publicacioneId:number) => {
    try {
      const axiosTokenInfo = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = await axiosTokenInfo.get('/rest/denuncias/filter?publicacioneId=' + publicacioneId);
      console.log(response.data.data);      
      setDynamicData(response.data.data);
      setDynamicColumns(denunciaColumns);
    } catch (error) {
      console.error('Error fetching denuncias data:', error);
      setFailure(true);
    }
  };

  const fetchUsuariosConDenunciasFilter = async (publicacioneId:number) => {
    try {
      const axiosTokenInfo = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = await axiosTokenInfo.get('/rest/denuncias/usuarios/publicacion?publicacioneId=' + publicacioneId);
      console.log(response.data.data);      
      setDynamicData(response.data.data);
      setDynamicColumns(userColumns);
    } catch (error) {
      console.error('Error fetching denuncias data:', error);
      setFailure(true);
    }
  };

  const updatePublicacionStatus = async (publicacionId: number) => {

    if (!token) {
        console.error('Token de autorización no encontrado en el localStorage');
        return;
    }
    
    try {
        debugger;
        const response = await axios.put(
            process.env.REACT_APP_API_URL + "rest/publicacion/status?id=" + publicacionId + "&status=0",
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
        console.error('Error al enviar los datos de la denuncia: ', error);
    }
  };

  const toggleModal = async (tipoDato:string, publicacionId:number) => {
    if(tipoDato === 'DENUNCIAS'){      
      await fetchDenunciadasFilter(publicacionId);
      setHeaderTabla('Lista de denuncias');
    } else if (tipoDato === 'USUARIOS'){
      fetchUsuariosConDenunciasFilter(publicacionId);
      setHeaderTabla('Lista de usuarios');
    }
    setShowModal(!showModal);
  };

  const toggleModalVoid = () => {
    setShowModal(!showModal);
  };

  const handleErrorAlertClose = () => {
    setFailure(false); 
  };

  const handleSuccessAlertClose = () => {
    setSuccess(false); 
    fetchPublicacionesDenunciadas();
  };

  const bajarPublicacion = (publicacionId:number) => {
    updatePublicacionStatus(publicacionId);
  };

  const onPageChange = (event: { first: React.SetStateAction<number>; page: React.SetStateAction<number>; }) => {
    // Manejar el cambio de página
    setFirst(event.first); // Actualizar el índice del primer elemento
    setCurrentPage(event.page); // Actualizar la página actual
  };

  const renderListItem = (publicacion: Publicaciones) => (
    <div className="field col-12 lg:col-12 publicacion-grid-item border-1 row">
      <h3>{publicacion.descripcion}</h3>
      <div className="field col-12 lg:col-2" style={{ marginTop: '12px' }}>
        <img 
          src={`${publicacion.Inmueble.ImagnenesInmuebles[0].URL}`} 
          alt={publicacion.Inmueble.Nombre} 
          style={{ width: '100%', height: 'auto' }} 
        />
      </div>
      <div className="field col-12 lg:col-7">        
        <div className="publicacion-name">{publicacion.indicaciones}</div>
        <div className="publicacion-description"><b>PAX: </b> {publicacion.PAX}</div>
        <p><i className="pi pi-dollar" /><span className="publicacion-category">{publicacion.costo}</span></p>
        <p><i className="pi pi-flag-fill" /><span className="publicacion-category"><b> Cantidad de denuncias: </b>{publicacion.cantidadDenuncias}</span></p>
        <p><i className="pi pi-users" /><span className="publicacion-category"><b> Cantidad de usuarios denunciantes: </b>{publicacion.cantidadUsuarios}</span></p>
      </div>
      <div className="field col-12 lg:col-3 d-flex flex-column justify-content-between">
        <div style={{ marginBottom: '8px' }}>
          <Button type="submit" className="button-blue" label="Ver denuncias" icon="pi pi-flag" onClick={() => toggleModal('DENUNCIAS', publicacion.id)}/>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <Button type="submit" className="button-blue" label="Ver Usuarios" icon="pi pi-users" onClick={() => toggleModal('USUARIOS', publicacion.id)}/>
        </div>
        <div >
          <Button type="submit" className="button-blue" severity="danger" label="Dar de baja" onClick={() => bajarPublicacion(publicacion.id)} icon="pi pi-times" />
        </div>
      </div>
    </div>
  );
  

  return (
    <div className="main-container">
      <Fieldset legend="Publicaciones con denuncias" toggleable>
        <p className="m-0">
              <DataView value={publicaciones} layout={'grid'} itemTemplate={renderListItem} />
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
          header="Error al cargar los datos"
          text="Por favor, vuelva a intentarlo mas tarde, recargando la pagina"
          onClose={handleErrorAlertClose}
        />
      )}
      {/* Modal component */}
      <ModalConTabla
        visible={showModal} // Pass the state that controls the visibility of the modal
        onHide={toggleModalVoid} // Pass the function to toggle the modal visibility
        data={dynamicData}
        columns={dynamicColumns}
        header={headerTabla}
        actionButtons={[]}
      />
      {success ? <GeneralSuccessAlert header="Operación exitosa" text='La publicación fue dada de baja exitosamente' onClose={handleSuccessAlertClose}/> : <div></div>}
  </div>
  );
};

export default PanelAdmin;
