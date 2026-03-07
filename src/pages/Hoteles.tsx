import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
    Search, MapPin, Heart, Star, Users, UtensilsCrossed, Zap, Tag,
    ChevronDown, ChevronUp, LayoutList, LayoutGrid,
    Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User, BedDouble
} from 'lucide-react';
import './Hoteles.css';

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

/* ─── Hotel Data ─────────────────────────────────────────────── */
const HOTELES = [
    {
        id: 1,
        nombre: 'Sofitel Montevideo Casino Carrasco',
        ubicacion: 'Carrasco, Montevideo',
        rating: 5.0, reviews: 142,
        descripcion: 'El hotel más icónico de Uruguay, instalado en el legendario Casino Carrasco. Sus salones Art Déco, jardines franceses y servicio de lujo lo convierten en el escenario perfecto para una boda de ensueño en la capital.',
        precio: 'Desde $3.500 pp',
        capacidad: '50 a 600',
        habitaciones: 116,
        promociones: 2,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 2,
        nombre: 'Enjoy Punta del Este',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 4.9, reviews: 98,
        descripcion: 'El gran complejo de Punta del Este combina casino, spa, piscinas y salones de eventos de primer nivel. Sus vistas al Río de la Plata y sus amenidades únicas crean el marco ideal para celebraciones íntimas y multitudinarias.',
        precio: 'Desde $2.800 pp',
        capacidad: '100 a 1.200',
        habitaciones: 296,
        promociones: 3,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 3,
        nombre: 'Buenavista Hotel & Club',
        ubicacion: 'La Barra, Maldonado',
        rating: 4.8, reviews: 67,
        descripcion: 'Boutique hotel frente al océano en La Barra. Con arquitectura contemporánea, piscina infinity y jardines que dan al mar, Buenavista ofrece un ambiente exclusivo e íntimo parfecto para bodas pequeñas y medianas.',
        precio: 'Desde $2.200 pp',
        capacidad: '20 a 150',
        habitaciones: 38,
        promociones: 1,
        responde: false,
        imgs: [
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 4,
        nombre: 'Four Seasons Casa Medina',
        ubicacion: 'Carrasco, Montevideo',
        rating: 5.0, reviews: 41,
        descripcion: 'Instalado en una mansión histórica de Carrasco, este hotel boutique de lujo ofrece ambientes únicos, jardines privados y un servicio personalizado de Five Stars. Ideal para bodas exclusivas donde cada detalle importa.',
        precio: 'Desde $4.200 pp',
        capacidad: '10 a 120',
        habitaciones: 24,
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 5,
        nombre: 'Hotel Sheraton Montevideo',
        ubicacion: 'Pocitos, Montevideo',
        rating: 4.7, reviews: 113,
        descripcion: 'El Sheraton Montevideo es uno de los grandes hoteles de eventos de Uruguay. Sus amplios salones de banquetes, equipo de coordinación especializado y cocina internacional lo convierten en la opción más completa para bodas grandes.',
        precio: 'Desde $1.800 pp',
        capacidad: '80 a 900',
        habitaciones: 220,
        promociones: 2,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1455587734955-081b22074882?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 6,
        nombre: 'Posada del Faro',
        ubicacion: 'José Ignacio, Maldonado',
        rating: 4.9, reviews: 29,
        descripcion: 'La posada más romántica de José Ignacio, a pasos del famoso faro. Su atmósfera íntima, jardines floridos y cocina artesanal la convierten en la elección perfecta para bodas pequeñas con encanto irresistible.',
        precio: 'Desde $2.600 pp',
        capacidad: '10 a 80',
        habitaciones: 12,
        promociones: 0,
        responde: false,
        imgs: [
            'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 7,
        nombre: 'Gran Hotel Colonia',
        ubicacion: 'Colonia del Sacramento',
        rating: 4.8, reviews: 54,
        descripcion: 'En el corazón del barrio histórico patrimonio de la UNESCO. Sus habitaciones de estilo colonial, claustros y vista al Río de la Plata crean un escenario mágico para ceremonias íntimas y recepciones elegantes.',
        precio: 'Desde $1.500 pp',
        capacidad: '20 a 200',
        habitaciones: 68,
        promociones: 1,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 8,
        nombre: 'Mantra Resort & Spa',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 4.6, reviews: 78,
        descripcion: 'Diseñado por arquitectos de renombre, Mantra combina vanguardismo y confort en plena Punta del Este. Sus terrazas con vista al mar, piscina exterior y spa de lujo son el complemento ideal para una recepción de bodas memorable.',
        precio: 'Desde $2.000 pp',
        capacidad: '40 a 350',
        habitaciones: 135,
        promociones: 2,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=420&fit=crop',
        ],
    },
];

const PRICE_RANGES = ['Menos de $1.000 pp', '$1.000 - $2.000 pp', '$2.000 - $3.000 pp', '$3.000 - $4.000 pp', 'Más de $4.000 pp'];
const GUEST_RANGES = ['0 - 49', '50 - 99', '100 - 199', '200 - 299', '300 - 499', '500+'];
const LOCATION_TYPES = ['Cerca del mar', 'En la ciudad', 'En el campo', 'Centro histórico', 'A las afueras'];
const SERVICES = ['Spa', 'Piscina', 'Parking', 'Terraza', 'Zona de baile', 'Capilla', 'Cocina propia', 'Coordinador de bodas'];
const HOTEL_CATEGORIES = ['5 estrellas', '4 estrellas', 'Boutique', 'Resort', 'Hotel histórico'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function Hoteles() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});
    const [openSections, setOpenSections] = useState<string[]>(['lugarBoda', 'categoria', 'precio', 'invitados']);

    // Search state
    const [searchQuery, setSearchQuery] = useState('Hoteles');
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
    const setImg = (hotelId: number, idx: number) => setActiveImgs(prev => ({ ...prev, [hotelId]: idx }));

    return (
        <div className="hot-page">

            {/* ── HERO ── */}
            <section className="hot-hero">
                <div className="hot-hero-left">
                    <nav className="hot-breadcrumb">
                        <Link to="/">Inicio</Link><span>/</span>
                        <Link to="/espacios">Lugares para Boda</Link><span>/</span>
                        <strong>Hoteles</strong>
                    </nav>
                    <h1 className="hot-hero-title">Hoteles para boda en Uruguay</h1>

                    {/* Search bar con dropdowns */}
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

                    <p className="hot-hero-desc">
                        ¿Buscás un hotel para tu boda en Uruguay? Aquí encontrarás una selección de hoteles que ofrecen
                        paquetes personalizables para cada pareja, garantizando que tu día esté lleno de magia y momentos únicos.
                    </p>
                </div>
                <div className="hot-hero-right">
                    <img
                        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=560&fit=crop"
                        alt="Hotel de boda en Uruguay"
                        className="hot-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="hot-body container">

                {/* ── SIDEBAR ── */}
                <aside className="hot-sidebar">
                    <button className="hot-clear-filters">Borrar filtros</button>

                    {/* Lugares para Boda */}
                    <div className="hot-filter-group">
                        <button className="hot-filter-toggle" onClick={() => toggleSection('lugarBoda')}>
                            <span>Lugares para Boda</span>
                            {isOpen('lugarBoda') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('lugarBoda') && (
                            <div className="hot-filter-body">
                                {['Fincas', 'Masías', 'Hoteles', 'Restaurantes', 'Salones de boda', 'Catering', 'Bodegas', 'Espacios singulares', 'Bodas playa'].map(item => (
                                    <label key={item} className={`hot-checkbox ${item === 'Hoteles' ? 'checked' : ''}`}>
                                        <input type="checkbox" defaultChecked={item === 'Hoteles'} />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Categoría hotel */}
                    <div className="hot-filter-group">
                        <button className="hot-filter-toggle" onClick={() => toggleSection('categoria')}>
                            <span>Categoría</span>
                            {isOpen('categoria') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('categoria') && (
                            <div className="hot-filter-body">
                                {HOTEL_CATEGORIES.map(c => (
                                    <label key={c} className="hot-checkbox">
                                        <input type="checkbox" />
                                        {c}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Filtros destacados */}
                    <div className="hot-filter-group">
                        <button className="hot-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <span>Filtros destacados</span>
                            {isOpen('destacados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destacados') && (
                            <div className="hot-filter-body">
                                <label className="hot-checkbox"><input type="checkbox" />🏷 Promociones</label>
                                <label className="hot-checkbox"><input type="checkbox" />⚡ Responde en 24 h</label>
                                <label className="hot-checkbox"><input type="checkbox" />🏆 Ganadores Wedding Awards</label>
                            </div>
                        )}
                    </div>

                    {/* Precio */}
                    <div className="hot-filter-group">
                        <button className="hot-filter-toggle" onClick={() => toggleSection('precio')}>
                            <span>Precio</span>
                            {isOpen('precio') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('precio') && (
                            <div className="hot-filter-body">
                                <div className="hot-price-tabs">
                                    <button className="hot-price-tab active">Menú por persona</button>
                                    <button className="hot-price-tab">Alquiler del espacio</button>
                                </div>
                                {PRICE_RANGES.map(p => (
                                    <label key={p} className="hot-checkbox"><input type="checkbox" />{p}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Invitados */}
                    <div className="hot-filter-group">
                        <button className="hot-filter-toggle" onClick={() => toggleSection('invitados')}>
                            <span>Número de invitados</span>
                            {isOpen('invitados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('invitados') && (
                            <div className="hot-filter-body">
                                {GUEST_RANGES.map(g => (
                                    <label key={g} className="hot-checkbox"><input type="checkbox" />{g}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tipo de ubicación */}
                    <div className="hot-filter-group">
                        <button className="hot-filter-toggle" onClick={() => toggleSection('ubicacion')}>
                            <span>Tipo de ubicación</span>
                            {isOpen('ubicacion') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('ubicacion') && (
                            <div className="hot-filter-body">
                                {LOCATION_TYPES.map(l => (
                                    <label key={l} className="hot-checkbox"><input type="checkbox" />{l}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Servicios */}
                    <div className="hot-filter-group">
                        <button className="hot-filter-toggle" onClick={() => toggleSection('servicios')}>
                            <span>Servicios</span>
                            {isOpen('servicios') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('servicios') && (
                            <div className="hot-filter-body">
                                {SERVICES.map(s => (
                                    <label key={s} className="hot-checkbox"><input type="checkbox" />{s}</label>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>

                {/* ── LISTING ── */}
                <main className="hot-listing">
                    <div className="hot-listing-header">
                        <span className="hot-results-count">{HOTELES.length} RESULTADOS</span>
                        <div className="hot-view-toggle">
                            <button className={`hot-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`hot-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                        </div>
                    </div>

                    <div className={`hot-cards ${viewMode === 'grid' ? 'hot-cards--grid' : ''}`}>
                        {HOTELES.map(hotel => {
                            const currentImg = activeImgs[hotel.id] ?? 0;
                            const isFav = favs.includes(hotel.id);
                            return (
                                <article key={hotel.id} className="hot-card">
                                    <div className="hot-card-img-wrap">
                                        <img src={hotel.imgs[currentImg]} alt={hotel.nombre} className="hot-card-img" />
                                        {hotel.imgs.length > 1 && (
                                            <div className="hot-card-dots">
                                                {hotel.imgs.map((_, i) => (
                                                    <button key={i} className={`hot-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(hotel.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`hot-fav-btn ${isFav ? 'active' : ''}`}
                                            onClick={() => toggleFav(hotel.id)} aria-label="Guardar en favoritos">
                                            <Heart size={16} fill={isFav ? '#c8264a' : 'none'} stroke={isFav ? '#c8264a' : '#fff'} />
                                        </button>
                                    </div>

                                    <div className="hot-card-info">
                                        <div>
                                            <h2 className="hot-card-name">{hotel.nombre}</h2>
                                            <div className="hot-card-location">
                                                <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                <strong>{hotel.rating.toFixed(1)}</strong>
                                                <span>({hotel.reviews})</span>
                                                <span className="hot-card-city">· {hotel.ubicacion}</span>
                                            </div>
                                        </div>

                                        <p className="hot-card-desc">{hotel.descripcion}</p>

                                        <div className="hot-card-meta">
                                            <span className="hot-meta-item">
                                                <UtensilsCrossed size={14} />{hotel.precio}
                                            </span>
                                            <span className="hot-meta-item">
                                                <Users size={14} />{hotel.capacidad}
                                            </span>
                                            <span className="hot-meta-item">
                                                <BedDouble size={14} />{hotel.habitaciones} hab.
                                            </span>
                                            {hotel.promociones > 0 && (
                                                <span className="hot-meta-promo">
                                                    <Tag size={13} />
                                                    {hotel.promociones} promoción{hotel.promociones > 1 ? 'es' : ''}
                                                </span>
                                            )}
                                        </div>

                                        <div className="hot-card-actions">
                                            <button className="hot-btn-presupuesto">Solicitar Presupuesto</button>
                                            {hotel.responde && (
                                                <span className="hot-responde">
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
