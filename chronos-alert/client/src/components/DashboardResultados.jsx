import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TabelaResultados from './TabelaResultados';
import '../styles/index.css';
import '../styles/custom.css';

const DashboardResultados = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const toggleMenu = (event) => {
    event.preventDefault();
    setIsMenuCollapsed(!isMenuCollapsed);
    localStorage.setItem('isMenuCollapsed', JSON.stringify(!isMenuCollapsed));
  };

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

  // Verificar isMenuCollapsed
  useEffect(() => {
    const storedMenuState = localStorage.getItem('isMenuCollapsed');
    if (storedMenuState !== null) {
      setIsMenuCollapsed(JSON.parse(storedMenuState));
    }
  }, []);

  return (
    <div className="container-fluid p-0 min-h-screen d-flex flex-column ">
      <div className="d-flex flex-grow-1">
        <Sidebar
          isDarkMode={isDarkMode}
          isMenuCollapsed={isMenuCollapsed}
          toggleMenu={toggleMenu}
        />
        <TabelaResultados
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default DashboardResultados;
