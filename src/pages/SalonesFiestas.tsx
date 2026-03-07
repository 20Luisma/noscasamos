import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Users, PartyPopper, Zap, Tag, ChevronDown, ChevronUp, LayoutList, LayoutGrid, Home as HomeIcon, Camera, Music, Car, Flower2, Plane, Cake, Gem, Sparkles, Shirt, User, UtensilsCrossed } from 'lucide-react';
import './SalonesFiestas.css';

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
const SALONES = [
    {
        id: 1,
        nombre: 'Salón Imperial',
        ubicacion: 'Pocitos, Montevideo',
        rating: 5.0, reviews: 113,
        descripcion: 'El Salón Imperial es sinónimo de elegancia y sofisticación en Montevideo. Con capacidad para más de 500 invitados, sus salones de estilo europeo, techos altos con araañas de cristal y servicio de catering de primer nivel lo convierten en la opción más solicitada para bodas de gran escala en Uruguay.',
        precio: 'Desde $1.500 pp',
        capacidad: '100 a 550',
        promociones: 3,
        responde: true,
        imgs: [
            'https://www.revistabodas.com.uy/wp-content/uploads/2020/02/salon-de-fiestas-bodega-spinoglio.jpg',
            'https://www.tufiesta.com.uy/public/images/proveedores/altos-de-la-via/salones-de-fiesta-altos-de-la-via-5.jpg',
        ],
    },
    {
        id: 2,
        nombre: 'Salón Versailles',
        ubicacion: 'Centro, Montevideo',
        rating: 4.9, reviews: 87,
        descripcion: 'Inspirado en la arquitectura francesa del siglo XVIII, el Salón Versailles es un espacio único en Montevideo. Sus salones dorados, espejos de pared a pared y jardines exteriores iluminados crean un ambiente de cuento de hadas ideal para bodas de lujo con muchos invitados.',
        precio: 'Desde $1.800 pp',
        capacidad: '80 a 400',
        promociones: 1,
        responde: true,
        imgs: [
            'https://www.revistabodas.com.uy/wp-content/uploads/2021/11/salones-de-fiestas-en-montevideo-4.jpg',
            'https://www.revistabodas.com.uy/wp-content/uploads/2021/11/salones-de-fiestas-en-montevideo-hotel-dazzler.jpeg',
        ],
    },
    {
        id: 3,
        nombre: 'Centro de Convenciones Radisson',
        ubicacion: 'Punta Carretas, Montevideo',
        rating: 4.8, reviews: 64,
        descripcion: 'El salón de eventos del Hotel Radisson combina la infraestructura de un hotel cinco estrellas con la flexibilidad de un espacio de convenciones moderno. Perfecto para bodas corporativas y celebraciones grandes, con servicio de alojamiento para todos los invitados en el mismo edificio.',
        precio: 'Desde $2.200 pp',
        capacidad: '50 a 350',
        promociones: 0,
        responde: false,
        imgs: [
            'https://cluburuguay.com.uy/assets/images/web-11-500x334.jpg',
            'https://www.tufiesta.com.uy/public/images/proveedores/salon-portofino/salones-de-fiestas-salon-portofino-1758741296111.jpg',
        ],
    },
    {
        id: 4,
        nombre: 'Salón El Mirador',
        ubicacion: 'Punta del Este, Maldonado',
        rating: 4.7, reviews: 49,
        descripcion: 'Con vistas panorámicas al Atlántico y la Laguna del Sauce desde sus enormes ventanales, El Mirador es el salón más espectacular de Punta del Este. Sus terrazas exteriores y su diseño moderno permiten combinar ceremonia y banquete en un mismo espacio único con vistas al mar.',
        precio: 'Desde $2.800 pp',
        capacidad: '60 a 300',
        promociones: 2,
        responde: true,
        imgs: [
            'https://www.revistabodas.com.uy/wp-content/uploads/2023/03/IM_Adelanto-49.jpg',
            'https://media.subrayado.com.uy/p/999c54f3682787a94805b0a2183d869a/adjuntos/230/imagenes/002/688/0002688790/1200x675/smart/salones-fiesta-gobierno-reclamojpg.jpg',
        ],
    },
    {
        id: 5,
        nombre: 'Salón La Cúpula',
        ubicacion: 'Carrasco, Montevideo',
        rating: 4.9, reviews: 72,
        descripcion: 'La Cúpula es un espacio arquitectónicamente icónico en Carrasco, con una impresionante cúpula de vidrio como techo principal del salón. La luz natural que inunda el espacio durante el día y los juegos de iluminación nocturna crean atmósferas completamente distintas para cada momento de la celebración.',
        precio: 'Desde $2.000 pp',
        capacidad: '40 a 250',
        promociones: 1,
        responde: true,
        imgs: [
            'https://media.subrayado.com.uy/p/999c54f3682787a94805b0a2183d869a/adjuntos/230/imagenes/002/688/0002688790/1200x675/smart/salones-fiesta-gobierno-reclamojpg.jpg',
            'https://cluburuguay.com.uy/assets/images/web-11-500x334.jpg',
        ],
    },
    {
        id: 6,
        nombre: 'Club de Golf del Uruguay',
        ubicacion: 'Punta Carretas, Montevideo',
        rating: 4.8, reviews: 38,
        descripcion: 'Los salones del Club de Golf del Uruguay combinan la exclusividad de un club privado con vistas privilegiadas al campo de golf. Con jardines impecablemente cuidados y salones históricos de estilo inglés, es la opción elegida por familias tradicionales que buscan una boda clásica y distinguida.',
        precio: 'Desde $1.700 pp',
        capacidad: '50 a 300',
        promociones: 0,
        responde: true,
        imgs: [
            'https://www.tufiesta.com.uy/public/images/proveedores/altos-de-la-via/salones-de-fiesta-altos-de-la-via-5.jpg',
            'https://www.revistabodas.com.uy/wp-content/uploads/2020/02/salon-de-fiestas-bodega-spinoglio.jpg',
        ],
    },
    {
        id: 7,
        nombre: 'Salón Palacio Piria',
        ubicacion: 'Ciudad Vieja, Montevideo',
        rating: 4.6, reviews: 55,
        descripcion: 'El histórico Palacio Piria, construido a principios del siglo XX por el excéntrico arquitecto Francisco Piria, ofrece sus salones restaurados para eventos únicos. La mezcla de neogótico, masónico y art nouveau crea un escenario absolutamente original e imponente para bodas temáticas y de época.',
        precio: 'Desde $1.400 pp',
        capacidad: '40 a 220',
        promociones: 2,
        responde: false,
        imgs: [
            'https://www.tufiesta.com.uy/public/images/proveedores/salon-portofino/salones-de-fiestas-salon-portofino-1758741296111.jpg',
            'https://www.revistabodas.com.uy/wp-content/uploads/2021/11/salones-de-fiestas-en-montevideo-4.jpg',
        ],
    },
    {
        id: 8,
        nombre: 'Salón Jardín de Rosas',
        ubicacion: 'Colón, Montevideo',
        rating: 4.7, reviews: 91,
        descripcion: 'El Jardín de Rosas es el salón favorito de las parejas que buscan una boda romántica sin gastar una fortuna. Sus jardines llenos de flores, el quincho con parrilla y la decoración floral incluida en todos los paquetes lo convierten en la propuesta más completa del rango precio-calidad en Montevideo.',
        precio: 'Desde $900 pp',
        capacidad: '70 a 450',
        promociones: 3,
        responde: true,
        imgs: [
            'https://www.revistabodas.com.uy/wp-content/uploads/2021/11/salones-de-fiestas-en-montevideo-hotel-dazzler.jpeg',
            'https://www.revistabodas.com.uy/wp-content/uploads/2023/03/IM_Adelanto-49.jpg',
        ],
    },
];

