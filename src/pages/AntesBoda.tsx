import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, Download, Calendar, Users, Grid, Calculator, Globe } from 'lucide-react';
import './AntesBoda.css';

/* ─── Mock Data ────────────────────────────────────────────── */

type Category = 'Todos' | 'Planificación' | 'Actualidad y ferias' | 'Tradiciones y supersticiones' | 'Trámites matrimonio';

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
    { name: 'Todos', count: 984 },
    { name: 'Planificación', count: 550 },
    { name: 'Actualidad y ferias', count: 298 },
    { name: 'Tradiciones y supersticiones', count: 122 },
    { name: 'Trámites matrimonio', count: 13 },
];

const ARTICLES: Article[] = [
    {
        id: 1,
        category: 'Actualidad y ferias',
        title: 'Más de 100 frases originales para el Día de la Mujer',
        excerpt: 'El 8 de marzo se celebra el Día Internacional de la Mujer y por eso hemos recopilado más de 100 frases originales de mujeres famosas y anónimas, perfectas para dedicárselas a tu madre, tus hermanas, tu pareja, tus amigas...',
        author: 'Anna Llopis',
        authorImg: 'https://randomuser.me/api/portraits/women/44.jpg',
        img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
        featured: true,
    },
    {
        id: 2,
        category: 'Actualidad y ferias',
        title: 'Wedding Awards 2026: los mejores proveedores de boda según las parejas de Bodas.net',
        excerpt: 'Descubre cuáles han sido las empresas ganadoras de la 12ª edición de los premios más prestigiosos del sector nupcial: ¡los Wedding Awards de Bodas.net!',
        author: 'Bodas.net',
        img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
        featured: true,
    },
    {
        id: 3,
        category: 'Planificación',
        title: 'Imprevistos que pueden suceder el día de la boda: lluvia, calor, cortes de luz...',
        excerpt: '¿Os preocupa el tiempo que hará en vuestra boda? ¿Queréis saber cuáles son los imprevistos más habituales en las bodas? Cortes de luz, manchas de maquillaje, calor... Os contamos más sobre estas situaciones estresantes, ¡y os damos soluciones!',
        author: 'Laura Hernandez',
        date: '06/03/2026',
        img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600',
    },
    {
        id: 4,
        category: 'Actualidad y ferias',
        title: '7 planes románticos para hacer esta Semana Santa con tu pareja',
        excerpt: 'Desde ir al cine hasta hacer un picnic romántico en la playa, el tiempo que pasamos en pareja debería ser innegociable. Por eso os traemos planes románticos para que la diversión nunca termine y podáis conocer facetas nuevas de ambos.',
        author: 'Casandra Maggio',
        date: '04/03/2026',
        img: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=600',
    },
    {
        id: 5,
        category: 'Planificación',
        title: 'La reinvención de la boda boho chic en 2026: todo lo que debes saber',
        excerpt: 'Olvídate del macramé y las coronas de flores: una boda boho chic en 2026 es mucho más que eso: vestidos de novia más sensuales, mucha pampa y ratán, rincones con cojines para descansar... Y, por supuesto, mucha alegría y diversión.',
        author: 'Piluca Santos',
        date: '02/03/2026',
        img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600',
    },
    {
        id: 6,
        category: 'Actualidad y ferias',
        title: 'Compatibilidad de signos 2026: ¡haz el test!',
        excerpt: 'Hasta el 20 de marzo estaremos en el primer "Mercurio retrógrado" de 2026. No dejes que te afecte demasiado y descubre con qué signo eres más compatible gracias al test de Bodas.net. Además, no te pierdas la TABLA DE COMPATIBILIDAD definitiva.',
        author: 'María Paz Revilla',
        date: '26/02/2026',
        img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600',
    },
];

const SECCIONES = [
    { label: 'Antes de la boda', count: null, active: true },
    { label: 'La ceremonia de boda', count: null },
    { label: 'El banquete', count: null },
    { label: 'Moda nupcial', count: null },
    { label: 'Luna de miel', count: null },
    { label: 'Después de la boda', count: null },
    { label: 'Hazlo tú mism@', count: null },
    { label: 'Crónicas de boda', count: null },
];

const ANTES_SUBSECTIONS = [
    { label: 'Planificación de la boda', count: 550 },
    { label: 'Actualidad y ferias de boda', count: 298 },
    { label: 'Tradiciones y supersticiones de boda', count: 122 },
    { label: 'Trámites matrimonio', count: 13 },
];

const ORGANIZADOR_LINKS = [
    { label: 'Agenda de Tareas', icon: Calendar },
    { label: 'Gestor de Invitados', icon: Users },
    { label: 'Organizador de Mesas', icon: Grid },
    { label: 'Presupuestador', icon: Calculator },
    { label: 'Web de Boda', icon: Globe },
];

export default function AntesBoda() {
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
                        <strong>Antes de la boda</strong>
                    </nav>
                    <div className="antes-search">
                        <Search size={16} className="antes-search-icon" />
                        <input type="text" placeholder="Buscar" />
                    </div>
                </header>

                {/* ── MAIN HEADER INFO ── */}
                <section className="antes-title-section">
                    <h1 className="antes-main-title">Antes de la boda</h1>
                    <p className="antes-main-desc">
                        Elegir el lugar de la ceremonia y del banquete, escoger el vestido de novia, preparar los papeles necesarios,
                        elaborar la lista de invitados... Todo lo que necesitas saber para organizar tu boda paso a paso, con los mejores
                        consejos para que todo salga como sueñas.
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

                        {/* FEATURED ARTICLES (Full Width Rows if any) */}
                        {featuredArticles.length > 0 && (
                            <div className="antes-featured-list">
                                {featuredArticles.map(article => (
                                    <article key={article.id} className="antes-card featured-card">
                                        <div className="antes-card-content">
                                            <span className="antes-card-cat">{article.category.toUpperCase()}</span>
                                            <h2 className="antes-card-title">{article.title}</h2>
                                            <p className="antes-card-excerpt">{article.excerpt}</p>

                                            <div className="antes-card-author">
                                                {article.authorImg && <img src={article.authorImg} alt={article.author} className="author-avatar" />}
                                                <span className="author-name">{article.author}</span>
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
                                                {ANTES_SUBSECTIONS.map((sub, i) => (
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
