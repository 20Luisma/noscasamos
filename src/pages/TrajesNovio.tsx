import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Zap, Tag, ChevronDown, ChevronRight, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User, Video as VideoIcon } from 'lucide-react';
import './TrajesNovio.css';

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
        nombre: 'Sastrería Montevideo',
        ubicacion: 'Montevideo',
        rating: 4.8, reviews: 277,
        descripcion: 'Sastrería Montevideo es una firma de moda masculina especializada en ceremonia que combina diseño, tradición y vanguardia. Cada traje se concibe para realzar la silueta masculina y transmitir elegancia, carácter y modernidad, cuidando al máximo cada detalle...',
        precio: 'Desde $U 15.000',
        promociones: 3,
        descuentoText: '-10%',
        responde: false,
        isTop: false,
        imgs: [
            'https://www.labastilla.com/sites/default/files/traje_negro_.jpg',
            'https://www.montoya1903.es/wp-content/uploads/2024/03/Mens-Slim-Fit-Suits-_-Tuxedos-and-Double-Breasted-Suits-_-VIOSSI-min.jpg'
        ],
    },
    {
        id: 2,
        nombre: 'Elegancia Carrasco',
        ubicacion: 'Carrasco, Montevideo',
        rating: 5.0, reviews: 28,
        descripcion: 'La empresa, que se fundó en 1990 en Montevideo, es referencia y se dedica de manera profesional a la confección y venta de trajes de novio para que te veas elegante en uno de los días más importantes. En Elegancia Carrasco encontrarás todo tipo de propuestas personalizadas...',
        precio: 'Desde $U 19.500',
        promociones: 0,
        descuentoText: '',
        responde: true,
        isTop: false,
        imgs: [
            'https://i.pinimg.com/474x/8f/9f/52/8f9f52728ac454c3adf73a7b95088a27.jpg',
            'https://www.labastilla.com/sites/default/files/smoking_caramelo.jpg'
        ],
    },
    {
        id: 3,
        nombre: 'Ceremonias Punta del Este',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 4.9, reviews: 59,
        descripcion: 'La calidad en los servicios que recibirás, junto con la excelencia de los tejidos con los que se confeccionan todos los modelos, te sorprenderán desde el primer momento en Ceremonias Punta del Este. Una tienda especializada en trajes para novios, padrinos y acompañantes...',
        precio: 'Desde $U 12.000',
        promociones: 1,
        descuentoText: '-5%',
        responde: false,
        isTop: false,
        imgs: [
            'https://www.labastilla.com/sites/default/files/smoking_caramelo.jpg',
            'https://www.labastilla.com/sites/default/files/traje_negro_.jpg'
        ],
    },
    {
        id: 4,
        nombre: 'Boutique San José',
        ubicacion: 'Centro, San José',
        rating: 4.9, reviews: 19,
        descripcion: 'Boutique San José es la tienda perfecta para ti. Entre sus opciones, podrás encontrar el traje ideal para tu boda. Si quieres lucir radiante en un día tan mágico e irrepetible, no dudes en acercarte a esta boutique. Encuentra más que un traje de novio: calidad, elegancia, comodidad...',
        precio: 'Desde $U 9.500',
        promociones: 2,
        descuentoText: '-10%',
        responde: true,
        isTop: false,
        imgs: [
            'https://www.montoya1903.es/wp-content/uploads/2024/03/Mens-Slim-Fit-Suits-_-Tuxedos-and-Double-Breasted-Suits-_-VIOSSI-min.jpg',
            'https://i.pinimg.com/474x/8f/9f/52/8f9f52728ac454c3adf73a7b95088a27.jpg'
        ],
    },
    {
        id: 5,
        nombre: "Trajes Salto",
        ubicacion: 'Salto',
        rating: 4.9, reviews: 72,
        descripcion: 'Si todavía no has encontrado el traje perfecto para el día más importante de tu vida, estás en el lugar adecuado. Trajes Salto es una tienda en la que podrás encontrar una amplia variedad de diseños para que en el día de tu boda estés a la altura de las circunstancias...',
        precio: 'Desde $U 8.900',
        promociones: 0,
        descuentoText: '',
        responde: false,
        isTop: false,
        imgs: [
            'https://i.pinimg.com/474x/8f/9f/52/8f9f52728ac454c3adf73a7b95088a27.jpg',
            'https://www.labastilla.com/sites/default/files/traje_negro_.jpg'
        ],
    }
];

const SERVICIOS = [
    'Venta de trajes de novio',
    'Diseño de trajes de novio',
    'Alquiler de trajes de novio',
    'Venta de complementos de novio',
    'Diseño complementos de novio',
    'Venta de trajes de padrino',
    'Asesoría de imagen y estilismo',
    'Diseño de trajes de padrino'
];

const ESTILOS = [
    'Traje clásico',
    'Chaqué',
    'Levita',
    'Semilevita',
    'Frac',
    'Smoking'
];

type ViewMode = 'list' | 'grid';