const PRICE_RANGES = ['Menos de $800 pp', '$800 - $1.200 pp', '$1.200 - $1.800 pp', '$1.800 - $2.500 pp', 'Más de $2.500 pp'];
const GUEST_RANGES = ['0 - 49', '50 - 99', '100 - 199', '200 - 299', '300+'];
const LOCATION_TYPES = ['En la ciudad', 'Zona costera', 'Barrio privado', 'Centro histórico', 'A las afueras'];
const SPACES = ['Salón principal', 'Terraza exterior', 'Jardín', 'Zona de baile', 'Vestíbulo cocktail', 'Habitaciones', 'Parking'];

type ViewMode = 'list' | 'grid';

/* ─── Component ──────────────────────────────────────────────── */
export default function SalonesFiestas() {
    const [favs, setFavs] = useState<number[]>([]);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [activeImgs, setActiveImgs] = useState<Record<number, number>>({});
    const [openSections, setOpenSections] = useState<string[]>(['lugarBoda', 'precio', 'invitados']);
    const [searchQuery, setSearchQuery] = useState('Salones de Fiesta');
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
    const setImg = (salonId: number, idx: number) => setActiveImgs(prev => ({ ...prev, [salonId]: idx }));

    return (
        <div className="sal-page">

            {/* ── HERO ── */}
            <section className="sal-hero">
                <div className="sal-hero-left">
                    <nav className="sal-breadcrumb">
                        <Link to="/">Inicio</Link>
                        <span>/</span>
                        <Link to="/espacios">Lugares para Boda</Link>
                        <span>/</span>
                        <strong>Salones de Fiestas</strong>
                    </nav>
                    <h1 className="sal-hero-title">Salones de Fiestas para boda en Uruguay</h1>

                    <form className="hero-search" onSubmit={e => e.preventDefault()} style={{ position: 'relative' }}>
                        <div className="search-field search-category-wrap" ref={searchRef}>
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Busca por nombre o por categoría"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onFocus={openCategoryDropdown}
                                autoComplete="off"
                            />
                        </div>
                        <div className="search-divider"></div>
                        <div className="search-field search-location search-location-wrap" ref={locationRef}>
                            <span className="location-prefix"><MapPin size={16} strokeWidth={2} /></span>
                            <input
                                type="text"
                                placeholder="Departamento"
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

                    <p className="sal-hero-desc">
                        Encontrá el salón perfecto para tu boda en Uruguay. Desde clásicos salones de lujo en Montevideo hasta
                        modernos espacios en Punta del Este, tenemos la opción ideal para que tu gran día sea exactamente como lo soñaste.
                    </p>
                </div>
                <div className="sal-hero-right">
                    <img
                        src="https://www.revistabodas.com.uy/wp-content/uploads/2021/11/salones-de-fiestas-en-montevideo-4.jpg"
                        alt="Salón de fiestas para boda en Uruguay"
                        className="sal-hero-img"
                    />
                </div>
            </section>

            {/* ── BODY ── */}
            <div className="sal-body container">

                {/* ── SIDEBAR ── */}
                <aside className="sal-sidebar">
                    <button className="sal-clear-filters">Borrar filtros</button>

                    <div className="sal-filter-group">
                        <button className="sal-filter-toggle" onClick={() => toggleSection('lugarBoda')}>
                            <span>Lugares para Boda</span>
                            {isOpen('lugarBoda') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('lugarBoda') && (
                            <div className="sal-filter-body">
                                {['Salones de Fiesta', 'Estancias & Campos', 'Hoteles', 'Restaurantes', 'Catering', 'Bodegas', 'Espacios singulares', 'Bodas playa'].map(item => (
                                    <label key={item} className={`sal-checkbox ${item === 'Salones de Fiesta' ? 'checked' : ''}`}>
                                        <input type="checkbox" defaultChecked={item === 'Salones de Fiesta'} />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="sal-filter-group">
                        <button className="sal-filter-toggle" onClick={() => toggleSection('destacados')}>
                            <span>Filtros destacados</span>
                            {isOpen('destacados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('destacados') && (
                            <div className="sal-filter-body">
                                <label className="sal-checkbox"><input type="checkbox" />🏷 Promociones</label>
                                <label className="sal-checkbox"><input type="checkbox" />⚡ Responde en 24 h</label>
                                <label className="sal-checkbox"><input type="checkbox" />🏆 Ganadores Wedding Awards</label>
                            </div>
                        )}
                    </div>

                    <div className="sal-filter-group">
                        <button className="sal-filter-toggle" onClick={() => toggleSection('precio')}>
                            <span>Precio</span>
                            {isOpen('precio') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('precio') && (
                            <div className="sal-filter-body">
                                <div className="sal-price-tabs">
                                    <button className="sal-price-tab active">Menú por persona</button>
                                    <button className="sal-price-tab">Alquiler del espacio</button>
                                </div>
                                {PRICE_RANGES.map(p => (
                                    <label key={p} className="sal-checkbox"><input type="checkbox" />{p}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="sal-filter-group">
                        <button className="sal-filter-toggle" onClick={() => toggleSection('invitados')}>
                            <span>Número de invitados</span>
                            {isOpen('invitados') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('invitados') && (
                            <div className="sal-filter-body">
                                {GUEST_RANGES.map(g => (
                                    <label key={g} className="sal-checkbox"><input type="checkbox" />{g}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="sal-filter-group">
                        <button className="sal-filter-toggle" onClick={() => toggleSection('ubicacion')}>
                            <span>Tipo de ubicación</span>
                            {isOpen('ubicacion') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('ubicacion') && (
                            <div className="sal-filter-body">
                                {LOCATION_TYPES.map(l => (
                                    <label key={l} className="sal-checkbox"><input type="checkbox" />{l}</label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="sal-filter-group">
                        <button className="sal-filter-toggle" onClick={() => toggleSection('espacios')}>
                            <span>Espacios</span>
                            {isOpen('espacios') ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        {isOpen('espacios') && (
                            <div className="sal-filter-body">
                                {SPACES.map(s => (
                                    <label key={s} className="sal-checkbox"><input type="checkbox" />{s}</label>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>

                {/* ── LISTING ── */}
                <main className="sal-listing">
                    <div className="sal-listing-header">
                        <span className="sal-results-count">{SALONES.length} RESULTADOS</span>
                        <div className="sal-view-toggle">
                            <button className={`sal-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} title="Vista lista">
                                <LayoutList size={18} /> Listado
                            </button>
                            <button className={`sal-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Vista cuadrícula">
                                <LayoutGrid size={18} /> Imágenes
                            </button>
                        </div>
                    </div>

                    <div className={`sal-cards ${viewMode === 'grid' ? 'sal-cards--grid' : ''}`}>
                        {SALONES.map(salon => {
                            const currentImg = activeImgs[salon.id] ?? 0;
                            const isFav = favs.includes(salon.id);
                            return (
                                <article key={salon.id} className="sal-card">
                                    <div className="sal-card-img-wrap">
                                        <img src={salon.imgs[currentImg]} alt={salon.nombre} className="sal-card-img" />
                                        {salon.imgs.length > 1 && (
                                            <div className="sal-card-dots">
                                                {salon.imgs.map((_, i) => (
                                                    <button key={i} className={`sal-card-dot ${i === currentImg ? 'active' : ''}`}
                                                        onClick={() => setImg(salon.id, i)} aria-label={`Imagen ${i + 1}`} />
                                                ))}
                                            </div>
                                        )}
                                        <button className={`sal-fav-btn ${isFav ? 'active' : ''}`} onClick={() => toggleFav(salon.id)} aria-label="Guardar en favoritos">
                                            <Heart size={16} fill={isFav ? '#c8264a' : 'none'} stroke={isFav ? '#c8264a' : '#fff'} />
                                        </button>
                                    </div>

                                    <div className="sal-card-info">
                                        <div className="sal-card-info-top">
                                            <div>
                                                <h2 className="sal-card-name">{salon.nombre}</h2>
                                                <div className="sal-card-location">
                                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                                    <strong>{salon.rating.toFixed(1)}</strong>
                                                    <span>({salon.reviews})</span>
                                                    <span className="sal-card-city">· {salon.ubicacion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="sal-card-desc">{salon.descripcion}</p>
                                        <div className="sal-card-meta">
                                            <span className="sal-meta-item"><PartyPopper size={14} />{salon.precio}</span>
                                            <span className="sal-meta-item"><Users size={14} />{salon.capacidad}</span>
                                            {salon.promociones > 0 && (
                                                <span className="sal-meta-promo"><Tag size={13} />{salon.promociones} promoción{salon.promociones > 1 ? 'es' : ''}</span>
                                            )}
                                        </div>
                                        <div className="sal-card-actions">
                                            <button className="sal-btn-presupuesto">Solicitar Presupuesto</button>
                                            {salon.responde && (
                                                <span className="sal-responde">
                                                    <Zap size={13} fill="#f8b400" stroke="#f8b400" />
                                                    Responde en 24 horas
                                                </span>
                                            )}
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
