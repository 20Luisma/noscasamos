import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Zap, Tag, ChevronDown, ChevronUp, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User } from 'lucide-react';
import './MusicaDJ.css';

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
const MUSICA = [
    {
        id: 1,
        nombre: 'The Hits Band',
        ubicacion: 'Montevideo, Montevideo',
        rating: 5.0, reviews: 264,
        descripcion: 'The Hits Band es un grupo de versiones pop rock, el cual garantiza el éxito en todas y cada una de las fiestas a las que asiste. Hacen que el público se involucre totalmente, cantando y bailando con temas de reconocidos artistas.',
        precio: 'Desde $35.000',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f4b4?auto=format&fit=crop&w=800&q=80'
        ],
    },
    {
        id: 2,
        nombre: 'Audiovisuales DJ Pro',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 4.9, reviews: 48,
        descripcion: 'Audiovisuales DJ Pro aporta un concepto revolucionario en los tiempos modernos. Si queréis destacar con algo novedoso, esta empresa puede ser la apuesta perfecta para amenizar vuestro evento nupcial con pantallas LED y sonido premium.',
        precio: 'Desde $18.000',
        promociones: 1,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=800&q=80'
        ],
    },
    {
        id: 3,
        nombre: 'Charlie DJ',
        ubicacion: 'Canelones',
        rating: 5.0, reviews: 130,
        descripcion: 'Charlie DJ es una empresa con dilatada experiencia en el mundo de la música y la amenización de bodas y eventos. Está guiada por sus cuatro DJ profesionales, dispuestos a hacer vibrar la pista de baile hasta el amanecer.',
        precio: 'Desde $15.500',
        promociones: 1,
        responde: false,
        imgs: [
            'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?auto=format&fit=crop&w=800&q=80',
        ],
    },
    {
        id: 4,
        nombre: 'Odysea Cuerdas',
        ubicacion: 'Montevideo, Montevideo',
        rating: 4.9, reviews: 85,
        descripcion: 'Experiencia y música se mezclan para ofrecer la animación ideal para el día de tu boda. Diferentes propuestas que dotarán a tu evento de una canción para cada momento especial. Esto es lo que os ofrece Odysea, cuerdas clásicas para ceremonias.',
        precio: 'Desde $12.000',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 5,
        nombre: 'Piano & Sentimiento',
        ubicacion: 'Colonia',
        rating: 5.0, reviews: 44,
        descripcion: 'Si queréis tener una banda sonora ideal para vuestro evento, no dudéis en contratar la música de Piano & Sentimiento. Este equipo cuenta con músicos profesionales que os ofrecerá un amplio repertorio de jazz y música clásica.',
        precio: 'Desde $10.000',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=80',
        ],
    },
];

