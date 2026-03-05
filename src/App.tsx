import React from 'react';
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
            <Route path="/proveedor/:id" element={<ProviderDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
