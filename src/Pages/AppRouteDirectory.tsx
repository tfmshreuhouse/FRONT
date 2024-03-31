import { Fragment } from 'react';

import { Button } from 'primereact/button';

import { useNavigate } from 'react-router-dom';

function AppRouteDirectory(props: any) {
    console.log("aca pasa");
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
            <div className="card" style={{width: '18rem'}}>
                <img src="..." className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>

        </Fragment>
    );
}

export default AppRouteDirectory;
