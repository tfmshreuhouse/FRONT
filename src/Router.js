import { createBrowserRouter } from "react-router-dom";
import Auth from './Pages/Auth'
import Dashboard from "./Pages/Dashboard";
import NuevaReserva from "./Pages/NuevaReserva";
import Layout from "./Pages/Layout";
import AppRouteDirectory from "./Pages/AppRouteDirectory";

    const router = createBrowserRouter([
        {
          path: "/",
          element: <Auth></Auth>,
          exact: true,
        },
        {
          path: "/inicio",
          element: <Layout validarPrograma={false} componentToRender={<AppRouteDirectory />}></Layout>,
          exact: true,
        },
        {
          path: "/inicio/dashboard",
          element: <Layout validarPrograma={false} componentToRender={<Dashboard />}></Layout>,
          exact: true,
        },
        {
          path: "/funcsBasicas/nuevaReserva",
          element: <Layout validarPrograma={true} nombrePrograma="Programa1" componentToRender={<NuevaReserva />}></Layout>,
          exact: true,
        },
      ]);

export default router;