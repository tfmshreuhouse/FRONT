import { Fragment, useState, useEffect } from 'react';
import { Fieldset } from 'primereact/fieldset';

import { useTranslation } from "react-i18next";

function NuevaReserva() {

  const { t } = useTranslation();

  return (
    <div className="main-container">
      <Fieldset legend="Reservar">
      </Fieldset>
    </div>
  );
}

export default NuevaReserva;
