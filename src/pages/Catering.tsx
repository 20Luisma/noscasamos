import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Users, UtensilsCrossed, Zap, Tag, ChevronDown, ChevronUp, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User } from 'lucide-react';
import './Catering.css';

/* ─── Search Data ────────────────────────────────────────────── */
const CATEGORY_COLUMNS = [
    [
        {
            type: 'group' as const,
            label: 'Lugares para Boda',
            icon: HomeIcon,
            items: ['Estancias & Campos', 'Hoteles', 'Salones de Fiesta', 'Restaurantes', 'Bodegas', 'Bodas en la playa'],
        },
        { type: 'item' as const, label: 'Catering', icon: UtensilsCrossed },
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
const CATERINGS = [
    {
        id: 1,
        nombre: 'Gourmet Eventos',
        ubicacion: 'Montevideo, Montevideo',
        rating: 5.0, reviews: 142,
        descripcion: 'Haced de vuestra boda una experiencia gastronómica única. Con más de 15 años de experiencia, Gourmet Eventos diseña menús de vanguardia y cocina de mercado, adaptados a la personalidad de cada pareja para sorprender a todos los invitados.',
        precio: 'Desde $1.500',
        invitados: '50 a 500',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=560&fit=crop',
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=560&fit=crop',
            'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 2,
        nombre: 'Brasas & Vino Catering',
        ubicacion: 'Canelones',
        rating: 4.9, reviews: 89,
        descripcion: 'Nuestra propuesta gastronómica está nutrida de la tradición del asado uruguayo combinada con toques modernos. Ofrecemos parrilladas premium, mesas de quesos y fiambres artesanales, con un servicio impecable ideal para bodas en chacras y viñedos.',
        precio: 'Desde $1.200',
        invitados: '80 a 350',
        promociones: 1,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=560&fit=crop',
            'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 3,
        nombre: 'Sabores del Alma',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 4.8, reviews: 115,
        descripcion: 'Un enfoque contemporáneo en la alta cocina para eventos. Sabores del Alma se especializa en menús de pasos, estaciones de comida interactiva y opciones exclusivas para paladares exigentes, utilizando siempre ingredientes frescos y locales.',
        precio: 'Desde $2.100',
        invitados: '30 a 250',
        promociones: 0,
        responde: false,
        imgs: [
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=560&fit=crop',
            'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 4,
        nombre: 'Catering Delicias',
        ubicacion: 'Colonia del Sacramento, Colonia',
        rating: 4.7, reviews: 65,
        descripcion: 'Especialistas en bodas íntimas y celebraciones relajadas. Ofrecemos desde food trucks con estilo hasta cenas formales, asegurando un ambiente cálido y un menú personalizado que encantará a todos los presentes.',
        precio: 'Desde $1.000',
        invitados: '10 a 150',
        promociones: 2,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=800&h=560&fit=crop',
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=560&fit=crop',
        ],
    },
    {
        id: 5,
        nombre: 'Cuisine Art',
        ubicacion: 'Carrasco, Montevideo',
        rating: 5.0, reviews: 210,
        descripcion: 'Arte y sabor en cada plato. Cuisine Art transforma tu boda en una cena de gala majestuosa. Contamos con un equipo de chefs internacionales para ofrecer menús de fusión, repostería fina y una presentación insuperable.',
        precio: 'Desde $2.800',
        invitados: '100 a 800',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=560&fit=crop',
            'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=560&fit=crop',
        ],
    },
];

const TIPO_COCINA = ['De mercado', 'Tradicional, típica regional', 'De autor', 'Internacional', 'De fusión'];
const MENUS_ESPECIALES = ['Vegetarianos', 'Veganos', 'Diabéticos', 'Hipertensos', 'Celíacos'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function Catering() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['destacados', 'cocina', 'menus']);
    const [searchQuery, setSearchQuery] = useState('Catering');
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
    const setImg = (cateringId: number, idx: number) => setActiveImgs(prev => ({ ...prev, [cateringId]: idx }));

    return (
        <div className="cat-page">
            {/* ── HERO ── */}
            <section className="cat-hero">
                <div className="cat-hero-left">
                    <nav className="cat-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <strong>Catering</strong>
                    </nav>
                    <h1 className="cat-hero-title">Catering</h1>

                    <form className="hero-search" onSubmit={e => e.preventDefault()} style={{ position: 'relative' }}>
                        <div className="search-field search-category-wrap" ref={searchRef}>
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Catering"
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

                    <p className="cat-hero-desc">
                        Cada boda es única y, en Uruguay, los caterings para boda ofrecen menús adaptados a tus gustos y presupuesto.
                        Descubre opciones locales que te garantizarán un banquete delicioso y memorable.
                    </p>
                </div>
                <div className="cat-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=560&fit=crop"
                        alt="Especialistas en catering de bodas preparan comida increíble"
                        className="cat-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="cat-body container">

                {/* ── SIDEBAR ── */}
                <aside className="cat-sidebar">

                    <div className="cat-filter-group">
                        <button className="cat-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <span>Filtros destacados</span>
                            {isOpen('destacados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destacados') && (
                            <div className="cat-filter-body">
                                <label className="cat-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Tag size={16} className="filter-icon-left" /> Promociones
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                                <label className="cat-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Star size={16} className="filter-icon-left" /> Ganadores Wedding Awards
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="cat-filter-group">
                        <button className="cat-filter-toggle" onClick={() => toggleSection('cocina')}>
                            <span>Tipo de cocina</span>
                            {isOpen('cocina') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('cocina') && (
                            <div className="cat-filter-body">
                                {TIPO_COCINA.map(c => (
                                    <label key={c} className="cat-checkbox"><input type="checkbox" />{c}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="cat-filter-group">
                        <button className="cat-filter-toggle" onClick={() => toggleSection('menus')}>
                            <span>Menús especiales</span>
                            {isOpen('menus') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('menus') && (
                            <div className="cat-filter-body">
                                {MENUS_ESPECIALES.map(m => (
                                    <label key={m} className="cat-checkbox"><input type="checkbox" />{m}</label>
                                ))}
                            </div>
                        )}
                    </div>

                </aside>

                {/* ── LISTING ── */}
                <main className="cat-listing">
                    <div className="cat-listing-header">
                        <span className="cat-results-count">{CATERINGS.length} RESULTADOS</span>
                        <div className="cat-view-toggle">
                            <button className={`cat-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`cat-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                            <button className="cat-view-btn" title="Vista mapa">
                                <MapPin size={18} /> Mapa
                            </button>
                        </div>
                    </div>

                    <div className={`cat-cards ${viewMode === 'grid' ? 'cat-cards--grid' : ''}`}>
                        {CATERINGS.map(cat => {
                            const currentImg = activeImgs[cat.id] ?? 0;
                            const isFav = favs.includes(cat.id);
                            return (
                                <article key={cat.id} className="cat-card">
                                    <div className="cat-card-img-wrap">
                                        <img src={cat.imgs[currentImg]} alt={cat.nombre} className="cat-card-img" />
                                        {cat.imgs.length > 1 && (
                                            <div className="cat-card-dots">
                                                {cat.imgs.map((_, i) => (
                                                    <button key={i} className={`cat-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(cat.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`cat-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(cat.id)} aria-label="Guardar en favoritos">
                                            <Heart size={20} fill={isFav ? '#fff' : 'rgba(0,0,0,0.3)'} stroke="#fff" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="cat-card-info">
                                        <div className="cat-card-info-top">
                                            <div>
                                                <h2 className="cat-card-name">{cat.nombre}</h2>
                                                <div className="cat-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{cat.rating.toFixed(1)}</strong>
                                                    <span>({cat.reviews}) · {cat.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="cat-card-desc">{cat.descripcion}</p>

                                        <div className="cat-card-bottom">
                                            <div className="cat-card-meta">
                                                <span className="cat-meta-item">
                                                    <span className="icon-wrapper"><UtensilsCrossed size={14} /></span>
                                                    Desde {cat.precio}
                                                </span>
                                                <span className="cat-meta-item">
                                                    <span className="icon-wrapper"><Users size={14} /></span>
                                                    {cat.invitados} invitados
                                                </span>
                                                {cat.promociones > 0 && (
                                                    <span className="cat-meta-promo">
                                                        <Tag size={13} /> {cat.promociones} promoción{cat.promociones > 1 ? 'es' : ''}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="cat-card-actions">
                                                <button className="cat-btn-presupuesto">Solicitar Presupuesto</button>
                                                {cat.responde && (
                                                    <span className="cat-responde">
                                                        <Zap size={13} fill="#f8b400" stroke="#f8b400" />
                                                        Responde rápido
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
