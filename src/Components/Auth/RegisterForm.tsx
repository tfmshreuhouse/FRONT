import { Fragment, useState } from 'react';
import { intUserNew } from '../../Interfaces/authInterfaces';
import { AuthErrorCodeTranslator } from '../../ErrorCodes/AuthErrors';
import { formAuthRegister } from '../../YupSchemas/yupSchemas';

import { classNames } from 'primereact/utils';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

import axios from 'axios';
import { useFormik } from 'formik';
import { useTranslation } from "react-i18next";
import SuccessRegisterAlert from '../Shared/SuccessRegisterAlert';

interface ChildProps {
    isLoginHandler: () => void; // Definir correctamente la prop handleClick
}

const RegisterForm:React.FC<ChildProps> = ({ isLoginHandler }) => {

    const { t } = useTranslation();

    const [checked, setChecked] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [samePass, setSamePass] = useState<boolean>(true);

    const [loading, setLoading] = useState<boolean>(false);

    const [errors, setErrors] = useState<any>(null);

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL, // Your API base URL
        //withCredentials: true,
    });

    const initialValues = {
        nombres: '',
        apellidos: '',
        correo: '',
        password: '',
        telefono: '',
        confirmPassword: ''
    }

    const formik: any = useFormik({
        initialValues,
        validationSchema: formAuthRegister,
        validateOnMount: true,
        onSubmit: (data) => {
            //formik.resetForm();
            console.log(data.nombres);
            console.log(data.apellidos);
            console.log(data.correo);
            console.log(data.password);
            console.log(data.confirmPassword);
            console.log(data.telefono);
            registerHandler(data)
            //loginHandler(data.correo, data.password);
        }
    });

    const handleBlurSamePass = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        const { values } = formik;
    
        if(!(values.password === values.confirmPassword)) {
            setSamePass(false);
        } else {
            setSamePass(true);
        }
      };

    function checkFormikIsValid() {
        console.log(formik.isValid);
        console.log(formik.errors);
        if (!formik.isValid) {
            console.log("Hay errores");
        }
    }

    const isFormFieldInvalid = (name: any) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name: any) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{t(formik.errors[name])}</small> : <small className="p-error">&nbsp;</small>;
    };

    const registerHandler = async (obj: any) => {

        const { nombres, apellidos, correo, password, telefono } = obj;

        setLoading(true);
        console.log("Register");

        try {
            const userNew: intUserNew = {
                nombres,
                apellidos,
                correo,
                password,
                perfil: "Super",
                telefono,
                status: 1
            }
            const response = await axiosInstance.post('/auth', userNew);
            //console.log("Usuario creado exitosamente.");
            console.log(response.data.data)
            setLoading(false);
            setSuccess(true);
            setChecked(false);
            setErrors(null);
        } catch (error: any) {
            try {
                console.log(error.response.data);
                setErrors(error.response.data);
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
                            id="nombres"
                            name="nombres"
                            value={formik.values.nombres}
                            onChange={(e) => {
                                formik.setFieldValue('nombres', e.target.value);
                            }}
                            className={classNames("w-full", { 'p-invalid w-full': isFormFieldInvalid('nombres') })}
                        />
                        <label htmlFor="nombres">{t('loginRegisterText1')}</label>
                    </span>
                    {getFormErrorMessage('nombres')}
                    <span className="p-float-label mt-4">
                        <InputText
                            id="apellidos"
                            name="apellidos"
                            value={formik.values.apellidos}
                            onChange={(e) => {
                                formik.setFieldValue('apellidos', e.target.value);
                            }}
                            className={classNames("w-full", { 'p-invalid w-full': isFormFieldInvalid('apellidos') })}
                        />
                        <label htmlFor="apellidos">{t('loginRegisterText2')}</label>
                    </span>
                    {getFormErrorMessage('apellidos')}
                    <span className="p-float-label mt-4">
                        <InputText
                            id="telefono"
                            name="telefono"
                            value={formik.values.telefono}
                            onChange={(e) => {
                                formik.setFieldValue('telefono', e.target.value);
                            }}
                            className={classNames("w-full", { 'p-invalid w-full': isFormFieldInvalid('telefono') })}
                        />
                        <label htmlFor="telefono">{t('loginRegisterText11')}</label>
                    </span>
                    {getFormErrorMessage('telefono')}
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
                        <label htmlFor="correo">{t('loginRegisterText3')}</label>
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
                            onBlur={handleBlurSamePass}
                            className={classNames("w-full", { 'p-invalid w-full': isFormFieldInvalid('password') })}
                            type='password'
                        />
                        <label htmlFor="password">{t('loginRegisterText4')}</label>
                    </span>
                    {getFormErrorMessage('password')}
                    <span className="p-float-label mt-4">
                        <InputText
                            id="confirm-password"
                            name="confirm-password"
                            value={formik.values.confirmPassword}
                            onChange={(e) => {
                                formik.setFieldValue('confirmPassword', e.target.value);
                            }}
                            onBlur={handleBlurSamePass}
                            className={classNames("w-full", { 'p-invalid w-full': isFormFieldInvalid('confirmPassword') })}
                            type='password'
                        />
                        <label htmlFor="confirm-password">{t('loginRegisterText41')}</label>
                    </span>
                    {!samePass ? <small className="p-error">Las contrasenas no coinciden</small> : <div/>}
                    <div className="flex align-items-center justify-content-between mb-6 mt-4">
                        <div className="flex align-items-center">
                            <Checkbox onChange={e => setChecked(true)} checked={checked} className="mr-2"></Checkbox>
                            <label htmlFor="rememberme">Remember me</label>
                        </div>
                        <p className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Olvidaste tu contrasena?</p>
                    </div>
                    <Button type='submit' label={t('loginRegisterText5')} loading={loading} disabled={!samePass}
                    onClick={checkFormikIsValid} className="w-full mt-4" />
                </div>
            </form>
            {errors ? <div style={{ marginTop: '20px' }} className="card flex justify-content-center">
                <div className='bg-red-200 pr-4 pl-4 border-round'>
                    {errors.error.map((error: any) => { return <p key={error.message} style={{ fontWeight: 'bold' }}>*{t(AuthErrorCodeTranslator(error.message))}</p> })}
                </div>
            </div> : <div></div>}
            {success ? <SuccessRegisterAlert isLoginHandler={isLoginHandler}/> : <div></div>}
        </Fragment>
    );
}

export default RegisterForm;