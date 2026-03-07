import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Users, Leaf, Zap, Tag, ChevronDown, ChevronUp, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User, UtensilsCrossed } from 'lucide-react';
import './EstanciasCampos.css';

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
const ESTANCIAS = [
    {
        id: 1,
        nombre: 'Estancia La Paz',
        ubicacion: 'Canelones',
        rating: 5.0, reviews: 78,
        descripcion: 'Una estancia de campo clásica uruguaya con más de 200 años de historia. Sus casonas de piedra, jardines centenarios y amplias praderas verdes ofrecen el marco perfecto para bodas campestres de ensueño. La ceremonia bajo los grandes eucaliptos y el banquete en el galpón restaurado son experiencias que quedan grabadas para siempre.',
        precio: 'Desde $2.800 pp',
        capacidad: '50 a 350',
        promociones: 2,
        responde: true,
        imgs: [
            'https://www.revistabodas.com.uy/wp-content/uploads/2026/02/chacra-la-cachimba-salon-de-fiestas-15.jpg',
            'https://chacralaaraucana.uy/wp-content/uploads/2023/05/Casamientos-2.jpg',
        ],
    },
    {
        id: 2,
        nombre: 'Estancia El Ombu',
        ubicacion: 'San José',
        rating: 4.9, reviews: 61,
        descripcion: 'Rodeada de ombúes centenarios y praderas interminables, Estancia El Ombú es sinónimo de autenticidad rural uruguaya. Sus instalaciones renovadas incluyen una casona colonial, piscina, quincho y capacidad para alojar a todos los invitados, haciendo que la fiesta pueda durar todo el fin de semana.',
        precio: 'Desde $2.100 pp',
        capacidad: '40 a 280',
        promociones: 1,
        responde: true,
        imgs: [
            'https://chacralaaraucana.uy/wp-content/uploads/2023/05/Casamientos-2.jpg',
            'https://images.evisos.com.uy/2008/11/02/fotos-de-salones-imagenes-en-fotos-de-chacras_e821774c4_3.jpg',
        ],
    },
    {
        id: 3,
        nombre: 'Estancia Cerro Colorado',
        ubicacion: 'Rivera',
        rating: 4.8, reviews: 43,
        descripcion: 'En el corazón del norte uruguayo, esta estancia de campo ofrece paisajes únicos de cerros colorados y praderas en flor. Sus cabañas de piedra, la pileta de borde infinito y los atardeceres espectaculares crean un ambiente íntimo y mágico para bodas con mucho carácter.',
        precio: 'Desde $1.900 pp',
        capacidad: '30 a 180',
        promociones: 0,
        responde: false,
        imgs: [
            'https://images.evisos.com.uy/2008/11/02/fotos-de-salones-imagenes-en-fotos-de-chacras_e821774c4_3.jpg',
            'https://www.revistabodas.com.uy/wp-content/uploads/2026/02/chacra-la-cachimba-salon-de-fiestas-15.jpg',
        ],
    },
    {
        id: 4,
        nombre: 'Estancia Don Augusto',
        ubicacion: 'Durazno',
        rating: 4.7, reviews: 55,
        descripcion: 'Con más de 1.500 hectáreas de campo ganadero, Estancia Don Augusto combina la pureza de la naturaleza uruguaya con la hospitalidad criolla. Su casco histórico, los corrales de piedra y la capilla privada del siglo XIX hacen de este lugar un destino único para bodas de campo auténticas.',
        precio: 'Desde $1.600 pp',
        capacidad: '60 a 400',
        promociones: 3,
        responde: true,
        imgs: [
            'https://www.revistabodas.com.uy/wp-content/uploads/2019/09/webSpa-10-1.jpg',
            'https://chacralaaraucana.uy/wp-content/uploads/2023/05/Casamientos-2.jpg',
        ],
    },
    {
        id: 5,
        nombre: 'Estancia La Sirena',
        ubicacion: 'Colonia del Sacramento',
        rating: 4.9, reviews: 34,
        descripcion: 'A orillas del Río de la Plata, Estancia La Sirena fusiona el paisaje fluvial con la elegancia campestre. Sus amplias terrazas con vista al río, las habitaciones boutique en la casona y el jardín frente al agua hacen de cada boda un espectáculo visual inigualable.',
        precio: 'Desde $3.200 pp',
        capacidad: '20 a 150',
        promociones: 1,
        responde: true,
        imgs: [
            'https://chacralaaraucana.uy/wp-content/uploads/2023/05/Casamientos-2.jpg',
            'https://www.revistabodas.com.uy/wp-content/uploads/2026/02/chacra-la-cachimba-salon-de-fiestas-15.jpg',
        ],
    },
    {
        id: 6,
        nombre: 'Estancia San Pedro de Timote',
        ubicacion: 'Florida',
        rating: 4.8, reviews: 29,
        descripcion: 'Ganadora de múltiples premios turísticos, San Pedro de Timote es una de las estancias más reconocidas de Uruguay. Sus instalaciones de primer nivel, la pileta de borde infinito, el restaurante con cocina de autor y las actividades ecuestres la convierten en un destino completo para una boda fin de semana.',
        precio: 'Desde $2.500 pp',
        capacidad: '30 a 200',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.evisos.com.uy/2008/11/02/fotos-de-salones-imagenes-en-fotos-de-chacras_e821774c4_3.jpg',
            'https://www.revistabodas.com.uy/wp-content/uploads/2019/09/webSpa-10-1.jpg',
        ],
    },
    {
        id: 7,
        nombre: 'Estancia Guardia del Monte',
        ubicacion: 'Tacuarembó',
        rating: 4.6, reviews: 47,
        descripcion: 'En el interior profundo de Uruguay, Guardia del Monte ofrece una experiencia de campo auténtica y salvaje. Sus montes nativos, las cañadas con desniveles y las praderas florecidas en primavera crean escenarios naturales de película para las fotos de boda más espectaculares.',
        precio: 'Desde $1.300 pp',
        capacidad: '40 a 300',
        promociones: 2,
        responde: false,
        imgs: [
            'https://www.revistabodas.com.uy/wp-content/uploads/2019/09/webSpa-10-1.jpg',
            'https://images.evisos.com.uy/2008/11/02/fotos-de-salones-imagenes-en-fotos-de-chacras_e821774c4_3.jpg',
        ],
    },
    {
        id: 8,
        nombre: 'Estancia El Cardal',
        ubicacion: 'Rocha',
        rating: 4.7, reviews: 38,
        descripcion: 'Cercana a las lagunas y playas vírgenes de Rocha, Estancia El Cardal une la magia de la naturaleza costera con la calidez de un campo bien cuidado. Perfecta para parejas que sueñan con una boda entre mar y campo, con atardeceres únicos y un cielo estrellado impresionante.',
        precio: 'Desde $1.800 pp',
        capacidad: '35 a 250',
        promociones: 1,
        responde: true,
        imgs: [
            'https://www.revistabodas.com.uy/wp-content/uploads/2026/02/chacra-la-cachimba-salon-de-fiestas-15.jpg',
            'https://www.revistabodas.com.uy/wp-content/uploads/2019/09/webSpa-10-1.jpg',
        ],
    },
];

