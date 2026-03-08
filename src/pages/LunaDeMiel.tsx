import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, Calendar, Users, Grid, Calculator, Globe } from 'lucide-react';
import './AntesBoda.css'; // Reusing the exact same layout CSS

/* ─── Mock Data ────────────────────────────────────────────── */

type Category = 'Todos' | 'Planificación' | 'Destinos';

interface Article {
    id: number;
    category: Category;
    title: string;
    excerpt: string;
    author: string;
    date?: string;
    img: string;
    authorImg?: string;
    featured?: boolean;
}

const CATEGORIES: { name: Category; count: number }[] = [
    { name: 'Todos', count: 283 },
    { name: 'Planificación', count: 51 },
    { name: 'Destinos', count: 232 },
];

const ARTICLES: Article[] = [
    {
        id: 1,
        category: 'Destinos',
        title: 'Los mejores destinos para la luna de miel 2026',
        excerpt: '¿Organizando el viaje de novios y no sabéis por dónde empezar? Toma nota de estos consejos y descubre un listado con los mejores destinos para la luna de miel. Hawái, Australia, Maldivas, Japón... ¡a volar!',
        author: 'Sara Varas',
        date: '25/12/2025',
        img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800', // Example placeholder boarding passes map
        featured: true,
    },
    {
        id: 2,
        category: 'Planificación',
        title: 'Conoce a la pareja que ya ganó su luna de miel',
        excerpt: 'Bodas.net te trae una fantástica noticia. ¡Y es que puedes ganar una luna de miel gratis! ¿Cómo? Solo tienes que participar en este sorteo. ¡El viaje de novios de tus sueños te espera! [FINALIZADO]',
        author: 'Anna Llopis',
        date: '28/11/2025',
        img: 'https://casandrafilms.com/wp-content/uploads/2023/10/PRINCPAL-e1699475102535.jpg',
        featured: true,
    },
    {
        id: 3,
        category: 'Planificación',
        title: 'La guía definitiva para organizar una luna de miel perfecta',
        excerpt: 'Después del "sí, quiero" llega la mejor de las recompensas: el viaje de novios. Si queréis que esté a la altura del gran día, no os perdáis esta práctica guía. Os ayudará a organizar una luna de miel inolvidable.',
        author: 'Anna Maestre',
        date: '07/11/2025',
        img: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=600',
    },
    {
        id: 4,
        category: 'Planificación',
        title: '¿Por qué se llama luna de miel? (Posibles) orígenes del viaje de novios',
        excerpt: 'Seguro que más de una vez habéis soñado con ese viaje súper romántico después de la boda. Pero... ¿os habéis parado a pensar por qué se llama luna de miel y de dónde viene esta tradición? Spoiler: su origen es mucho más curioso de lo que imagináis.',
        author: 'Lola Márquez',
        date: '31/10/2025',
        img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
    },
];

const SECCIONES = [
    { label: 'Antes de la boda', count: null },
    { label: 'La ceremonia de boda', count: null },
    { label: 'El banquete', count: null },
    { label: 'Moda nupcial', count: null },
    { label: 'Luna de miel', count: null, active: true },
    { label: 'Después de la boda', count: null },
    { label: 'Hazlo tú mism@', count: null },
    { label: 'Crónicas de boda', count: null },
];

const LUNA_MIEL_SUBSECTIONS = [
    { label: 'Planificación de la luna de miel', count: 51 },
    { label: 'Destinos para la luna de miel', count: 232 },
];

const ORGANIZADOR_LINKS = [
    { label: 'Agenda de Tareas', icon: Calendar },
    { label: 'Gestor de Invitados', icon: Users },
    { label: 'Organizador de Mesas', icon: Grid },
    { label: 'Presupuestador', icon: Calculator },
    { label: 'Web de Boda', icon: Globe },
];

