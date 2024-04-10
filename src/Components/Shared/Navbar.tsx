import { Fragment, useRef, useEffect, useState  } from 'react';

import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MX, US, FR } from 'country-flag-icons/react/3x2'
import { HiOutlineHome } from "react-icons/hi";
import { BiSolidDashboard } from "react-icons/bi";
import { TieredMenu } from "primereact/tieredmenu";
import { BsJournalBookmark, BsSortDownAlt, BsFillCalendar2WeekFill, BsCheck2Circle } from "react-icons/bs"
import { FaScaleBalanced, FaMagnifyingGlass, FaChair, FaToggleOn } from "react-icons/fa6";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb"

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import i18next from 'i18next';
import { useTranslation } from "react-i18next";

const Navbar = (props: any) => {
    const { t } = useTranslation();
    const [numeroNotificacionesActivas, setNumeroNotificacionesActivas] = useState(0);
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
    const menu = useRef(null);
    const menuRight: any = useRef(null);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const token = localStorage.getItem('jwt');
    let items: MenuItem[] = [];
    let end: JSX.Element;
    useEffect(() => {
        if (token) {
          const fetchData = async () => {
            try {
              const token = localStorage.getItem("jwt");
    
              const axiosTokenInfo = axios.create({
                baseURL: process.env.REACT_APP_API_URL,
                params: { token: token },
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const responseAxiosTokenInfo = await axiosTokenInfo.get(
                "/auth/Token/info"
              );
              const userId = responseAxiosTokenInfo.data.data;
              const responseAxiosReservaInfo = await axiosTokenInfo.get(
                `/rest/notificaciones/${userId.userID}`
              );
              const notificaciones = responseAxiosReservaInfo.data.data;
    
              const notificacionesActivas = notificaciones.filter(
                (notificacion: any) => notificacion.estado === 1
              );
              const numeroNotificacionesActivas = notificacionesActivas.length;
              const menuItemsData: MenuItem[] = notificaciones.map(
                (notificacion: any) => ({
                  label: notificacion.titulo,
                  style: {
                    backgroundColor: notificacion.estado === 1 ? 'lightblue' : 'inherit',
                    fontSize: '18px', // Cambiar el tamaño de fuente del texto
                    fontFamily: 'Arial, sans-serif' // Cambiar el tipo de fuente
                  },
                  command: () => navigate(`/notificacion/${notificacion.id}`)
                })
              );
              setNumeroNotificacionesActivas(numeroNotificacionesActivas);
              setMenuItems(menuItemsData);
            } catch (error) {
              console.error("Error fetching user data:", error);
            }
          };
    
          fetchData();
        }
      }, []);
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

        const renderMenu = menuItems.length > 0;
    const badgeStyle: React.CSSProperties = {
      position: "absolute",
      top: "-1px",
      right: "-1px",
      backgroundColor: "red",
      color: "white",
      borderRadius: "50%",
      padding: "5px",
      fontSize: "15px",
      minWidth: "20px",
      height: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
    end = (
      <Fragment>
        <div style={{ display: "inline-flex" }}>
          <div style={{ marginRight: "10px" }}>
            {renderMenu && <TieredMenu model={menuItems} popup ref={menu} style={{ width: '30%', maxHeight: '500px', overflowY: 'auto' }}/>}
            <Button
              className="mr-2"
              onClick={(e) => (menu.current as any)?.toggle(e)}
              title="Notificaciones"
            >
              <i className="pi pi-bell" style={{ fontSize: "24px" }}></i>
              <span style={badgeStyle}>{numeroNotificacionesActivas}</span>
            </Button>
          </div>
          <div>
            <Button
              className="mr-2"
              title="Cerrar Sesion"
              aria-label="User"
              onClick={logoutHandler}
              aria-controls="popup_menu_right"
              aria-haspopup
            >
              <i className="pi pi-power-off" style={{ fontSize: "24px" }}></i>
            </Button>
          </div>
        </div>
      </Fragment>
    );
    }else{
        end = <Fragment>
                        <div>
                            <Button 
                            title="Iniciar Sesion" 
                            className="mr-2" 
                            aria-label="User" 
                            onClick={logoInHandler} 
                            aria-controls="popup_menu_right" 
                            aria-haspopup >
                            <i className="pi pi-user" style={{ fontSize: "24px" }}></i>
                            </Button>
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