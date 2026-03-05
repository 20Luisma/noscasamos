import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Directory from './pages/Directory';
import ProviderDetail from './pages/ProviderDetail';
import EspaciosCelebracion from './pages/EspaciosCelebracion';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/directorio" element={<Directory />} />
            <Route path="/espacios" element={<EspaciosCelebracion />} />
            <Route path="/proveedor/:id" element={<ProviderDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
