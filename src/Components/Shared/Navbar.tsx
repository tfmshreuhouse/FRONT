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

    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL, // Your API base URL
        //withCredentials: true,
        params: { token: localStorage.getItem('jwt') }
    });

    const logoutHandler = async () => {

        try {
            const response = await instance.get('/auth/logout');
            console.log(response.data.data)
            localStorage.removeItem('jwt');
            navigate('/');
        } catch (error: any) {
            console.log(error.response.data);
        }
    };

    const items: MenuItem[] = [
        {
            label: t('navbarText3'),
            icon: <HiOutlineHome />,
            items: [
                {
                    label: t('navbarText4'),
                    icon: <BiSolidDashboard />,
                    command: () => { navigate('/inicio/dashboard'); }
                },
                {
                    separator: true
                },
                {
                    label: t('navbarText5'),
                    icon: <FaScaleBalanced />,
                }
            ]
        },
        {
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
        },
        {
            label: t('navbarText9'),
            icon: <BsSortDownAlt />,
            items: [
                {
                    label: t('navbarText10'),
                    icon: <BsFillCalendar2WeekFill />,

                },
                {
                    separator: true
                },
                {
                    label: t('navbarText11'),
                    icon: <FaChair />,
                },
                {
                    separator: true
                },
                {
                    label: t('navbarText12'),
                    icon: <FaToggleOn />,
                },
            ]
        },
        {
            label: t('navbarText13'),
            icon: <BsSortDownAlt />,
            items: [
                {
                    label: t('navbarText14'),
                    icon: <BsBellFill />,

                },
                {
                    separator: true
                },
                {
                    label: t('navbarText15'),
                    icon: <TbPlayerTrackNextFilled />,
                },
                {
                    separator: true
                },
                {
                    label: t('navbarText16'),
                    icon: <TbPlayerTrackPrevFilled />,
                },
            ]
        },
        {
            label: t('navbarText17'),
            icon: <BsSortDownAlt />,
            items: [
                {
                    label: 'TBD',
                    icon: 'pi pi-fw pi-user-plus',

                },
            ]
        },
        {
            label: t('navbarText2'),
            icon: 'pi pi-fw pi-power-off',
            command: () => {
                logoutHandler();
            }
        }
    ];

    const menuRight: any = useRef(null);
    //const router = useRouter();
    const idiomas = [
        {
            label: t('navbarText1'),
            items: [
                {
                    label: 'Espanol',
                    icon: <MX title="Mexico" style={{ height: "1rem", width: "1rem" }} />,
                    command: () => {
                        i18next.changeLanguage('es');
                    }
                },
                {
                    label: 'English',
                    icon: <US title="United States" style={{ height: "1rem", width: "1rem" }} />,
                    command: () => {
                        i18next.changeLanguage('en');
                    }
                },
                {
                    label: 'French',
                    icon: <FR title="France" style={{ height: "1rem", width: "1rem" }} />,
                    command: () => {
                        i18next.changeLanguage('fr');
                    }
                },
            ]
        }
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    //const end = <Fragment><Button label="EN" severity="secondary" outlined onClick={() => i18next.changeLanguage('en')} /><Button label="ES" severity="secondary" outlined onClick={() => i18next.changeLanguage('es')} /><Button label="FR" severity="secondary" outlined onClick={() => i18next.changeLanguage('fr')} /><Button icon="pi pi-power-off" rounded text label="Cerrar sesion" severity="warning" onClick={logoutHandler} /></Fragment>;
    const end = <Fragment><div className="card flex justify-content-center">
        <Menu model={idiomas} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />
        <Button label="" icon="pi pi-language" className="mr-2" rounded text severity="info" aria-label="User" onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu_right" aria-haspopup />
    </div></Fragment>

    return (
        <Menubar model={items} start={start} end={end} />
    )
}

export default Navbar;