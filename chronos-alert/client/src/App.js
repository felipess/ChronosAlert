// import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardResultados from './components/DashboardResultados';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {

  const [tema, setTema] = useState('light');

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
    console.log(tema)
    document.body.classList.toggle('dark', tema === 'dark');
  }, [tema]);

  return (
    <div className={`app ${tema}`}>
      <Header
        tema={tema}
        toggleTema={toggleTema}
      />
      <DashboardResultados />
      <Footer tema={tema} />
    </div>
  );
};
export default App;