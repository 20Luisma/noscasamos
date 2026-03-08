import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Zap, Tag, ChevronDown, ChevronRight, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User, Video as VideoIcon } from 'lucide-react';
import './ComplementosNovia.css';

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
        { type: 'item' as const, label: 'Video', icon: VideoIcon },
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
const COMPLEMENTOS = [
    {
        id: 1,
        nombre: 'MonteColina',
        ubicacion: 'Montevideo',
        rating: 5.0, reviews: 7,
        descripcion: 'MonteColina es una firma especializada en tocados de novia, tocados para novias y tocados artesanales personalizados, creada por Olga, diseñadora y artesana apasionada por la belleza de lo auténtico y el valor de lo hecho a mano. Desde su atelier, Olga diseña tocados únicos...',
        precio: 'Desde $3.500',
        promociones: 0,
        responde: true,
        imgs: [
            'https://www.melohapedido.com/wp-content/uploads/2019/08/8_Prep.-44.jpg',
            'https://lamagora.com/wp-content/uploads/2020/02/corona2.jpg',
            'https://www.elsabasic.com/media/resize/1200/1800/Listados/tienda-online/BiancoEventobridalheadpiece393%281%29.jpg',
            'https://perfectvenue.eu/wp-content/uploads/Tendencias-en-tocados-para-novias-en-2027-_-Foto-via-Raven-Magic-Kauffman.jpg',
            'https://www.hola.com/horizon/square/b9b570677136-portada-tocados-t.jpg'
        ],
    },
    {
        id: 2,
        nombre: 'Triana Hilando',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 5.0, reviews: 4,
        descripcion: 'Triana Hilando es sinónimo de delicadeza. Crea increíbles piezas de joyería y accesorios florales que aportarán ese toque especial y romántico que buscas para completar tu look de novia en el día de tu boda.',
        precio: 'Desde $2.800',
        promociones: 1,
        responde: false,
        imgs: [
            'https://lamagora.com/wp-content/uploads/2020/02/corona2.jpg',
            'https://www.melohapedido.com/wp-content/uploads/2019/08/8_Prep.-44.jpg'
        ],
    },
    {
        id: 3,
        nombre: 'Tocado Mágico',
        ubicacion: 'Montevideo',
        rating: 4.8, reviews: 15,
        descripcion: 'Especialistas en la confección de tocados joya y tiaras con piedras naturales. Cada diseño se adapta a la personalidad de la novia, asegurando una pieza irremplazable que brillará toda la noche.',
        precio: 'Desde $4.200',
        promociones: 2,
        responde: true,
        imgs: [
            'https://cdn-goefh.nitrocdn.com/IimKpsestvpbHGBqqWiAFTxLJgVOdeih/assets/images/optimized/wp-content/uploads/2025/02/fe696fe6fefeafe0f7679a676533621a.pamela-novia-blanca-a-medida-pamplona-300x400.jpg',
            'https://lamagora.com/wp-content/uploads/2020/02/corona2.jpg'
        ],
    },
    {
        id: 4,
        nombre: 'Bella Nupcial',
        ubicacion: 'Montevideo',
        rating: 4.9, reviews: 21,
        descripcion: 'Velos, guantes, zapatos y accesorios para el peinado. Bella Nupcial te ofrece una selección exquisita de firmas internacionales y diseños propios para que encuentres todo lo necesario en un solo lugar.',
        precio: 'Desde $1.500',
        promociones: 0,
        responde: true,
        imgs: [
            'https://perfectvenue.eu/wp-content/uploads/Tendencias-en-tocados-para-novias-en-2027-_-Foto-via-Raven-Magic-Kauffman.jpg',
            'https://www.hola.com/horizon/square/b9b570677136-portada-tocados-t.jpg'
        ],
    },
    {
        id: 5,
        nombre: 'Accesorios del Sol',
        ubicacion: 'Colonia del Sacramento',
        rating: 4.6, reviews: 12,
        descripcion: 'Con un enfoque bohemio y romántico, nuestra colección incluye coronas de flores preservadas y detalles en macramé, ideales para novias que celebran su boda al aire libre o en la playa.',
        precio: 'Desde $2.000',
        promociones: 1,
        responde: false,
        imgs: [
            'https://www.hola.com/horizon/square/b9b570677136-portada-tocados-t.jpg',
            'https://perfectvenue.eu/wp-content/uploads/Tendencias-en-tocados-para-novias-en-2027-_-Foto-via-Raven-Magic-Kauffman.jpg'
        ],
    },
];

