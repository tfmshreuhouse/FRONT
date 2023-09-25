import { Fragment } from 'react';

import { Button } from 'primereact/button';

import { useNavigate } from 'react-router-dom';

function AppRouteDirectory(props: any) {

    const navigate = useNavigate();

    const items = [
        {
            nombreRuta: "Dashboard",
            detallesRuta: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum reprehenderit explicabo et esse ipsum error vero velit quos eligendi mollitia culpa deserunt dolor voluptatibus ex dolorem dolores debitis, veritatis quaerat.",
            ruta: "/inicio/dashboard",
            idRuta: "/inicio/dashboard"
        },
        {
            nombreRuta: "Reportes",
            detallesRuta: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum reprehenderit explicabo et esse ipsum error vero velit quos eligendi mollitia culpa deserunt dolor voluptatibus ex dolorem dolores debitis, veritatis quaerat.",
            ruta: "/inicio/reportes",
            idRuta: "/inicio/reportes"
        },
    ];

    return (
        <Fragment>
            <div className="surface-0">
                <div className="font-medium text-3xl text-900 mb-3">Directorio de App Route</div>
                <div className="text-700 mb-5">Pareciera que estas perdido. Estos son los posibles menus dentro de Inicio.</div>
                <ul className="list-none p-0 m-0">
                {items.map((item) => { return <li key={item.idRuta} className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                        <div className="text-900 w-6 md:w-2 font-bold">{item.nombreRuta}</div>
                        <div className="text-700 w-full md:w-8 md:flex-order-0 flex-order-1">{item.detallesRuta}</div>
                        <div className="w-6 md:w-2 flex justify-content-end">
                            <Button label="Ir" icon="pi pi-external-link" className="p-button-text" onClick={() => {navigate(item.ruta);}} />
                        </div>
                    </li> })}
                </ul>
            </div>

        </Fragment>
    );
}

export default AppRouteDirectory;
