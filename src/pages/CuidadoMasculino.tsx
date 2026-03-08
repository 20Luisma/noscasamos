import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Zap, Tag, ChevronDown, ChevronRight, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User, Video as VideoIcon } from 'lucide-react';
import './CuidadoMasculino.css';

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
            items: ['Vestidos de novia', 'Cuidado masculino', 'Trajes madrina'],
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
const CUIDADO_MASCULINO = [
    {
        id: 1,
        nombre: "Centro de Belleza Tina Jiménez",
        ubicacion: 'Montevideo',
        rating: 4.8, reviews: 1,
        descripcion: "¿Perfecta en la estética para tu boda? Centro de belleza Tina Jiménez te espera en Montevideo para que gocéis de una propuesta muy interesante en uñas y tratamientos llegando perfecta al altar. Experiencia Este grupo de especialistas en estética lleva años trabajando en todo tipo de...",
        precio: 'Desde Menos de 150€',
        promociones: 0,
        responde: true,
        imgs: [
            'https://www.raorbarberstudio.com/wp-content/uploads/2022/11/Peinado-Boda-Raor-Barber-Studio-Barbershop-Palma-de-Mallorca-1-1200x800.jpg',
            'https://cdn0.bodas.net/vendor/20339/3_2/960/jpg/img-1967_1_120339.jpeg'
        ],
    },
    {
        id: 2,
        nombre: 'Aroa Micropigmentación Centro de Estética',
        ubicacion: 'Maldonado',
        rating: 5.0, reviews: 42,
        descripcion: 'Aroa Micropigmentación cuenta con un centro de estética en Punta del Este, Maldonado, en el que el novio y la novia encontrará todos los tratamientos necesarios para estar perfectos a su llegada al altar. Con asesoría para cada caso y un gran abanico de posibilidades los especialistas de Aroa sabrán...',
        precio: 'Desde 10€',
        promociones: 1,
        responde: true,
        imgs: [
            'https://mentabeauty.es/wp-content/uploads/2025/12/Rectangle-34624140-1024x480.jpg',
            'https://holapepa-pro.s3.eu-west-3.amazonaws.com/images/services/Subcategorias/hombres/07_masaje_relajante_cuerpo-entero.jpg'
        ],
    },
    {
        id: 3,
        nombre: 'Class - Estética y bienestar',
        ubicacion: 'Salto',
        rating: 5.0, reviews: 4,
        descripcion: 'Class es un centro de estética y bienestar de Salto donde te ofrecen tratamientos innovadores y resultados comprobados. Prepárate para el día de tu boda de mano de su equipo de profesionales y ¡sorprenderás a todos con tu imagen radiante!',
        precio: 'Desde 45€',
        promociones: 0,
        responde: true,
        imgs: [
            'https://holapepa-pro.s3.eu-west-3.amazonaws.com/images/services/Subcategorias/hombres/07_masaje_relajante_cuerpo-entero.jpg',
            'https://mentabeauty.es/wp-content/uploads/2025/12/Rectangle-34624140-1024x480.jpg'
        ],
    },
    {
        id: 4,
        nombre: 'Barberia Don Arturo',
        ubicacion: 'Montevideo',
        rating: 4.9, reviews: 14,
        descripcion: 'Especialistas en barbería clásica y grooming masculino. Contamos con paquetes especiales para novios y padrinos. Déjate asesorar por nuestro equipo experimentado para encontrar el estilo ideal para tu gran día.',
        precio: 'Desde $ 1.800',
        promociones: 0,
        responde: true,
        imgs: [
            'https://cdn0.bodas.net/vendor/20339/3_2/960/jpg/img-1967_1_120339.jpeg',
            'https://www.raorbarberstudio.com/wp-content/uploads/2022/11/Peinado-Boda-Raor-Barber-Studio-Barbershop-Palma-de-Mallorca-1-1200x800.jpg'
        ],
    },
];

