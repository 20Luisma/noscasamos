import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Zap, Tag, ChevronDown, ChevronRight, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User, Video as VideoIcon } from 'lucide-react';
import './Joyeria.css';

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
            items: ['Vestidos de novia', 'Joyería', 'Trajes madrina'],
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
const JOYERIA = [
    {
        id: 1,
        nombre: "Santi Pàmies Joiers",
        ubicacion: 'Montevideo',
        rating: 4.9, reviews: 27,
        descripcion: "En Santi Pàmies Joiers crean alianzas de boda únicas y especiales para cada pareja. Se dedican a diseñar y fabricar anillos que combinen la auténtica belleza con la funcionalidad. Haced que vuestro momento sea todavía más especial con ellos.",
        precio: 'Desde $ 14.000',
        promociones: 0,
        responde: true,
        imgs: [
            'https://static.wixstatic.com/media/542e5f_480fa56e6c7d40eda3d951409843ffed~mv2.jpg/v1/fill/w_568,h_654,al_c,lg_1,q_85,enc_avif,quality_auto/542e5f_480fa56e6c7d40eda3d951409843ffed~mv2.jpg'
        ],
    },
    {
        id: 2,
        nombre: 'Oro Vivo',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 4.8, reviews: 26,
        descripcion: 'Oro Vivo cuenta con una sólida presencia en el sector joyero a través de sus espacios cuidadosamente diseñados para ofrecer una experiencia de compra elegante, cercana y personalizada. Cada tienda está concebida como un entorno acogedor donde descubrir joyas con significado.',
        precio: 'Desde $ 4.000',
        promociones: 1,
        responde: true,
        imgs: [
            'https://www.marjoya.com/blog/wp-content/uploads/2017/02/novias-joyas-de-colores.jpg'
        ],
    },
    {
        id: 3,
        nombre: 'Joyería Loalba',
        ubicacion: 'Colonia del Sacramento',
        rating: 4.7, reviews: 15,
        descripcion: 'Loalba Joyeros es una firma de joyas especializada en alianzas de boda artesanales y anillos de compromiso. Desde su Taller Boutique & Alta Joyería, cada pieza se diseña y fabrica con la excelencia y el saber hacer que atesora la firma desde 1958.',
        precio: 'Consultar precio',
        promociones: 0,
        responde: true,
        imgs: [
            'https://asset.swarovski.com/images/c_crop,g_xy_center,w_5597,h_7475,x_3967,y_4740/dpr_auto,f_auto,q_auto,c_lfill,w_349,h_465/swa-cms/00170_028_72DPI_RGB/.jpg'
        ],
    },
    {
        id: 4,
        nombre: 'Alvaro Larrosa Furest',
        ubicacion: 'Salto',
        rating: 5.0, reviews: 68,
        descripcion: 'Expertos joyeros dedicados a la creación de piezas únicas y alianzas exclusivas. Diseños a medida para hacer realidad las joyas de tus sueños, con los mejores metales y gemas certificadas para el día más especial de tu vida.',
        precio: 'Desde $ 10.000',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.ecestaticos.com/d7r5xxd2UV68QtV5kmVwu9oOqPE=/0x0:1799x1349/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F7b0%2F4be%2F5ed%2F7b04be5ede3c44867511bcae64616faa.jpg'
        ],
    },
];

