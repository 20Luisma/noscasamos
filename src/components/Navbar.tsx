import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Store, Menu, X } from 'lucide-react';
import './Navbar.css';

// Simplified dropdown menus for MVP
const NAV_MENUS = [
    {
        label: 'Mi boda',
        items: [
            { label: 'Agenda', to: '/agenda' },
            { label: 'Presupuesto', to: '/presupuesto' },
            { label: 'Invitados', to: '/invitados' },
            { label: 'Mesas', to: '/mesas' },
            { label: 'Web de boda', to: '/web-boda' },
        ],
    },
    {
        label: 'Lugares para Boda',
        items: [
            { label: 'Espacios de Celebración', to: '/espacios' },
            { label: 'Estancias & Campos', to: '/estancias' },
            { label: 'Hoteles', to: '/hoteles' },
            { label: 'Salones de Fiesta', to: '/salones' },
            { label: 'Restaurantes', to: '/restaurantes' },
            { label: 'Bodegas', to: '/bodegas' },
            { label: 'Bodas en la playa', to: '/playa' },
        ],
    },
    {
        label: 'Proveedores',
        items: [
            { label: 'Fotógrafos', to: '/fotografos' },
            { label: 'Video', to: '/video' },
            { label: 'Música & DJ', to: '/musica' },
            { label: 'Catering', to: '/catering' },
            { label: 'Floristerías', to: '/floristerias' },
            { label: 'Tortas de boda', to: '/tortas' },
            { label: 'Autos de boda', to: '/autos' },
            { label: 'Viaje de novios', to: '/viajes' },
        ],
    },
    {
        label: 'Novias',
        items: [
            { label: 'Talleres de novia', to: '/talleres-novia' },
            { label: 'Tiendas de novia', to: '/tiendas-novia' },
            { label: 'Complementos novia', to: '/complementos-novia' },
            { label: 'Joyería', to: '/joyeria' },
            { label: 'Belleza Novias', to: '/belleza-novias' },
            { label: <strong>Promociones</strong>, to: '/promociones' },
        ],
    },
    {
        label: 'Novios',
        columns: [
            [
                { label: 'Trajes de novio', to: '/trajes-novio' },
                { label: 'Alquiler de trajes', to: '/alquiler-trajes' },
                { label: 'Complementos novio', to: '/complementos-novio' },
            ],
            [
                { label: 'Cuidado masculino', to: '/cuidado-masculino' },
                { label: 'Promociones', to: '/promociones' },
            ]
        ],
    },
    {
        label: 'Ideas boda',
        items: [
            { label: 'Antes de la boda', to: '/antes-boda' },
            { label: 'La ceremonia', to: '/la-ceremonia' },
            { label: 'El banquete', to: '/el-banquete' },
            { label: 'Luna de miel', to: '/luna-de-miel' },
            { label: 'Moda nupcial', to: '/moda-nupcial' },
            { label: 'Después de la boda', to: '/despues-boda' },
        ],
    },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const location = useLocation();

    // Hide standard navbar on these auth pages
    if (location.pathname === '/acceso-empresas' || location.pathname === '/registrate') {
        return null;
    }

    const handleMouseEnter = (label: string) => setActiveMenu(label);
    const handleMouseLeave = () => setActiveMenu(null);

    return (
        <nav className="navbar" onMouseLeave={handleMouseLeave}>
            <div className="navbar-container container">

                <div className="navbar-left">
                    <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <Link to="/" className="navbar-logo">
                        <Heart className="logo-icon" size={28} strokeWidth={2.5} />
                        <span>noscasamos.uy</span>
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
                    {NAV_MENUS.map((menu) => (
                        <div
                            key={menu.label}
                            className={`nav-item ${activeMenu === menu.label ? 'open' : ''}`}
                            onMouseEnter={() => (menu.items || menu.columns) && handleMouseEnter(menu.label)}
                        >
                            <button
                                type="button"
                                className={`nav-link nav-btn ${activeMenu === menu.label ? 'active' : ''}`}
                                onClick={() => {
                                    if (mobileMenuOpen) {
                                        setMobileMenuOpen(false);
                                    } else {
                                        setActiveMenu(activeMenu === menu.label ? null : menu.label);
                                    }
                                }}
                            >
                                {menu.label}
                            </button>

                            {/* Dropdown panel */}
                            {(menu.items || menu.columns) && activeMenu === menu.label && (
                                <div className="dropdown-panel">
                                    <p className="dropdown-title">{menu.label}</p>

                                    {menu.items ? (
                                        <ul className="dropdown-list">
                                            {menu.items.map((item) => (
                                                <li key={item.to}>
                                                    <Link to={item.to} className="dropdown-link">
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : menu.columns ? (
                                        <div className="dropdown-columns" style={{ display: 'flex', gap: '80px' }}>
                                            {menu.columns.map((col, colIdx) => (
                                                <ul key={colIdx} className="dropdown-list col-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: 0, padding: 0 }}>
                                                    {col.map((item) => (
                                                        <li key={item.to}>
                                                            <Link to={item.to} className="dropdown-link" style={item.label === 'Promociones' ? { fontWeight: 700 } : {}}>
                                                                {item.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Auth section — visible only in mobile hamburger menu */}
                    <div className="mobile-auth-section">
                        <Link to="/acceso-empresas" className="area-empresas mobile-only-link">
                            <Store size={14} className="store-icon" />
                            <span>Área Empresas</span>
                        </Link>
                        <div className="auth-links">
                            <Link to="/acceso-empresas" className="btn-text btn-accede">Accede</Link>
                            <Link to="/registrate" className="btn-text btn-registrate">Regístrate</Link>
                        </div>
                    </div>
                </div>

                {/* Desktop right side */}
                <div className="navbar-right">
                    <Link to="/acceso-empresas" className="area-empresas">
                        <Store size={14} className="store-icon" />
                        <span>Área Empresas</span>
                    </Link>
                    <div className="auth-links">
                        <Link to="/acceso-empresas" className="btn-text btn-accede">Accede</Link>
                        <Link to="/registrate" className="btn-text btn-registrate">Regístrate</Link>
                    </div>
                </div>
            </div>

            {/* Full-width dropdown backdrop */}
            {activeMenu && <div className="dropdown-backdrop" onMouseEnter={handleMouseLeave} />}
        </nav>
    );
};

export default Navbar;