const SERVICIOS = [
    'Barbería y Peluquería',
    'Tratamientos Faciales',
    'Arreglo de barba',
    'Manicura masculina',
    'Masajes relajantes',
    'Asesoría de imagen'
];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function CuidadoMasculino() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['novias', 'destacados', 'servicios']);
    const [searchQuery, setSearchQuery] = useState('Cuidado masculino');
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
        <div className="cuidado-page">
            {/* ── HERO ── */}
            <section className="esp-hero">
                <div className="esp-hero-left" style={{ padding: '80px 5% 60px 8%' }}>
                    <nav className="esp-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <strong>Cuidado masculino</strong>
                    </nav>
                    <h1 className="esp-hero-title">Cuidado masculino</h1>

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
                        Tu día especial merece el mejor cuidado. Accede a empresas para el cuidado masculino
                        que ofrecen servicios de estilo a precios atractivos, asegurando un look memorable en tu boda.
                    </p>
                </div>
                <div className="esp-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://heyjoe.es/wp-content/uploads/Slick-back-natural-para-boda-en-hombre.jpg"
                        alt="Cuidado masculino para novios"
                        className="esp-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="cuidado-body container">

                {/* ── SIDEBAR ── */}
                <aside className="cuidado-sidebar">
                    <div className="cuidado-filter-group category-nav">
                        <button className="cuidado-filter-toggle" onClick={() => toggleSection('novias')}>
                            <div className="toggle-title-left">
                                {isOpen('novias') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Novios</span>
                            </div>
                        </button>
                        {isOpen('novias') && (
                            <div className="cuidado-filter-body static-nav">
                                <Link to="/trajes-novio" className="nav-item">Trajes novio</Link>
                                <Link to="/alquiler-trajes" className="nav-item">Alquiler Trajes</Link>
                                <Link to="/complementos-novio" className="nav-item">Complementos novio</Link>
                                <Link to="/cuidado-masculino" className="nav-item active">Cuidado masculino</Link>
                            </div>
                        )}
                    </div>

                    <div className="cuidado-filter-group">
                        <button className="cuidado-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <div className="toggle-title-left">
                                {isOpen('destacados') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Filtros destacados</span>
                            </div>
                        </button>
                        {isOpen('destacados') && (
                            <div className="cuidado-filter-body highlighted-filters">
                                <label className="cuidado-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Tag size={16} className="filter-icon-left" /> Promociones
                                    </div>
                                    <div className="toggle-switch-nuevo"><input type="checkbox" /></div>
                                </label>
                                <label className="cuidado-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <span className="trophy-icon">🏆</span> Ganadores Wedding Awards
                                    </div>
                                    <div className="toggle-switch-nuevo"><input type="checkbox" /></div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="cuidado-filter-group">
                        <button className="cuidado-filter-toggle" onClick={() => toggleSection('servicios')}>
                            <div className="toggle-title-left">
                                {isOpen('servicios') ? <ChevronDown size={20} strokeWidth={1.5} /> : <ChevronRight size={20} strokeWidth={1.5} />}
                                <span>Servicios</span>
                            </div>
                        </button>
                        {isOpen('servicios') && (
                            <div className="cuidado-filter-body">
                                {SERVICIOS.map(s => (
                                    <label key={s} className="cuidado-checkbox"><input type="checkbox" />{s}</label>
                                ))}
                            </div>
                        )}
                    </div>

                </aside>

                {/* ── LISTING ── */}
                <main className="cuidado-listing">
                    <div className="cuidado-listing-header">
                        <span className="cuidado-results-count">6.715 RESULTADOS</span>
                        <div className="cuidado-view-toggle">
                            <button className={`cuidado-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`cuidado-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                            <button className="cuidado-view-btn" title="Vista mapa">
                                <MapPin size={18} /> Mapa
                            </button>
                        </div>
                    </div>

                    <div className={`cuidado-cards ${viewMode === 'grid' ? 'cuidado-cards--grid' : ''}`}>
                        {CUIDADO_MASCULINO.map(item => {
                            const currentImg = activeImgs[item.id] ?? 0;
                            const isFav = favs.includes(item.id);
                            return (
                                <article key={item.id} className="cuidado-card">
                                    <div className="cuidado-card-img-wrap">
                                        <img src={item.imgs[currentImg]} alt={item.nombre} className="cuidado-card-img" />
                                        {item.imgs.length > 1 && (
                                            <div className="cuidado-card-dots">
                                                {item.imgs.map((_, i) => (
                                                    <button key={i} className={`cuidado-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(item.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`cuidado-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(item.id)} aria-label="Guardar en favoritos">
                                            <Heart size={20} fill={isFav ? '#fff' : 'rgba(0,0,0,0.3)'} stroke="#fff" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="cuidado-card-info">
                                        <div className="cuidado-card-info-top">
                                            <div>
                                                <h2 className="cuidado-card-name">{item.nombre}</h2>
                                                <div className="cuidado-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{item.rating.toFixed(1)}</strong>
                                                    <span>({item.reviews}) · {item.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="cuidado-card-desc">{item.descripcion}</p>

                                        <div className="cuidado-card-bottom">
                                            <div className="cuidado-card-meta">
                                                <span className="cuidado-meta-item">
                                                    <span className="icon-wrapper"><Shirt size={14} /></span>
                                                    {item.precio}
                                                </span>
                                                {item.promociones > 0 && (
                                                    <span className="cuidado-meta-promo">
                                                        <Tag size={13} /> {item.promociones} promoción{item.promociones > 1 ? 'es' : ''} <span className="discount-badge">-10%</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="cuidado-card-actions">
                                                <button className="cuidado-btn-presupuesto">Solicitar Presupuesto</button>
                                                {item.responde && (
                                                    <span className="cuidado-responde">
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
