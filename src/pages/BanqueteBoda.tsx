import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, Calendar, Users, Grid, Calculator, Globe } from 'lucide-react';
import './AntesBoda.css'; // Reusing the exact same layout CSS

/* ─── Mock Data ────────────────────────────────────────────── */

type Category = 'Todos' | 'Lugares' | 'Todo sobre el banquete';

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
    { name: 'Todos', count: 230 },
    { name: 'Lugares', count: 49 },
    { name: 'Todo sobre el banquete', count: 181 },
];

const ARTICLES: Article[] = [
    {
        id: 1,
        category: 'Todo sobre el banquete',
        title: '100 preguntas para parejas en el juego del zapato',
        excerpt: 'El juego del zapato es una de las ideas de boda más divertidas. Descubrid cómo funciona y cuáles son las mejores preguntas para jugar en pareja: más generales, más picantes, más graciosas... ¿Quién es más probable que...?',
        author: 'Inés de la Fuente',
        date: '03/03/2026',
        img: 'https://cdn0.bodas.net/article/9252/3_2/960/jpeg/122529-juego-zapato-bodas.jpeg',
        featured: true,
    },
    {
        id: 2,
        category: 'Lugares',
        title: 'Las 15 estancias para bodas con más encanto de todo Uruguay',
        excerpt: 'La magia de una estancia colonial puede ser lo que os falta para que vuestra boda sea inolvidable. Tanto si sois uruguayos como si queréis una celebración en nuestro país, descubrid las más espectaculares y bonitas estancias para bodas en Uruguay.',
        author: 'Piluca Santos',
        date: '24/02/2026',
        img: 'https://www.revistabodas.com.uy/wp-content/uploads/2021/05/casamiento-LUCRE-Y-JUAN_0085.jpg',
        featured: true,
    },
    {
        id: 3,
        category: 'Lugares',
        title: '10 casas rurales y fincas para bodas (con alojamiento) en Colonia',
        excerpt: 'Descubrid nuestra selección de casas rurales, fincas y chacras para bodas con alojamiento en Colonia. Lugares llenos de encanto para celebrar vuestro gran día por todo lo alto y convertirlo en un fin de semana inolvidable.',
        author: 'Teresa Ródenas',
        date: '16/02/2026',
        img: 'https://pic.le-cdn.com/thumbs/520x390/04/1/properties/Property-630d0000000007e0001869503527-132124003.jpg',
    },
    {
        id: 4,
        category: 'Todo sobre el banquete',
        title: '¿Cómo calcular la bebida para la boda?',
        excerpt: 'Acertar con la cantidad de bebida para la boda, sin pasarse ni quedarse cortos, no resulta sencillo. Así que si no están incluidas en el servicio de catering y queréis que vuestros cálculos se ajusten al máximo a la realidad, atentos a estos tips.',
        author: 'Andrea Tovar',
        date: '12/02/2026',
        img: 'https://cardswith.love/img/ybc_blog/post/champagne-glasses-hands-newlyweds.jpg',
    },
    {
        id: 5,
        category: 'Lugares',
        title: '15 fincas para bodas con alojamiento en Rocha',
        excerpt: '¿Os apetece alargar vuestra boda todo el fin de semana? ¿Necesitáis espacio para familiares y amigos? Entonces, no os perdáis esta selección de fincas con alojamiento para bodas en Rocha, ¡os gustarán todas! ¡Vivan las endless wedding!',
        author: 'Carla González',
        date: '10/02/2026',
        img: 'https://cdn0.bodas.net/vendor/67405/3_2/960/jpg/noire-et-blanche-finca-da-rocha-080_1_67405.jpeg',
    },
    {
        id: 6,
        category: 'Lugares',
        title: '15 lugares originales para bodas en Punta del Este',
        excerpt: 'Si estáis buscando lugares para bodas en Punta del Este, no podéis perderos esta selección de sitios llenos de encanto y con detalles únicos y diferentes. Un hotel boutique, un parador frente a la playa, una bodega auténtica... ¡elige tu favorito!',
        author: 'Valeria López',
        date: '05/02/2026',
        img: 'https://www.mikaalvarez.com/wp-content/uploads/2024/08/BA-9.jpg',
    },
];

const SECCIONES = [
    { label: 'Antes de la boda', count: null },
    { label: 'La ceremonia de boda', count: null },
    { label: 'El banquete', count: null, active: true },
    { label: 'Moda nupcial', count: null },
    { label: 'Luna de miel', count: null },
    { label: 'Después de la boda', count: null },
    { label: 'Hazlo tú mism@', count: null },
    { label: 'Crónicas de boda', count: null },
];

const BANQUETE_SUBSECTIONS = [
    { label: 'Lugares para el banquete', count: 49 },
    { label: 'Todo lo que hay que saber sobre el banquete de boda', count: 181 },
];

const ORGANIZADOR_LINKS = [
    { label: 'Agenda de Tareas', icon: Calendar },
    { label: 'Gestor de Invitados', icon: Users },
    { label: 'Organizador de Mesas', icon: Grid },
    { label: 'Presupuestador', icon: Calculator },
    { label: 'Web de Boda', icon: Globe },
];

export default function BanqueteBoda() {
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
                        <strong>El banquete</strong>
                    </nav>
                    <div className="antes-search">
                        <Search size={16} className="antes-search-icon" />
                        <input type="text" placeholder="Buscar" />
                    </div>
                </header>

                {/* ── MAIN HEADER INFO ── */}
                <section className="antes-title-section">
                    <h1 className="antes-main-title">El banquete</h1>
                    <p className="antes-main-desc">
                        El banquete es el punto central de la fiesta de boda, donde celebraréis con la familia y los amigos
                        el día más importante de vuestras vidas. Descubre cómo acertar con el mejor lugar para la boda,
                        cómo decorarlo y, por supuesto, cómo elegir el menú.
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
                                                {BANQUETE_SUBSECTIONS.map((sub, i) => (
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
