import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Home as HomeIcon, Camera, Music, Car, Flower2, UtensilsCrossed, ClipboardList, Plane, Cake, Gem, Sparkles, Shirt, User } from 'lucide-react';
import './Home.css';
import { Link } from 'react-router-dom';

// ── Category data — 3-column Bodas.net style ────────────────────────────────
const CATEGORY_COLUMNS = [
    // Column 1 — groups with sub-items
    [
        {
            type: 'group' as const,
            label: 'Lugares para Boda',
            icon: HomeIcon,
            items: ['Estancias & Campos', 'Hoteles', 'Salones de Fiesta', 'Restaurantes', 'Bodas en la playa', 'Espacios singulares'],
        },
        { type: 'item' as const, label: 'Catering', icon: UtensilsCrossed },
        { type: 'item' as const, label: 'Invitaciones de boda', icon: ClipboardList },
        { type: 'item' as const, label: 'Organización de bodas', icon: ClipboardList },
    ],
    // Column 2 — standalone items with icons
    [
        { type: 'item' as const, label: 'Fotógrafos', icon: Camera },
        { type: 'item' as const, label: 'Video', icon: Camera },
        { type: 'item' as const, label: 'Música & DJ', icon: Music },
        { type: 'item' as const, label: 'Autos de boda', icon: Car },
        { type: 'item' as const, label: 'Floristerías', icon: Flower2 },
        { type: 'item' as const, label: 'Viaje de novios', icon: Plane },
        { type: 'item' as const, label: 'Tortas de boda', icon: Cake },
        { type: 'item' as const, label: 'Decoración para bodas', icon: Sparkles },
    ],
    // Column 3 — groups with sub-items
    [
        { type: 'item' as const, label: 'Joyería', icon: Gem },
        { type: 'item' as const, label: 'Belleza & Maquillaje', icon: Sparkles },
        {
            type: 'group' as const,
            label: 'Novias',
            icon: User,
            items: ['Vestidos de novia', 'Complementos novia', 'Trajes madrina'],
        },
        {
            type: 'group' as const,
            label: 'Novios',
            icon: Shirt,
            items: ['Trajes de novio', 'Alquiler de trajes', 'Complementos novio'],
        },
    ],
];

