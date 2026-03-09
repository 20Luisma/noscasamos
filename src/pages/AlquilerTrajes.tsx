import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Zap, Tag, ChevronDown, ChevronRight, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User, Video as VideoIcon } from 'lucide-react';
import './AlquilerTrajes.css';

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
// User requested images for cards:
// 1: https://cdn0.bodas.com.mx/usr/2/1/1/9/cfb_2x_826245.jpg 
// 2: https://i.pinimg.com/originals/6a/27/12/6a27127cdb4a8ed5790a76b9d7b5b360.jpg 
// 3: https://stylelovely.com/atrendylifeweddings/files/2017/01/a_trendy_life_weddings-2-5.jpg 
// 4: https://i.pinimg.com/736x/5a/c7/c5/5ac7c562132adf0ce20d04e2388fc23f.jpg

const TIENDAS = [
    {
        id: 1,
        nombre: 'M3 Alquileres Centro',
        ubicacion: 'Centro, Montevideo',
        rating: 4.9, reviews: 121,
        descripcion: 'Si estás buscando el traje o el chaqué perfecto para tu boda, no dudes en contar con M3 Alquileres. Su equipo de profesionales te atenderá de manera personalizada desde el primer momento, con el objetivo de que vistas con la máxima elegancia y sin perder tu personalidad...',
        precio: 'Desde $U 4.500',
        promociones: 0,
        descuentoText: '',
        responde: false,
        isTop: false,
        imgs: [
            'https://cdn0.bodas.com.mx/usr/2/1/1/9/cfb_2x_826245.jpg',
            'https://i.pinimg.com/originals/6a/27/12/6a27127cdb4a8ed5790a76b9d7b5b360.jpg'
        ],
    },
    {
        id: 2,
        nombre: 'MC Moda Hombre Rent',
        ubicacion: 'Pocitos, Montevideo',
        rating: 5.0, reviews: 10,
        descripcion: 'En MC Moda Hombre están comprometidos con las tendencias más actuales en trajes de novio y padrino, acompañante. Cuentan con servicio de alquiler de trajes de ceremonia de alta calidad para garantizarte un aspecto impecable en el día más especial...',
        precio: 'Desde $U 5.200',
        promociones: 1,
        descuentoText: '-10%',
        responde: true,
        isTop: false,
        imgs: [
            'https://i.pinimg.com/originals/6a/27/12/6a27127cdb4a8ed5790a76b9d7b5b360.jpg',
            'https://stylelovely.com/atrendylifeweddings/files/2017/01/a_trendy_life_weddings-2-5.jpg'
        ],
    },
    {
        id: 3,
        nombre: 'Rent & Suit Punta',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 4.8, reviews: 45,
        descripcion: 'Rent & Suit te ofrece la posibilidad de alquilar el traje ideal sin necesidad de comprarlo. Disponen de un catálogo extenso con diferentes estilos de chaqué, smoking y levitas en perfectas condiciones y con servicio de tintorería y ajustes a medida incluido en el precio...',
        precio: 'Desde $U 6.000',
        promociones: 0,
        descuentoText: '',
        responde: true,
        isTop: false,
        imgs: [
            'https://stylelovely.com/atrendylifeweddings/files/2017/01/a_trendy_life_weddings-2-5.jpg',
            'https://i.pinimg.com/736x/5a/c7/c5/5ac7c562132adf0ce20d04e2388fc23f.jpg'
        ],
    },
    {
        id: 4,
        nombre: 'El Armario del Novio',
        ubicacion: 'Ciudad Vieja, Montevideo',
        rating: 4.7, reviews: 89,
        descripcion: 'El Armario del Novio es pionero en el alquiler de indumentaria masculina para grandes eventos en Uruguay. Ofrecen una colección renovada cada temporada para que luzcas moderno y apropiado pagando tan solo una fracción del valor real del traje. Ajustes en el día...',
        precio: 'Desde $U 3.800',
        promociones: 2,
        descuentoText: '-15%',
        responde: false,
        isTop: true,
        imgs: [
            'https://i.pinimg.com/736x/5a/c7/c5/5ac7c562132adf0ce20d04e2388fc23f.jpg',
            'https://cdn0.bodas.com.mx/usr/2/1/1/9/cfb_2x_826245.jpg'
        ],
    }
];

type ViewMode = 'list' | 'grid';

