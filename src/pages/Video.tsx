import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Zap, Tag, ChevronDown, ChevronUp, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User, Video as VideoIcon } from 'lucide-react';
import './Video.css';

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
const VIDEOGRAFOS = [
    {
        id: 1,
        nombre: 'Media+Media Wedding',
        ubicacion: 'Montevideo, Montevideo',
        rating: 5.0, reviews: 48,
        descripcion: 'Los profesionales de Media+Media Producciones saben todo lo que puede suceder en una boda gracias a sus más de diez años de experiencia. Abrazos, besos, lágrimas, caricias, brindis, risas, manteos, nervios, niños, ramos, abuelitos, música, emociones... ¡No se les escapa nada! Servicios que ofrece...',
        precio: 'Desde $40.000',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
        ],
    },
    {
        id: 2,
        nombre: 'VistoynoVisto Wedding',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 5.0, reviews: 3,
        descripcion: 'VistoynoVisto Wedding os ofrece una visión diferente de vuestro gran día. Un recuerdo audiovisual cinematográfico. Con cámaras de gran calidad y 4k para mejor resultado, ¡veréis el video de vuestra boda como una gran película! Atreveos a una propuesta diferente, moderna, pero con la elegancia de lo...',
        precio: 'Desde $25.000',
        promociones: 1,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1621801306185-bcbf94ea4e82?auto=format&fit=crop&w=800&q=80'
        ],
    },
    {
        id: 3,
        nombre: 'Amor Infinito by Zetauno',
        ubicacion: 'Colonia',
        rating: 5.0, reviews: 37,
        descripcion: 'Amor Infinito by Zetauno, antes Z1 Producciones, es un equipo creativo que ofrece producciones audiovisuales profesionales desde hace 15 años. Con estos expertos de la imagen tendréis la mejor película de vuestra historia de amor. Sin duda, será la mejor manera de mantener vivo el recuerdo de la...',
        precio: 'Desde $35.000',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
        ],
    },
    {
        id: 4,
        nombre: 'Producciones Caballer',
        ubicacion: 'Montevideo, Montevideo',
        rating: 4.7, reviews: 14,
        descripcion: '¿Os gustaría tener un vídeo de boda con una perspectiva diferente a la que estáis habituados? Estáis en el lugar adecuado. Producciones Caballer, antes conocida como DroneNort, es una empresa especializada en servicios generales para bodas y eventos, con una gran experiencia en el sector audiovisual...',
        precio: 'Desde $28.000',
        promociones: 1,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
        ],
    },
    {
        id: 5,
        nombre: 'Bodas de Neón',
        ubicacion: 'Canelones',
        rating: 5.0, reviews: 5,
        descripcion: 'Bodas de Neón quiere contar la historia de vuestra boda, y esta historia estará contada con el estilo que a vosotros más os guste. Les gustaría, no solo inmortalizar el día de vuestra celebración, sino explorar vuestra historia juntos: cómo os conocisteis, qué es lo que os une, qué experiencias...',
        precio: 'Desde $30.000',
        promociones: 0,
        responde: false,
        imgs: [
            'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
        ],
    },
];

