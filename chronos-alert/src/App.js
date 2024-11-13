import Header from './componentes/Header';
import Footer from './componentes/Footer';
import DashboardResultados from './componentes/DashboardResultados'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <div className="App">
      <Header />
      <DashboardResultados />
      <Footer />
    </div>
  );
}

export default App;
