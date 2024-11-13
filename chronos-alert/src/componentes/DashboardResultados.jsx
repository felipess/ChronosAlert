import React from 'react';
import Sidebar from './Sidebar';
import TabelaResultados from './TabelaResultados';

const DashboardResultados = () => {
  return (
    <div className="container-fluid p-0 min-h-screen d-flex flex-column">
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <TabelaResultados />
      </div>
    </div>
  );
};

export default DashboardResultados;
