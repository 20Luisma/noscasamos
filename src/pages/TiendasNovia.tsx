import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Zap, Tag, ChevronDown, ChevronRight, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User, Video as VideoIcon } from 'lucide-react';
import './TiendasNovia.css';

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
        nombre: 'Novias Pepita Dueñas',
        ubicacion: 'Montevideo',
        rating: 4.9, reviews: 71,
        descripcion: 'Elegir tu vestido de novia es mucho más que una compra: es un momento único y cargado de ilusión. Por eso, en Novias Pepita Dueñas te acompañan en esta decisión y te ponen mucho más fácil el camino. Te ofrecen diseños elegantes, llenos de personalidad y con ese toque exclusivo que hará que tu pareja...',
        precio: 'Desde $35.000',
        promociones: 1,
        descuentoText: '-3%',
        responde: true,
        imgs: [
            'https://www.dressbori.com/wp-content/uploads/2020/06/2019_VEL_LUNA_NOVIAS_1.jpg',
            'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop'
        ],
    },
    {
        id: 2,
        nombre: 'Seda y Organza Novias',
        ubicacion: 'Canelones',
        rating: 5.0, reviews: 14,
        descripcion: 'Seda y Organza Novias es una empresa que destaca por su amor al trabajo bien hecho. Para ellos, tú y cada novia sois una nueva ilusión, un maravilloso viaje que compartís durante meses, desde la elección del vestido hasta el día de la boda. Agradecerás la tranquilidad y el saber que nada puede salir...',
        precio: 'Desde $28.000',
        promociones: 0,
        descuentoText: '',
        responde: false,
        imgs: [
            'https://ae01.alicdn.com/kf/S219319bc048b49379dd2961ccf8ee1202.jpg_960x960.jpg',
            'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        ],
    },
    {
        id: 3,
        nombre: 'La Couture',
        ubicacion: 'Maldonado',
        rating: 4.0, reviews: 1,
        descripcion: 'La Couture ofrece diseños personales para una novia actual, moderna y elegante. Con la calidad/precio mas atractiva del mercado. Además, visitar La Couture es ahorrar tiempo ya que es como ir a 5 tiendas en 1 con mas de 250 vestidos de novia por showroom y una sección Outlet. Modelos que...',
        precio: 'Desde $20.000',
        promociones: 1,
        descuentoText: '-5%',
        responde: true,
        imgs: [
            'https://biancadisposa.es/wp-content/uploads/2023/07/8160_5-scaled.jpg',
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        ],
    },
    {
        id: 4,
        nombre: 'Almacén de la Novia',
        ubicacion: 'Colonia',
        rating: 4.8, reviews: 35,
        descripcion: 'Un espacio íntimo y encantador donde encontrarás asesoramiento personalizado. Cada novia es única y merece una atención que refleje la importancia de su gran día.',
        precio: 'Desde $25.000',
        promociones: 0,
        descuentoText: '',
        responde: true,
        imgs: [
            'https://www.manugarciacostura.com/CUS/colecciones2023.jpg',
            'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop'
        ],
    },
];

const SERVICIOS = [
    'Venta de vestidos de novia',
    'Look de madrina, dama de honor',
    'Asesoría de imagen y estilismo',
    'Diseño de vestidos de novia',
    'Diseño de complementos de novia',
    'Diseños para otros invitados',
    'Alquiler de vestidos de novia'
];

type ViewMode = 'list' | 'grid';

