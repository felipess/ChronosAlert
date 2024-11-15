import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TabelaResultados from './TabelaResultados';
import '../styles/index.css';
import '../styles/custom.css';

const DashboardResultados = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Verificar modo dark
  useEffect(() => {
    const isDark = document.body.classList.contains('dark');
    setIsDarkMode(isDark);

    const observer = new MutationObserver(() => {
      const isDark = document.body.classList.contains('dark');
      setIsDarkMode(isDark);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container-fluid p-0 min-h-screen d-flex flex-column ">
      <div className="d-flex flex-grow-1">
        <Sidebar
          isDarkMode={isDarkMode}
        />
        <TabelaResultados
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default DashboardResultados;
