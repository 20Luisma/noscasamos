import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Zap, Tag, ChevronDown, ChevronUp, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User } from 'lucide-react';
import './ViajesNovios.css';

/* ─── Search Data ────────────────────────────────────────────── */
const CATEGORY_COLUMNS = [
    [
        {
            type: 'group' as const,
            label: 'Lugares para Boda',
            icon: HomeIcon,
            items: ['Estancias & Campos', 'Hoteles', 'Salones de Fiesta', 'Restaurantes', 'Bodegas', 'Bodas en la playa'],
        },
        { type: 'item' as const, label: 'Catering', icon: Cake },
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
const VIAJES = [
    {
        id: 1,
        nombre: 'Atlantis ¡más que vacaciones!',
        ubicacion: 'Montevideo',
        rating: 4.8, reviews: 89,
        descripcion: 'Si estás deseando vivir una luna de miel mágica, en Atlantis ¡más que vacaciones!, lograrán asesorarte para que tengas un viaje inolvidable. Su equipo de profesionales te dará información sobre el destino y buscará las mejores excursiones, actividades y hoteles adaptados a tus gustos y presupuesto...',
        precio: 'Desde UYU 60.000',
        promociones: 6,
        responde: true,
        premium: true,
        imgs: [
            'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80', // Taj Mahal / India
            'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80' // Paris
        ],
    },
    {
        id: 2,
        nombre: 'Occius Viajes',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 4.9, reviews: 104,
        descripcion: 'Occius Viajes es una agencia de viajes a medida. Con 20 años de experiencia acumulada serán capaces de planear vuestra luna de miel perfecta. Si lo que buscáis es un viaje "fuera del folleto" en el que vosotros seáis los protagonistas y tengáis la oportunidad de vivir una experiencia totalmente...',
        precio: 'Desde UYU 75.000',
        promociones: 0,
        responde: true,
        premium: true,
        imgs: [
            'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80', // Beach aerial
            'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80' // Tropics
        ],
    },
    {
        id: 3,
        nombre: 'MADOX VIAJES',
        ubicacion: 'Montevideo',
        rating: 4.9, reviews: 643,
        descripcion: '¿Pensando en la luna de miel? Si tu idea es hacer un viaje por todo lo alto, Madox Viajes es la agencia que buscas. Su equipo preparará un viaje a medida adaptado a tus gustos y necesidades. Confiar la luna de miel a esta agencia de viajes te dejará solo una sencilla tarea pendiente: disfrutar de la...',
        precio: 'Desde UYU 95.000',
        promociones: 1,
        responde: true,
        premium: true,
        imgs: [
            'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80', // Italy / Cinque Terre
            'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80' // Travel journey
        ],
    },
    {
        id: 4,
        nombre: 'Destinos Asiáticos',
        ubicacion: 'Montevideo',
        rating: 4.8, reviews: 26,
        descripcion: 'Especializada en la organización de viajes en Asia, Destinos Asiáticos es una agencia que programa lunas de miel que sean inolvidables para las parejas. Si tu sueño de siempre ha sido visitar el lejano oriente ahora tienes la excusa perfecta. No lo pienses más y pide información sin compromiso...',
        precio: 'Desde UYU 110.000',
        promociones: 2,
        responde: false,
        premium: false,
        imgs: [
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80', // Japan
        ],
    },
    {
        id: 5,
        nombre: 'Caribe Soñado',
        ubicacion: 'Salto',
        rating: 4.7, reviews: 115,
        descripcion: 'Especialistas en lunas de miel All-Inclusive en el Caribe. Destinos como Punta Cana, Riviera Maya, y Cancún al mejor precio. Descansa junto a tu pareja en las mejores playas del mundo bebiendo cócteles y olvidándose de todo el estrés de la boda...',
        precio: 'Desde UYU 45.000',
        promociones: 3,
        responde: true,
        premium: false,
        imgs: [
            'https://www.travelgrenada.com/wp-content/uploads/2024/05/playas-del-Caribe-2.jpg', // Beach
        ],
    },
];

const DESTINOS = ['Europa', 'Asia', 'Oceanía', 'África', 'Latino América', 'Caribe', 'EEUU'];
const TIPOS_DE_VIAJE = ['Combinado de países', 'Cruceros', 'De relax', 'De lujo', 'De aventura', 'Cultural', 'Todo incluido'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function ViajesNovios() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['destacados', 'destinos', 'tipos']);
    const [searchQuery, setSearchQuery] = useState('Viaje de novios');
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
    const setImg = (itemId: number, idx: number) => setActiveImgs(prev => ({ ...prev, [itemId]: idx }));

    return (
        <div className="viajes-page">
            {/* ── HERO ── */}
            <section className="viajes-hero">
                <div className="viajes-hero-left">
                    <nav className="viajes-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <strong>Viaje de novios</strong>
                    </nav>
                    <h1 className="viajes-hero-title">Agencias de viajes de novios</h1>

                    <form className="hero-search" onSubmit={e => e.preventDefault()} style={{ position: 'relative' }}>
                        <div className="search-field search-category-wrap" ref={searchRef}>
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Viaje de novios"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onFocus={openCategoryDropdown}
                                autoComplete="off"
                            />
                        </div>
                        <div className="search-divider"></div>
                        <div className="search-field search-location search-location-wrap" ref={locationRef}>
                            <span className="location-prefix">en</span>
                            <input
                                type="text"
                                placeholder="Dónde"
                                value={locationQuery}
                                onChange={e => setLocationQuery(e.target.value)}
                                onFocus={openLocationDropdown}
                                autoComplete="off"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary search-btn">Buscar</button>

                        {/* Search Dropdowns Code Copied from Base Pattern */}
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
                                {/* ... location dropdown content ... */}
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
                                        {[{ label: 'América', countries: ['Argentina', 'Chile', 'Brasil', 'Caribe', 'EEUU'] }, { label: 'Europa', countries: ['España', 'Italia', 'Francia', 'Grecia'] }, { label: 'Asia y Oceanía', countries: ['Japón', 'Tailandia', 'Maldivas'] }].map(({ label, countries }) => {
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

                    <p className="viajes-hero-desc">
                        Encuentra las mejores agencias de viajes de novios en Uruguay y planifica la escapada perfecta.
                        Con opciones para todos los bolsillos, vivirás la luna de miel que siempre has soñado en un entorno
                        excepcional.
                    </p>
                </div>
                <div className="viajes-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80"
                        alt="Viaje de novios en la playa"
                        className="viajes-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="viajes-body container">

                {/* ── SIDEBAR ── */}
                <aside className="viajes-sidebar">

                    <div className="viajes-filter-group">
                        <button className="viajes-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <span>Filtros destacados</span>
                            {isOpen('destacados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destacados') && (
                            <div className="viajes-filter-body">
                                <label className="viajes-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Tag size={16} className="filter-icon-left" /> Promociones
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                                <label className="viajes-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Star size={16} className="filter-icon-left" /> Ganadores Wedding Awards
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="viajes-filter-group">
                        <button className="viajes-filter-toggle" onClick={() => toggleSection('destinos')}>
                            <span>Destinos</span>
                            {isOpen('destinos') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destinos') && (
                            <div className="viajes-filter-body">
                                {DESTINOS.map(d => (
                                    <label key={d} className="viajes-checkbox"><input type="checkbox" />{d}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="viajes-filter-group">
                        <button className="viajes-filter-toggle" onClick={() => toggleSection('tipos')}>
                            <span>Tipos de viaje</span>
                            {isOpen('tipos') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('tipos') && (
                            <div className="viajes-filter-body">
                                {TIPOS_DE_VIAJE.map(t => (
                                    <label key={t} className="viajes-checkbox"><input type="checkbox" />{t}</label>
                                ))}
                            </div>
                        )}
                    </div>

                </aside>

                {/* ── LISTING ── */}
                <main className="viajes-listing">
                    <div className="viajes-listing-header">
                        <span className="viajes-results-count">{VIAJES.length} RESULTADOS</span>
                        <div className="viajes-view-toggle">
                            <button className={`viajes-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`viajes-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                            <button className="viajes-view-btn" title="Vista mapa">
                                <MapPin size={18} /> Mapa
                            </button>
                        </div>
                    </div>

                    <div className={`viajes-cards ${viewMode === 'grid' ? 'viajes-cards--grid' : ''}`}>
                        {VIAJES.map(item => {
                            const currentImg = activeImgs[item.id] ?? 0;
                            const isFav = favs.includes(item.id);
                            return (
                                <article key={item.id} className="viajes-card">
                                    <div className="viajes-card-img-wrap">
                                        <img src={item.imgs[currentImg]} alt={item.nombre} className="viajes-card-img" />

                                        {item.premium && (
                                            <div className="viajes-badge-premium">PREMIUM</div>
                                        )}

                                        {item.imgs.length > 1 && (
                                            <div className="viajes-card-dots">
                                                {item.imgs.map((_, i) => (
                                                    <button key={i} className={`viajes-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(item.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`viajes-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(item.id)} aria-label="Guardar en favoritos">
                                            <Heart size={20} fill={isFav ? '#fff' : 'rgba(0,0,0,0.3)'} stroke="#fff" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="viajes-card-info">
                                        <div className="viajes-card-info-top">
                                            <div>
                                                <h2 className="viajes-card-name">{item.nombre}</h2>
                                                <div className="viajes-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{item.rating.toFixed(1)}</strong>
                                                    <span>({item.reviews}) · {item.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="viajes-card-desc">{item.descripcion}</p>

                                        <div className="viajes-card-bottom">
                                            <div className="viajes-card-meta">
                                                <span className="viajes-meta-item">
                                                    <span className="icon-wrapper"><Plane size={14} /></span>
                                                    {item.precio}
                                                </span>
                                                {item.promociones > 0 && (
                                                    <span className="viajes-meta-promo">
                                                        <Tag size={13} /> {item.promociones} promoción{item.promociones > 1 ? 'es' : ''} <span className="discount-badge">-10%</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="viajes-card-actions">
                                                <button className="viajes-btn-presupuesto">Solicitar Presupuesto</button>
                                                {item.responde && (
                                                    <span className="viajes-responde">
                                                        <Zap size={13} fill="#f8b400" stroke="#f8b400" />
                                                        Responde en 24 horas
                                                    </span>
                                                )}
                                            </div>
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
