import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const Portal = lazy(() => import('./pages/Portal'));
const Home = lazy(() => import('./pages/Home'));
const Directory = lazy(() => import('./pages/Directory'));
const ProviderDetail = lazy(() => import('./pages/ProviderDetail'));
const EspaciosCelebracion = lazy(() => import('./pages/EspaciosCelebracion'));
const Agenda = lazy(() => import('./pages/Agenda'));
const Presupuesto = lazy(() => import('./pages/Presupuesto'));
const Mesas = lazy(() => import('./pages/Mesas'));
const WebBoda = lazy(() => import('./pages/WebBoda'));
const Invitados = lazy(() => import('./pages/Invitados'));
const AutosBoda = lazy(() => import('./pages/AutosBoda'));
const Restaurantes = lazy(() => import('./pages/Restaurantes'));
const Hoteles = lazy(() => import('./pages/Hoteles'));
const Bodegas = lazy(() => import('./pages/Bodegas'));
const EstanciasCampos = lazy(() => import('./pages/EstanciasCampos'));
const SalonesFiestas = lazy(() => import('./pages/SalonesFiestas'));
const BodasPlaya = lazy(() => import('./pages/BodasPlaya'));
const Fotografos = lazy(() => import('./pages/Fotografos'));
const Catering = lazy(() => import('./pages/Catering'));
const MusicaDJ = lazy(() => import('./pages/MusicaDJ'));
const TortasBodas = lazy(() => import('./pages/TortasBodas'));
const ViajesNovios = lazy(() => import('./pages/ViajesNovios'));
const Floristerias = lazy(() => import('./pages/Floristerias'));
const TalleresNovia = lazy(() => import('./pages/TalleresNovia'));
const ComplementosNovia = lazy(() => import('./pages/ComplementosNovia'));
const BellezaNovias = lazy(() => import('./pages/BellezaNovias'));
const Joyeria = lazy(() => import('./pages/Joyeria'));
const Promociones = lazy(() => import('./pages/Promociones'));
const TiendasNovia = lazy(() => import('./pages/TiendasNovia'));
const TrajesNovio = lazy(() => import('./pages/TrajesNovio'));
const AlquilerTrajes = lazy(() => import('./pages/AlquilerTrajes'));
const ComplementosNovio = lazy(() => import('./pages/ComplementosNovio'));
const Video = lazy(() => import('./pages/Video'));
const CuidadoMasculino = lazy(() => import('./pages/CuidadoMasculino'));
const AccesoEmpresas = lazy(() => import('./pages/AccesoEmpresas'));
const Registrate = lazy(() => import('./pages/Registrate'));
const AntesBoda = lazy(() => import('./pages/AntesBoda'));
const CeremoniaBoda = lazy(() => import('./pages/CeremoniaBoda'));
const BanqueteBoda = lazy(() => import('./pages/BanqueteBoda'));
const LunaDeMiel = lazy(() => import('./pages/LunaDeMiel'));
const ModaNupcial = lazy(() => import('./pages/ModaNupcial'));
const DespuesBoda = lazy(() => import('./pages/DespuesBoda'));
const SobreNosotros = lazy(() => import('./pages/SobreNosotros'));
const Contacto = lazy(() => import('./pages/Contacto'));
const Privacidad = lazy(() => import('./pages/Privacidad'));
const Terminos = lazy(() => import('./pages/Terminos'));
const Cookies = lazy(() => import('./pages/Cookies'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isPortal = pathname === '/';

  return (
    <div className="app-wrapper">
      {!isPortal && (
        <Suspense fallback={<div style={{ height: '70px', background: '#fff' }} />}>
          <Navbar />
        </Suspense>
      )}
      <main className="main-content">
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <Routes>
            <Route path="/" element={<Portal />} />
            <Route path="/noscasamos" element={<Home />} />
            <Route path="/acceso-empresas" element={<AccesoEmpresas />} />
            <Route path="/registrate" element={<Registrate />} />
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
            <Route path="/talleres-novia" element={<TalleresNovia />} />
            <Route path="/tiendas-novia" element={<TiendasNovia />} />
            <Route path="/trajes-novio" element={<TrajesNovio />} />
            <Route path="/alquiler-trajes" element={<AlquilerTrajes />} />
            <Route path="/complementos-novio" element={<ComplementosNovio />} />
            <Route path="/complementos-novia" element={<ComplementosNovia />} />
            <Route path="/belleza-novias" element={<BellezaNovias />} />
            <Route path="/joyeria" element={<Joyeria />} />
            <Route path="/promociones" element={<Promociones />} />
            <Route path="/cuidado-masculino" element={<CuidadoMasculino />} />
            <Route path="/floristerias" element={<Floristerias />} />
            <Route path="/video" element={<Video />} />
            <Route path="/antes-boda" element={<AntesBoda />} />
            <Route path="/la-ceremonia" element={<CeremoniaBoda />} />
            <Route path="/el-banquete" element={<BanqueteBoda />} />
            <Route path="/luna-de-miel" element={<LunaDeMiel />} />
            <Route path="/moda-nupcial" element={<ModaNupcial />} />
            <Route path="/despues-boda" element={<DespuesBoda />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/proveedor/:id" element={<ProviderDetail />} />
          </Routes>
        </Suspense>
      </main>
      {!isPortal && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
