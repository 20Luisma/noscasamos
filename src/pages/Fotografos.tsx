import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, UtensilsCrossed, Zap, Tag, ChevronDown, ChevronUp, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User, Camera as CameraIcon } from 'lucide-react';
import './Fotografos.css';

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
const FOTOGRAFOS = [
    {
        id: 1,
        nombre: 'Nicolas Azaretto',
        ubicacion: 'Montevideo, Montevideo',
        rating: 5.0, reviews: 125,
        descripcion: 'Con un estilo documental y artístico, Nicolas Azaretto captura la esencia y la emoción genuina de tu boda. Su enfoque discreto le permite registrar momentos reales sin poses forzadas, creando un relato visual elegante y atemporal del día más importante de sus vidas.',
        precio: 'Desde $18.000',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=560&fit=crop',
            'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=560&fit=crop',
            'https://images.unsplash.com/photo-1538688423619-a8019464e8b3?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 2,
        nombre: 'Laura Silva Fotografía',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 4.9, reviews: 88,
        descripcion: 'Especialista en luz natural y fotografía romántica. Laura busca contar la historia de amor de cada pareja a través de imágenes cálidas, espontáneas y llenas de vida, con un cuidado especial en los pequeños detalles que hacen única cada celebración.',
        precio: 'Desde $22.000',
        promociones: 1,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=560&fit=crop',
            'https://images.unsplash.com/photo-1539207039015-4ba86b4a3c20?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 3,
        nombre: 'Estudio Blanco',
        ubicacion: 'Ciudad Vieja, Montevideo',
        rating: 4.8, reviews: 112,
        descripcion: 'Un colectivo de fotógrafos y videógrafos apasionados por el reportaje de bodas. Su estilo es cinematográfico, fresco y muy dinámico, asegurando una cobertura completa desde los preparativos hasta el final de la fiesta con equipos de última generación.',
        precio: 'Desde $25.000',
        promociones: 0,
        responde: false,
        imgs: [
            'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=560&fit=crop',
            'https://images.unsplash.com/photo-1605808796120-1a7776b29cd1?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 4,
        nombre: 'Martín Pérez Visuals',
        ubicacion: 'Carrasco, Montevideo',
        rating: 5.0, reviews: 45,
        descripcion: 'Fotografía de autor con un toque editorial. Martín aborda cada boda como un proyecto único, fusionando el fotoperiodismo con retratos creativos que podrían ilustrar las páginas de una revista de moda nupcial.',
        precio: 'Desde $30.000',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=560&fit=crop',
            'https://images.unsplash.com/photo-1562016601-3fd5257aee97?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 5,
        nombre: 'Boreal Fotografía',
        ubicacion: 'Colonia del Sacramento, Colonia',
        rating: 4.9, reviews: 94,
        descripcion: 'Con base en Colonia, Boreal se especializa en bodas de destino, destination weddings y elopements. Sus imágenes transmiten tranquilidad, intimidad y una conexión profunda entre la pareja y el entorno mágico que los rodea.',
        precio: 'Desde $19.500',
        promociones: 2,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&h=560&fit=crop',
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 6,
        nombre: 'Lens & Love',
        ubicacion: 'Buceo, Montevideo',
        rating: 4.7, reviews: 67,
        descripcion: 'Un equipo joven y enérgico que sabe cómo capturar la fiesta. Si buscan fotografías vibrantes, divertidas y que muestren la verdadera alegría de sus invitados en la pista de baile, Lens & Love es la opción perfecta.',
        precio: 'Desde $15.000',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=560&fit=crop',
            'https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?w=800&h=560&fit=crop',
        ],
    },
];

