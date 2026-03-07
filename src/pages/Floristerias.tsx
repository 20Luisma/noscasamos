import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Zap, Tag, ChevronDown, ChevronUp, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User } from 'lucide-react';
import './Floristerias.css';

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
const FLORISTERIAS = [
    {
        id: 1,
        nombre: 'Floristería Cañaeta',
        ubicacion: 'Montevideo, Montevideo',
        rating: 5.0, reviews: 15,
        descripcion: 'Si imaginas tu boda como un día lleno de frescura, romanticismo y emoción, estás exactamente donde debes estar. En Floristería Cañaeta dan forma a espacios que cuentan historias a través de las flores, creando ambientes únicos que hablan de vosotros como pareja, incluso en los detalles más...',
        precio: 'Desde UYU 3.500',
        promociones: 2,
        responde: true,
        imgs: [
            'https://zinniaflors.com/modules/ph_simpleblog/covers/41.png',
            'https://images.unsplash.com/photo-1456106606368-7d8b58a183d2?auto=format&fit=crop&w=800&q=80'
        ],
    },
    {
        id: 2,
        nombre: 'Floristería Es Baladre',
        ubicacion: 'Maldonado, Punta del Este',
        rating: 5.0, reviews: 1,
        descripcion: 'Si estás buscando una empresa especializada en la organización y decoración floral para tu boda, aquí encontrarás la opción ideal. Con más de cuatro décadas de experiencia, Floristería Es Baladre ofrece un servicio integral de decoraciones florales para que en tu gran día la belleza florezca y todo...',
        precio: 'Desde UYU 4.500',
        promociones: 0,
        responde: true,
        imgs: [
            'https://www.lafloristadelcastillo.es/images/decoracion/decoracion-floral-para-bodas-en-ferrol.jpg',
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80'
        ],
    },
    {
        id: 3,
        nombre: 'Soriales - Arte floral',
        ubicacion: 'Canelones',
        rating: 5.0, reviews: 87,
        descripcion: 'Diseños exclusivos y de vanguardia para novias con personalidad. Nuestro equipo transforma vuestros deseos en un universo de colores, texturas y aromas inigualables... Hacemos realidad cualquier locura floral que pase por vuestra mente.',
        precio: 'Desde UYU 2.800',
        promociones: 1,
        responde: true,
        imgs: [
            'https://cdn0.bodas.net/vendor/27186/3_2/640/jpg/72-1-de-1_1_27186.jpeg',
            'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80'
        ],
    },
    {
        id: 4,
        nombre: 'Boutique de Flores',
        ubicacion: 'Colonia del Sacramento',
        rating: 4.8, reviews: 34,
        descripcion: 'Armamos ramos de novia espectaculares con flores importadas y locales de la mejor calidad. Especializados en arcos florales, centros de mesa y todo tipo de arreglos para hacer tu día aún más vivo e inolvidable.',
        precio: 'Desde UYU 5.000',
        promociones: 1,
        responde: false,
        imgs: [
            'https://content.elmueble.com/medio/2022/05/31/ramo-novias-peonia_aaa0e3f8_1000x1032.jpg'
        ],
    },
    {
        id: 5,
        nombre: 'Petalos y Aromas',
        ubicacion: 'Montevideo',
        rating: 4.9, reviews: 112,
        descripcion: 'Transformamos espacios en cuentos de hadas. Contamos con una amplia variedad de opciones florales y de follaje natural o preservado. Personalizamos cada detalle para estar a la altura de tu boda soñada.',
        precio: 'Desde UYU 3.000',
        promociones: 0,
        responde: true,
        imgs: [
            'https://www.margaritasellamamiamor.com/img/ets_blog/post/floresboda.jpg'
        ],
    },
];

