import { Fragment, useState, useEffect } from 'react';

import { intUserInfo } from '../Interfaces/authInterfaces'
import LoginForm from '../Components/Auth/LoginForm';
import RegisterForm from '../Components/Auth/RegisterForm';

import axios from 'axios';
import { useTranslation } from "react-i18next";

function Auth() {

  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);

  const [islogin, setIsLogin] = useState<boolean>(true);

  const [data, setData] = useState<intUserInfo[] | null>();

  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Your API base URL
    //withCredentials: true,
  });  

  function isLoginHandler() {
    setIsLogin(!islogin);
  };

  useEffect(() => {
    instance.get('/auth')
      .then(response => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch(error => {
        //console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Fragment>
      {/* <div className="grid p-1">
        <div className="col-12" style={{ borderRadius: "0.5rem", backgroundColor: "rgba(248,249,250,.8)" }}>
          <p>Empresa<img style={{ float: "left" }} alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img></p>
        </div>
      </div> */}
      <div className="flex align-items-center justify-content-center mt-2">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <div className="text-center mb-5">
          <img style={{ borderRadius: '20px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxByx-LL6YeQCZP13tRoS2LbcCNQKIgOboNA&usqp=CAU"  alt="Error" className="mb-5" width="80%" />
            <div className="text-900 text-3xl font-medium mb-3">{t('authText1')}</div>
            <span className="text-600 font-medium line-height-3">{islogin ? t('authText2') : t('authText3')}</span>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" onClick={isLoginHandler}>{islogin ? t('authText4') : t('authText5')}</a>
          </div>
          {islogin ? <LoginForm></LoginForm> : <RegisterForm isLoginHandler={isLoginHandler}></RegisterForm>}
        </div>
      </div>
    </Fragment>
  );
}

export default Auth;
