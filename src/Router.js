import { createBrowserRouter } from "react-router-dom";
import Auth from './Pages/Auth'
import Dashboard from "./Pages/Dashboard";
import NuevaReserva from "./Pages/NuevaReserva";
import Layout from "./Pages/Layout";
import Inicio from "./Pages/Inicio";
import Home from "./Pages/Home";
import AppRouteDirectory from "./Pages/AppRouteDirectory";
import Perfil from "./Pages/Perfil";
import MisReservas from "./Pages/MisReservas";
import DetalleReserva from "./Pages/DetalleReserva";
import InfoInmueble from "./Pages/infoInmueble";
import Modificar from "./Pages/ModificarPerfil";
import Denuncia from "./Pages/Denuncia";
import Resena from "./Pages/Resenar";
import Inmuebles from "./Pages/MisInmuebles";
import Reservar from "./Pages/MiReservas";
import PanelUsuario from "./Pages/PanelUsuario";
import EditInmueble from "./Pages/editInmueble";

    const router = createBrowserRouter([
        {
          path: "/",
          element: <Inicio></Inicio>,
          exact: true,
        },
        {
          path: "/login",
          element: <Auth></Auth>,
          exact: true,
        },
        {
          path: "/home",
          element: <Home />,
          exact: true,
        },
        {
          exact: true,
        },
        {
          path: "/home/infoInmueble/:tipo/:id",
          element: <InfoInmueble />,
          exact: true,
        },
        
        {
          path: "/home/infoInmueble/editar",
          element: <Layout componentToRender={<EditInmueble />}></Layout>,
          exact: true,
        },
        {
          path: "/home/infoInmueble/editar/:id",
          element: <Layout componentToRender={<EditInmueble />}></Layout>,
          exact: true,
        },
        {
          path: "/home/infoInmueble/denuncia/:id",
          element: <Layout componentToRender={<Denuncia />}></Layout>,
          exact: true,
        },
        {
          path: "/home/infoInmueble/resena/:id",
          element: <Resena />,
          exact: true,
        },        
        {
          path: "/home/infoInmueble/denuncia/:id",
          element: <Denuncia />,
          exact: true,
        },
        {
          path: "/home/infoInmueble/nuevaReserva/:id",
          element: <Layout componentToRender={<NuevaReserva />}></Layout>,
          exact: true,
        },
        {
          path: "/perfil",
          element: <Perfil />,
          exact: true,
        },        
        {
          path: "/perfil/modificar/:id",
          element: <Layout componentToRender={<Modificar/>}></Layout>,
          exact: true,
        },
        {
          path: "/perfil/historialPublicaciones/:id",
          element: <Layout componentToRender={<Inmuebles />}></Layout>,
          exact: true,
        },
        {
          path: "/perfil/historialReservas/:id",
          element: <Layout componentToRender={<Reservar />}></Layout>,
          exact: true,
        },
        {
          path: "/perfil/panel/:id",
          element: <Layout componentToRender={<PanelUsuario />}></Layout>,
          exact: true,
        },
        {
          path: "/reservas",
          element: <Layout componentToRender={<MisReservas />}></Layout>,
          exact: true,
        },
        {
          path: "/detalles",
          element: <DetalleReserva></DetalleReserva>,
          exact: true,
        },
        {
          path: "/perfil/modificar/:id",
          element: <Modificar></Modificar>,
          exact: true,
        },
        {
          path: "/perfil/historialPublicaciones/:id",
          element: <Inmuebles />,
          exact: true,
        },
        {
          path: "/perfil/historialReservas/:id",
          element: <Reservar />,
          exact: true,
        },
        {
          path: "/perfil/panel/:id",
          element: <PanelUsuario />,
          exact: true,
        },
        {
          path: "/reservas",
          element: <Layout componentToRender={<MisReservas />}></Layout>,
          exact: true,
        },
        {
          path: "/detalles",
          element: <DetalleReserva></DetalleReserva>,
          exact: true,
        }
      ]);

export default router;

/*{
          path: "/home/infoInmueble/:tipo/:id",
          element: <InfoInmueble />,
          exact: true,
        },*/