const PRICE_RANGES = ['Menos de $1.000 pp', '$1.000 - $1.800 pp', '$1.800 - $2.500 pp', '$2.500 - $3.500 pp', 'Más de $3.500 pp'];
const GUEST_RANGES = ['0 - 49', '50 - 99', '100 - 199', '200 - 299', '300+'];
const LOCATION_TYPES = ['Cerca del río', 'Junto al mar', 'En el interior', 'Con serranía', 'Con laguna'];
const SPACES = ['Galpón restaurado', 'Jardín exterior', 'Capilla privada', 'Piscina', 'Caballerizas', 'Alojamiento en estancia', 'Parking'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function EstanciasCampos() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['lugarBoda', 'precio', 'invitados']);

    const [searchQuery, setSearchQuery] = useState('Estancias & Campos');
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

    const setImg = (estanciaId: number, idx: number) =>
        setActiveImgs(prev => ({ ...prev, [estanciaId]: idx }));

    return (
        <div className="est-page">

            {/* ── HERO ── */}
            <section className="est-hero">
                <div className="est-hero-left">
                    <nav className="est-breadcrumb">
                        <Link to="/">Inicio</Link>
                        <span>/</span>
                        <Link to="/espacios">Lugares para Boda</Link>
                        <span>/</span>
                        <strong>Estancias & Campos</strong>
                    </nav>
                    <h1 className="est-hero-title">Estancias & Campos para boda en Uruguay</h1>

                    {/* ── Search bar ── */}
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

                    <p className="est-hero-desc">
                        Encontrá la estancia perfecta para tu boda en Uruguay. Con paisajes únicos, casonas históricas y toda
                        la calidez del campo uruguayo, estas estancias harán de tu gran día una experiencia completamente inolvidable.
                    </p>
                </div>
                <div className="est-hero-right">
                    <img
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=560&fit=crop"
                        alt="Estancia para boda en Uruguay"
                        className="est-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY: sidebar + listing ── */}
            <div className="est-body container">

                {/* ── SIDEBAR ── */}
                <aside className="est-sidebar">
                    <button className="est-clear-filters">Borrar filtros</button>

                    {/* Lugares para Boda */}
                    <div className="est-filter-group">
                        <button className="est-filter-toggle" onClick={() => toggleSection('lugarBoda')}>
                            <span>Lugares para Boda</span>
                            {isOpen('lugarBoda') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('lugarBoda') && (
                            <div className="est-filter-body">
                                {['Estancias & Campos', 'Fincas', 'Hoteles', 'Restaurantes', 'Salones de boda', 'Catering', 'Bodegas', 'Espacios singulares', 'Bodas playa'].map(item => (
                                    <label key={item} className={`est-checkbox ${item === 'Estancias & Campos' ? 'checked' : ''}`}>
                                        <input type="checkbox" defaultChecked={item === 'Estancias & Campos'} />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Filtros destacados */}
                    <div className="est-filter-group">
                        <button className="est-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <span>Filtros destacados</span>
                            {isOpen('destacados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destacados') && (
                            <div className="est-filter-body">
                                <label className="est-checkbox">
                                    <input type="checkbox" />
                                    🏷 Promociones
                                </label>
                                <label className="est-checkbox">
                                    <input type="checkbox" />
                                    ⚡ Responde en 24 h
                                </label>
                                <label className="est-checkbox">
                                    <input type="checkbox" />
                                    🏆 Ganadores Wedding Awards
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Precio */}
                    <div className="est-filter-group">
                        <button className="est-filter-toggle" onClick={() => toggleSection('precio')}>
                            <span>Precio</span>
                            {isOpen('precio') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('precio') && (
                            <div className="est-filter-body">
                                <div className="est-price-tabs">
                                    <button className="est-price-tab active">Menú por persona</button>
                                    <button className="est-price-tab">Alquiler del espacio</button>
                                </div>
                                {PRICE_RANGES.map(p => (
                                    <label key={p} className="est-checkbox">
                                        <input type="checkbox" />
                                        {p}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Número de invitados */}
                    <div className="est-filter-group">
                        <button className="est-filter-toggle" onClick={() => toggleSection('invitados')}>
                            <span>Número de invitados</span>
                            {isOpen('invitados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('invitados') && (
                            <div className="est-filter-body">
                                {GUEST_RANGES.map(g => (
                                    <label key={g} className="est-checkbox">
                                        <input type="checkbox" />
                                        {g}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tipo de ubicación */}
                    <div className="est-filter-group">
                        <button className="est-filter-toggle" onClick={() => toggleSection('ubicacion')}>
                            <span>Tipo de ubicación</span>
                            {isOpen('ubicacion') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('ubicacion') && (
                            <div className="est-filter-body">
                                {LOCATION_TYPES.map(l => (
                                    <label key={l} className="est-checkbox">
                                        <input type="checkbox" />
                                        {l}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Espacios */}
                    <div className="est-filter-group">
                        <button className="est-filter-toggle" onClick={() => toggleSection('espacios')}>
                            <span>Espacios</span>
                            {isOpen('espacios') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('espacios') && (
                            <div className="est-filter-body">
                                {SPACES.map(s => (
                                    <label key={s} className="est-checkbox">
                                        <input type="checkbox" />
                                        {s}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>

                {/* ── LISTING ── */}
                <main className="est-listing">

                    {/* Listing header */}
                    <div className="est-listing-header">
                        <span className="est-results-count">{ESTANCIAS.length} RESULTADOS</span>
                        <div className="est-view-toggle">
                            <button
                                className={`est-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                                title="Vista lista"
                            >
                                <LayoutList size={18} />
                                Listado
                            </button>
                            <button
                                className={`est-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                                title="Vista cuadrícula"
                            >
                                <LayoutGrid size={18} />
                                Imágenes
                            </button>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className={`est-cards ${viewMode === 'grid' ? 'est-cards--grid' : ''}`}>
                        {ESTANCIAS.map(estancia => {
                            const currentImg = activeImgs[estancia.id] ?? 0;
                            const isFav = favs.includes(estancia.id);
                            return (
                                <article key={estancia.id} className="est-card">
                                    {/* Image section */}
                                    <div className="est-card-img-wrap">
                                        <img
                                            src={estancia.imgs[currentImg]}
                                            alt={estancia.nombre}
                                            className="est-card-img"
                                        />
                                        {estancia.imgs.length > 1 && (
                                            <div className="est-card-dots">
                                                {estancia.imgs.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        className={`est-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(estancia.id, i)}
                                                        aria-label={`Imagen ${i + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        <button
                                            className={`est-fav-btn ${isFav ? 'active' : ''}`}
                                            onClick={() => toggleFav(estancia.id)}
                                            aria-label="Guardar en favoritos"
                                        >
                                            <Heart size={16} fill={isFav ? '#c8264a' : 'none'} stroke={isFav ? '#c8264a' : '#fff'} />
                                        </button>
                                    </div>

                                    {/* Info section */}
                                    <div className="est-card-info">
                                        <div className="est-card-info-top">
                                            <div>
                                                <h2 className="est-card-name">{estancia.nombre}</h2>
                                                <div className="est-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{estancia.rating.toFixed(1)}</strong>
                                                    <span>({estancia.reviews})</span>
                                                    <span className="est-card-city">· {estancia.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="est-card-desc">{estancia.descripcion}</p>

                                        <div className="est-card-meta">
                                            <span className="est-meta-item">
                                                <Leaf size={14} />
                                                {estancia.precio}
                                            </span>
                                            <span className="est-meta-item">
                                                <Users size={14} />
                                                {estancia.capacidad}
                                            </span>
                                            {estancia.promociones > 0 && (
                                                <span className="est-meta-promo">
                                                    <Tag size={13} />
                                                    {estancia.promociones} promoción{estancia.promociones > 1 ? 'es' : ''}
                                                </span>
                                            )}
                                        </div>

                                        <div className="est-card-actions">
                                            <button className="est-btn-presupuesto">
                                                Solicitar Presupuesto
                                            </button>
                                            {estancia.responde && (
                                                <span className="est-responde">
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
