import * as yup from "yup";

const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;// min 8 max 15 characters, 1 upper case letter,  1 numeric digit and 1 special.
//const regexSoloLetras = /^[aA-zZ\s]+$/;
const regexSoloLetras = /^[A-Za-z]+$/;
const regexCorreo = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
const regexLetrasNumerosSinEspacio = /^[aA-zZ0-9]+$/;


export const formAuthLogin = yup.object().shape({
    correo: yup
        .string()
        .matches(regexCorreo, "authYupErrorsText2")
        .required("authYupErrorsText1"),
    password: yup
        .string()
        .required("authYupErrorsText1"),
});

export const formAuthRegister = yup.object().shape({
    nombres: yup
        .string()
        .matches(regexSoloLetras, "authYupErrorsText3")
        .required("authYupErrorsText1"),
    apellidos: yup
        .string()
        .matches(regexSoloLetras, "authYupErrorsText4")
        .required("authYupErrorsText1"),
    correo: yup
        .string()
        .matches(regexCorreo, "authYupErrorsText2")
        .required("authYupErrorsText1"),
    password: yup
        .string()
        .min(9, "authYupErrorsText5")
        .max(15, "authYupErrorsText6")
        .matches(regexPassword, "authYupErrorsText7")
        .required("authYupErrorsText1"),
});