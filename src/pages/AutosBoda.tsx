import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Zap, Tag, ChevronDown, ChevronUp, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User } from 'lucide-react';
import './AutosBoda.css';

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
const AUTOS = [
    {
        id: 1,
        nombre: 'Rolls-Royce Classic Experience',
        ubicacion: 'Montevideo, Montevideo',
        rating: 5.0, reviews: 48,
        descripcion: 'Rolls-Royce Silver Shadow de 1972. El símbolo del lujo británico. Interior en cuero crema, madera de nogal y decoración floral incluida. Hará que tu gran día sea inolvidable desde el primer trayecto.',
        precio: 'Desde $12.000',
        promociones: 1,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
            'https://www.elmonoconpajarita.com/img/cms/novios-y-jaime_10_154974-161850852269370.jpeg',
        ],
    },
    {
        id: 2,
        nombre: 'Limusinas VIP',
        ubicacion: 'Montevideo, Montevideo',
        rating: 4.7, reviews: 61,
        descripcion: 'Lincoln Town Car Stretch de 8 pasajeros con barra de bebidas, iluminación LED, sistema de audio premium y cristal separador. La opción preferida por parejas que buscan un estilo americano e impactante.',
        precio: 'Desde $14.500',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
        ],
    },
    {
        id: 3,
        nombre: 'Prestige Cars Premium',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 5.0, reviews: 19,
        descripcion: 'Bentley Continental GT del 2022. El lujo contemporáneo en su máxima expresión. Color blanco perla, interior bicolor y techo panorámico. Disfruta de un traslado exclusivo y moderno con servicio impecable.',
        precio: 'Desde $18.000',
        promociones: 2,
        responde: false,
        imgs: [
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
        ],
    },
    {
        id: 4,
        nombre: 'Clásicos de Ensueño',
        ubicacion: 'Canelones',
        rating: 4.8, reviews: 32,
        descripcion: 'Jaguar Mark 2 del 67 y Citroën 2CV del 62. Elegancia inglesa o encanto francés, tú decides. Atendidos por choferes experimentados, brindamos un servicio cálido y nos encargamos de los moños y flores.',
        precio: 'Desde $9.000',
        promociones: 0,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
        ],
    },
    {
        id: 5,
        nombre: 'Vintage Rentals & Calesas',
        ubicacion: 'Colonia del Sacramento, Colonia',
        rating: 4.8, reviews: 27,
        descripcion: 'Para bodas al aire libre, fincas y viñedos. Ofrecemos desde el icónico Porsche 911 Targa descapotable hasta pintorescos carruajes para vivir un cuento de hadas.',
        precio: 'Desde $11.000',
        promociones: 1,
        responde: true,
        imgs: [
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
        ],
    },
];

