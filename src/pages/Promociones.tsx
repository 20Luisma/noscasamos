import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Gift, Percent, PiggyBank, Clock } from 'lucide-react';
import './Promociones.css';

/* ─── Mock Data ────────────────────────────────────────────── */
interface Promocion {
    id: number;
    tipo: 'EXCLUSIVO' | 'REGALO' | 'DESCUENTO' | 'OFERTA';
    titulo: string;
    vencimiento: string;
    nombreProveedor: string;
    categoriaProveedor: string;
    ubicacion: string;
    img: string;
    valorBadge: string; // e.g., "-3%", "🎁", "-10%"
}

const PROMOCIONES: Promocion[] = [
    {
        id: 1,
        tipo: 'EXCLUSIVO',
        titulo: '3% de descuento para novios de noscasamos.uy',
        vencimiento: 'Promoción permanente',
        nombreProveedor: 'Novias Pepita Dueñas',
        categoriaProveedor: 'Tiendas de novia',
        ubicacion: 'Montevideo',
        img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop',
        valorBadge: '-3%',
    },
    {
        id: 2,
        tipo: 'EXCLUSIVO',
        titulo: '5% de descuento para novios de noscasamos.uy',
        vencimiento: 'Promoción permanente',
        nombreProveedor: 'La Couture',
        categoriaProveedor: 'Tiendas de novia',
        ubicacion: 'Canelones',
        img: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=600&auto=format&fit=crop',
        valorBadge: '-5%',
    },
    {
        id: 3,
        tipo: 'EXCLUSIVO',
        titulo: '10% de descuento para novios de noscasamos.uy',
        vencimiento: 'Promoción permanente',
        nombreProveedor: 'MartínMachuca Atelier',
        categoriaProveedor: 'Talleres de novia',
        ubicacion: 'Maldonado',
        img: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?q=80&w=600&auto=format&fit=crop',
        valorBadge: '-10%',
    },
    {
        id: 4,
        tipo: 'REGALO',
        titulo: '¡Buscamos novias sin vestido!',
        vencimiento: 'Promoción permanente',
        nombreProveedor: 'Centro Novias',
        categoriaProveedor: 'Tiendas de novia',
        ubicacion: 'Montevideo',
        img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        valorBadge: '🎁',
    },
    {
        id: 5,
        tipo: 'DESCUENTO',
        titulo: '2a alianza al 50%',
        vencimiento: 'Promoción permanente',
        nombreProveedor: 'Alvaro Larrosa Furest',
        categoriaProveedor: 'Joyería',
        ubicacion: 'Colonia',
        img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        valorBadge: '%',
    },
    {
        id: 6,
        tipo: 'EXCLUSIVO',
        titulo: '10% de descuento en vestidos a medida',
        vencimiento: 'Vence el 31/12/2026',
        nombreProveedor: 'Orta Novias',
        categoriaProveedor: 'Talleres de novia',
        ubicacion: 'Montevideo',
        img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        valorBadge: '-10%',
    },
    {
        id: 7,
        tipo: 'EXCLUSIVO',
        titulo: '10% de descuento en complementos',
        vencimiento: 'Promoción permanente',
        nombreProveedor: 'Alvaro Larrosa Furest',
        categoriaProveedor: 'Joyería',
        ubicacion: 'Maldonado',
        img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        valorBadge: '-10%',
    },
    {
        id: 8,
        tipo: 'OFERTA',
        titulo: '¡150 USD en velo de tul de regalo!',
        vencimiento: 'Promoción permanente',
        nombreProveedor: 'Orta Novias',
        categoriaProveedor: 'Tiendas de novia',
        ubicacion: 'Montevideo',
        img: 'https://images.unsplash.com/photo-1549416878-b9ca95e26903?q=80&w=600&auto=format&fit=crop',
        valorBadge: '🐷',
    },
    {
        id: 9,
        tipo: 'REGALO',
        titulo: 'Kit de retoque gratis',
        vencimiento: 'Vence el 15/11/2026',
        nombreProveedor: 'Sara Calvo',
        categoriaProveedor: 'Belleza Novias',
        ubicacion: 'Canelones',
        img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=600&auto=format&fit=crop',
        valorBadge: '🎁',
    },
    {
        id: 10,
        tipo: 'DESCUENTO',
        titulo: '¡Novia! Te hago el 50% en prueba',
        vencimiento: 'Promoción permanente',
        nombreProveedor: 'La Surrealista Makeup',
        categoriaProveedor: 'Belleza Novias',
        ubicacion: 'Montevideo',
        img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        valorBadge: '%',
    },
];