export default function TiendasNovia() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['novias', 'destacados', 'servicios']);
    const [searchQuery, setSearchQuery] = useState('Tiendas de novia');
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
        <div className="tiendas-page">
            {/* ── HERO ── */}
            <section className="esp-hero">
                <div className="esp-hero-left" style={{ padding: '80px 5% 60px 8%' }}>
                    <nav className="esp-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <strong>Tiendas de novia</strong>
                    </nav>
                    <h1 className="esp-hero-title">Tiendas de vestidos de novia</h1>

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
                        Descubre el vestido de tus sueños en las tiendas de novia de Uruguay. Aquí podrás
                        explorar una amplia variedad de estilos, precios y disponibilidad para que tu elección sea memorable en tu día especial.
                    </p>
                </div>
                <div className="esp-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://despedidasmolamola.com/wp-content/uploads/2020/10/tienda-2-e1626085226771.jpg"
                        alt="Novia probándose vestido en tienda"
                        className="esp-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="tiendas-body container">

                {/* ── SIDEBAR ── */}
                <aside className="tiendas-sidebar">
                    <div className="tiendas-filter-group category-nav">
                        <button className="tiendas-filter-toggle" onClick={() => toggleSection('novias')}>
                            <div className="toggle-title-left">
                                {isOpen('novias') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Novias</span>
                            </div>
                        </button>
                        {isOpen('novias') && (
                            <div className="tiendas-filter-body static-nav">
                                <Link to="/talleres-novia" className="nav-item">Talleres de novia</Link>
                                <Link to="/tiendas-novia" className="nav-item active">Tiendas de novia</Link>
                                <Link to="/complementos-novia" className="nav-item">Complementos novia</Link>
                                <Link to="/joyeria" className="nav-item">Joyería</Link>
                                <Link to="/belleza-novias" className="nav-item">Belleza Novias</Link>
                                <Link to="/promociones" className="nav-item" style={{ fontWeight: 'bold', color: '#f8b400' }}>Promociones</Link>
                            </div>
                        )}
                    </div>

                    <div className="tiendas-filter-group">
                        <button className="tiendas-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <div className="toggle-title-left">
                                {isOpen('destacados') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Filtros destacados</span>
                            </div>
                        </button>
                        {isOpen('destacados') && (
                            <div className="tiendas-filter-body highlighted-filters">
                                <label className="tiendas-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Tag size={16} className="filter-icon-left" /> Promociones
                                    </div>
                                    <div className="toggle-switch-nuevo"><input type="checkbox" /></div>
                                </label>
                                <label className="tiendas-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <span className="trophy-icon">🏆</span> Ganadores Wedding Awards
                                    </div>
                                    <div className="toggle-switch-nuevo"><input type="checkbox" /></div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="tiendas-filter-group">
                        <button className="tiendas-filter-toggle" onClick={() => toggleSection('servicios')}>
                            <div className="toggle-title-left">
                                {isOpen('servicios') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Servicios</span>
                            </div>
                        </button>
                        {isOpen('servicios') && (
                            <div className="tiendas-filter-body">
                                {SERVICIOS.map(s => (
                                    <label key={s} className="tiendas-checkbox"><input type="checkbox" />{s}</label>
                                ))}
                            </div>
                        )}
                    </div>

                </aside>

                {/* ── LISTING ── */}
                <main className="tiendas-listing">
                    <div className="tiendas-listing-header">
                        <span className="tiendas-results-count">757 RESULTADOS</span>
                        <div className="tiendas-view-toggle">
                            <button className={`tiendas-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`tiendas-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                            <button className="tiendas-view-btn" title="Vista mapa">
                                <MapPin size={18} /> Mapa
                            </button>
                        </div>
                    </div>

                    <div className={`tiendas-cards ${viewMode === 'grid' ? 'tiendas-cards--grid' : ''}`}>
                        {TIENDAS.map(item => {
                            const currentImg = activeImgs[item.id] ?? 0;
                            const isFav = favs.includes(item.id);
                            return (
                                <article key={item.id} className="tiendas-card">
                                    <div className="tiendas-card-img-wrap">
                                        <img src={item.imgs[currentImg]} alt={item.nombre} className="tiendas-card-img" />
                                        {item.imgs.length > 1 && (
                                            <div className="tiendas-card-dots">
                                                {item.imgs.map((_, i) => (
                                                    <button key={i} className={`tiendas-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(item.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`tiendas-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(item.id)} aria-label="Guardar en favoritos">
                                            <Heart size={20} fill={isFav ? '#fff' : 'rgba(0,0,0,0.3)'} stroke="#fff" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="tiendas-card-info">
                                        <div className="tiendas-card-info-top">
                                            <div>
                                                <h2 className="tiendas-card-name">{item.nombre}</h2>
                                                <div className="tiendas-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{item.rating.toFixed(1)}</strong>
                                                    <span>({item.reviews}) · {item.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="tiendas-card-desc">{item.descripcion}</p>

                                        <div className="tiendas-card-bottom">
                                            <div className="tiendas-card-meta">
                                                <span className="tiendas-meta-item">
                                                    <span className="icon-wrapper"><Shirt size={14} /></span>
                                                    {item.precio}
                                                </span>
                                                {item.promociones > 0 && (
                                                    <span className="tiendas-meta-promo">
                                                        <Tag size={13} /> {item.promociones} promoción{item.promociones > 1 ? 'es' : ''} <span className="discount-badge">{item.descuentoText}</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="tiendas-card-actions">
                                                <button className="tiendas-btn-presupuesto">Solicitar Presupuesto</button>
                                                {item.responde && (
                                                    <span className="tiendas-responde">
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