const PRECIO = ['Menos de $10.000', '$10.000 - $20.000', '$20.000 - $30.000', 'Más de $30.000'];
const SERVICIOS = ['DJ', 'Orquesta', 'Música para la ceremonia', 'Música para el cóctel/banquete', 'Música para el baile', 'Animación', 'Karaoke', 'Audiovisuales'];
const ESTILOS = ['Clásica', 'Coral', 'Latina', 'Chill out', 'Disco', 'Jazz', 'Rock', 'Electrónica', 'Pop', 'Actual'];
const TIPO = ['DJ', 'Orquesta', 'Banda', 'Solista', 'Dueto', 'Trío', 'Cuarteto', 'Coro'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function MusicaDJ() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['destacados', 'precio', 'servicios', 'estilos', 'tipo']);
    const [searchQuery, setSearchQuery] = useState('Música');
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
        <div className="musica-page">
            {/* ── HERO ── */}
            <section className="musica-hero">
                <div className="musica-hero-left">
                    <nav className="musica-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <strong>Música</strong>
                    </nav>
                    <h1 className="musica-hero-title">Música para bodas</h1>

                    <form className="hero-search" onSubmit={e => e.preventDefault()} style={{ position: 'relative' }}>
                        <div className="search-field search-category-wrap" ref={searchRef}>
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Música"
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

                    <p className="musica-hero-desc">
                        La música es el alma de tu boda en Uruguay. Descubre los músicos y DJ's que te ayudarán a vivir momentos emotivos y festivos en tu ceremonia y fiesta, convirtiendo ese día en algo único y memorable.
                    </p>
                </div>
                <div className="musica-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
                        alt="Banda tocando música en vivo"
                        className="musica-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="musica-body container">

                {/* ── SIDEBAR ── */}
                <aside className="musica-sidebar">

                    <div className="musica-filter-group">
                        <button className="musica-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <span>Filtros destacados</span>
                            {isOpen('destacados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destacados') && (
                            <div className="musica-filter-body">
                                <label className="musica-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Tag size={16} className="filter-icon-left" /> Promociones
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                                <label className="musica-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Star size={16} className="filter-icon-left" /> Ganadores Wedding Awards
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="musica-filter-group">
                        <button className="musica-filter-toggle" onClick={() => toggleSection('precio')}>
                            <span>Precio</span>
                            {isOpen('precio') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('precio') && (
                            <div className="musica-filter-body">
                                {PRECIO.map(p => (
                                    <label key={p} className="musica-checkbox"><input type="checkbox" />{p}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="musica-filter-group">
                        <button className="musica-filter-toggle" onClick={() => toggleSection('servicios')}>
                            <span>Servicios</span>
                            {isOpen('servicios') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('servicios') && (
                            <div className="musica-filter-body">
                                {SERVICIOS.map(s => (
                                    <label key={s} className="musica-checkbox"><input type="checkbox" />{s}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="musica-filter-group">
                        <button className="musica-filter-toggle" onClick={() => toggleSection('estilos')}>
                            <span>Estilos</span>
                            {isOpen('estilos') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('estilos') && (
                            <div className="musica-filter-body">
                                {ESTILOS.map(e => (
                                    <label key={e} className="musica-checkbox"><input type="checkbox" />{e}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="musica-filter-group">
                        <button className="musica-filter-toggle" onClick={() => toggleSection('tipo')}>
                            <span>Tipo</span>
                            {isOpen('tipo') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('tipo') && (
                            <div className="musica-filter-body">
                                {TIPO.map(t => (
                                    <label key={t} className="musica-checkbox"><input type="checkbox" />{t}</label>
                                ))}
                            </div>
                        )}
                    </div>

                </aside>

                {/* ── LISTING ── */}
                <main className="musica-listing">
                    <div className="musica-listing-header">
                        <span className="musica-results-count">{MUSICA.length} RESULTADOS</span>
                        <div className="musica-view-toggle">
                            <button className={`musica-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`musica-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                            <button className="musica-view-btn" title="Vista mapa">
                                <MapPin size={18} /> Mapa
                            </button>
                        </div>
                    </div>

                    <div className={`musica-cards ${viewMode === 'grid' ? 'musica-cards--grid' : ''}`}>
                        {MUSICA.map(item => {
                            const currentImg = activeImgs[item.id] ?? 0;
                            const isFav = favs.includes(item.id);
                            return (
                                <article key={item.id} className="musica-card">
                                    <div className="musica-card-img-wrap">
                                        <img src={item.imgs[currentImg]} alt={item.nombre} className="musica-card-img" />
                                        {item.imgs.length > 1 && (
                                            <div className="musica-card-dots">
                                                {item.imgs.map((_, i) => (
                                                    <button key={i} className={`musica-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(item.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`musica-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(item.id)} aria-label="Guardar en favoritos">
                                            <Heart size={20} fill={isFav ? '#fff' : 'rgba(0,0,0,0.3)'} stroke="#fff" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="musica-card-info">
                                        <div className="musica-card-info-top">
                                            <div>
                                                <h2 className="musica-card-name">{item.nombre}</h2>
                                                <div className="musica-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{item.rating.toFixed(1)}</strong>
                                                    <span>({item.reviews}) · {item.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="musica-card-desc">{item.descripcion}</p>

                                        <div className="musica-card-bottom">
                                            <div className="musica-card-meta">
                                                <span className="musica-meta-item">
                                                    <span className="icon-wrapper"><Music size={14} /></span>
                                                    {item.precio}
                                                </span>
                                                {item.promociones > 0 && (
                                                    <span className="musica-meta-promo">
                                                        <Tag size={13} /> {item.promociones} promoción{item.promociones > 1 ? 'es' : ''} <span className="discount-badge">-10%</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="musica-card-actions">
                                                <button className="musica-btn-presupuesto">Solicitar Presupuesto</button>
                                                {item.responde && (
                                                    <span className="musica-responde">
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