const SERVICIOS = ['Tocados de novia', 'Velos', 'Joyería nupcial', 'Zapatos de novia', 'Ramos y flores'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function ComplementosNovia() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['novias', 'destacados', 'servicios']);
    const [searchQuery, setSearchQuery] = useState('Complementos novia');
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
        <div className="comp-page">
            {/* ── HERO ── */}
            <section className="esp-hero">
                <div className="esp-hero-left" style={{ padding: '80px 5% 60px 8%' }}>
                    <nav className="esp-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <strong>Complementos novia</strong>
                    </nav>
                    <h1 className="esp-hero-title">Complementos novia</h1>

                    <form className="esp-search-bar" onSubmit={e => e.preventDefault()} style={{ position: 'relative', marginTop: '20px' }}>
                        <div className="esp-search-field search-category-wrap" ref={searchRef}>
                            <Search className="esp-search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Qué buscas"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onFocus={openCategoryDropdown}
                                autoComplete="off"
                            />
                        </div>
                        <div className="esp-search-divider"></div>
                        <div className="esp-search-field search-location search-location-wrap" ref={locationRef}>
                            <span className="location-prefix"><MapPin size={16} strokeWidth={2} className="esp-search-icon" /></span>
                            <input
                                type="text"
                                placeholder="Dónde"
                                value={locationQuery}
                                onChange={e => setLocationQuery(e.target.value)}
                                onFocus={openLocationDropdown}
                                autoComplete="off"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary esp-search-btn search-btn-dark">Buscar</button>

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

                    <p className="esp-hero-sub" style={{ marginTop: '25px', maxWidth: '580px', fontSize: '15px' }}>
                        La búsqueda de complementos de novia en Uruguay es todo un placer. Explora tiendas locales que
                        cuentan con precios accesibles y opciones únicas para embellecer tu look nupcial el día de tu boda.
                    </p>
                </div>
                <div className="esp-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://olaje.es/wp-content/uploads/2024/12/1c8f5bc9-79d1-4fbb-a09a-cb4790a09404.jpeg"
                        alt="Complementos y accesorios novia"
                        className="esp-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="comp-body container">

                {/* ── SIDEBAR ── */}
                <aside className="comp-sidebar">
                    <div className="comp-filter-group category-nav">
                        <button className="comp-filter-toggle" onClick={() => toggleSection('novias')}>
                            <div className="toggle-title-left">
                                {isOpen('novias') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Novias</span>
                            </div>
                        </button>
                        {isOpen('novias') && (
                            <div className="comp-filter-body static-nav">
                                <Link to="/directorio" className="nav-item">Todas las categorías</Link>
                                <Link to="/talleres-novia" className="nav-item">Talleres de novia</Link>
                                <Link to="/tiendas-novia" className="nav-item">Tiendas de novia</Link>
                                <Link to="/complementos-novia" className="nav-item active">Complementos novia</Link>
                                <Link to="/joyeria" className="nav-item">Joyería</Link>
                                <Link to="/belleza-novias" className="nav-item">Belleza Novias</Link>
                                <Link to="/promociones" className="nav-item" style={{ fontWeight: 'bold' }}>Promociones</Link>
                            </div>
                        )}
                    </div>

                    <div className="comp-filter-group">
                        <button className="comp-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <div className="toggle-title-left">
                                {isOpen('destacados') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Filtros destacados</span>
                            </div>
                        </button>
                        {isOpen('destacados') && (
                            <div className="comp-filter-body highlighted-filters">
                                <label className="comp-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Tag size={16} className="filter-icon-left" /> Promociones
                                    </div>
                                    <div className="toggle-switch-nuevo"><input type="checkbox" /></div>
                                </label>
                                <label className="comp-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <span className="trophy-icon">🏆</span> Ganadores Wedding Awards
                                    </div>
                                    <div className="toggle-switch-nuevo"><input type="checkbox" /></div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="comp-filter-group">
                        <button className="comp-filter-toggle" onClick={() => toggleSection('servicios')}>
                            <div className="toggle-title-left">
                                {isOpen('servicios') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Servicios</span>
                            </div>
                        </button>
                        {isOpen('servicios') && (
                            <div className="comp-filter-body">
                                {SERVICIOS.map(s => (
                                    <label key={s} className="comp-checkbox"><input type="checkbox" />{s}</label>
                                ))}
                            </div>
                        )}
                    </div>

                </aside>

                {/* ── LISTING ── */}
                <main className="comp-listing">
                    <div className="comp-listing-header">
                        <span className="comp-results-count">1.245 RESULTADOS</span>
                        <div className="comp-view-toggle">
                            <button className={`comp-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`comp-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                            <button className="comp-view-btn" title="Vista mapa">
                                <MapPin size={18} /> Mapa
                            </button>
                        </div>
                    </div>

                    <div className={`comp-cards ${viewMode === 'grid' ? 'comp-cards--grid' : ''}`}>
                        {COMPLEMENTOS.map(item => {
                            const currentImg = activeImgs[item.id] ?? 0;
                            const isFav = favs.includes(item.id);
                            return (
                                <article key={item.id} className="comp-card">
                                    <div className="comp-card-img-wrap">
                                        <img src={item.imgs[currentImg]} alt={item.nombre} className="comp-card-img" />
                                        {item.imgs.length > 1 && (
                                            <div className="comp-card-dots">
                                                {item.imgs.map((_, i) => (
                                                    <button key={i} className={`comp-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(item.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`comp-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(item.id)} aria-label="Guardar en favoritos">
                                            <Heart size={20} fill={isFav ? '#fff' : 'rgba(0,0,0,0.3)'} stroke="#fff" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="comp-card-info">
                                        <div className="comp-card-info-top">
                                            <div>
                                                <h2 className="comp-card-name">{item.nombre}</h2>
                                                <div className="comp-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{item.rating.toFixed(1)}</strong>
                                                    <span>({item.reviews}) · {item.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="comp-card-desc">{item.descripcion}</p>

                                        <div className="comp-card-bottom">
                                            <div className="comp-card-meta">
                                                <span className="comp-meta-item">
                                                    <span className="icon-wrapper"><Shirt size={14} /></span>
                                                    {item.precio}
                                                </span>
                                                {item.promociones > 0 && (
                                                    <span className="comp-meta-promo">
                                                        <Tag size={13} /> {item.promociones} promoción{item.promociones > 1 ? 'es' : ''} <span className="discount-badge">-10%</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="comp-card-actions">
                                                <button className="comp-btn-presupuesto">Solicitar Presupuesto</button>
                                                {item.responde && (
                                                    <span className="comp-responde">
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
