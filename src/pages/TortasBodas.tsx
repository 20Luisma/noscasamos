import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Zap, Tag, ChevronDown, ChevronUp, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User } from 'lucide-react';
import './TortasBodas.css';

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
const TORTAS = [
    {
        id: 1,
        nombre: 'Dulce Romance MVD',
        ubicacion: 'Montevideo, Montevideo',
        rating: 5.0, reviews: 142,
        descripcion: 'Especialistas en pastelería nupcial. Diseñamos tortas personalizadas con acabados en fondant, buttercream y elegantes flores de azúcar. Sorprende a tus invitados con una imponente torre de cupcakes o nuestra exclusiva mesa dulce temática para bodas.',
        precio: 'Desde $7.500',
        promociones: 1,
        responde: true,
        imgs: [
            'https://cdn0.bodas.net/article-real-wedding/848/original/1280/jpg/5031896.jpeg',
            'https://images.unsplash.com/photo-1557925923-33b2512ace74?w=800&h=560&fit=crop'
        ],
    },
    {
        id: 2,
        nombre: 'La Petite Pâtisserie',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 4.9, reviews: 88,
        descripcion: 'Pastelería de autor y alta costura en repostería. Elaboramos desde las clásicas tortas de varios pisos hasta opciones modernas como las "naked cakes" (tortas desnudas), utilizando ingredientes de primera calidad para un sabor inolvidable.',
        precio: 'Desde $12.000',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&h=560&fit=crop',
            'https://images.unsplash.com/photo-1582293041079-7814c2f1f0db?w=800&h=560&fit=crop'
        ],
    },
    {
        id: 3,
        nombre: 'Tentaciones Canelones',
        ubicacion: 'Canelones',
        rating: 4.8, reviews: 210,
        descripcion: 'Más de 10 años endulzando momentos únicos. Nos adaptamos a vuestros gustos para crear la torta soñada y una mesa de postres irresistibles. Opciones para todos, incluyendo productos sin gluten, sin lactosa y veganos bajo pedido especial.',
        precio: 'Desde $5.000',
        promociones: 2,
        responde: false,
        imgs: [
            'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 4,
        nombre: 'Macarons & Co.',
        ubicacion: 'Colonia',
        rating: 5.0, reviews: 56,
        descripcion: 'Especializados en finos macarons franceses, perfectos para como detalle de boda o joya en tu mesa dulce. Armamos torres de macarons personalizadas en los colores de tu boda que darán un toque extra de sofisticación.',
        precio: 'Desde $4.500',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
        ],
    },
    {
        id: 5,
        nombre: 'Cakes by Sarah',
        ubicacion: 'Montevideo, Montevideo',
        rating: 4.7, reviews: 115,
        descripcion: 'Expertos en tortas rústicas y seminaked decoradas con frutos rojos y flores naturales o liofilizadas. Una opción romántica y con un sabor deliciosamente casero que enamorará el paladar de familiares y amigos.',
        precio: 'Desde $8.200',
        promociones: 1,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
        ],
    },
];

