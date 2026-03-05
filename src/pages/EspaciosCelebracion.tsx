import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Users, Home as HomeIcon, Camera, Music, Car, Flower2, UtensilsCrossed, ClipboardList, Plane, Cake, Gem, Sparkles, Shirt, User } from 'lucide-react';
import './EspaciosCelebracion.css';

/* ─── Search Data (igual que Home) ──────────────────────────────── */
const CATEGORY_COLUMNS = [
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

const URUGUAY_DEPARTMENTS = [
    'Artigas', 'Canelones', 'Cerro Largo', 'Colonia', 'Durazno',
    'Flores', 'Florida', 'Lavalleja', 'Maldonado', 'Montevideo',
    'Paysandú', 'Río Negro', 'Rivera', 'Rocha', 'Salto',
    'San José', 'Soriano', 'Tacuarembó', 'Treinta y Tres',
];

/* ─── Mock Data ──────────────────────────────────────────────── */
const DEPARTAMENTOS = [
    { nombre: 'Montevideo', count: 142, img: 'https://www.wanderlustmagazine.com/wp-content/uploads/2023/11/independance-square-montevideo-uruguay-shutterstock_1434830483-web-scaled.jpg' },
    { nombre: 'Canelones', count: 87, img: 'https://mercociudades.org/wp-content/uploads/2023/05/Atlantida.png' },
    { nombre: 'Maldonado', count: 64, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/f2/47/39/caption.jpg?w=600&h=400&s=1' },
    { nombre: 'Colonia', count: 38, img: 'https://phantom-elmundo.unidadeditorial.es/3ab54e369df6c8f57f35917ea8c6b69a/resize/640/assets/multimedia/imagenes/2020/10/09/16022310845765.jpg' },
    { nombre: 'Rivera', count: 22, img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/d8/cb/5c/caption.jpg?w=500&h=500&s=1' },
    { nombre: 'Salto', count: 19, img: 'https://guiatrotamundo.com/wp-content/uploads/2024/07/pza-33.jpg' },
    { nombre: 'Paysandú', count: 15, img: 'https://urutierra.wordpress.com/wp-content/uploads/2014/02/dscf7144.jpg' },
];

const ESPACIOS = [
    {
        id: 1,
        nombre: 'Estancia La Paz',
        rating: 4.9, reviews: 124,
        ubicacion: 'Canelones',
        capacidad: '50 a 400',
        precio: 'Desde $1.200 pp',
        promociones: 2,
        top: true,
        img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=280&fit=crop',
    },
    {
        id: 2,
        nombre: 'Viña del Valle',
        rating: 4.8, reviews: 89,
        ubicacion: 'Canelones',
        capacidad: '80 a 300',
        precio: 'Desde $980 pp',
        promociones: 1,
        top: true,
        img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=280&fit=crop',
    },
    {
        id: 3,
        nombre: 'Quinta Don Pedro',
        rating: 4.7, reviews: 56,
        ubicacion: 'Montevideo',
        capacidad: '100 a 500',
        precio: 'Desde $850 pp',
        promociones: 0,
        top: true,
        img: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&h=280&fit=crop',
    },
    {
        id: 4,
        nombre: 'Casa de Campo El Bosque',
        rating: 4.6, reviews: 43,
        ubicacion: 'Maldonado',
        capacidad: '30 a 200',
        precio: 'Desde $1.500 pp',
        promociones: 3,
        top: true,
        img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=280&fit=crop',
    },
    {
        id: 5,
        nombre: 'Hotel Boutique Colonial',
        rating: 4.5, reviews: 31,
        ubicacion: 'Colonia',
        capacidad: '20 a 150',
        precio: 'Desde $1.800 pp',
        promociones: 1,
        top: false,
        img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=280&fit=crop',
    },
    {
        id: 6,
        nombre: 'Finca Los Eucaliptos',
        rating: 4.8, reviews: 72,
        ubicacion: 'Canelones',
        capacidad: '60 a 350',
        precio: 'Desde $750 pp',
        promociones: 2,
        top: true,
        img: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=280&fit=crop',
    },
    {
        id: 7,
        nombre: 'Mansión del Lago',
        rating: 4.9, reviews: 98,
        ubicacion: 'Maldonado',
        capacidad: '40 a 250',
        precio: 'Desde $2.100 pp',
        promociones: 0,
        top: true,
        img: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=280&fit=crop',
    },
    {
        id: 8,
        nombre: 'Palacio Santa Teresa',
        rating: 4.7, reviews: 61,
        ubicacion: 'Rivera',
        capacidad: '80 a 600',
        precio: 'Desde $620 pp',
        promociones: 1,
        top: false,
        img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=280&fit=crop',
    },
];

/* ─── Component ──────────────────────────────────────────────── */
export default function EspaciosCelebracion() {
    const [favorites, setFavorites] = useState<number[]>([]);

    // ── Search state (igual que Home) ──
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [locationTab, setLocationTab] = useState<'departamento' | 'internacional'>('departamento');
    const [openContinents, setOpenContinents] = useState<string[]>([]);
    const [locDropPos, setLocDropPos] = useState({ top: 0, left: 0, width: 0, maxHeight: 380 });

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

    const openCategoryDropdown = () => { setShowCategoryDropdown(true); setShowLocationDropdown(false); };
    const openLocationDropdown = () => {
        setShowLocationDropdown(true); setShowCategoryDropdown(false);
        if (locationRef.current) {
            const rect = locationRef.current.getBoundingClientRect();
            setLocDropPos({ top: rect.bottom + 8, left: rect.left, width: 300, maxHeight: 340 });
        }
    };

    const filteredDepts = URUGUAY_DEPARTMENTS.filter(d => d.toLowerCase().includes(locationQuery.toLowerCase()));
    const toggleFav = (id: number) =>
        setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

    return (
        <div className="espacios-page">

            {/* ── HERO ── */}
            <section className="esp-hero">
                <div className="esp-hero-left">
                    <nav className="esp-breadcrumb">
                        <Link to="/">Inicio</Link>
                        <span>/</span>
                        <span>Lugares para Boda</span>
                        <span>/</span>
                        <strong>Espacios de Celebración</strong>
                    </nav>
                    <h1 className="esp-hero-title">Espacios de Celebración en Uruguay</h1>
                    <p className="esp-hero-sub">Más de 380 espacios para elegir en todo el país</p>

                    {/* ── Buscador idéntico al de Home ── */}
                    <form className="hero-search" onSubmit={e => { e.preventDefault(); window.location.href = '/directorio'; }} style={{ position: 'relative' }}>
                        <div className="search-field search-category-wrap" ref={searchRef}>
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Busca por nombre o por categoría"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onFocus={openCategoryDropdown}
                                autoComplete="off"
                            />
                        </div>

                        <div className="search-divider"></div>

                        <div className="search-field search-location search-location-wrap" ref={locationRef}>
                            <span className="location-prefix"><MapPin size={16} strokeWidth={2} /></span>
                            <input
                                type="text"
                                placeholder="Departamento"
                                value={locationQuery}
                                onChange={e => setLocationQuery(e.target.value)}
                                onFocus={openLocationDropdown}
                                autoComplete="off"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary search-btn">Buscar</button>

                        {/* Category Dropdown */}
                        {showCategoryDropdown && (
                            <div ref={catDropRef} className="search-dropdown category-dropdown">
                                <div className="category-dropdown-grid">
                                    {CATEGORY_COLUMNS.map((col, colIdx) => (
                                        <div key={colIdx} className="cat-col">
                                            {col.map(entry => (
                                                <div key={entry.label} className="cat-entry">
                                                    <button type="button" className="cat-header-btn"
                                                        onClick={() => { setSearchQuery(entry.label); setShowCategoryDropdown(false); }}>
                                                        <entry.icon size={18} className="cat-icon" strokeWidth={1.5} />
                                                        <span>{entry.label}</span>
                                                    </button>
                                                    {entry.type === 'group' && entry.items.map(sub => (
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

                        {/* Location Dropdown via Portal */}
                        {showLocationDropdown && createPortal(
                            <div ref={locDropRef} className="search-dropdown location-dropdown"
                                style={{ position: 'fixed', top: locDropPos.top, left: locDropPos.left, width: '280px', maxHeight: locDropPos.maxHeight, zIndex: 99999, display: 'flex', flexDirection: 'column' }}>
                                <div className="loc-tabs">
                                    <button type="button" className={`loc-tab ${locationTab === 'departamento' ? 'active' : ''}`}
                                        onClick={() => setLocationTab('departamento')}>Departamento</button>
                                    <button type="button" className={`loc-tab ${locationTab === 'internacional' ? 'active' : ''}`}
                                        onClick={() => setLocationTab('internacional')}>Internacional</button>
                                </div>
                                {locationTab === 'departamento' && (
                                    <>
                                        <style>{`.loc-scroll::-webkit-scrollbar{width:10px;background:#f5f5f5}.loc-scroll::-webkit-scrollbar-thumb{background:#c8264a;border-radius:5px}`}</style>
                                        <div className="loc-scroll" style={{ maxHeight: '280px', overflowY: 'scroll', overflowX: 'hidden' }}>
                                            {filteredDepts.length > 0 ? filteredDepts.map(dept => (
                                                <button key={dept} type="button" className="loc-item"
                                                    onClick={() => { setLocationQuery(dept); setShowLocationDropdown(false); }}>
                                                    {dept}
                                                </button>
                                            )) : <p className="search-dropdown-empty">No se encontraron departamentos</p>}
                                        </div>
                                    </>
                                )}
                                {locationTab === 'internacional' && (
                                    <div className="loc-intl">
                                        {[{ label: 'América', countries: ['Argentina', 'Chile', 'Brasil'] }, { label: 'Europa', countries: ['España', 'Italia', 'Francia'] }].map(({ label, countries }) => {
                                            const isOpen = openContinents.includes(label);
                                            return (
                                                <div key={label}>
                                                    <button type="button" className="loc-intl-header"
                                                        onClick={() => setOpenContinents(prev => isOpen ? prev.filter(c => c !== label) : [...prev, label])}>
                                                        <span>{label}</span>
                                                        <span className={`loc-chevron ${isOpen ? 'open' : ''}`}>&#8250;</span>
                                                    </button>
                                                    {isOpen && countries.map(pais => (
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
                            </div>,
                            document.body
                        )}
                    </form>
                </div>
                <div className="esp-hero-right">
                    <img
                        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&h=600&fit=crop"
                        alt="Espacio de celebración"
                        className="esp-hero-img"
                    />
                </div>
            </section>

            {/* ── POR DEPARTAMENTO ── */}
            <section className="esp-deptos container">
                <h2 className="esp-section-title">Espacios por departamento</h2>
                <div className="esp-deptos-grid">
                    {DEPARTAMENTOS.map(d => (
                        <Link to="/directorio" key={d.nombre} className="esp-depto-card">
                            <div className="esp-depto-circle">
                                <img src={d.img} alt={d.nombre} />
                            </div>
                            <span className="esp-depto-name">{d.nombre}</span>
                            <span className="esp-depto-count">{d.count} espacios</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── EL ESPACIO DE TUS SUEÑOS ── */}
            <section className="esp-promo">
                <div className="esp-promo-card">
                    <h2>El espacio de tus sueños</h2>
                    <p>Elegí entre cientos de estancias, hoteles, fincas y salones el lugar perfecto para celebrar tu boda en Uruguay.</p>

                </div>
                <div className="esp-promo-img">
                    <img
                        src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=500&fit=crop"
                        alt="Salón de bodas"
                    />
                </div>
            </section>

            {/* ── GRID DE ESPACIOS ── */}
            <section className="esp-grid-section container">
                <h2 className="esp-section-title">Espacios destacados en Uruguay</h2>
                <div className="esp-grid">
                    {ESPACIOS.map(e => (
                        <Link to={`/proveedor/${e.id}`} key={e.id} className="esp-card">
                            <div className="esp-card-img-wrap">
                                <img src={e.img} alt={e.nombre} className="esp-card-img" />
                                {e.top && <span className="esp-badge-top">TOP</span>}
                                <button
                                    className={`esp-fav-btn ${favorites.includes(e.id) ? 'active' : ''}`}
                                    onClick={ev => { ev.preventDefault(); toggleFav(e.id); }}
                                    aria-label="Favorito"
                                >
                                    <Heart size={16} fill={favorites.includes(e.id) ? '#c8264a' : 'none'} stroke={favorites.includes(e.id) ? '#c8264a' : '#666'} />
                                </button>
                            </div>
                            <div className="esp-card-body">
                                <h3 className="esp-card-name">{e.nombre}</h3>
                                <div className="esp-card-rating">
                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                    <strong>{e.rating}</strong>
                                    <span>({e.reviews})</span>
                                    <span className="esp-card-location">· {e.ubicacion}</span>
                                </div>
                                <div className="esp-card-meta">
                                    <span className="esp-meta-item">
                                        <Users size={13} /> {e.capacidad}
                                    </span>
                                    <span className="esp-meta-price">{e.precio}</span>
                                </div>
                                {e.promociones > 0 && (
                                    <span className="esp-promo-badge">🏷 {e.promociones} promoción{e.promociones > 1 ? 'es' : ''}</span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    );
}
