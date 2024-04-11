import { Fragment, useState, useEffect } from 'react';
import { AuthErrorCodeTranslator } from '../../ErrorCodes/AuthErrors';
import { formAuthLogin } from '../../YupSchemas/yupSchemas';

import { classNames } from 'primereact/utils';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

import axios from 'axios';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function LoginForm() {
    
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    const [errors, setErrors] = useState<any>(null);

    const instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL, // Your API base URL
        //withCredentials: true,
    });

    const initialValues = {
        correo: '',
        password: '',
    }

    const formik: any = useFormik({
        initialValues,
        validationSchema: formAuthLogin,
        validateOnMount: true,
        onSubmit: (data) => {
            //formik.resetForm();
            console.log(data.correo);
            console.log(data.password);
            loginHandler(data.correo, data.password);
        }
    });

    useEffect(() => {

        console.log("entra usefeffecto");

        const jwt = localStorage.getItem('jwt');

        if (jwt) {
            console.log("JWT ya existe");
            navigate("/", { state: "location", replace: true });
        }

      }, []);

    function checkFormikIsValid() {
        console.log(formik.isValid);
        console.log(formik.errors);
        if (!formik.isValid) {
            console.log("Hay errores");
        }
    }
    function ClickVolver() {
        navigate("/");
    }

    const isFormFieldInvalid = (name: any) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name: any) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{t(formik.errors[name])}</small> : <small className="p-error">&nbsp;</small>;
    };

    const loginHandler = async (correo: string, password: string) => {

        setLoading(true);
        console.log("Login");
        try {
            const response = await instance.post('/auth/login', { correo, password });
            console.log(response.data.data);
            localStorage.setItem('jwt', response.data.data);
            setErrors(null);
            setLoading(false);
            navigate("/", { state: "location", replace: true });
        } catch (error: any) {
            try {
                console.log("Valor de erro: ", error.response.data.error);
                setErrors(error.response.data.error);
                setLoading(false);
            } catch (error) {
                //console.log('Falla de BACKEND');
                setLoading(false);
            }
        }
    };

    return (
        <Fragment>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <span className="p-float-label mt-4">
                        <InputText
                            id="correo"
                            name="correo"
                            value={formik.values.correo}
                            onChange={(e) => {
                                formik.setFieldValue('correo', e.target.value);
                            }}
                            className={classNames("w-full", { 'p-invalid w-full': isFormFieldInvalid('correo') })}
                        />
                        <label htmlFor="correo">{t('loginFormText1')}</label>
                    </span>
                    {getFormErrorMessage('correo')}
                    <span className="p-float-label mt-4">
                        <InputText
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={(e) => {
                                formik.setFieldValue('password', e.target.value);
                            }}
                            className={classNames("w-full", { 'p-invalid w-full': isFormFieldInvalid('password') })}
                            type='password'
                        />
                        <label htmlFor="password">{t('loginFormText2')}</label>
                    </span>
                    {getFormErrorMessage('password')}
                    <Button type='submit' icon='pi pi-sign-in' label="Ingresar" loading={loading} onClick={checkFormikIsValid} className="w-full mt-4" />
                    <Button type="button" icon="pi pi-times" severity="danger" label="Cancelar" className="button-blue w-full mt-4"
                        onClick={ClickVolver} />
                </div>
            </form>
            {errors ? <div style={{ marginTop: '20px' }} className="card flex justify-content-center">
                <div className='bg-red-200 pr-4 pl-4 border-round'>
                    {<p style={{ fontWeight: 'bold' }}>*{t(AuthErrorCodeTranslator(errors))}</p>}
                </div>
            </div> : <div></div>}
        </Fragment>
    );
}

export default LoginForm;