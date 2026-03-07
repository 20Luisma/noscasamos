import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Users, UtensilsCrossed, Zap, Tag, ChevronDown, ChevronUp, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User, Waves } from 'lucide-react';
import './BodasPlaya.css';

/* ─── Search Data ────────────────────────────────────────────── */
const CATEGORY_COLUMNS = [
    [
        {
            type: 'group' as const,
            label: 'Lugares para Boda',
            icon: HomeIcon,
            items: ['Estancias & Campos', 'Hoteles', 'Salones de Fiesta', 'Restaurantes', 'Bodegas', 'Bodas en la playa'],
        },
        { type: 'item' as const, label: 'Catering', icon: UtensilsCrossed },
        { type: 'item' as const, label: 'Invitaciones de boda', icon: Tag },
        { type: 'item' as const, label: 'Organización de bodas', icon: Tag },
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

/* ─── Data ──────────────────────────────────────────────────── */
const BARES_PLAYA = [
    {
        id: 1,
        nombre: 'Parador La Huella',
        ubicacion: 'José Ignacio, Maldonado',
        rating: 5.0, reviews: 145,
        descripcion: 'Situado directamente en la playa Brava de José Ignacio, La Huella ofrece el escenario más distintivo y codiciado para una boda junto al mar en Sudamérica. Combina un ambiente chic descontracturado con fuegos, madera y el mejor sushi y parrilla del este.',
        precio: 'Desde $3.500 pp',
        capacidad: '80 a 300',
        promociones: 0,
        responde: true,
        imgs: [
            'https://www.revistabodas.com.uy/wp-content/uploads/2024/04/la-sonada-ceremonia-al-aire-libre-1.jpg',
            'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 2,
        nombre: 'Ocean Club',
        ubicacion: 'Playa Mansa, Punta del Este',
        rating: 4.8, reviews: 92,
        descripcion: 'Con vistas privilegiadas a la Isla Gorriti y unos atardeceres inolvidables, Ocean Club es el espacio perfecto para una boda en la arena. Ofrece enormes decks de madera y carpas beduinas modernas para celebrar literalmente sobre la playa.',
        precio: 'Desde $2.200 pp',
        capacidad: '50 a 400',
        promociones: 2,
        responde: true,
        imgs: [
            'https://www.revistabodas.com.uy/wp-content/uploads/2023/08/grand-hotel-salones-de-fiesta-en-punta-del-este.jpg',
            'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 3,
        nombre: 'Mia Bistró',
        ubicacion: 'Parada 19 Mansa, Maldonado',
        rating: 4.9, reviews: 68,
        descripcion: 'Mia Bistró es un parador romántico y bohemio escondido entre las dunas de la Playa Mansa. Especializado en bodas íntimas (micro-weddings), destaca por su decoración boho-chic y su gastronomía mediterránea fresca.',
        precio: 'Desde $1.900 pp',
        capacidad: '30 a 120',
        promociones: 1,
        responde: true,
        imgs: [
            'https://www.revistabodas.com.uy/wp-content/uploads/2023/10/solanas-salon-de-fiestas-en-punta-del-este-10-800x600.jpg',
            'https://images.unsplash.com/photo-1520183802803-06f731a2059f?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 4,
        nombre: 'Bagatelle Beach Punta',
        ubicacion: 'Manantiales, Maldonado',
        rating: 4.7, reviews: 45,
        descripcion: 'Trayendo el auténtico estilo de la Riviera Francesa a Manantiales, Bagatelle es sinónimo de lujo y fiesta vibrante frente al mar. Ideal para parejas jóvenes que buscan una boda diferente con música, champagne y vistas oceánicas únicas.',
        precio: 'Desde $4.000 pp',
        capacidad: '100 a 450',
        promociones: 0,
        responde: false,
        imgs: [
            'https://www.revistabodas.com.uy/wp-content/uploads/2019/11/IMG_1236-800x600.jpg',
            'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 5,
        nombre: 'I\'marangatú Beach',
        ubicacion: 'Parada 7 Mansa, Punta del Este',
        rating: 4.6, reviews: 112,
        descripcion: 'Totalmente renovado, este clásico parador ofrece salones vidriados modernos casi sobre el agua. Su infraestructura permite celebrar bodas en la playa durante todo el año, sin preocuparse por el clima, con una postal perfecta de fondo.',
        precio: 'Desde $2.100 pp',
        capacidad: '60 a 250',
        promociones: 3,
        responde: true,
        imgs: [
            'https://www.revistabodas.com.uy/wp-content/uploads/2020/02/salon-de-fiestas-bodega-spinoglio.jpg',
            'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 6,
        nombre: 'Las Garzas',
        ubicacion: 'Ruta 10, Rocha',
        rating: 4.9, reviews: 31,
        descripcion: 'Ubicado en las costas salvajes de Rocha, el Beach Club de Las Garzas ofrece privacidad absoluta entre kilómetros de playa virgen. Una propuesta exclusiva para bodas de destino, donde el diseño del arquitecto Mathias Klotz se funde con la inmensidad del océano.',
        precio: 'Desde $3.200 pp',
        capacidad: '40 a 200',
        promociones: 0,
        responde: true,
        imgs: [
            'https://www.revistabodas.com.uy/wp-content/uploads/2020/04/Celia-y-Jaime-21SLIDE-e1586401049140-600x400.jpg',
            'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 7,
        nombre: 'La Caracola',
        ubicacion: 'Laguna Garzón, Maldonado',
        rating: 5.0, reviews: 42,
        descripcion: 'Accesible únicamente en bote a través de la laguna, La Caracola es el espacio playero más reservado y mágico de Uruguay. Rodeado de agua y dunas, es el secreto mejor guardado para ceremonias bohemias de alto nivel.',
        precio: 'Desde $3.800 pp',
        capacidad: '50 a 150',
        promociones: 0,
        responde: false,
        imgs: [
            'https://s.ineventos.com/uy/2023/12/130329/finca-del-sacramento-339278-i-480w.jpg',
            'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 8,
        nombre: 'OVO Beach',
        ubicacion: 'Frente a Enjoy, Punta del Este',
        rating: 4.5, reviews: 87,
        descripcion: 'Perteneciente al icónico hotel Enjoy Punta del Este, OVO Beach ofrece el mix ideal entre servicios de hotel 5 estrellas y la frescura de estar sobre la arena. Diseñado al estilo Saint-Tropez para bodas vibrantes con las mejores puestas de sol.',
        precio: 'Desde $2.500 pp',
        capacidad: '100 a 400',
        promociones: 2,
        responde: true,
        imgs: [
            'https://playaescondida.uy/static/eede831236ae53b03bb61f219769760b/00599/casamiento_exterior_7.jpg',
            'https://images.unsplash.com/photo-1505236858219-8373dd707522?w=800&h=560&fit=crop',
        ],
    },
];

const PRICE_RANGES = ['Menos de $1.500 pp', '$1.500 - $2.500 pp', '$2.500 - $3.500 pp', 'Más de $3.500 pp'];
const GUEST_RANGES = ['0 - 49', '50 - 99', '100 - 199', '200 - 299', '300+'];
const LOCATION_TYPES = ['En la playa', 'Con vista al mar', 'Cerrojo/Privado', 'Acceso por barco', 'En complejo hotelero'];
const SPACES = ['Terrazas/Decks', 'Playa privada', 'Salón vidriado', 'Carpas beduinas', 'Zona de fogones', 'Pista de baile'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function BodasPlaya() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['lugarBoda', 'precio', 'invitados']);
    const [searchQuery, setSearchQuery] = useState('Bodas en la playa');
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
            const inCat = searchRef.current?.contains(e.target as Node) || catDropRef.current?.contains(e.target as Node);
            if (!inCat) setShowCategoryDropdown(false);
            const inLoc = locationRef.current?.contains(e.target as Node) || locDropRef.current?.contains(e.target as Node);
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
    const toggleFav = (id: number) => setFavs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    const toggleSection = (key: string) => setOpenSections(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    const isOpen = (key: string) => openSections.includes(key);
    const setImg = (playaId: number, idx: number) => setActiveImgs(prev => ({ ...prev, [playaId]: idx }));

    return (
        <div className="playa-page">
            {/* ── HERO ── */}
            <section className="playa-hero">
                <div className="playa-hero-left">
                    <nav className="playa-breadcrumb">
                        <Link to="/">Inicio</Link>
                        <span>/</span>
                        <Link to="/espacios">Lugares para Boda</Link>
                        <span>/</span>
                        <strong>Bodas en la playa</strong>
                    </nav>
                    <h1 className="playa-hero-title">Bodas en la playa en Uruguay</h1>

                    <form className="hero-search" onSubmit={e => e.preventDefault()} style={{ position: 'relative' }}>
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
                                            const isOpen2 = openContinents.includes(label);
                                            return (
                                                <div key={label}>
                                                    <button type="button" className="loc-intl-header"
                                                        onClick={() => setOpenContinents(prev => isOpen2 ? prev.filter(c => c !== label) : [...prev, label])}>
                                                        <span>{label}</span>
                                                        <span className={`loc-chevron ${isOpen2 ? 'open' : ''}`}>&#8250;</span>
                                                    </button>
                                                    {isOpen2 && countries.map(pais => (
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

                    <p className="playa-hero-desc">
                        Casate sintiendo la arena en tus pies y el sonido del mar. Los mejores paradores y beach clubs de la costa
                        uruguaya (Maldonado, Rocha, Canelones) ofrecen escenarios de ensueño para jurarse amor eterno frente al océano.
                    </p>
                </div>
                <div className="playa-hero-right">
                    <img
                        src="https://www.revistabodas.com.uy/wp-content/uploads/2024/04/la-sonada-ceremonia-al-aire-libre-1.jpg"
                        alt="Boda en la playa en Uruguay"
                        className="playa-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="playa-body container">

                {/* ── SIDEBAR ── */}
                <aside className="playa-sidebar">
                    <button className="playa-clear-filters">Borrar filtros</button>

                    <div className="playa-filter-group">
                        <button className="playa-filter-toggle" onClick={() => toggleSection('lugarBoda')}>
                            <span>Lugares para Boda</span>
                            {isOpen('lugarBoda') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('lugarBoda') && (
                            <div className="playa-filter-body">
                                {['Salones de Fiesta', 'Estancias & Campos', 'Hoteles', 'Restaurantes', 'Catering', 'Bodegas', 'Espacios singulares', 'Bodas en la playa'].map(item => (
                                    <label key={item} className={`playa-checkbox ${item === 'Bodas en la playa' ? 'checked' : ''}`}>
                                        <input type="checkbox" defaultChecked={item === 'Bodas en la playa'} />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="playa-filter-group">
                        <button className="playa-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <span>Filtros destacados</span>
                            {isOpen('destacados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destacados') && (
                            <div className="playa-filter-body">
                                <label className="playa-checkbox"><input type="checkbox" />🏷 Promociones</label>
                                <label className="playa-checkbox"><input type="checkbox" />⚡ Responde en 24 h</label>
                                <label className="playa-checkbox"><input type="checkbox" />🏆 Ganadores Wedding Awards</label>
                            </div>
                        )}
                    </div>

                    <div className="playa-filter-group">
                        <button className="playa-filter-toggle" onClick={() => toggleSection('precio')}>
                            <span>Precio</span>
                            {isOpen('precio') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('precio') && (
                            <div className="playa-filter-body">
                                <div className="playa-price-tabs">
                                    <button className="playa-price-tab active">Menú por persona</button>
                                    <button className="playa-price-tab">Alquiler del espacio</button>
                                </div>
                                {PRICE_RANGES.map(p => (
                                    <label key={p} className="playa-checkbox"><input type="checkbox" />{p}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="playa-filter-group">
                        <button className="playa-filter-toggle" onClick={() => toggleSection('invitados')}>
                            <span>Número de invitados</span>
                            {isOpen('invitados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('invitados') && (
                            <div className="playa-filter-body">
                                {GUEST_RANGES.map(g => (
                                    <label key={g} className="playa-checkbox"><input type="checkbox" />{g}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="playa-filter-group">
                        <button className="playa-filter-toggle" onClick={() => toggleSection('ubicacion')}>
                            <span>Tipo de playa</span>
                            {isOpen('ubicacion') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('ubicacion') && (
                            <div className="playa-filter-body">
                                {LOCATION_TYPES.map(l => (
                                    <label key={l} className="playa-checkbox"><input type="checkbox" />{l}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="playa-filter-group">
                        <button className="playa-filter-toggle" onClick={() => toggleSection('espacios')}>
                            <span>Espacios extras</span>
                            {isOpen('espacios') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('espacios') && (
                            <div className="playa-filter-body">
                                {SPACES.map(s => (
                                    <label key={s} className="playa-checkbox"><input type="checkbox" />{s}</label>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>

                {/* ── LISTING ── */}
                <main className="playa-listing">
                    <div className="playa-listing-header">
                        <span className="playa-results-count">{BARES_PLAYA.length} RESULTADOS</span>
                        <div className="playa-view-toggle">
                            <button className={`playa-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`playa-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                        </div>
                    </div>

                    <div className={`playa-cards ${viewMode === 'grid' ? 'playa-cards--grid' : ''}`}>
                        {BARES_PLAYA.map(lugar => {
                            const currentImg = activeImgs[lugar.id] ?? 0;
                            const isFav = favs.includes(lugar.id);
                            return (
                                <article key={lugar.id} className="playa-card">
                                    <div className="playa-card-img-wrap">
                                        <img src={lugar.imgs[currentImg]} alt={lugar.nombre} className="playa-card-img" />
                                        {lugar.imgs.length > 1 && (
                                            <div className="playa-card-dots">
                                                {lugar.imgs.map((_, i) => (
                                                    <button key={i} className={`playa-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(lugar.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`playa-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(lugar.id)} aria-label="Guardar en favoritos">
                                            <Heart size={16} fill={isFav ? '#2cc2d9' : 'none'} stroke={isFav ? '#2cc2d9' : '#fff'} />
                                        </button>
                                    </div>

                                    <div className="playa-card-info">
                                        <div className="playa-card-info-top">
                                            <div>
                                                <h2 className="playa-card-name">{lugar.nombre}</h2>
                                                <div className="playa-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{lugar.rating.toFixed(1)}</strong>
                                                    <span>({lugar.reviews})</span>
                                                    <span className="playa-card-city">· {lugar.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="playa-card-desc">{lugar.descripcion}</p>
                                        <div className="playa-card-meta">
                                            <span className="playa-meta-item"><Waves size={14} />{lugar.precio}</span>
                                            <span className="playa-meta-item"><Users size={14} />{lugar.capacidad}</span>
                                            {lugar.promociones > 0 && (
                                                <span className="playa-meta-promo"><Tag size={13} />{lugar.promociones} promoción{lugar.promociones > 1 ? 'es' : ''}</span>
                                            )}
                                        </div>
                                        <div className="playa-card-actions">
                                            <button className="playa-btn-presupuesto">Solicitar Presupuesto</button>
                                            {lugar.responde && (
                                                <span className="playa-responde">
                                                    <Zap size={13} fill="#f8b400" stroke="#f8b400" />
                                                    Responde en 24 horas
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
}
