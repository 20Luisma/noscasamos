import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Store, Menu, X } from 'lucide-react';
import './Navbar.css';

// Simplified dropdown menus for MVP
const NAV_MENUS = [
    {
        label: 'Mi boda',
        items: [
            { label: 'Agenda', to: '/directorio' },
            { label: 'Presupuesto', to: '/directorio' },
            { label: 'Invitados', to: '/directorio' },
            { label: 'Mesas', to: '/directorio' },
            { label: 'Web de boda', to: '/directorio' },
        ],
    },
    {
        label: 'Lugares para Boda',
        items: [
            { label: 'Estancias & Campos', to: '/directorio' },
            { label: 'Hoteles', to: '/directorio' },
            { label: 'Salones de Fiesta', to: '/directorio' },
            { label: 'Restaurantes', to: '/directorio' },
            { label: 'Bodas en la playa', to: '/directorio' },
            { label: 'Espacios singulares', to: '/directorio' },
        ],
    },
    {
        label: 'Proveedores',
        items: [
            { label: 'Fotógrafos', to: '/directorio' },
            { label: 'Video', to: '/directorio' },
            { label: 'Música & DJ', to: '/directorio' },
            { label: 'Catering', to: '/directorio' },
            { label: 'Floristerías', to: '/directorio' },
            { label: 'Tortas de boda', to: '/directorio' },
            { label: 'Autos de boda', to: '/directorio' },
            { label: 'Viaje de novios', to: '/directorio' },
        ],
    },
    {
        label: 'Novias',
        items: [
            { label: 'Vestidos de novia', to: '/directorio' },
            { label: 'Joyería', to: '/directorio' },
            { label: 'Belleza & Maquillaje', to: '/directorio' },
            { label: 'Complementos', to: '/directorio' },
        ],
    },
    {
        label: 'Novios',
        items: [
            { label: 'Trajes de novio', to: '/directorio' },
            { label: 'Alquiler de trajes', to: '/directorio' },
            { label: 'Complementos', to: '/directorio' },
        ],
    },
    {
        label: 'Ideas boda',
        items: [
            { label: 'Antes de la boda', to: '/directorio' },
            { label: 'La ceremonia', to: '/directorio' },
            { label: 'El banquete', to: '/directorio' },
            { label: 'Luna de miel', to: '/directorio' },
            { label: 'Moda nupcial', to: '/directorio' },
            { label: 'Bodas reales', to: '/directorio' },
        ],
    },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

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
                            onMouseEnter={() => menu.items && handleMouseEnter(menu.label)}
                        >
                            <Link
                                to="/directorio"
                                className={`nav-link ${activeMenu === menu.label ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {menu.label}
                            </Link>

                            {/* Dropdown panel */}
                            {menu.items && activeMenu === menu.label && (
                                <div className="dropdown-panel">
                                    <p className="dropdown-title">{menu.label}</p>
                                    <ul className="dropdown-list">
                                        {menu.items.map((item) => (
                                            <li key={item.label}>
                                                <Link to={item.to} className="dropdown-link">
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Auth section — visible only in mobile hamburger menu */}
                    <div className="mobile-auth-section">
                        <Link to="/directorio" className="area-empresas mobile-only-link">
                            <Store size={14} className="store-icon" />
                            <span>Área Empresas</span>
                        </Link>
                        <div className="auth-links">
                            <Link to="#" className="btn-text btn-accede">Accede</Link>
                            <Link to="#" className="btn-text btn-registrate">Regístrate</Link>
                        </div>
                    </div>
                </div>

                {/* Desktop right side */}
                <div className="navbar-right">
                    <Link to="/directorio" className="area-empresas">
                        <Store size={14} className="store-icon" />
                        <span>Área Empresas</span>
                    </Link>
                    <div className="auth-links">
                        <Link to="#" className="btn-text btn-accede">Accede</Link>
                        <Link to="#" className="btn-text btn-registrate">Regístrate</Link>
                    </div>
                </div>
            </div>

            {/* Full-width dropdown backdrop */}
            {activeMenu && <div className="dropdown-backdrop" onMouseEnter={handleMouseLeave} />}
        </nav>
    );
};

export default Navbar;