// ── 19 Departamentos de Uruguay ───────────────────────────────────────────────
const URUGUAY_DEPARTMENTS = [
    'Artigas', 'Canelones', 'Cerro Largo', 'Colonia', 'Durazno',
    'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Montevideo',
    'Paysandú', 'Río Negro', 'Rivera', 'Rocha', 'Salto',
    'San José', 'Soriano', 'Tacuarembó', 'Treinta y Tres',
];

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [locationTab, setLocationTab] = useState<'departamento' | 'internacional'>('departamento');
    const [openContinents, setOpenContinents] = useState<string[]>([]);

    const searchRef = useRef<HTMLDivElement>(null);
    const locationRef = useRef<HTMLDivElement>(null);
    const catDropRef = useRef<HTMLDivElement>(null);
    const locDropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const inCat = searchRef.current?.contains(e.target as Node)
                || catDropRef.current?.contains(e.target as Node);
            if (!inCat) setShowCategoryDropdown(false);

            const inLoc = locationRef.current?.contains(e.target as Node)
                || locDropRef.current?.contains(e.target as Node);
            if (!inLoc) setShowLocationDropdown(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const openCategoryDropdown = () => {
        setShowCategoryDropdown(true);
        setShowLocationDropdown(false);
    };

    const openLocationDropdown = () => {
        setShowLocationDropdown(true);
        setShowCategoryDropdown(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = '/directorio';
    };

    const filteredDepts = URUGUAY_DEPARTMENTS.filter((d) =>
        d.toLowerCase().includes(locationQuery.toLowerCase())
    );

    return (
        <div className="home-page">
            {/* Force permanent scrollbar in .loc-list regardless of macOS settings */}
            <style>{`
                .loc-list::-webkit-scrollbar {
                    -webkit-appearance: none;
                    width: 8px;
                }
                .loc-list::-webkit-scrollbar-track {
                    background-color: #f1f1f1;
                    border-radius: 4px;
                }
                .loc-list::-webkit-scrollbar-thumb {
                    border-radius: 4px;
                    background-color: rgba(0, 0, 0, 0.3);
                }
                .loc-list::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(200, 38, 74, 0.8);
                }
            `}</style>

            {/* Hero */}
            <section className="hero">
                <div className="hero-bg">
                    <img src="/hero-image.jpg" alt="Beso de novios" className="hero-img" />
                </div>

                <div className="hero-left-panel">
                    <div className="hero-content">
                        <h1 className="hero-title">Encuentra todo lo que necesitas para tu boda en Uruguay</h1>
                        <p className="hero-subtitle">¡Tienes más de 28.000 proveedores para elegir!</p>

                        <form className="hero-search" onSubmit={handleSearch} style={{ position: 'relative' }}>
                            {/* Category field */}
                            <div className="search-field search-category-wrap" ref={searchRef}>
                                <Search className="search-icon" size={20} />
                                <input
                                    type="text"
                                    placeholder="Busca por nombre o por categoría"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={openCategoryDropdown}
                                    autoComplete="off"
                                />
                            </div>

                            <div className="search-divider"></div>

                            {/* Location field */}
                            <div className="search-field search-location search-location-wrap" ref={locationRef}>
                                <span className="location-prefix">
                                    <MapPin size={16} strokeWidth={2} />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Departamento"
                                    value={locationQuery}
                                    onChange={(e) => setLocationQuery(e.target.value)}
                                    onFocus={openLocationDropdown}
                                    autoComplete="off"
                                />
                            </div>

                            <button type="submit" className="btn btn-primary search-btn">
                                Buscar
                            </button>

                            {/* ── Category Dropdown ── */}
                            {showCategoryDropdown && (
                                <div ref={catDropRef} className="search-dropdown category-dropdown">
                                    <div className="category-dropdown-grid">
                                        {CATEGORY_COLUMNS.map((col, colIdx) => (
                                            <div key={colIdx} className="cat-col">
                                                {col.map((entry) => (
                                                    <div key={entry.label} className="cat-entry">
                                                        <button type="button" className="cat-header-btn"
                                                            onClick={() => { setSearchQuery(entry.label); setShowCategoryDropdown(false); }}>
                                                            <entry.icon size={18} className="cat-icon" strokeWidth={1.5} />
                                                            <span>{entry.label}</span>
                                                        </button>
                                                        {entry.type === 'group' && entry.items.map((sub) => (
                                                            <button key={sub} type="button" className="cat-sub-item"
                                                                onClick={() => { setSearchQuery(sub); setShowCategoryDropdown(false); }}>
                                                                {sub}
                                                            </button>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── Location Dropdown ── */}
                            {showLocationDropdown && (
                                <div ref={locDropRef} className="search-dropdown location-dropdown">
                                    <div className="loc-tabs">
                                        <button type="button" className={`loc-tab ${locationTab === 'departamento' ? 'active' : ''}`}
                                            onClick={() => setLocationTab('departamento')}>Departamento</button>
                                        <button type="button" className={`loc-tab ${locationTab === 'internacional' ? 'active' : ''}`}
                                            onClick={() => setLocationTab('internacional')}>Internacional</button>
                                    </div>

                                    {locationTab === 'departamento' && (
                                        <div className="loc-list">
                                            {filteredDepts.length > 0 ? filteredDepts.map((dept) => (
                                                <button key={dept} type="button" className="loc-item"
                                                    onClick={() => { setLocationQuery(dept); setShowLocationDropdown(false); }}>
                                                    {dept}
                                                </button>
                                            )) : (
                                                <p className="search-dropdown-empty">No se encontraron departamentos</p>
                                            )}
                                        </div>
                                    )}

                                    {locationTab === 'internacional' && (
                                        <div className="loc-intl">
                                            {[
                                                { label: 'América', countries: ['Argentina', 'Chile', 'Brasil'] },
                                                { label: 'Europa', countries: ['España', 'Italia', 'Francia'] },
                                            ].map(({ label, countries }) => {
                                                const isOpen = openContinents.includes(label);
                                                return (
                                                    <div key={label}>
                                                        <button type="button" className="loc-intl-header"
                                                            onClick={() => setOpenContinents((prev: string[]) =>
                                                                isOpen ? prev.filter((c: string) => c !== label) : [...prev, label]
                                                            )}>
                                                            <span>{label}</span>
                                                            <span className={`loc-chevron ${isOpen ? 'open' : ''}`}>&#8250;</span>
                                                        </button>
                                                        {isOpen && countries.map((pais) => (
                                                            <button key={pais} type="button" className="loc-item loc-item-sub"
                                                                onClick={() => { setLocationQuery(pais); setShowLocationDropdown(false); }}>
                                                                {pais}
                                                            </button>
                                                        ))}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* Planning Section */}
            <section className="planning-section container">
                <div className="bodas-header">
                    <h2>Disfruta organizando tu boda</h2>
                    <p>Empieza a planificar tu boda con nosotros ¡es gratis!</p>
                </div>

                <div className="planning-cards-grid">
                    <div className="planning-row-top">
                        <Link to="/directorio" className="planning-card wide-card">
                            <div className="card-bg-img">
                                <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800" alt="Espacios" />
                            </div>
                            <div className="card-content-curved">
                                <h3>Espacios de celebración</h3>
                                <p>Fotos, opiniones y mucho más... ¡contáctalos desde aquí!</p>
                                <span className="card-link">Busca espacios</span>
                            </div>
                        </Link>

                        <Link to="/directorio" className="planning-card wide-card">
                            <div className="card-bg-img">
                                <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800" alt="Proveedores" />
                            </div>
                            <div className="card-content-curved">
                                <h3>Proveedores</h3>
                                <p>Encuentra a los mejores profesionales de tu zona para cada categoría</p>
                                <span className="card-link">Empieza tu selección</span>
                            </div>
                        </Link>
                    </div>

                    <div className="planning-row-bottom">
                        <Link to="/tools/web" className="planning-card small-card">
                            <div className="card-content">
                                <h3>Tu web de boda ¡gratis!</h3>
                                <p>Comparte los detalles del gran día con tus invitados con una web 100% personalizada</p>
                                <span className="card-link">Personaliza tu web gratis</span>
                            </div>
                            <div className="card-icon">💻</div>
                        </Link>

                        <Link to="/ideas" className="planning-card small-card">
                            <div className="card-content">
                                <h3>Toda la inspiración</h3>
                                <p>Tendencias, ideas, novedades...toda la inspiración que necesitas para tu boda</p>
                                <span className="card-link">Inspírate aquí</span>
                            </div>
                            <div className="card-icon">💡</div>
                        </Link>

                        <Link to="/tools/planner" className="planning-card small-card">
                            <div className="card-content">
                                <h3>Menú de planificación</h3>
                                <p>Todo bajo control: Lista de tareas, Presupuestador, Organizador de mesas y ¡mucho más!</p>
                                <span className="card-link">Descubre tu planificador</span>
                            </div>
                            <div className="card-icon">📋</div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
