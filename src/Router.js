import { createBrowserRouter } from "react-router-dom";
import Auth from './Pages/Auth'
import NuevaReserva from "./Pages/NuevaReserva";
import Layout from "./Pages/Layout";
import Inicio from "./Pages/Inicio";
import Home from "./Pages/Home";
import Perfil from "./Pages/Perfil";
import DetalleReserva from "./Pages/DetalleReserva";
import InfoInmueble from "./Pages/infoInmueble";
import Modificar from "./Pages/ModificarPerfil";
import Denuncia from "./Pages/Denuncia";
import Resena from "./Pages/Resenar";
import Inmuebles from "./Pages/MisInmuebles";
import Reservar from "./Pages/MiReservas";
import PanelUsuario from "./Pages/PanelUsuario";
import EditInmueble from "./Pages/editInmueble";
import PanelAdmin from "./Pages/PanelAdmin";
import Notificacion from "./Pages/Notificacion";

    const router = createBrowserRouter([
        {
          path: "/",
          element: <Layout validarInicio={"1"} componentToRender={<Inicio/>}></Layout>,
          exact: true,
        },
        {
          path: "/login",
          element: <Auth></Auth>,
          exact: true,
        },
        {
          path: "/home",
          element: <Layout validarInicio={"1"} componentToRender={<Home />}></Layout>,
          exact: true,
        },
        {
          exact: true,
        },
        {
          path: "/home/infoInmueble/:tipo/:id/:reservaId",
          element: <Layout validarInicio={"1"} componentToRender={<InfoInmueble />}></Layout>,
          exact: true,
        },
        
        {
          path: "/home/infoInmueble/crear",
          element: <Layout componentToRender={<EditInmueble />}></Layout>,
          exact: true,
        },
        {
          path: "/home/infoInmueble/editar/:id",
          element: <Layout componentToRender={<EditInmueble />}></Layout>,
          exact: true,
        },
        {
          path: "/notificacion/:id",
          element: <Layout componentToRender={<Notificacion />}></Layout>,
          exact: true,
        },
        {
          path: "/home/infoInmueble/denuncia/:id",
          element: <Layout componentToRender={<Denuncia />}></Layout>,
          exact: true,
        },
        {
          path: "/home/infoInmueble/resena/:id",
          element: <Layout componentToRender={<Resena />}></Layout>,
          exact: true,
        },
        {
          path: "/home/infoInmueble/nuevaReserva/:id",
          element: <Layout componentToRender={<NuevaReserva />}></Layout>,
          exact: true,
        },
        {
          path: "/perfil",
          element:  <Layout componentToRender={<Perfil />}></Layout>,
          exact: true,
        },        
        {
          path: "/perfil/modificar",
          element: <Layout componentToRender={<Modificar/>}></Layout>,
          exact: true,
        },
        {
          path: "/perfil/historialPublicaciones/",
          element: <Layout componentToRender={<Inmuebles />}></Layout>,
          exact: true,
        },
        {
          path: "/perfil/historialReservas",
          element: <Layout componentToRender={<Reservar />}></Layout>,
          exact: true,
        },
        {
          path: "/perfil/panel",
          element: <Layout componentToRender={<PanelUsuario />}></Layout>,
          exact: true,
        },
        {
          path: "/panel-administrador",
          element: <Layout componentToRender={<PanelAdmin></PanelAdmin>} validarPrograma={true} nombrePrograma="PanelAdmin"></Layout>,
          exact: true,
        }
      ]);

export default router;

/*{
          path: "/home/infoInmueble/:tipo/:id",
          element: <InfoInmueble />,
          exact: true,
        },*/