type TabType = 'TODOS' | 'REGALOS' | 'OFERTAS' | 'DESCUENTOS' | 'EXCLUSIVOS';

export default function Promociones() {
    const [activeTab, setActiveTab] = useState<TabType>('TODOS');

    return (
        <div className="promo-page">
            {/* ── BREADCRUMB ── */}
            <div className="promo-breadcrumb-wrap container">
                <nav className="promo-breadcrumb">
                    <Link to="/">Bodas</Link>
                    <span>/</span>
                    <strong>Promociones de Bodas</strong>
                </nav>
            </div>

            {/* ── HERO BANNER ── */}
            <section className="promo-hero">
                <div className="promo-hero-bg">
                    {/* Placeholder image for hero */}
                    <img
                        src="https://www.16nueve.com/wp-content/uploads/2018/11/Fotos-boda-BM-186-1080x675.jpg"
                        alt="Pareja de novios besándose"
                        className="promo-hero-img"
                    />
                    <div className="promo-hero-overlay"></div>
                </div>

                <div className="promo-hero-content container">
                    <h1 className="promo-hero-title">Encuentra las mejores promociones para tu boda</h1>

                    <div className="promo-search-bar">
                        <div className="promo-select-wrap">
                            <select defaultValue="">
                                <option value="">-- Todas las provincias --</option>
                                <option value="montevideo">Montevideo</option>
                                <option value="canelones">Canelones</option>
                                <option value="maldonado">Maldonado</option>
                            </select>
                            <ChevronDown className="promo-select-icon" size={16} />
                        </div>
                        <div className="promo-search-divider"></div>
                        <div className="promo-select-wrap">
                            <select defaultValue="todas">
                                <option value="todas">Todas las categorías (1.245)</option>
                                <option value="novias">Novias</option>
                                <option value="novios">Novios</option>
                                <option value="lugares">Lugares para Boda</option>
                            </select>
                            <ChevronDown className="promo-select-icon" size={16} />
                        </div>
                        <div className="promo-search-divider"></div>
                        <div className="promo-select-wrap">
                            <select defaultValue="">
                                <option value="">-- Todos los tipos --</option>
                                <option value="exclusivo">Exclusivos</option>
                                <option value="regalo">Regalos</option>
                                <option value="descuento">Descuentos</option>
                            </select>
                            <ChevronDown className="promo-select-icon" size={16} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FILTER TABS ── */}
            <div className="promo-tabs-wrapper">
                <div className="promo-tabs container">
                    <button
                        className={`promo-tab ${activeTab === 'TODOS' ? 'active' : ''}`}
                        onClick={() => setActiveTab('TODOS')}
                    >
                        <div className="promo-tab-icon-wrap basic">
                            <div className="circle-border-icon" />
                        </div>
                        <div className="promo-tab-text">
                            <strong>Todos</strong> <span>1.245</span>
                        </div>
                    </button>

                    <button
                        className={`promo-tab ${activeTab === 'REGALOS' ? 'active' : ''}`}
                        onClick={() => setActiveTab('REGALOS')}
                    >
                        <div className="promo-tab-icon-wrap basic">
                            <Gift size={22} className="tab-icon" strokeWidth={1.5} />
                        </div>
                        <div className="promo-tab-text">
                            <strong>Regalos</strong> <span>209</span>
                        </div>
                    </button>

                    <button
                        className={`promo-tab ${activeTab === 'OFERTAS' ? 'active' : ''}`}
                        onClick={() => setActiveTab('OFERTAS')}
                    >
                        <div className="promo-tab-icon-wrap basic">
                            <PiggyBank size={22} className="tab-icon" strokeWidth={1.5} />
                        </div>
                        <div className="promo-tab-text">
                            <strong>Ofertas</strong> <span>115</span>
                        </div>
                    </button>

                    <button
                        className={`promo-tab ${activeTab === 'DESCUENTOS' ? 'active' : ''}`}
                        onClick={() => setActiveTab('DESCUENTOS')}
                    >
                        <div className="promo-tab-icon-wrap basic">
                            <Percent size={22} className="tab-icon" strokeWidth={1.5} />
                        </div>
                        <div className="promo-tab-text">
                            <strong>Descuentos</strong> <span>218</span>
                        </div>
                    </button>

                    <button
                        className={`promo-tab ${activeTab === 'EXCLUSIVOS' ? 'active' : ''}`}
                        onClick={() => setActiveTab('EXCLUSIVOS')}
                    >
                        <div className="promo-tab-icon-wrap exclusive">
                            <Percent size={20} className="tab-icon-exclusive" color="#fff" strokeWidth={2.5} />
                        </div>
                        <div className="promo-tab-text">
                            <strong>Exclusivos</strong> <span>703</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* ── MAIN CONTENT ── */}
            <main className="promo-main container">
                <div className="promo-header">
                    <h2>Promociones de Bodas</h2>
                    <p>1.245 promociones</p>
                </div>

                <div className="promo-grid">
                    {PROMOCIONES.map(promo => {
                        const isExclusivo = promo.tipo === 'EXCLUSIVO';
                        const typeTextClass = isExclusivo ? 'text-exclusive' : 'text-grey';

                        // Decide what icon to show in the white badge
                        let IconComponent = null;
                        if (promo.valorBadge === '🎁') IconComponent = <Gift size={16} strokeWidth={2} />;
                        else if (promo.valorBadge === '%') IconComponent = <Percent size={14} strokeWidth={2.5} />;
                        else if (promo.valorBadge === '🐷') IconComponent = <PiggyBank size={18} strokeWidth={2} />;

                        return (
                            <article key={promo.id} className="promo-card">
                                <div className="promo-card-top">
                                    <img src={promo.img} alt={promo.titulo} className="promo-card-img" />
                                    {/* BADGE */}
                                    <div className={`promo-card-badge ${isExclusivo ? 'badge-orange' : 'badge-white'}`}>
                                        {isExclusivo ? (
                                            <span>{promo.valorBadge}</span>
                                        ) : (
                                            <span className="badge-icon-wrap">{IconComponent || promo.valorBadge}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="promo-card-body">
                                    <h4 className={`promo-type ${typeTextClass}`}>
                                        {promo.tipo === 'EXCLUSIVO' ? 'DESCUENTO EXCLUSIVO' : promo.tipo}
                                    </h4>
                                    <h3 className="promo-title">{promo.titulo}</h3>
                                    <div className="promo-date">
                                        <Clock size={13} strokeWidth={2} />
                                        <span>{promo.vencimiento}</span>
                                    </div>
                                </div>
                                <div className="promo-card-footer">
                                    <p className="promo-vendor-name">{promo.nombreProveedor}</p>
                                    <p className="promo-vendor-cat">{promo.categoriaProveedor} ({promo.ubicacion})</p>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* ── PAGINACIÓN (FALSA) ── */}
                <div className="promo-pagination">
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <button className="page-btn">4</button>
                    <button className="page-btn">5</button>
                    <button className="page-btn dots">...</button>
                    <button className="page-btn">10</button>
                    <button className="page-btn next">Siguiente <ChevronDown size={14} style={{ transform: 'rotate(-90deg)', marginLeft: '4px' }} /></button>
                </div>
            </main>
        </div>
    );
}
