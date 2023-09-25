import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
//import "./theme.css"//tema PrimeNG customizado
//core
import "primereact/resources/primereact.min.css";
//icons
import 'primeicons/primeicons.css';
//PrimeFlex
import 'primeflex/primeflex.css';

import './i18n/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);