const SERVICIOS = ['Ramos de novia', 'Decoración floral para la ceremonia', 'Preservación de ramos', 'Decoración floral para el banquete', 'Prendidos', 'Tocados florales', 'Decoración coche', 'Organización de bodas', 'Detalles de boda'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function Floristerias() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['destacados', 'servicios']);
    const [searchQuery, setSearchQuery] = useState('Floristerías');
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
        <div className="flores-page">
            {/* ── HERO ── */}
            <section className="flores-hero">
                <div className="flores-hero-left">
                    <nav className="flores-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <strong>Floristerías</strong>
                    </nav>
                    <h1 className="flores-hero-title">Decoración floral bodas</h1>

                    <form className="hero-search" onSubmit={e => e.preventDefault()} style={{ position: 'relative' }}>
                        <div className="search-field search-category-wrap" ref={searchRef}>
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Floristerías"
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

                    <p className="flores-hero-desc">
                        Las floristerías para bodas en Uruguay ofrecen una amplia gama de servicios personalizados.
                        Descubre proveedores que se adaptan a tu estilo y presupuesto, asegurando que cada rincón esté
                        decorado con hermosas flores.
                    </p>
                </div>
                <div className="flores-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://eljardindelaabuela.com/wp-content/uploads/2020/12/bodas-1024x683.jpg"
                        alt="Ramo de novia floral"
                        className="flores-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="flores-body container">

                {/* ── SIDEBAR ── */}
                <aside className="flores-sidebar">

                    <div className="flores-filter-group">
                        <button className="flores-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <span>Filtros destacados</span>
                            {isOpen('destacados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destacados') && (
                            <div className="flores-filter-body">
                                <label className="flores-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Tag size={16} className="filter-icon-left" /> Promociones
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                                <label className="flores-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Star size={16} className="filter-icon-left" /> Ganadores Wedding Awards
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="flores-filter-group">
                        <button className="flores-filter-toggle" onClick={() => toggleSection('servicios')}>
                            <span>Servicios</span>
                            {isOpen('servicios') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('servicios') && (
                            <div className="flores-filter-body">
                                {SERVICIOS.map(s => (
                                    <label key={s} className="flores-checkbox"><input type="checkbox" />{s}</label>
                                ))}
                            </div>
                        )}
                    </div>

                </aside>

                {/* ── LISTING ── */}
                <main className="flores-listing">
                    <div className="flores-listing-header">
                        <span className="flores-results-count">{FLORISTERIAS.length} RESULTADOS</span>
                        <div className="flores-view-toggle">
                            <button className={`flores-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`flores-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                            <button className="flores-view-btn" title="Vista mapa">
                                <MapPin size={18} /> Mapa
                            </button>
                        </div>
                    </div>

                    <div className={`flores-cards ${viewMode === 'grid' ? 'flores-cards--grid' : ''}`}>
                        {FLORISTERIAS.map(item => {
                            const currentImg = activeImgs[item.id] ?? 0;
                            const isFav = favs.includes(item.id);
                            return (
                                <article key={item.id} className="flores-card">
                                    <div className="flores-card-img-wrap">
                                        <img src={item.imgs[currentImg]} alt={item.nombre} className="flores-card-img" />

                                        {item.imgs.length > 1 && (
                                            <div className="flores-card-dots">
                                                {item.imgs.map((_, i) => (
                                                    <button key={i} className={`flores-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(item.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`flores-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(item.id)} aria-label="Guardar en favoritos">
                                            <Heart size={20} fill={isFav ? '#fff' : 'rgba(0,0,0,0.3)'} stroke="#fff" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="flores-card-info">
                                        <div className="flores-card-info-top">
                                            <div>
                                                <h2 className="flores-card-name">{item.nombre}</h2>
                                                <div className="flores-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{item.rating.toFixed(1)}</strong>
                                                    <span>({item.reviews}) · {item.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="flores-card-desc">{item.descripcion}</p>

                                        <div className="flores-card-bottom">
                                            <div className="flores-card-meta">
                                                <span className="flores-meta-item">
                                                    <span className="icon-wrapper"><Flower2 size={14} /></span>
                                                    {item.precio}
                                                </span>
                                                {item.promociones > 0 && (
                                                    <span className="flores-meta-promo">
                                                        <Tag size={13} /> {item.promociones} promoción{item.promociones > 1 ? 'es' : ''} <span className="discount-badge">-10%</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flores-card-actions">
                                                <button className="flores-btn-presupuesto">Solicitar Presupuesto</button>
                                                {item.responde && (
                                                    <span className="flores-responde">
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