const SERVICIOS = [
    'Anillos de compromiso',
    'Alianzas de boda',
    'Collares',
    'Pendientes',
    'Pulseras',
    'Relojes',
    'Gemelos',
    'Arras'
];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function Joyeria() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['novias', 'destacados', 'servicios']);
    const [searchQuery, setSearchQuery] = useState('Joyería');
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
        <div className="joy-page">
            {/* ── HERO ── */}
            <section className="esp-hero">
                <div className="esp-hero-left" style={{ padding: '80px 5% 60px 8%' }}>
                    <nav className="esp-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <strong>Joyería</strong>
                    </nav>
                    <h1 className="esp-hero-title">Joyería</h1>

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
                        Descubre las joyerías de Uruguay que harán brillar tu ceremonia. Encuentra alianzas personalizadas y
                        joyas exquisitas que se adapten a tu estilo y presupuesto. ¡El complemento perfecto para tu gran día te espera aquí!
                    </p>
                </div>
                <div className="esp-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://i.etsystatic.com/8728158/r/il/534a8a/7344862872/il_fullxfull.7344862872_l38k.jpg"
                        alt="Joyería Novias"
                        className="esp-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="joy-body container">

                {/* ── SIDEBAR ── */}
                <aside className="joy-sidebar">
                    <div className="joy-filter-group category-nav">
                        <button className="joy-filter-toggle" onClick={() => toggleSection('novias')}>
                            <div className="toggle-title-left">
                                {isOpen('novias') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Novias</span>
                            </div>
                        </button>
                        {isOpen('novias') && (
                            <div className="joy-filter-body static-nav">
                                <Link to="/directorio" className="nav-item">Todas las categorías</Link>
                                <Link to="/talleres-novia" className="nav-item">Talleres de novia</Link>
                                <Link to="/tiendas-novia" className="nav-item">Tiendas de novia</Link>
                                <Link to="/complementos-novia" className="nav-item">Complementos novia</Link>
                                <Link to="/joyeria" className="nav-item active">Joyería</Link>
                                <Link to="/belleza-novias" className="nav-item">Belleza Novias</Link>
                                <Link to="/promociones" className="nav-item" style={{ fontWeight: 'bold', color: '#f8b400' }}>Promociones</Link>
                            </div>
                        )}
                    </div>

                    <div className="joy-filter-group">
                        <button className="joy-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <div className="toggle-title-left">
                                {isOpen('destacados') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Filtros destacados</span>
                            </div>
                        </button>
                        {isOpen('destacados') && (
                            <div className="joy-filter-body highlighted-filters">
                                <label className="joy-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Tag size={16} className="filter-icon-left" /> Promociones
                                    </div>
                                    <div className="toggle-switch-nuevo"><input type="checkbox" /></div>
                                </label>
                                <label className="joy-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <span className="trophy-icon">🏆</span> Ganadores Wedding Awards
                                    </div>
                                    <div className="toggle-switch-nuevo"><input type="checkbox" /></div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="joy-filter-group">
                        <button className="joy-filter-toggle" onClick={() => toggleSection('servicios')}>
                            <div className="toggle-title-left">
                                {isOpen('servicios') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Servicios</span>
                            </div>
                        </button>
                        {isOpen('servicios') && (
                            <div className="joy-filter-body">
                                {SERVICIOS.map(s => (
                                    <label key={s} className="joy-checkbox"><input type="checkbox" />{s}</label>
                                ))}
                            </div>
                        )}
                    </div>

                </aside>

                {/* ── LISTING ── */}
                <main className="joy-listing">
                    <div className="joy-listing-header">
                        <span className="joy-results-count">6.715 RESULTADOS</span>
                        <div className="joy-view-toggle">
                            <button className={`joy-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`joy-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                            <button className="joy-view-btn" title="Vista mapa">
                                <MapPin size={18} /> Mapa
                            </button>
                        </div>
                    </div>

                    <div className={`joy-cards ${viewMode === 'grid' ? 'joy-cards--grid' : ''}`}>
                        {JOYERIA.map(item => {
                            const currentImg = activeImgs[item.id] ?? 0;
                            const isFav = favs.includes(item.id);
                            return (
                                <article key={item.id} className="joy-card">
                                    <div className="joy-card-img-wrap">
                                        <img src={item.imgs[currentImg]} alt={item.nombre} className="joy-card-img" />
                                        {item.imgs.length > 1 && (
                                            <div className="joy-card-dots">
                                                {item.imgs.map((_, i) => (
                                                    <button key={i} className={`joy-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(item.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`joy-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(item.id)} aria-label="Guardar en favoritos">
                                            <Heart size={20} fill={isFav ? '#fff' : 'rgba(0,0,0,0.3)'} stroke="#fff" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="joy-card-info">
                                        <div className="joy-card-info-top">
                                            <div>
                                                <h2 className="joy-card-name">{item.nombre}</h2>
                                                <div className="joy-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{item.rating.toFixed(1)}</strong>
                                                    <span>({item.reviews}) · {item.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="joy-card-desc">{item.descripcion}</p>

                                        <div className="joy-card-bottom">
                                            <div className="joy-card-meta">
                                                <span className="joy-meta-item">
                                                    <span className="icon-wrapper"><Shirt size={14} /></span>
                                                    {item.precio}
                                                </span>
                                                {item.promociones > 0 && (
                                                    <span className="joy-meta-promo">
                                                        <Tag size={13} /> {item.promociones} promoción{item.promociones > 1 ? 'es' : ''} <span className="discount-badge">-10%</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="joy-card-actions">
                                                <button className="joy-btn-presupuesto">Solicitar Presupuesto</button>
                                                {item.responde && (
                                                    <span className="joy-responde">
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
