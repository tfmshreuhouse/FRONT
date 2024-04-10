import { Fragment, useRef } from 'react';

import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MX, US, FR } from 'country-flag-icons/react/3x2'
import { HiOutlineHome } from "react-icons/hi";
import { BiSolidDashboard } from "react-icons/bi";
import { BsJournalBookmark, BsSortDownAlt, BsFillCalendar2WeekFill, BsBellFill } from "react-icons/bs"
import { FaScaleBalanced, FaMagnifyingGlass, FaChair, FaToggleOn } from "react-icons/fa6";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb"

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import i18next from 'i18next';
import { useTranslation } from "react-i18next";

const Navbar = (props: any) => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    };
    const logoInHandler = () => {
        navigate('/login');
    };
    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL, // Your API base URL
        //withCredentials: true,
        params: { token: localStorage.getItem('jwt') }
    });

    const logoutHandler = async () => {

        try {
            const response = await instance.get('/auth/logout');
            localStorage.removeItem('jwt');
            navigate('/');
        } catch (error: any) {
            console.log(error.response.data);
        }
    };
    const menuRight: any = useRef(null);
    const token = localStorage.getItem('jwt');
    let items: MenuItem[] = [];
    let end: JSX.Element;
    if (token) {
        items = [
            {
                label: t('navbarText3'),
                icon: <HiOutlineHome />,
                items: [
                    {
                        label: "Perfil",
                        icon: <BiSolidDashboard />,
                        command: () => { navigate('/perfil'); }
                    },
                    {
                        separator: true
                    },
                    {
                        label: "Panel administrador",
                        icon: <FaScaleBalanced />,
                        command: () => { navigate('/panel-administrador'); }
                    }
                ]
            },
            /* {
                label: t('navbarText6'),
                icon: <BsSortDownAlt />,
                items: [
                    {
                        label: t('navbarText7'),
                        icon: <BsJournalBookmark />,
                        command: () => { navigate('/funcsBasicas/nuevaReserva'); }
                    },
                    {
                        separator: true
                    },
                    {
                        label: t('navbarText8'),
                        icon: <FaMagnifyingGlass />,
                    },
                ]
            } */
        ];

        end = <Fragment>
                        <div className="card flex justify-content-center">
                            <Button 
                            label="Cerrar sesion" 
                            icon="pi pi-power-off" 
                            className="mr-2" 
                            aria-label="User" 
                            onClick={logoutHandler} 
                            aria-controls="popup_menu_right" 
                            aria-haspopup />
                        </div>
                    </Fragment>
    }else{
        end = <Fragment>
                        <div className="card flex justify-content-center">
                            <Button 
                            label="Iniciar Sesion" 
                            icon="pi pi-user" 
                            className="mr-2" 
                            aria-label="User" 
                            onClick={logoInHandler} 
                            aria-controls="popup_menu_right" 
                            aria-haspopup />
                        </div>
                    </Fragment>
    }
    const start = <img 
                    alt="logo" 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxByx-LL6YeQCZP13tRoS2LbcCNQKIgOboNA&usqp=CAU" 
                    height="40" 
                    className="mr-2"
                    onClick={handleLogoClick}
                    style={{ cursor: 'pointer' }}
                    >
                </img>;
    return (
        <Menubar model={items} start={start} end={end} />
    )
}

export default Navbar;