export default function AlquilerTrajes() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['novios', 'destacados']);
    const [searchQuery, setSearchQuery] = useState('Alquiler Trajes');
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
        <div className="alquiler-page">
            {/* ── HERO ── */}
            <section className="esp-hero">
                <div className="esp-hero-left" style={{ padding: '80px 5% 60px 8%' }}>
                    <nav className="esp-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <Link to="/trajes-novio">Trajes novio</Link>
                        <span>/</span>
                        <strong>Alquiler Trajes</strong>
                    </nav>
                    <h1 className="esp-hero-title">Alquiler Trajes</h1>

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
                        Elige el atuendo perfecto para tu boda en Uruguay. Las tiendas locales de alquiler de trajes cuentan
                        con gran variedad y precios asequibles. No esperes más y encuentra tu traje ideal entre estas opciones.
                    </p>
                </div>
                <div className="esp-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://atelierdebodas.com/wp-content/uploads/2026/03/traje-novio-galip-masculini-editorial-atelierdebodas.webp"
                        alt="Traje de Novio Alquiler"
                        className="esp-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="alquiler-body container">

                {/* ── SIDEBAR ── */}
                <aside className="alquiler-sidebar">
                    <div className="alquiler-filter-group category-nav">
                        <button className="alquiler-filter-toggle" onClick={() => toggleSection('novios')}>
                            <div className="toggle-title-left">
                                {isOpen('novios') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Novios</span>
                            </div>
                        </button>
                        {isOpen('novios') && (
                            <div className="alquiler-filter-body static-nav">
                                <Link to="/directorio" className="nav-item">Todas las categorías</Link>
                                <Link to="/trajes-novio" className="nav-item">Trajes novio</Link>
                                <Link to="/alquiler-trajes" className="nav-item active">Alquiler Trajes</Link>
                                <Link to="/directorio" className="nav-item">Complementos novio</Link>
                                <Link to="/directorio" className="nav-item">Cuidado masculino</Link>
                                <Link to="/promociones" className="nav-item" style={{ fontWeight: 'bold', color: '#f8b400' }}>Promociones</Link>
                            </div>
                        )}
                    </div>

                    <div className="alquiler-filter-group">
                        <button className="alquiler-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <div className="toggle-title-left">
                                {isOpen('destacados') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Filtros destacados</span>
                            </div>
                        </button>
                        {isOpen('destacados') && (
                            <div className="alquiler-filter-body highlighted-filters">
                                <label className="alquiler-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Tag size={16} className="filter-icon-left" /> Promociones
                                    </div>
                                    <div className="toggle-switch-nuevo"><input type="checkbox" /></div>
                                </label>
                                <label className="alquiler-checkbox toggle-style">
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
                <main className="alquiler-listing">
                    <div className="alquiler-listing-header">
                        <span className="alquiler-results-count">29 RESULTADOS</span>
                        <div className="alquiler-view-toggle">
                            <button className={`alquiler-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`alquiler-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                            <button className="alquiler-view-btn" title="Vista mapa">
                                <MapPin size={18} /> Mapa
                            </button>
                        </div>
                    </div>

                    <div className={`alquiler-cards ${viewMode === 'grid' ? 'alquiler-cards--grid' : ''}`}>
                        {TIENDAS.map(item => {
                            const currentImg = activeImgs[item.id] ?? 0;
                            const isFav = favs.includes(item.id);
                            return (
                                <article key={item.id} className="alquiler-card">
                                    <div className="alquiler-card-img-wrap">
                                        <img src={item.imgs[currentImg]} alt={item.nombre} className="alquiler-card-img" />
                                        {item.isTop && <span className="top-badge">TOP</span>}
                                        {item.imgs.length > 1 && (
                                            <div className="alquiler-card-dots">
                                                {item.imgs.map((_, i) => (
                                                    <button key={i} className={`alquiler-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(item.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`alquiler-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(item.id)} aria-label="Guardar en favoritos">
                                            <Heart size={20} fill={isFav ? '#fff' : 'rgba(0,0,0,0.3)'} stroke="#fff" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="alquiler-card-info">
                                        <div className="alquiler-card-info-top">
                                            <div>
                                                <h2 className="alquiler-card-name">{item.nombre}</h2>
                                                <div className="alquiler-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{item.rating.toFixed(1)}</strong>
                                                    <span>({item.reviews}) · {item.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="alquiler-card-desc">{item.descripcion}</p>

                                        <div className="alquiler-card-bottom">
                                            <div className="alquiler-card-meta">
                                                <span className="alquiler-meta-item">
                                                    <span className="icon-wrapper"><Shirt size={14} /></span>
                                                    {item.precio}
                                                </span>
                                                {item.promociones > 0 && (
                                                    <span className="alquiler-meta-promo">
                                                        <Tag size={13} /> {item.promociones} promoción{item.promociones > 1 ? 'es' : ''}
                                                        {item.descuentoText && <span className="discount-badge">{item.descuentoText}</span>}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="alquiler-card-actions">
                                                <button className="alquiler-btn-presupuesto">Solicitar Presupuesto</button>
                                                {item.responde && (
                                                    <span className="alquiler-responde">
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
