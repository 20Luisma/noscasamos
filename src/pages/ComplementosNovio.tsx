import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Zap, Tag, ChevronDown, ChevronRight, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User, Video as VideoIcon } from 'lucide-react';
import './ComplementosNovio.css';

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

/* ─── Tiendas Data ──────────────────────────────────────── */

const TIENDAS = [
    {
        id: 1,
        nombre: 'Accesorios Elegance',
        ubicacion: 'Centro, Montevideo',
        rating: 4.8, reviews: 45,
        descripcion: 'Accesorios Elegance es la empresa que no solo vestirá de forma elegante a los novios, sino que también les entregarán los accesorios ideales. El novio deberá guardar la elegancia y la sobriedad necesaria para una fiesta de este tipo...',
        precio: 'Desde $U 1.200',
        promociones: 0,
        descuentoText: '',
        responde: false,
        isTop: false,
        imgs: [
            'https://imagenes.heraldo.es/files/image_990_556/uploads/imagenes/2019/10/23/corbatas.jpeg',
            'https://debodaconangela.com/wp-content/uploads/2018/01/elegir-complementos-accesorios-trajes-novio.jpg'
        ],
    },
    {
        id: 2,
        nombre: 'Corbatas & Pajaritas Uruguay',
        ubicacion: 'Pocitos, Montevideo',
        rating: 5.0, reviews: 112,
        descripcion: 'Encontrarás los complementos para novio más originales, todos hechos a mano de una forma única y exclusiva para ti. Si estás buscando una corbata o pajarita para lucir en tu gran día, no lo dudes más. Acércate hasta esta tienda afincada en Montevideo...',
        precio: 'Desde $U 850',
        promociones: 1,
        descuentoText: '-10%',
        responde: true,
        isTop: false,
        imgs: [
            'https://debodaconangela.com/wp-content/uploads/2018/01/elegir-complementos-accesorios-trajes-novio.jpg',
            'https://imagenes.heraldo.es/files/image_990_556/uploads/imagenes/2019/10/23/corbatas.jpeg'
        ],
    },
    {
        id: 3,
        nombre: 'Sombreros Mil',
        ubicacion: 'Solís (Maldonado)',
        rating: 4.7, reviews: 21,
        descripcion: 'Sombreros Mil es una tienda dedicada al mundo del sombrero y complementos afines, tanto de carácter general como de carácter más exclusivo. Es el sitio ideal si eres una persona exigente que busca los complementos de la más alta calidad...',
        precio: 'Desde $U 3.500',
        promociones: 0,
        descuentoText: '',
        responde: true,
        isTop: false,
        imgs: [
            'https://www.nokifloristas.com/udecontrol_datos/galerias/grandes/594.jpg',
            'https://www.d-etiqueta.com/wp-content/uploads/2017/01/complementos-para-esmokin-2.jpg'
        ],
    },
    {
        id: 4,
        nombre: 'Gemelos & Cía',
        ubicacion: 'Ciudad Vieja, Montevideo',
        rating: 4.9, reviews: 78,
        descripcion: 'Se acerca uno de los días más importantes de tu vida. No dejes nada al azar y planifica hasta el más mínimo detalle. Y en los detalles es donde Gemelos & Cía pone su granito de arena, ofreciendo accesorios únicos que resaltarán tu estilo personal...',
        precio: 'Desde $U 2.100',
        promociones: 2,
        descuentoText: '-15%',
        responde: false,
        isTop: true,
        imgs: [
            'https://www.d-etiqueta.com/wp-content/uploads/2017/01/complementos-para-esmokin-2.jpg',
            'https://www.nokifloristas.com/udecontrol_datos/galerias/grandes/594.jpg'
        ],
    }
];

type ViewMode = 'list' | 'grid';

export default function ComplementosNovio() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['novios', 'destacados']);
    const [searchQuery, setSearchQuery] = useState('Complementos novio');
    const [locationQuery, setLocationQuery] = useState('');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [locationTab, setLocationTab] = useState<'departamento' | 'internacional'>('departamento');
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
                        <Link to="/trajes-novio">Trajes novio</Link>
                        <span>/</span>
                        <strong>Complementos novio</strong>
                    </nav>
                    <h1 className="esp-hero-title">Complementos novio</h1>

                    <form className="esp-search-bar" onSubmit={e => e.preventDefault()} style={{ position: 'relative', marginTop: '30px' }}>
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

                        {/* Dropdowns */}
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
                                        {/* Simplified map for brevity */}
                                    </div>
                                )}
                            </div>,
                            document.body
                        )}
                    </form>

                    <p className="esp-hero-sub" style={{ marginTop: '25px', maxWidth: '580px', fontSize: '15.5px', lineHeight: '1.6' }}>
                        Completa tu look de novio con los mejores accesorios en Uruguay. Corbatas, pajaritas, zapatos,
                        gemelos, y todos los complementos esenciales para brillar el día de tu boda.
                    </p>
                </div>
                <div className="esp-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://cdn0.bodas.net/vendor/20432/3_2/640/jpg/protocolo-1_1_20432.jpeg"
                        alt="Complementos novio corbatas cinturones zapatos"
                        className="esp-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="comp-body container">

                {/* ── SIDEBAR ── */}
                <aside className="comp-sidebar">
                    <div className="comp-filter-group category-nav">
                        <button className="comp-filter-toggle" onClick={() => toggleSection('novios')}>
                            <div className="toggle-title-left">
                                {isOpen('novios') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Novios</span>
                            </div>
                        </button>
                        {isOpen('novios') && (
                            <div className="comp-filter-body static-nav">
                                <Link to="/directorio" className="nav-item">Todas las categorías</Link>
                                <Link to="/trajes-novio" className="nav-item">Trajes novio</Link>
                                <Link to="/alquiler-trajes" className="nav-item">Alquiler Trajes</Link>
                                <Link to="/complementos-novio" className="nav-item active">Complementos novio</Link>
                                <Link to="/directorio" className="nav-item">Cuidado masculino</Link>
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
                </aside>

                {/* ── LISTING ── */}
                <main className="comp-listing">
                    <div className="comp-listing-header">
                        <span className="comp-results-count">10 RESULTADOS</span>
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
                        {TIENDAS.map(item => {
                            const currentImg = activeImgs[item.id] ?? 0;
                            const isFav = favs.includes(item.id);
                            return (
                                <article key={item.id} className="comp-card">
                                    <div className="comp-card-img-wrap">
                                        <img src={item.imgs[currentImg]} alt={item.nombre} className="comp-card-img" />
                                        {item.isTop && <span className="top-badge">TOP</span>}
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
                                                        <Tag size={13} /> {item.promociones} promoción{item.promociones > 1 ? 'es' : ''}
                                                        {item.descuentoText && <span className="discount-badge">{item.descuentoText}</span>}
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
