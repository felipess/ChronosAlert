// import './App.css';
import React, { useState, useEffect } from 'react';
import { UsuarioProvider } from './context/UsuarioContext';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardResultados from './components/DashboardResultados';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  const [tema, setTema] = useState('light');
  const [notifications, setNotifications] = useState([]);

  const toggleTema = () => {
    const newTema = tema === 'light' ? 'dark' : 'light';
    setTema(newTema);
    localStorage.setItem('tema', newTema);
    document.body.classList.toggle('dark', newTema === 'dark');
  };

  // Ler o tema do localStorage quando o componente for montado
  useEffect(() => {
    const savedTema = localStorage.getItem('tema');
    if (savedTema) {
      setTema(savedTema);
      document.body.classList.toggle('dark', savedTema === 'dark');
    }
  }, []);

  // Atualiza a classe do body quando o tema muda
  useEffect(() => {
    document.body.classList.toggle('dark', tema === 'dark');
  }, [tema]);

  return (
    <UsuarioProvider>
      <div className={`app ${tema}`}>
        <Header
          tema={tema}
          toggleTema={toggleTema}
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <DashboardResultados setNotifications={setNotifications} />
        <Footer tema={tema} />
      </div>
    </UsuarioProvider>
  );
};
export default App;