const PRECIO = ['Menos de $500', '$500 - $1.000', '$1.000 - $1.500', 'Más de $1.500'];
const SERVICIOS = ['Vídeo en alta definición', 'Vídeo agradecimiento', 'Trailer de la boda', 'Pruebas de montaje', 'Multicámara', 'Preboda', 'Postboda', 'Montaje del vídeo el mismo día', 'Entrevistas a los invitados', 'Save the date', 'Dron', 'Formato 4k'];
const ESTILOS = ['Tradicional', 'Artístico', 'Documental', 'Cinematográfico', 'De autor'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function VideoPage() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['destacados', 'precio', 'servicios', 'estilos']);
    const [searchQuery, setSearchQuery] = useState('Vídeo');
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
        <div className="video-page">
            {/* ── HERO ── */}
            <section className="video-hero">
                <div className="video-hero-left">
                    <nav className="video-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <strong>Vídeo</strong>
                    </nav>
                    <h1 className="video-hero-title">Vídeos de boda</h1>

                    <form className="hero-search" onSubmit={e => e.preventDefault()} style={{ position: 'relative' }}>
                        <div className="search-field search-category-wrap" ref={searchRef}>
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Vídeo"
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

                    <p className="video-hero-desc">
                        La magia de tu boda en Uruguay comienza con los videógrafos adecuados. Descubre profesionales que capturarán cada instante de tu celebración. Consulta disponibilidad y precios para inmortalizar tu gran día.
                    </p>
                </div>
                <div className="video-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://cdn0.bodas.net/article-real-wedding/235/3_2/960/jpg/271904.jpeg"
                        alt="Videógrafo en una boda"
                        className="video-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="video-body container">

                {/* ── SIDEBAR ── */}
                <aside className="video-sidebar">

                    <div className="video-filter-group">
                        <button className="video-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <span>Filtros destacados</span>
                            {isOpen('destacados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destacados') && (
                            <div className="video-filter-body">
                                <label className="video-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Tag size={16} className="filter-icon-left" /> Promociones
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                                <label className="video-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Star size={16} className="filter-icon-left" /> Ganadores Wedding Awards
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="video-filter-group">
                        <button className="video-filter-toggle" onClick={() => toggleSection('precio')}>
                            <span>Precio</span>
                            {isOpen('precio') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('precio') && (
                            <div className="video-filter-body">
                                {PRECIO.map(p => (
                                    <label key={p} className="video-checkbox"><input type="checkbox" />{p}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="video-filter-group">
                        <button className="video-filter-toggle" onClick={() => toggleSection('servicios')}>
                            <span>Servicios</span>
                            {isOpen('servicios') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('servicios') && (
                            <div className="video-filter-body">
                                {SERVICIOS.map(s => (
                                    <label key={s} className="video-checkbox"><input type="checkbox" />{s}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="video-filter-group">
                        <button className="video-filter-toggle" onClick={() => toggleSection('estilos')}>
                            <span>Estilos</span>
                            {isOpen('estilos') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('estilos') && (
                            <div className="video-filter-body">
                                {ESTILOS.map(e => (
                                    <label key={e} className="video-checkbox"><input type="checkbox" />{e}</label>
                                ))}
                            </div>
                        )}
                    </div>

                </aside>

                {/* ── LISTING ── */}
                <main className="video-listing">
                    <div className="video-listing-header">
                        <span className="video-results-count">2.425 RESULTADOS</span>
                        <div className="video-view-toggle">
                            <button className={`video-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`video-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                            <button className="video-view-btn" title="Vista mapa">
                                <MapPin size={18} /> Mapa
                            </button>
                        </div>
                    </div>

                    <div className={`video-cards ${viewMode === 'grid' ? 'video-cards--grid' : ''}`}>
                        {VIDEOGRAFOS.map(item => {
                            const currentImg = activeImgs[item.id] ?? 0;
                            const isFav = favs.includes(item.id);
                            return (
                                <article key={item.id} className="video-card">
                                    <div className="video-card-img-wrap">
                                        <img src={item.imgs[currentImg]} alt={item.nombre} className="video-card-img" />
                                        <div className="video-play-icon" style={{ position: 'absolute', bottom: '12px', left: '12px', color: 'white', background: 'rgba(0,0,0,0.4)', borderRadius: '50%', padding: '4px' }}>
                                            <VideoIcon size={20} />
                                        </div>
                                        {item.imgs.length > 1 && (
                                            <div className="video-card-dots">
                                                {item.imgs.map((_, i) => (
                                                    <button key={i} className={`video-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(item.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`video-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(item.id)} aria-label="Guardar en favoritos">
                                            <Heart size={20} fill={isFav ? '#fff' : 'rgba(0,0,0,0.3)'} stroke="#fff" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="video-card-info">
                                        <div className="video-card-info-top">
                                            <div>
                                                <h2 className="video-card-name">{item.nombre}</h2>
                                                <div className="video-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{item.rating.toFixed(1)}</strong>
                                                    <span>({item.reviews}) · {item.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="video-card-desc">{item.descripcion}</p>

                                        <div className="video-card-bottom">
                                            <div className="video-card-meta">
                                                <span className="video-meta-item">
                                                    <span className="icon-wrapper"><VideoIcon size={14} /></span>
                                                    {item.precio}
                                                </span>
                                                {item.promociones > 0 && (
                                                    <span className="video-meta-promo">
                                                        <Tag size={13} /> {item.promociones} promoción{item.promociones > 1 ? 'es' : ''} <span className="discount-badge">-10%</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="video-card-actions">
                                                <button className="video-btn-presupuesto">Solicitar Presupuesto</button>
                                                {item.responde && (
                                                    <span className="video-responde">
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