const PRECIO = ['Menos de $10.000', '$10.000 - $15.000', '$15.000 - $20.000', 'Más de $20.000'];
const TIPO_VEHICULOS = ['Coches de gama alta', 'Limusinas', 'Coches clásicos', 'Coches de caballos', 'Carruaje o calesa', 'Coches deportivos', 'Furgonetas', 'Otros'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function AutosBoda() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});

    const [openSections, setOpenSections] = useState<string[]>(['destacados', 'precio', 'tipo']);
    const [searchQuery, setSearchQuery] = useState('Coches de boda');
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
    const setImg = (autoId: number, idx: number) => setActiveImgs(prev => ({ ...prev, [autoId]: idx }));

    return (
        <div className="autos-page">
            {/* ── HERO ── */}
            <section className="autos-hero">
                <div className="autos-hero-left">
                    <nav className="autos-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <strong>Coches de boda</strong>
                    </nav>
                    <h1 className="autos-hero-title">Coches de boda</h1>

                    <form className="hero-search" onSubmit={e => e.preventDefault()} style={{ position: 'relative' }}>
                        <div className="search-field search-category-wrap" ref={searchRef}>
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Coches de boda"
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

                    <p className="autos-hero-desc">
                        ¿Buscas lujo y estilo para tu boda en Uruguay? Descubre las mejores empresas de alquiler de autos de boda. Compara opciones y precios para hacer de tu gran día un evento único e inolvidable.
                    </p>
                </div>
                <div className="autos-hero-right" style={{ pointerEvents: 'none' }}>
                    <img
                        src="https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&fit=crop&w=800&q=80"
                        alt="Autos de boda y coches clásicos"
                        className="autos-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="autos-body container">

                {/* ── SIDEBAR ── */}
                <aside className="autos-sidebar">

                    <div className="autos-filter-group">
                        <button className="autos-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <span>Filtros destacados</span>
                            {isOpen('destacados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destacados') && (
                            <div className="autos-filter-body">
                                <label className="autos-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Tag size={16} className="filter-icon-left" /> Promociones
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                                <label className="autos-checkbox toggle-style">
                                    <div className="toggle-text">
                                        <Star size={16} className="filter-icon-left" /> Ganadores Wedding Awards
                                    </div>
                                    <div className="toggle-switch"><input type="checkbox" /></div>
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="autos-filter-group">
                        <button className="autos-filter-toggle" onClick={() => toggleSection('precio')}>
                            <span>Precio</span>
                            {isOpen('precio') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('precio') && (
                            <div className="autos-filter-body">
                                {PRECIO.map(p => (
                                    <label key={p} className="autos-checkbox"><input type="checkbox" />{p}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="autos-filter-group">
                        <button className="autos-filter-toggle" onClick={() => toggleSection('tipo')}>
                            <span>Tipo de vehículos</span>
                            {isOpen('tipo') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('tipo') && (
                            <div className="autos-filter-body">
                                {TIPO_VEHICULOS.map(t => (
                                    <label key={t} className="autos-checkbox"><input type="checkbox" />{t}</label>
                                ))}
                            </div>
                        )}
                    </div>

                </aside>

                {/* ── LISTING ── */}
                <main className="autos-listing">
                    <div className="autos-listing-header">
                        <span className="autos-results-count">{AUTOS.length} RESULTADOS</span>
                        <div className="autos-view-toggle">
                            <button className={`autos-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`autos-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                            <button className="autos-view-btn" title="Vista mapa">
                                <MapPin size={18} /> Mapa
                            </button>
                        </div>
                    </div>

                    <div className={`autos-cards ${viewMode === 'grid' ? 'autos-cards--grid' : ''}`}>
                        {AUTOS.map(auto => {
                            const currentImg = activeImgs[auto.id] ?? 0;
                            const isFav = favs.includes(auto.id);
                            return (
                                <article key={auto.id} className="autos-card">
                                    <div className="autos-card-img-wrap">
                                        <img src={auto.imgs[currentImg]} alt={auto.nombre} className="autos-card-img" />
                                        {auto.imgs.length > 1 && (
                                            <div className="autos-card-dots">
                                                {auto.imgs.map((_, i) => (
                                                    <button key={i} className={`autos-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(auto.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`autos-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(auto.id)} aria-label="Guardar en favoritos">
                                            <Heart size={20} fill={isFav ? '#fff' : 'rgba(0,0,0,0.3)'} stroke="#fff" strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="autos-card-info">
                                        <div className="autos-card-info-top">
                                            <div>
                                                <h2 className="autos-card-name">{auto.nombre}</h2>
                                                <div className="autos-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{auto.rating.toFixed(1)}</strong>
                                                    <span>({auto.reviews}) · {auto.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="autos-card-desc">{auto.descripcion}</p>

                                        <div className="autos-card-bottom">
                                            <div className="autos-card-meta">
                                                <span className="autos-meta-item">
                                                    <span className="icon-wrapper"><Car size={14} /></span>
                                                    {auto.precio}
                                                </span>
                                                {auto.promociones > 0 && (
                                                    <span className="autos-meta-promo">
                                                        <Tag size={13} /> {auto.promociones} promoción{auto.promociones > 1 ? 'es' : ''} <span className="discount-badge">-10%</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className="autos-card-actions">
                                                <button className="autos-btn-presupuesto">Solicitar Presupuesto</button>
                                                {auto.responde && (
                                                    <span className="autos-responde">
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