const PRICE_RANGES = ['Menos de $15.000', '$15.000 - $25.000', '$25.000 - $35.000', 'Más de $35.000'];
const SERVICIOS = ['Preboda', 'Postboda', 'Álbumes', 'Mini álbumes', 'Álbum digital', 'Fotografías en alta resolución', 'Blu-ray o DVD con las fotos', 'Photocall', 'Fotomatón', 'Negativos', 'Dron'];
const ESTILOS = ['Tradicional', 'De autor', 'Artística', 'Fotoperiodismo', 'Documental'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function Fotografos() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['destacados', 'precio', 'servicios', 'estilo']);
    const [searchQuery, setSearchQuery] = useState('Fotógrafos');
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
    const setImg = (fotografoId: number, idx: number) => setActiveImgs(prev => ({ ...prev, [fotografoId]: idx }));

    return (
        <div className="foto-page">
            {/* ── HERO ── */}
            <section className="foto-hero">
                <div className="foto-hero-left">
                    <nav className="foto-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <strong>Fotógrafos</strong>
                    </nav>
                    <h1 className="foto-hero-title">Fotógrafos</h1>

                    <form className="hero-search" onSubmit={e => e.preventDefault()} style={{ position: 'relative' }}>
                        <div className="search-field search-category-wrap" ref={searchRef}>
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Fotógrafos"
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

                    <p className="foto-hero-desc">
                        La belleza de tu enlace merece ser plasmada en imágenes inolvidables. Descubre
                        fotógrafos para boda que se adapten a tu estilo y presupuesto, asegurando que cada momento sea único.
                    </p>
                </div>
                <div className="foto-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=800&h=560&fit=crop"
                        alt="Fotógrafo de bodas capturando a los novios"
                        className="foto-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="foto-body container">

                {/* ── SIDEBAR ── */}
                <aside className="foto-sidebar">

                    <div className="foto-filter-group">
                        <button className="foto-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <span>Filtros destacados</span>
                            {isOpen('destacados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destacados') && (
                            <div className="foto-filter-body">
                                <label className="foto-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Tag size={16} className="filter-icon-left" /> Promociones
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                                <label className="foto-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Star size={16} className="filter-icon-left" /> Ganadores Wedding Awards
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="foto-filter-group">
                        <button className="foto-filter-toggle" onClick={() => toggleSection('precio')}>
                            <span>Precio</span>
                            {isOpen('precio') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('precio') && (
                            <div className="foto-filter-body">
                                {PRICE_RANGES.map(p => (
                                    <label key={p} className="foto-checkbox"><input type="checkbox" />{p}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="foto-filter-group">
                        <button className="foto-filter-toggle" onClick={() => toggleSection('servicios')}>
                            <span>Servicios</span>
                            {isOpen('servicios') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('servicios') && (
                            <div className="foto-filter-body">
                                {SERVICIOS.map(s => (
                                    <label key={s} className="foto-checkbox"><input type="checkbox" />{s}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="foto-filter-group">
                        <button className="foto-filter-toggle" onClick={() => toggleSection('estilo')}>
                            <span>Estilo</span>
                            {isOpen('estilo') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('estilo') && (
                            <div className="foto-filter-body">
                                {ESTILOS.map(e => (
                                    <label key={e} className="foto-checkbox"><input type="checkbox" />{e}</label>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>

                {/* ── LISTING ── */}
                <main className="foto-listing">
                    <div className="foto-listing-header">
                        <span className="foto-results-count">{FOTOGRAFOS.length} RESULTADOS</span>
                        <div className="foto-view-toggle">
                            <button className={`foto-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`foto-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                            <button className="foto-view-btn" title="Vista mapa">
                                <MapPin size={18} /> Mapa
                            </button>
                        </div>
                    </div>

                    <div className={`foto-cards ${viewMode === 'grid' ? 'foto-cards--grid' : ''}`}>
                        {FOTOGRAFOS.map(foto => {
                            const currentImg = activeImgs[foto.id] ?? 0;
                            const isFav = favs.includes(foto.id);
                            return (
                                <article key={foto.id} className="foto-card">
                                    <div className="foto-card-img-wrap">
                                        <img src={foto.imgs[currentImg]} alt={foto.nombre} className="foto-card-img" />
                                        {foto.imgs.length > 1 && (
                                            <div className="foto-card-dots">
                                                {foto.imgs.map((_, i) => (
                                                    <button key={i} className={`foto-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(foto.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`foto-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(foto.id)} aria-label="Guardar en favoritos">
                                            <Heart size={20} fill={isFav ? '#fff' : 'rgba(0,0,0,0.3)'} stroke="#fff" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="foto-card-info">
                                        <div className="foto-card-info-top">
                                            <div>
                                                <h2 className="foto-card-name">{foto.nombre}</h2>
                                                <div className="foto-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{foto.rating.toFixed(1)}</strong>
                                                    <span>({foto.reviews}) · {foto.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="foto-card-desc">{foto.descripcion}</p>

                                        <div className="foto-card-bottom">
                                            <div className="foto-card-meta">
                                                <span className="foto-meta-item">
                                                    <span className="icon-wrapper"><CameraIcon size={14} /></span>
                                                    Desde {foto.precio}
                                                </span>
                                                {foto.promociones > 0 && (
                                                    <span className="foto-meta-promo">
                                                        <Tag size={13} /> {foto.promociones} promoción{foto.promociones > 1 ? 'es' : ''} <span className="discount-badge">-5%</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="foto-card-actions">
                                                <button className="foto-btn-presupuesto">Solicitar Presupuesto</button>
                                                {foto.responde && (
                                                    <span className="foto-responde">
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
