import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, Star, Users } from 'lucide-react';
import './EspaciosCelebracion.css';

/* ─── Mock Data ──────────────────────────────────────────────── */
const DEPARTAMENTOS = [
    { nombre: 'Montevideo', count: 142, img: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=200&h=200&fit=crop' },
    { nombre: 'Canelones', count: 87, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop' },
    { nombre: 'Maldonado', count: 64, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop' },
    { nombre: 'Colonia', count: 38, img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=200&h=200&fit=crop' },
    { nombre: 'Rivera', count: 22, img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&h=200&fit=crop' },
    { nombre: 'Salto', count: 19, img: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=200&h=200&fit=crop' },
    { nombre: 'Paysandú', count: 15, img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=200&fit=crop' },
];

const ESPACIOS = [
    {
        id: 1,
        nombre: 'Estancia La Paz',
        rating: 4.9, reviews: 124,
        ubicacion: 'Canelones',
        capacidad: '50 a 400',
        precio: 'Desde $1.200 pp',
        promociones: 2,
        top: true,
        img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=280&fit=crop',
    },
    {
        id: 2,
        nombre: 'Viña del Valle',
        rating: 4.8, reviews: 89,
        ubicacion: 'Canelones',
        capacidad: '80 a 300',
        precio: 'Desde $980 pp',
        promociones: 1,
        top: true,
        img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=280&fit=crop',
    },
    {
        id: 3,
        nombre: 'Quinta Don Pedro',
        rating: 4.7, reviews: 56,
        ubicacion: 'Montevideo',
        capacidad: '100 a 500',
        precio: 'Desde $850 pp',
        promociones: 0,
        top: true,
        img: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&h=280&fit=crop',
    },
    {
        id: 4,
        nombre: 'Casa de Campo El Bosque',
        rating: 4.6, reviews: 43,
        ubicacion: 'Maldonado',
        capacidad: '30 a 200',
        precio: 'Desde $1.500 pp',
        promociones: 3,
        top: true,
        img: 'https://images.unsplash.com/photo-1470217957101-da7150b9d681?w=400&h=280&fit=crop',
    },
    {
        id: 5,
        nombre: 'Hotel Boutique Colonial',
        rating: 4.5, reviews: 31,
        ubicacion: 'Colonia',
        capacidad: '20 a 150',
        precio: 'Desde $1.800 pp',
        promociones: 1,
        top: false,
        img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=280&fit=crop',
    },
    {
        id: 6,
        nombre: 'Finca Los Eucaliptos',
        rating: 4.8, reviews: 72,
        ubicacion: 'Canelones',
        capacidad: '60 a 350',
        precio: 'Desde $750 pp',
        promociones: 2,
        top: true,
        img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=280&fit=crop&q=60',
    },
    {
        id: 7,
        nombre: 'Mansión del Lago',
        rating: 4.9, reviews: 98,
        ubicacion: 'Maldonado',
        capacidad: '40 a 250',
        precio: 'Desde $2.100 pp',
        promociones: 0,
        top: true,
        img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=280&fit=crop&q=60',
    },
    {
        id: 8,
        nombre: 'Palacio Santa Teresa',
        rating: 4.7, reviews: 61,
        ubicacion: 'Rivera',
        capacidad: '80 a 600',
        precio: 'Desde $620 pp',
        promociones: 1,
        top: false,
        img: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=400&h=280&fit=crop&q=60',
    },
];

/* ─── Component ──────────────────────────────────────────────── */
export default function EspaciosCelebracion() {
    const [favorites, setFavorites] = useState<number[]>([]);

    const toggleFav = (id: number) =>
        setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

    return (
        <div className="espacios-page">

            {/* ── HERO ── */}
            <section className="esp-hero">
                <div className="esp-hero-left">
                    <nav className="esp-breadcrumb">
                        <Link to="/">Inicio</Link>
                        <span>/</span>
                        <span>Lugares para Boda</span>
                        <span>/</span>
                        <strong>Espacios de Celebración</strong>
                    </nav>
                    <h1 className="esp-hero-title">Espacios de Celebración en Uruguay</h1>
                    <p className="esp-hero-sub">Más de 380 espacios para elegir en todo el país</p>

                    <div className="esp-search-bar">
                        <div className="esp-search-field">
                            <Search size={18} className="esp-search-icon" />
                            <input type="text" placeholder="Busca por nombre o tipo..." />
                        </div>
                        <div className="esp-search-divider" />
                        <div className="esp-search-field">
                            <MapPin size={18} className="esp-search-icon" />
                            <input type="text" placeholder="Departamento" />
                        </div>
                        <button className="btn-primary esp-search-btn">Buscar</button>
                    </div>
                </div>
                <div className="esp-hero-right">
                    <img
                        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&h=600&fit=crop"
                        alt="Espacio de celebración"
                        className="esp-hero-img"
                    />
                </div>
            </section>

            {/* ── POR DEPARTAMENTO ── */}
            <section className="esp-deptos container">
                <h2 className="esp-section-title">Espacios por departamento</h2>
                <div className="esp-deptos-grid">
                    {DEPARTAMENTOS.map(d => (
                        <Link to="/directorio" key={d.nombre} className="esp-depto-card">
                            <div className="esp-depto-circle">
                                <img src={d.img} alt={d.nombre} />
                            </div>
                            <span className="esp-depto-name">{d.nombre}</span>
                            <span className="esp-depto-count">{d.count} espacios</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── EL ESPACIO DE TUS SUEÑOS ── */}
            <section className="esp-promo">
                <div className="esp-promo-card">
                    <h2>El espacio de tus sueños</h2>
                    <p>Elegí entre cientos de estancias, hoteles, fincas y salones el lugar perfecto para celebrar tu boda en Uruguay.</p>
                    <Link to="/directorio" className="btn-primary">Ver todos los espacios</Link>
                </div>
                <div className="esp-promo-img">
                    <img
                        src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=500&fit=crop"
                        alt="Salón de bodas"
                    />
                </div>
            </section>

            {/* ── GRID DE ESPACIOS ── */}
            <section className="esp-grid-section container">
                <h2 className="esp-section-title">Espacios destacados en Uruguay</h2>
                <div className="esp-grid">
                    {ESPACIOS.map(e => (
                        <Link to={`/proveedor/${e.id}`} key={e.id} className="esp-card">
                            <div className="esp-card-img-wrap">
                                <img src={e.img} alt={e.nombre} className="esp-card-img" />
                                {e.top && <span className="esp-badge-top">TOP</span>}
                                <button
                                    className={`esp-fav-btn ${favorites.includes(e.id) ? 'active' : ''}`}
                                    onClick={ev => { ev.preventDefault(); toggleFav(e.id); }}
                                    aria-label="Favorito"
                                >
                                    <Heart size={16} fill={favorites.includes(e.id) ? '#c8264a' : 'none'} stroke={favorites.includes(e.id) ? '#c8264a' : '#666'} />
                                </button>
                            </div>
                            <div className="esp-card-body">
                                <h3 className="esp-card-name">{e.nombre}</h3>
                                <div className="esp-card-rating">
                                    <Star size={14} fill="#f8b400" stroke="#f8b400" />
                                    <strong>{e.rating}</strong>
                                    <span>({e.reviews})</span>
                                    <span className="esp-card-location">· {e.ubicacion}</span>
                                </div>
                                <div className="esp-card-meta">
                                    <span className="esp-meta-item">
                                        <Users size={13} /> {e.capacidad}
                                    </span>
                                    <span className="esp-meta-price">{e.precio}</span>
                                </div>
                                {e.promociones > 0 && (
                                    <span className="esp-promo-badge">🏷 {e.promociones} promoción{e.promociones > 1 ? 'es' : ''}</span>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    );
}
