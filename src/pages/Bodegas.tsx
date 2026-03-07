import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Users, Wine, Zap, Tag, ChevronDown, ChevronUp, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User, UtensilsCrossed } from 'lucide-react';
import './Bodegas.css';

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
const BODEGAS = [
    {
        id: 1,
        nombre: 'Bodega Garzón',
        ubicacion: 'Garzón, Maldonado',
        rating: 5.0, reviews: 92,
        descripcion: 'Rodeada de viñedos en las colinas de Garzón, esta bodega de arquitectura premiada a nivel mundial ofrece un escenario único para bodas íntimas y exclusivas. Sus salones acristalados con vistas a los viñedos y su restaurante de alta cocina hacen de cada celebración un evento irrepetible.',
        precio: 'Desde $3.500 pp',
        capacidad: '20 a 150',
        promociones: 2,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 2,
        nombre: 'Bodega Juanicó',
        ubicacion: 'Juanicó, Canelones',
        rating: 4.9, reviews: 67,
        descripcion: 'La bodega más antigua en producción continua de Uruguay, fundada en 1830. Sus casonas coloniales, bodegas subterráneas y jardines centenarios crean un ambiente romántico y lleno de historia perfecto para bodas de estilo clásico y vintage.',
        precio: 'Desde $1.800 pp',
        capacidad: '50 a 300',
        promociones: 1,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 3,
        nombre: 'Bodega Bouza',
        ubicacion: 'Manga, Montevideo',
        rating: 4.8, reviews: 54,
        descripcion: 'A tan solo 20 minutos de Montevideo, Bouza combina tradición bodeguera con un ambiente sofisticado. Sus espacios climatizados entre barricas de roble, el restaurante y los jardines con cenadores ofrecen varias opciones para celebrar tu boda con elegancia.',
        precio: 'Desde $2.200 pp',
        capacidad: '30 a 200',
        promociones: 0,
        responde: false,
        imgs: [
            'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1543394785-53a7f670e7da?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 4,
        nombre: 'Bodega Pisano',
        ubicacion: 'Progreso, Canelones',
        rating: 4.7, reviews: 41,
        descripcion: 'Bodega familiar con más de 100 años de historia, Pisano combina tradición e innovación en sus vinos premiados internacionalmente. Su amplia sala de eventos entre viñedos y su propuesta gastronómica artesanal hacen de cada boda un festejo único con el mejor vino uruguayo.',
        precio: 'Desde $1.400 pp',
        capacidad: '40 a 250',
        promociones: 3,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 5,
        nombre: 'Bodega Familia Deicas',
        ubicacion: 'Libertad, San José',
        rating: 4.9, reviews: 38,
        descripcion: 'Pionera en la producción de Tannat premium en Uruguay, la Bodega Familia Deicas ofrece su antigua casona rodeada de viñedos para eventos privados. La ceremonia entre las hileras de vides y el banquete en sus bodegas históricas son una experiencia que tus invitados no olvidarán.',
        precio: 'Desde $1.600 pp',
        capacidad: '20 a 120',
        promociones: 1,
        responde: false,
        imgs: [
            'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 6,
        nombre: 'Bodega Alto de la Ballena',
        ubicacion: 'Atlántida, Canelones',
        rating: 4.8, reviews: 29,
        descripcion: 'Situada en las sierras del sur con vistas al Río de la Plata, Alto de la Ballena es una boutique winery que produce vinos de altísima gama. Sus terrazas con vista panorámica y su salón íntimo lo convierten en el escenario perfecto para bodas pequeñas y muy exclusivas.',
        precio: 'Desde $2.800 pp',
        capacidad: '10 a 80',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 7,
        nombre: 'Bodega H. Stagnari',
        ubicacion: 'La Paz, Canelones',
        rating: 4.6, reviews: 47,
        descripcion: 'Cuatro generaciones de pasión por el vino respaldan a la Bodega H. Stagnari. Su casona histórica de estilo italiano, sus galerías de barricas y sus extensos viñedos brindan un escenario auténtico y cálido para bodas con carácter, donde el vino es el protagonista de la celebración.',
        precio: 'Desde $1.200 pp',
        capacidad: '40 a 280',
        promociones: 2,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?w=600&h=420&fit=crop',
        ],
    },
    {
        id: 8,
        nombre: 'Bodega Marichal',
        ubicacion: 'Canelones',
        rating: 4.7, reviews: 33,
        descripcion: 'Una bodega familiar apasionada por los vinos naturales. Sus instalaciones modernas en medio de los viñedos canarios ofrecen una propuesta diferente: bodas con vinos biodinámicos, gastronomía de producto local y una estética contemporánea que encanta a parejas de espíritu libre.',
        precio: 'Desde $1.000 pp',
        capacidad: '30 a 180',
        promociones: 1,
        responde: false,
        imgs: [
            'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=420&fit=crop',
            'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&h=420&fit=crop',
        ],
    },
];

const PRICE_RANGES = ['Menos de $1.000 pp', '$1.000 - $1.800 pp', '$1.800 - $2.500 pp', '$2.500 - $3.500 pp', 'Más de $3.500 pp'];
const GUEST_RANGES = ['0 - 49', '50 - 99', '100 - 199', '200 - 299', '300+'];
const LOCATION_TYPES = ['Cerca del mar', 'En la ciudad', 'En el campo', 'Centro histórico', 'A las afueras'];
const SPACES = ['Terraza', 'Zona con viñedos', 'Jardín exterior', 'Salón privado', 'Barricada histórica', 'Cava subterránea', 'Parking'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function Bodegas() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['lugarBoda', 'precio', 'invitados']);

    const [searchQuery, setSearchQuery] = useState('Bodegas');
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

    const setImg = (bodegaId: number, idx: number) =>
        setActiveImgs(prev => ({ ...prev, [bodegaId]: idx }));

    return (
        <div className="bod-page">

            {/* ── HERO ── */}
            <section className="bod-hero">
                <div className="bod-hero-left">
                    <nav className="bod-breadcrumb">
                        <Link to="/">Inicio</Link>
                        <span>/</span>
                        <Link to="/espacios">Lugares para Boda</Link>
                        <span>/</span>
                        <strong>Bodegas</strong>
                    </nav>
                    <h1 className="bod-hero-title">Bodegas para boda en Uruguay</h1>

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

                    <p className="bod-hero-desc">
                        Encontrá la bodega perfecta para tu boda en Uruguay. Rodeados de viñedos y con los mejores vinos del país,
                        estas bodegas ofrecen un ambiente único y romántico para que tu gran día sea completamente especial.
                    </p>
                </div>
                <div className="bod-hero-right">
                    <img
                        src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=560&fit=crop"
                        alt="Bodega para boda en Uruguay"
                        className="bod-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY: sidebar + listing ── */}
            <div className="bod-body container">

                {/* ── SIDEBAR ── */}
                <aside className="bod-sidebar">
                    <button className="bod-clear-filters">Borrar filtros</button>

                    {/* Lugares para Boda */}
                    <div className="bod-filter-group">
                        <button className="bod-filter-toggle" onClick={() => toggleSection('lugarBoda')}>
                            <span>Lugares para Boda</span>
                            {isOpen('lugarBoda') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('lugarBoda') && (
                            <div className="bod-filter-body">
                                {['Fincas', 'Masías', 'Hoteles', 'Restaurantes', 'Salones de boda', 'Catering', 'Bodegas', 'Espacios singulares', 'Bodas playa'].map(item => (
                                    <label key={item} className={`bod-checkbox ${item === 'Bodegas' ? 'checked' : ''}`}>
                                        <input type="checkbox" defaultChecked={item === 'Bodegas'} />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Filtros destacados */}
                    <div className="bod-filter-group">
                        <button className="bod-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <span>Filtros destacados</span>
                            {isOpen('destacados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destacados') && (
                            <div className="bod-filter-body">
                                <label className="bod-checkbox">
                                    <input type="checkbox" />
                                    🏷 Promociones
                                </label>
                                <label className="bod-checkbox">
                                    <input type="checkbox" />
                                    ⚡ Responde en 24 h
                                </label>
                                <label className="bod-checkbox">
                                    <input type="checkbox" />
                                    🏆 Ganadores Wedding Awards
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Precio */}
                    <div className="bod-filter-group">
                        <button className="bod-filter-toggle" onClick={() => toggleSection('precio')}>
                            <span>Precio</span>
                            {isOpen('precio') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('precio') && (
                            <div className="bod-filter-body">
                                <div className="bod-price-tabs">
                                    <button className="bod-price-tab active">Menú por persona</button>
                                    <button className="bod-price-tab">Alquiler del espacio</button>
                                </div>
                                {PRICE_RANGES.map(p => (
                                    <label key={p} className="bod-checkbox">
                                        <input type="checkbox" />
                                        {p}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Número de invitados */}
                    <div className="bod-filter-group">
                        <button className="bod-filter-toggle" onClick={() => toggleSection('invitados')}>
                            <span>Número de invitados</span>
                            {isOpen('invitados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('invitados') && (
                            <div className="bod-filter-body">
                                {GUEST_RANGES.map(g => (
                                    <label key={g} className="bod-checkbox">
                                        <input type="checkbox" />
                                        {g}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tipo de ubicación */}
                    <div className="bod-filter-group">
                        <button className="bod-filter-toggle" onClick={() => toggleSection('ubicacion')}>
                            <span>Tipo de ubicación</span>
                            {isOpen('ubicacion') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('ubicacion') && (
                            <div className="bod-filter-body">
                                {LOCATION_TYPES.map(l => (
                                    <label key={l} className="bod-checkbox">
                                        <input type="checkbox" />
                                        {l}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Espacios */}
                    <div className="bod-filter-group">
                        <button className="bod-filter-toggle" onClick={() => toggleSection('espacios')}>
                            <span>Espacios</span>
                            {isOpen('espacios') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('espacios') && (
                            <div className="bod-filter-body">
                                {SPACES.map(s => (
                                    <label key={s} className="bod-checkbox">
                                        <input type="checkbox" />
                                        {s}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>

                {/* ── LISTING ── */}
                <main className="bod-listing">

                    {/* Listing header */}
                    <div className="bod-listing-header">
                        <span className="bod-results-count">{BODEGAS.length} RESULTADOS</span>
                        <div className="bod-view-toggle">
                            <button
                                className={`bod-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                                title="Vista lista"
                            >
                                <LayoutList size={18} />
                                Listado
                            </button>
                            <button
                                className={`bod-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                                title="Vista cuadrícula"
                            >
                                <LayoutGrid size={18} />
                                Imágenes
                            </button>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className={`bod-cards ${viewMode === 'grid' ? 'bod-cards--grid' : ''}`}>
                        {BODEGAS.map(bodega => {
                            const currentImg = activeImgs[bodega.id] ?? 0;
                            const isFav = favs.includes(bodega.id);
                            return (
                                <article key={bodega.id} className="bod-card">
                                    {/* Image section */}
                                    <div className="bod-card-img-wrap">
                                        <img
                                            src={bodega.imgs[currentImg]}
                                            alt={bodega.nombre}
                                            className="bod-card-img"
                                        />
                                        {bodega.imgs.length > 1 && (
                                            <div className="bod-card-dots">
                                                {bodega.imgs.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        className={`bod-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(bodega.id, i)}
                                                        aria-label={`Imagen ${i + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        <button
                                            className={`bod-fav-btn ${isFav ? 'active' : ''}`}
                                            onClick={() => toggleFav(bodega.id)}
                                            aria-label="Guardar en favoritos"
                                        >
                                            <Heart size={16} fill={isFav ? '#c8264a' : 'none'} stroke={isFav ? '#c8264a' : '#fff'} />
                                        </button>
                                    </div>

                                    {/* Info section */}
                                    <div className="bod-card-info">
                                        <div className="bod-card-info-top">
                                            <div>
                                                <h2 className="bod-card-name">{bodega.nombre}</h2>
                                                <div className="bod-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{bodega.rating.toFixed(1)}</strong>
                                                    <span>({bodega.reviews})</span>
                                                    <span className="bod-card-city">· {bodega.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="bod-card-desc">{bodega.descripcion}</p>

                                        <div className="bod-card-meta">
                                            <span className="bod-meta-item">
                                                <Wine size={14} />
                                                {bodega.precio}
                                            </span>
                                            <span className="bod-meta-item">
                                                <Users size={14} />
                                                {bodega.capacidad}
                                            </span>
                                            {bodega.promociones > 0 && (
                                                <span className="bod-meta-promo">
                                                    <Tag size={13} />
                                                    {bodega.promociones} promoción{bodega.promociones > 1 ? 'es' : ''}
                                                </span>
                                            )}
                                        </div>

                                        <div className="bod-card-actions">
                                            <button className="bod-btn-presupuesto">
                                                Solicitar Presupuesto
                                            </button>
                                            {bodega.responde && (
                                                <span className="bod-responde">
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
