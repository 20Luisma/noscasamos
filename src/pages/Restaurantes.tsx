import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Users, UtensilsCrossed, Zap, Tag, ChevronDown, ChevronUp, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User } from 'lucide-react';
import './Restaurantes.css';

/* ─── Search Data ────────────────────────────────────────────── */
const CATEGORY_COLUMNS = [
    [
        {
            type: 'group' as const,
            label: 'Lugares para Boda',
            icon: HomeIcon,
            items: ['Estancias & Campos', 'Hoteles', 'Salones de Fiesta', 'Restaurantes', 'Bodas en la playa', 'Espacios singulares'],
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
const RESTAURANTES = [
    {
        id: 1,
        nombre: 'Parador La Huella',
        ubicacion: 'José Ignacio, Maldonado',
        rating: 5.0, reviews: 84,
        descripcion: 'Frente al mar en José Ignacio, La Huella es uno de los restaurantes más reconocidos de Uruguay. Con una atmósfera rústica y sofisticada a la vez, su cocina a la parrilla y leña convierte cada evento en una experiencia gastronómica única e irrepetible.',
        precio: 'Desde $1.800 pp',
        capacidad: '40 a 200',
        promociones: 2,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 2,
        nombre: 'Jacinto Restaurante',
        ubicacion: 'Ciudad Vieja, Montevideo',
        rating: 4.9, reviews: 63,
        descripcion: 'En el corazón histórico de Montevideo, Jacinto combina la arquitectura colonial con una propuesta gastronómica contemporánea. Sus salones privados y su terraza son el escenario perfecto para celebraciones íntimas y elegantes.',
        precio: 'Desde $1.200 pp',
        capacidad: '20 a 120',
        promociones: 1,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 3,
        nombre: 'Virazón',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 4.8, reviews: 51,
        descripcion: 'A pasos de la famosa Mano de Punta del Este, Virazón ofrece una propuesta gourmet frente al mar. Sus menús personalizados de boda y el servicio de catering de primer nivel lo convierten en una elección de lujo para tu gran día.',
        precio: 'Desde $2.100 pp',
        capacidad: '60 a 300',
        promociones: 0,
        responde: false,
        imgs: [
            'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 4,
        nombre: 'Lo de Tere',
        ubicacion: 'Mercado del Puerto, Montevideo',
        rating: 4.7, reviews: 119,
        descripcion: 'Tradición y sabor en el emblemático Mercado del Puerto. Lo de Tere adapta su icónico ambiente de parrillada a eventos privados de boda, con una cocina uruguaya auténtica que enamora a propios y turistas por igual.',
        precio: 'Desde $900 pp',
        capacidad: '30 a 180',
        promociones: 3,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 5,
        nombre: 'Gran Hotel Colonia',
        ubicacion: 'Colonia del Sacramento',
        rating: 4.9, reviews: 37,
        descripcion: 'El restaurante del Gran Hotel Colonia fusiona la arquitectura colonial de la ciudad patrimonio de la humanidad con una cocina refinada de autor. El claustro y sus jardines crean un ambiente de cuento para bodas pequeñas y exclusivas.',
        precio: 'Desde $1.600 pp',
        capacidad: '20 a 100',
        promociones: 1,
        responde: false,
        imgs: [
            'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 6,
        nombre: 'La Bourgogne',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 5.0, reviews: 28,
        descripcion: 'El único restaurante galardonado con las máximas distinciones culinarias en el Uruguay. La Bourgogne ofrece una experiencia gastronómica de alta cocina francesa para bodas de lujo en un ambiente íntimo y sofisticado.',
        precio: 'Desde $3.200 pp',
        capacidad: '10 a 80',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 7,
        nombre: 'Restó del Lago',
        ubicacion: 'Carrasco, Montevideo',
        rating: 4.6, reviews: 45,
        descripcion: 'Ubicado junto al lago del Parque Miramar en Carrasco, este restaurante ofrece vistas panorámicas al agua y jardines impecablemente cuidados. Perfecto para bodas al aire libre y banquetes en sus amplios salones.',
        precio: 'Desde $1.000 pp',
        capacidad: '50 a 400',
        promociones: 2,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 8,
        nombre: 'Club de Golf del Uruguay',
        ubicacion: 'Punta Carretas, Montevideo',
        rating: 4.8, reviews: 22,
        descripcion: 'El restaurante del Club de Golf del Uruguay combina la elegancia de un club privado con las vistas verdes del campo de golf. Sus salones históricos y jardines ofrecen un marco incomparable para bodas sofisticadas.',
        precio: 'Desde $1.400 pp',
        capacidad: '40 a 250',
        promociones: 1,
        responde: false,
        imgs: [
            'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=420&fit=crop',
        ],
    },
];

const PRICE_RANGES = ['Menos de $800 pp', '$800 - $1.200 pp', '$1.200 - $1.800 pp', '$1.800 - $2.500 pp', 'Más de $2.500 pp'];
const GUEST_RANGES = ['0 - 49', '50 - 99', '100 - 199', '200 - 299', '300+'];
const LOCATION_TYPES = ['Cerca del mar', 'En la ciudad', 'En el campo', 'Centro histórico', 'A las afueras'];
const SPACES = ['Terraza', 'Zona ajardinada', 'Zona de baile', 'Salón privado', 'Parking', 'Piscina', 'Cocina a la vista'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function Restaurantes() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    // Sidebar filter open states
    const [openSections, setOpenSections] = useState<string[]>(['lugarBoda', 'precio', 'invitados']);

    // Search state
    const [searchQuery, setSearchQuery] = useState('Restaurantes');
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

    const toggleFav = (id: number) =>
        setFavs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const toggleSection = (key: string) =>
        setOpenSections(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

    const isOpen = (key: string) => openSections.includes(key);

    const setImg = (restId: number, idx: number) =>
        setActiveImgs(prev => ({ ...prev, [restId]: idx }));

    return (
        <div className="rest-page">

            {/* ── HERO ── */}
            <section className="rest-hero">
                <div className="rest-hero-left">
                    <nav className="rest-breadcrumb">
                        <Link to="/">Inicio</Link>
                        <span>/</span>
                        <Link to="/espacios">Lugares para Boda</Link>
                        <span>/</span>
                        <strong>Restaurantes</strong>
                    </nav>
                    <h1 className="rest-hero-title">Restaurantes para boda en Uruguay</h1>

                    {/* ── Search bar (con dropdowns igual que Home) ── */}
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

                    <p className="rest-hero-desc">
                        ¿Querés el mejor restaurante para tu boda en Uruguay? Aquí tenés opciones perfectas para tu gran día.
                        Compará menús y precios para que todo encaje en tu presupuesto y hacé que tu celebración sea única.
                    </p>
                </div>
                <div className="rest-hero-right">
                    <img
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=560&fit=crop"
                        alt="Restaurante de boda en Uruguay"
                        className="rest-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY: sidebar + listing ── */}
            <div className="rest-body container">

                {/* ── SIDEBAR ── */}
                <aside className="rest-sidebar">
                    {/* Clear filters */}
                    <button className="rest-clear-filters">Borrar filtros</button>

                    {/* Lugares para Boda */}
                    <div className="rest-filter-group">
                        <button className="rest-filter-toggle" onClick={() => toggleSection('lugarBoda')}>
                            <span>Lugares para Boda</span>
                            {isOpen('lugarBoda') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('lugarBoda') && (
                            <div className="rest-filter-body">
                                {['Fincas', 'Masías', 'Hoteles', 'Restaurantes', 'Salones de boda', 'Catering', 'Bodegas', 'Espacios singulares', 'Bodas playa'].map(item => (
                                    <label key={item} className={`rest-checkbox ${item === 'Restaurantes' ? 'checked' : ''}`}>
                                        <input type="checkbox" defaultChecked={item === 'Restaurantes'} />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Filtros destacados */}
                    <div className="rest-filter-group">
                        <button className="rest-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <span>Filtros destacados</span>
                            {isOpen('destacados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destacados') && (
                            <div className="rest-filter-body">
                                <label className="rest-checkbox">
                                    <input type="checkbox" />
                                    🏷 Promociones
                                </label>
                                <label className="rest-checkbox">
                                    <input type="checkbox" />
                                    ⚡ Responde en 24 h
                                </label>
                                <label className="rest-checkbox">
                                    <input type="checkbox" />
                                    🏆 Ganadores Wedding Awards
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Precio */}
                    <div className="rest-filter-group">
                        <button className="rest-filter-toggle" onClick={() => toggleSection('precio')}>
                            <span>Precio</span>
                            {isOpen('precio') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('precio') && (
                            <div className="rest-filter-body">
                                <div className="rest-price-tabs">
                                    <button className="rest-price-tab active">Menú por persona</button>
                                    <button className="rest-price-tab">Alquiler del espacio</button>
                                </div>
                                {PRICE_RANGES.map(p => (
                                    <label key={p} className="rest-checkbox">
                                        <input type="checkbox" />
                                        {p}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Número de invitados */}
                    <div className="rest-filter-group">
                        <button className="rest-filter-toggle" onClick={() => toggleSection('invitados')}>
                            <span>Número de invitados</span>
                            {isOpen('invitados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('invitados') && (
                            <div className="rest-filter-body">
                                {GUEST_RANGES.map(g => (
                                    <label key={g} className="rest-checkbox">
                                        <input type="checkbox" />
                                        {g}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tipo de ubicación */}
                    <div className="rest-filter-group">
                        <button className="rest-filter-toggle" onClick={() => toggleSection('ubicacion')}>
                            <span>Tipo de ubicación</span>
                            {isOpen('ubicacion') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('ubicacion') && (
                            <div className="rest-filter-body">
                                {LOCATION_TYPES.map(l => (
                                    <label key={l} className="rest-checkbox">
                                        <input type="checkbox" />
                                        {l}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Espacios */}
                    <div className="rest-filter-group">
                        <button className="rest-filter-toggle" onClick={() => toggleSection('espacios')}>
                            <span>Espacios</span>
                            {isOpen('espacios') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('espacios') && (
                            <div className="rest-filter-body">
                                {SPACES.map(s => (
                                    <label key={s} className="rest-checkbox">
                                        <input type="checkbox" />
                                        {s}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>

                {/* ── LISTING ── */}
                <main className="rest-listing">

                    {/* Listing header */}
                    <div className="rest-listing-header">
                        <span className="rest-results-count">{RESTAURANTES.length} RESULTADOS</span>
                        <div className="rest-view-toggle">
                            <button
                                className={`rest-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                                title="Vista lista"
                            >
                                <LayoutList size={18} />
                                Listado
                            </button>
                            <button
                                className={`rest-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                                title="Vista cuadrícula"
                            >
                                <LayoutGrid size={18} />
                                Imágenes
                            </button>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className={`rest-cards ${viewMode === 'grid' ? 'rest-cards--grid' : ''}`}>
                        {RESTAURANTES.map(rest => {
                            const currentImg = activeImgs[rest.id] ?? 0;
                            const isFav = favs.includes(rest.id);
                            return (
                                <article key={rest.id} className="rest-card">
                                    {/* Image section */}
                                    <div className="rest-card-img-wrap">
                                        <img
                                            src={rest.imgs[currentImg]}
                                            alt={rest.nombre}
                                            className="rest-card-img"
                                        />
                                        {/* Dot indicators */}
                                        {rest.imgs.length > 1 && (
                                            <div className="rest-card-dots">
                                                {rest.imgs.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        className={`rest-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(rest.id, i)}
                                                        aria-label={`Imagen ${i + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        {/* Fav button */}
                                        <button
                                            className={`rest-fav-btn ${isFav ? 'active' : ''}`}
                                            onClick={() => toggleFav(rest.id)}
                                            aria-label="Guardar en favoritos"
                                        >
                                            <Heart size={16} fill={isFav ? '#c8264a' : 'none'} stroke={isFav ? '#c8264a' : '#fff'} />
                                        </button>
                                    </div>

                                    {/* Info section */}
                                    <div className="rest-card-info">
                                        <div className="rest-card-info-top">
                                            <div>
                                                <h2 className="rest-card-name">{rest.nombre}</h2>
                                                <div className="rest-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{rest.rating.toFixed(1)}</strong>
                                                    <span>({rest.reviews})</span>
                                                    <span className="rest-card-city">· {rest.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="rest-card-desc">{rest.descripcion}</p>

                                        <div className="rest-card-meta">
                                            <span className="rest-meta-item">
                                                <UtensilsCrossed size={14} />
                                                {rest.precio}
                                            </span>
                                            <span className="rest-meta-item">
                                                <Users size={14} />
                                                {rest.capacidad}
                                            </span>
                                            {rest.promociones > 0 && (
                                                <span className="rest-meta-promo">
                                                    <Tag size={13} />
                                                    {rest.promociones} promoción{rest.promociones > 1 ? 'es' : ''}
                                                </span>
                                            )}
                                        </div>

                                        <div className="rest-card-actions">
                                            <button className="rest-btn-presupuesto">
                                                Solicitar Presupuesto
                                            </button>
                                            {rest.responde && (
                                                <span className="rest-responde">
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
