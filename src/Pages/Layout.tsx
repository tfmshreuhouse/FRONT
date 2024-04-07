import { Fragment, useState, useEffect } from 'react';

import Navbar from '../Components/Shared/Navbar';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from "react-i18next";

function Layout(props: any) {
    const { t } = useTranslation();

    const [loading, setLoading]: any = useState(true);
    const [renderComponent, setRenderComponent]: any = useState();

    const navigate = useNavigate();

    const axiosBuilder = (params: any) => {
        return axios.create({
            baseURL: process.env.REACT_APP_API_URL, // Your API base URL
            //withCredentials: true,
            params: params
        })
    };

    useEffect(() => {
        const validarAccesoPrograma = async () => {
            const token = localStorage.getItem('jwt');

            if (token) {
                try {
                    const axiosTokenInfo = await axiosBuilder({ token: localStorage.getItem('jwt') });
                    const responseAxiosTokenInfo = await axiosTokenInfo.get('/auth/token/info');
                    if (props.validarPrograma) {
                        const axiosAccesoPrograma = await axiosBuilder({ token: localStorage.getItem('jwt'), programa: props.nombrePrograma })
                        const responseAxiosAccesoPrograma = await axiosAccesoPrograma.get('/auth/programa');
                        if (responseAxiosAccesoPrograma.data.permitido) {
                            setLoading(false);
                            setRenderComponent(componentBlock);
                        } else {
                            setLoading(false);
                            setRenderComponent(noProgramaBlock);
                        }
                    } else {
                        setLoading(false);
                        setRenderComponent(componentBlock);
                    }
                } catch (error: any) {
                    localStorage.removeItem('jwt');
                    navigate('/login');
                }
            } else if(props.validarInicio == '1'){
                try {
                    setLoading(false);
                    setRenderComponent(componentBlock);
                } catch (error: any) {
                    navigate('/login');
                }
            }else{
                navigate('/login');
            }
        };

        try {
            validarAccesoPrograma();
        } catch (error) {
            console.log(error);
        }

    }, [props, t]);

    const componentBlock = <Fragment>
        <div className="card">

        </div>
        {props.componentToRender}
    </Fragment>

    const noProgramaBlock = <Fragment>

        <div className="card flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center">
                <div style={{ marginTop: "2rem", borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style={{ borderRadius: '53px' }}>
                        <div className="flex justify-content-center align-items-center bg-pink-500 border-circle" style={{ height: '3.2rem', width: '3.2rem' }}>
                            <i className="pi pi-fw pi-exclamation-circle text-2xl text-white"></i>
                        </div>
                        <h1 className="text-900 font-bold text-5xl mb-2">{t('layoutText1')}</h1>
                        <div className="text-600 mb-5">{t('layoutText2')}</div>
                        <img style={{ borderRadius: '20px' }} src="https://media.tenor.com/4nO578j2ikcAAAAC/nope.gif" alt="Error" className="mb-5" width="80%" />
                    </div>
                </div>
            </div>
        </div>
    </Fragment>

    return (
        <Fragment>
            <Navbar></Navbar>
            {loading ? <div className="card flex justify-content-center">
                <ProgressSpinner />
            </div> : null}
            {renderComponent}
        </Fragment>
    );
}

export default Layout;
