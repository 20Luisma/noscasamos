import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Directory from './pages/Directory';
import ProviderDetail from './pages/ProviderDetail';
import EspaciosCelebracion from './pages/EspaciosCelebracion';
import Agenda from './pages/Agenda';
import Presupuesto from './pages/Presupuesto';
import Mesas from './pages/Mesas';
import WebBoda from './pages/WebBoda';
import Invitados from './pages/Invitados';
import AutosBoda from './pages/AutosBoda';
import Restaurantes from './pages/Restaurantes';
import Hoteles from './pages/Hoteles';
import Bodegas from './pages/Bodegas';
import EstanciasCampos from './pages/EstanciasCampos';
import SalonesFiestas from './pages/SalonesFiestas';
import BodasPlaya from './pages/BodasPlaya';
import Fotografos from './pages/Fotografos';
import Catering from './pages/Catering';
import MusicaDJ from './pages/MusicaDJ';
import TortasBodas from './pages/TortasBodas';
import ViajesNovios from './pages/ViajesNovios';
import Floristerias from './pages/Floristerias';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/directorio" element={<Directory />} />
            <Route path="/espacios" element={<EspaciosCelebracion />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/presupuesto" element={<Presupuesto />} />
            <Route path="/mesas" element={<Mesas />} />
            <Route path="/web-boda" element={<WebBoda />} />
            <Route path="/invitados" element={<Invitados />} />
            <Route path="/autos" element={<AutosBoda />} />
            <Route path="/restaurantes" element={<Restaurantes />} />
            <Route path="/hoteles" element={<Hoteles />} />
            <Route path="/bodegas" element={<Bodegas />} />
            <Route path="/estancias" element={<EstanciasCampos />} />
            <Route path="/salones" element={<SalonesFiestas />} />
            <Route path="/playa" element={<BodasPlaya />} />
            <Route path="/fotografos" element={<Fotografos />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/musica" element={<MusicaDJ />} />
            <Route path="/tortas" element={<TortasBodas />} />
            <Route path="/viajes" element={<ViajesNovios />} />
            <Route path="/floristerias" element={<Floristerias />} />
            <Route path="/proveedor/:id" element={<ProviderDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
