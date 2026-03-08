import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, Calendar, Users, Grid, Calculator, Globe } from 'lucide-react';
import './AntesBoda.css'; // Reusing the exact same layout CSS

/* ─── Mock Data ────────────────────────────────────────────── */

type Category = 'Todos' | 'Bodas religiosas' | 'Boda civil' | 'Lugares' | 'Protocolo';

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
    { name: 'Todos', count: 107 },
    { name: 'Bodas religiosas', count: 25 },
    { name: 'Boda civil', count: 27 },
    { name: 'Lugares', count: 19 },
    { name: 'Protocolo', count: 36 },
];

const ARTICLES: Article[] = [
    {
        id: 1,
        category: 'Lugares',
        title: 'Los mejores lugares para dar el "Sí, quiero" en Uruguay',
        excerpt: 'Descubre estancias, iglesias históricas y playas increíbles donde celebrar tu ceremonia. Tanto si buscas un evento íntimo como una gran fiesta, estas opciones te sorprenderán.',
        author: 'Laura Hernandez',
        date: '06/03/2026',
        img: 'https://www.mikaalvarez.com/wp-content/uploads/2024/08/20MA-2.jpg',
        featured: true,
    },
    {
        id: 2,
        category: 'Boda civil',
        title: '20 poemas de amor de Antonio Machado',
        excerpt: 'Si necesitáis inspiración para preparar una dedicatoria especial en vuestra boda (o en cualquier otro momento), hemos recopilado 25 de los mejores poemas de amor de Antonio Machado, uno de nuestros escritores más universales.',
        author: 'Inés de la Fuente',
        date: '25/02/2026',
        img: 'https://cdn0.bodas.net/article/5642/3_2/960/jpg/122465-poemas-antonio-machado-amor-boda.jpeg',
    },
    {
        id: 3,
        category: 'Bodas religiosas',
        title: 'Iglesias para casarse en Montevideo: las más bonitas y con encanto',
        excerpt: 'Tanto si sois una pareja montevideana como si estáis organizando una destination wedding en la capital, aquí encontraréis algunas de las iglesias para casarse en Montevideo más bonitas, históricas y especiales.',
        author: 'Piluca Santos',
        date: '23/02/2026',
        img: 'https://www.jewishtours.com.uy/site/mt-content/uploads/2023/12/f99740efe31ac1c23f5109cfdf725b21.jpg',
    },
    {
        id: 4,
        category: 'Protocolo',
        title: '¿Quién acompaña a la novia al altar?',
        excerpt: 'Según manda la tradición, el padre es quien debe llevar a la novia al altar. Pero hay otras opciones igualmente válidas que te detallamos para que sepas quién puede acompañarte el día de la boda.',
        author: 'Anna Llopis',
        date: '20/02/2026',
        img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600',
    },
    {
        id: 5,
        category: 'Boda civil',
        title: '¿Cuánto cuesta casarse por lo civil en Uruguay? [Actualizado: febrero 2026]',
        excerpt: 'Si tienes curiosidad por saber cuánto cuesta casarse por lo civil en Uruguay, incluyendo aranceles del registro civil y libreta de matrimonio, ¡te lo contamos todo! Es hora de descubrirlo!',
        author: 'Inés de la Fuente',
        date: '17/02/2026',
        img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600',
    },
];

const SECCIONES = [
    { label: 'Antes de la boda', count: null },
    { label: 'La ceremonia de boda', count: null, active: true },
    { label: 'El banquete', count: null },
    { label: 'Moda nupcial', count: null },
    { label: 'Luna de miel', count: null },
    { label: 'Después de la boda', count: null },
    { label: 'Hazlo tú mism@', count: null },
    { label: 'Crónicas de boda', count: null },
];

const CEREMONIA_SUBSECTIONS = [
    { label: 'Bodas religiosas', count: 25 },
    { label: 'Boda civil', count: 27 },
    { label: 'Lugares para la celebración de la boda', count: 19 },
    { label: 'Protocolo de la boda', count: 36 },
];

const ORGANIZADOR_LINKS = [
    { label: 'Agenda de Tareas', icon: Calendar },
    { label: 'Gestor de Invitados', icon: Users },
    { label: 'Organizador de Mesas', icon: Grid },
    { label: 'Presupuestador', icon: Calculator },
    { label: 'Web de Boda', icon: Globe },
];

export default function CeremoniaBoda() {
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
                        <strong>La ceremonia de boda</strong>
                    </nav>
                    <div className="antes-search">
                        <Search size={16} className="antes-search-icon" />
                        <input type="text" placeholder="Buscar" />
                    </div>
                </header>

                {/* ── MAIN HEADER INFO ── */}
                <section className="antes-title-section">
                    <h1 className="antes-main-title">La ceremonia de boda</h1>
                    <p className="antes-main-desc">
                        Todo lo que necesitas saber para organizar y preparar tu ceremonia de boda. Tanto si te casas por la iglesia
                        como si has elegido una ceremonia civil, aquí encontrarás inspiración para personalizar el momento más importante
                        de tu boda: decoración, música, textos, lecturas...
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
                                                {CEREMONIA_SUBSECTIONS.map((sub, i) => (
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