export default function LunaDeMiel() {
    const [activeCategory, setActiveCategory] = useState<Category>('Todos');

    const filteredArticles = activeCategory === 'Todos'
        ? ARTICLES
        : ARTICLES.filter(a => a.category === activeCategory);

    const featuredArticles = filteredArticles.filter(a => a.featured);
    const standardArticles = filteredArticles.filter(a => !a.featured);

    return (
        <div className="andes-page">
            <div className="antes-container container">

                {/* ── BREADCRUMB + SEARCH ── */}
                <header className="antes-header-nav">
                    <nav className="antes-breadcrumb">
                        <Link to="/">Bodas</Link>
                        <span>/</span>
                        <Link to="/directorio">Ideas boda</Link>
                        <span>/</span>
                        <strong>Luna de miel</strong>
                    </nav>
                    <div className="antes-search">
                        <Search size={16} className="antes-search-icon" />
                        <input type="text" placeholder="Buscar" />
                    </div>
                </header>

                {/* ── MAIN HEADER INFO ── */}
                <section className="antes-title-section">
                    <h1 className="antes-main-title">Luna de miel</h1>
                    <p className="antes-main-desc">
                        Nueva York, Japón, Tailandia, Riviera Maya, África, Europa... Es el momento de planificar el viaje de novios
                        con el que siempre habéis soñado y disfrutar del inicio de vuestro matrimonio en algún lugar especial.
                        ¡Inspírate con nuestros destinos!
                    </p>

                    <div className="antes-category-pills">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.name}
                                className={`antes-pill ${activeCategory === cat.name ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.name)}
                            >
                                <span className="pill-name">{cat.name}</span>
                                <span className="pill-count">{cat.count}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* ── CONTENT LAYOUT (Articles + Sidebar) ── */}
                <div className="antes-layout">

                    {/* LEFT COL: ARTICLES */}
                    <main className="antes-articles">

                        {/* FEATURED ARTICLES */}
                        {featuredArticles.length > 0 && (
                            <div className="antes-featured-list">
                                {featuredArticles.map(article => (
                                    <article key={article.id} className="antes-card featured-card">
                                        <div className="antes-card-content">
                                            <span className="antes-card-cat">{article.category.toUpperCase()}</span>
                                            <h2 className="antes-card-title">{article.title}</h2>
                                            <p className="antes-card-excerpt">{article.excerpt}</p>

                                            <div className="antes-card-meta">
                                                <span className="author-name">Por {article.author}</span>
                                                {article.date && <span className="article-date">, actualizado el {article.date}</span>}
                                            </div>
                                        </div>
                                        <div className="antes-card-img-wrap">
                                            <img src={article.img} alt={article.title} className="antes-card-img" />
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}

                        {/* STANDARD ARTICLES (Grid Layout) */}
                        {standardArticles.length > 0 && (
                            <>
                                <h3 className="antes-section-title">Últimos artículos publicados</h3>
                                <div className="antes-grid">
                                    {standardArticles.map(article => (
                                        <article key={article.id} className="antes-card grid-card">
                                            <div className="antes-card-img-wrap">
                                                <img src={article.img} alt={article.title} className="antes-card-img" />
                                            </div>
                                            <div className="antes-card-content">
                                                <span className="antes-card-cat">{article.category.toUpperCase()}</span>
                                                <h3 className="antes-card-title">{article.title}</h3>
                                                <p className="antes-card-excerpt">{article.excerpt}</p>

                                                <div className="antes-card-meta">
                                                    <span className="author-name">Por {article.author}</span>
                                                    {article.date && <span className="article-date">, actualizado el {article.date}</span>}
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </>
                        )}
                    </main>

                    {/* RIGHT COL: SIDEBAR */}
                    <aside className="antes-sidebar">

                        {/* SECCIONES */}
                        <div className="antes-widget">
                            <h4 className="widget-title">Secciones</h4>
                            <div className="secciones-list">
                                {SECCIONES.map((sec, idx) => (
                                    <div key={idx} className="seccion-item-wrap">
                                        <button className={`seccion-btn ${sec.active ? 'active' : ''}`}>
                                            {sec.label}
                                            {sec.active ? <ChevronDown size={18} strokeWidth={1.5} /> : <ChevronRight size={18} strokeWidth={1.5} />}
                                        </button>

                                        {sec.active && (
                                            <div className="seccion-sub">
                                                {LUNA_MIEL_SUBSECTIONS.map((sub, i) => (
                                                    <a key={i} href="#" className="sub-link">
                                                        <span>{sub.label}</span>
                                                        <span className="sub-count">{sub.count}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ORGANIZADOR */}
                        <div className="antes-widget">
                            <h4 className="widget-title">Mi organizador de boda</h4>
                            <div className="organizador-list">
                                {ORGANIZADOR_LINKS.map((link, idx) => (
                                    <a key={idx} href="#" className="org-btn">
                                        <span className="org-btn-left">
                                            <strong className="org-btn-label">{link.label}</strong>
                                        </span>
                                        <ChevronRight size={18} className="org-btn-arrow" strokeWidth={1.5} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* APP DOWNLOAD */}
                        <div className="antes-widget app-widget">
                            <h4 className="widget-title">Organiza tu boda desde el móvil</h4>
                            <div className="app-buttons">
                                <a href="#" className="app-btn-download">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" />
                                </a>
                                <a href="#" className="app-btn-download">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" />
                                </a>
                            </div>
                        </div>

                    </aside>
                </div>

            </div>
        </div>
    );
}