const PRECIO = ['Menos de $5.000', '$5.000 - $10.000', '$10.000 - $15.000', 'Más de $15.000'];
const PRODUCTOS = ['Tortas de boda', 'Mesa dulce', 'Cupcakes', 'Macarons', 'Popcakes', 'Galletas decoradas', 'Postres en vasito', 'Opciones sin gluten'];
const ESTILOS = ['Clásico', 'Fondant', 'Naked / Seminaked', 'Rustico', 'Moderno', 'Temático', 'Buttercream', 'Pintado a mano'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function TortasBodas() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['destacados', 'precio', 'productos', 'estilos']);
    const [searchQuery, setSearchQuery] = useState('Tortas de boda');
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
        <div className="tortas-page">
            {/* ── HERO ── */}
            <section className="tortas-hero">
                <div className="tortas-hero-left">
                    <nav className="tortas-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <strong>Tortas de boda</strong>
                    </nav>
                    <h1 className="tortas-hero-title">Tortas de boda</h1>

                    <form className="hero-search" onSubmit={e => e.preventDefault()} style={{ position: 'relative' }}>
                        <div className="search-field search-category-wrap" ref={searchRef}>
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Tortas de boda"
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

                    <p className="tortas-hero-desc">
                        Encuentra la torta de boda que siempre soñaste. Desde mesas dulces irresistibles hasta tartas artesanales y opciones sin gluten. Explora los mejores pasteleros de Uruguay que endulzarán el día más feliz de tu vida.
                    </p>
                </div>
                <div className="tortas-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=80"
                        alt="Torta de boda de varios pisos decorada"
                        className="tortas-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="tortas-body container">

                {/* ── SIDEBAR ── */}
                <aside className="tortas-sidebar">

                    <div className="tortas-filter-group">
                        <button className="tortas-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <span>Filtros destacados</span>
                            {isOpen('destacados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destacados') && (
                            <div className="tortas-filter-body">
                                <label className="tortas-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Tag size={16} className="filter-icon-left" /> Promociones
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                                <label className="tortas-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Star size={16} className="filter-icon-left" /> Ganadores Wedding Awards
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="tortas-filter-group">
                        <button className="tortas-filter-toggle" onClick={() => toggleSection('precio')}>
                            <span>Precio</span>
                            {isOpen('precio') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('precio') && (
                            <div className="tortas-filter-body">
                                {PRECIO.map(p => (
                                    <label key={p} className="tortas-checkbox"><input type="checkbox" />{p}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="tortas-filter-group">
                        <button className="tortas-filter-toggle" onClick={() => toggleSection('productos')}>
                            <span>Productos</span>
                            {isOpen('productos') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('productos') && (
                            <div className="tortas-filter-body">
                                {PRODUCTOS.map(s => (
                                    <label key={s} className="tortas-checkbox"><input type="checkbox" />{s}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="tortas-filter-group">
                        <button className="tortas-filter-toggle" onClick={() => toggleSection('estilos')}>
                            <span>Estilos</span>
                            {isOpen('estilos') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('estilos') && (
                            <div className="tortas-filter-body">
                                {ESTILOS.map(e => (
                                    <label key={e} className="tortas-checkbox"><input type="checkbox" />{e}</label>
                                ))}
                            </div>
                        )}
                    </div>

                </aside>

                {/* ── LISTING ── */}
                <main className="tortas-listing">
                    <div className="tortas-listing-header">
                        <span className="tortas-results-count">{TORTAS.length} RESULTADOS</span>
                        <div className="tortas-view-toggle">
                            <button className={`tortas-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`tortas-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                            <button className="tortas-view-btn" title="Vista mapa">
                                <MapPin size={18} /> Mapa
                            </button>
                        </div>
                    </div>

                    <div className={`tortas-cards ${viewMode === 'grid' ? 'tortas-cards--grid' : ''}`}>
                        {TORTAS.map(item => {
                            const currentImg = activeImgs[item.id] ?? 0;
                            const isFav = favs.includes(item.id);
                            return (
                                <article key={item.id} className="tortas-card">
                                    <div className="tortas-card-img-wrap">
                                        <img src={item.imgs[currentImg]} alt={item.nombre} className="tortas-card-img" />
                                        {item.imgs.length > 1 && (
                                            <div className="tortas-card-dots">
                                                {item.imgs.map((_, i) => (
                                                    <button key={i} className={`tortas-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(item.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`tortas-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(item.id)} aria-label="Guardar en favoritos">
                                            <Heart size={20} fill={isFav ? '#fff' : 'rgba(0,0,0,0.3)'} stroke="#fff" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="tortas-card-info">
                                        <div className="tortas-card-info-top">
                                            <div>
                                                <h2 className="tortas-card-name">{item.nombre}</h2>
                                                <div className="tortas-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{item.rating.toFixed(1)}</strong>
                                                    <span>({item.reviews}) · {item.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="tortas-card-desc">{item.descripcion}</p>

                                        <div className="tortas-card-bottom">
                                            <div className="tortas-card-meta">
                                                <span className="tortas-meta-item">
                                                    <span className="icon-wrapper"><Cake size={14} /></span>
                                                    {item.precio}
                                                </span>
                                                {item.promociones > 0 && (
                                                    <span className="tortas-meta-promo">
                                                        <Tag size={13} /> {item.promociones} promoción{item.promociones > 1 ? 'es' : ''} <span className="discount-badge">-10%</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="tortas-card-actions">
                                                <button className="tortas-btn-presupuesto">Solicitar Presupuesto</button>
                                                {item.responde && (
                                                    <span className="tortas-responde">
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