export default function TrajesNovio() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['novios', 'destacados', 'servicios', 'estilo']);
    const [searchQuery, setSearchQuery] = useState('Trajes novio');
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
        <div className="trajes-page">
            {/* ── HERO ── */}
            <section className="esp-hero">
                <div className="esp-hero-left" style={{ padding: '80px 5% 60px 8%' }}>
                    <nav className="esp-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <strong>Trajes novio</strong>
                    </nav>
                    <h1 className="esp-hero-title">Trajes novio</h1>

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
                        Encuentra las principales tiendas de trajes de novio que fusionan tradición y estilo.
                        Aquí, podrás descubrir propuestas exclusivas que te harán brillar y que son perfectas para tu gran celebración.
                    </p>
                </div>
                <div className="esp-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://oroalianzas.es/wp-content/uploads/www.oroalianzas.es-blog-trajes-y-complementos-de-novio-traje-negro-1.jpg"
                        alt="Novio ajustándose la pajarita"
                        className="esp-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="trajes-body container">

                {/* ── SIDEBAR ── */}
                <aside className="trajes-sidebar">
                    <div className="trajes-filter-group category-nav">
                        <button className="trajes-filter-toggle" onClick={() => toggleSection('novios')}>
                            <div className="toggle-title-left">
                                {isOpen('novios') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Novios</span>
                            </div>
                        </button>
                        {isOpen('novios') && (
                            <div className="trajes-filter-body static-nav">
                                <Link to="/directorio" className="nav-item">Todas las categorías</Link>
                                <Link to="/trajes-novio" className="nav-item active">Trajes novio</Link>
                                <Link to="/directorio" className="nav-item">Alquiler Trajes</Link>
                                <Link to="/directorio" className="nav-item">Complementos novio</Link>
                                <Link to="/directorio" className="nav-item">Cuidado masculino</Link>
                            </div>
                        )}
                    </div>

                    <div className="trajes-filter-group">
                        <button className="trajes-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <div className="toggle-title-left">
                                {isOpen('destacados') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Filtros destacados</span>
                            </div>
                        </button>
                        {isOpen('destacados') && (
                            <div className="trajes-filter-body highlighted-filters">
                                <label className="trajes-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Tag size={16} className="filter-icon-left" /> Promociones
                                    </div>
                                    <div className="toggle-switch-nuevo"><input type="checkbox" /></div>
                                </label>
                                <label className="trajes-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <span className="trophy-icon">🏆</span> Ganadores Wedding Awards
                                    </div>
                                    <div className="toggle-switch-nuevo"><input type="checkbox" /></div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="trajes-filter-group">
                        <button className="trajes-filter-toggle" onClick={() => toggleSection('servicios')}>
                            <div className="toggle-title-left">
                                {isOpen('servicios') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Servicios</span>
                            </div>
                        </button>
                        {isOpen('servicios') && (
                            <div className="trajes-filter-body">
                                {SERVICIOS.map(s => (
                                    <label key={s} className="trajes-checkbox"><input type="checkbox" />{s}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="trajes-filter-group">
                        <button className="trajes-filter-toggle" onClick={() => toggleSection('estilo')}>
                            <div className="toggle-title-left">
                                {isOpen('estilo') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Estilo</span>
                            </div>
                        </button>
                        {isOpen('estilo') && (
                            <div className="trajes-filter-body">
                                {ESTILOS.map(s => (
                                    <label key={s} className="trajes-checkbox"><input type="checkbox" />{s}</label>
                                ))}
                            </div>
                        )}
                    </div>

                </aside>

                {/* ── LISTING ── */}
                <main className="trajes-listing">
                    <div className="trajes-listing-header">
                        <span className="trajes-results-count">497 RESULTADOS</span>
                        <div className="trajes-view-toggle">
                            <button className={`trajes-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`trajes-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                            <button className="trajes-view-btn" title="Vista mapa">
                                <MapPin size={18} /> Mapa
                            </button>
                        </div>
                    </div>

                    <div className={`trajes-cards ${viewMode === 'grid' ? 'trajes-cards--grid' : ''}`}>
                        {TIENDAS.map(item => {
                            const currentImg = activeImgs[item.id] ?? 0;
                            const isFav = favs.includes(item.id);
                            return (
                                <article key={item.id} className="trajes-card">
                                    <div className="trajes-card-img-wrap">
                                        <img src={item.imgs[currentImg]} alt={item.nombre} className="trajes-card-img" />
                                        {item.isTop && <span className="top-badge">TOP</span>}
                                        {item.imgs.length > 1 && (
                                            <div className="trajes-card-dots">
                                                {item.imgs.map((_, i) => (
                                                    <button key={i} className={`trajes-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(item.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`trajes-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(item.id)} aria-label="Guardar en favoritos">
                                            <Heart size={20} fill={isFav ? '#fff' : 'rgba(0,0,0,0.3)'} stroke="#fff" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="trajes-card-info">
                                        <div className="trajes-card-info-top">
                                            <div>
                                                <h2 className="trajes-card-name">{item.nombre}</h2>
                                                <div className="trajes-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{item.rating.toFixed(1)}</strong>
                                                    <span>({item.reviews}) · {item.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="trajes-card-desc">{item.descripcion}</p>

                                        <div className="trajes-card-bottom">
                                            <div className="trajes-card-meta">
                                                <span className="trajes-meta-item">
                                                    <span className="icon-wrapper"><Shirt size={14} /></span>
                                                    {item.precio}
                                                </span>
                                                {item.promociones > 0 && (
                                                    <span className="trajes-meta-promo">
                                                        <Tag size={13} /> {item.promociones} promoción{item.promociones > 1 ? 'es' : ''}
                                                        {item.descuentoText && <span className="discount-badge">{item.descuentoText}</span>}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="trajes-card-actions">
                                                <button className="trajes-btn-presupuesto">Solicitar Presupuesto</button>
                                                {item.responde && (
                                                    <span className="trajes-responde">
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
