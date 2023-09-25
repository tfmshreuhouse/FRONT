import { Fragment, useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

function Dashboard() {

  const { t } = useTranslation();

  return (
    <Fragment>
      <h1>Dashboard</h1>
    </Fragment>
  );
}

export default Dashboard;
