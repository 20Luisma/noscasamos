import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, Calendar, Users, Grid, Calculator, Globe } from 'lucide-react';
import './AntesBoda.css'; // Reusing the exact same layout CSS

/* ─── Mock Data ────────────────────────────────────────────── */

type Category = 'Todos' | 'Consejos para la vida en pareja';

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
    { name: 'Todos', count: 149 },
    { name: 'Consejos para la vida en pareja', count: 149 },
];

const ARTICLES: Article[] = [
    {
        id: 1,
        category: 'Consejos para la vida en pareja',
        title: 'Las mejores frases de amor a distancia para dedicar',
        excerpt: 'Si tu pareja y tú vivís en ciudades o países distintos, seguro que estas frases os llegan al corazón. Las frases de amor a distancia os acercarán aún más.',
        author: 'Teresa Ródenas Velasco',
        date: '27/02/2026',
        img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800', // Example placeholder sofa / couple
        featured: true,
    },
    {
        id: 2,
        category: 'Consejos para la vida en pareja',
        title: '10 cosas que los hombres quieren de su relación',
        excerpt: 'Comprender a tu media naranja es clave para que todo funcione. Y para ello nada mejor que conocer los aspectos a los que ellos dan más importancia cuando tienen pareja. ¿Deseando descubrir las cosas que los hombres quieren de su relación? ¡Toma nota!',
        author: 'Lola Márquez',
        date: '30/01/2026',
        img: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=600', // Example placeholder men in suit
    },
    {
        id: 3,
        category: 'Consejos para la vida en pareja',
        title: '110 frases de cumpleaños para mi marido (o novio)',
        excerpt: 'Encuentra la inspiración que necesitas para felicitar al hombre de tu vida. Estas frases de cumpleaños para marido o novio son divertidas, románticas, directas y bonitas... Venga, anímate y sorpréndele con una dedicatoria top.',
        author: 'Lola Márquez',
        date: '28/01/2026',
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600', // Example placeholder portrait
    },
    {
        id: 4,
        category: 'Consejos para la vida en pareja',
        title: 'Las 100 mejores frases para desear un buen día a tu pareja',
        excerpt: '¡Empieza el día con energía! Mándale a tu amor alguna de estas frases para darle los buenos días de una manera original y romántica. ¡Le sacarás una sonrisa nada más despertar!',
        author: 'Redacción',
        date: '15/01/2026',
        img: 'https://cdn0.bodas.net/article/5171/3_2/960/png/121715-es-1200800-editorial-cover-templates-3.jpeg',
    },
];

const SECCIONES = [
    { label: 'Antes de la boda', count: null },
    { label: 'La ceremonia de boda', count: null },
    { label: 'El banquete', count: null },
    { label: 'Moda nupcial', count: null },
    { label: 'Luna de miel', count: null },
    { label: 'Después de la boda', count: null, active: true },
    { label: 'Hazlo tú mism@', count: null },
    { label: 'Crónicas de boda', count: null },
];

const DESPUES_BODA_SUBSECTIONS = [
    { label: 'Consejos para la vida en pareja', count: 149 },
];

const ORGANIZADOR_LINKS = [
    { label: 'Agenda de Tareas', icon: Calendar },
    { label: 'Gestor de Invitados', icon: Users },
    { label: 'Organizador de Mesas', icon: Grid },
    { label: 'Presupuestador', icon: Calculator },
    { label: 'Web de Boda', icon: Globe },
];

export default function DespuesBoda() {
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
                        <strong>Después de la boda</strong>
                    </nav>
                    <div className="antes-search">
                        <Search size={16} className="antes-search-icon" />
                        <input type="text" placeholder="Buscar" />
                    </div>
                </header>

                {/* ── MAIN HEADER INFO ── */}
                <section className="antes-title-section">
                    <h1 className="antes-main-title">Después de la boda</h1>
                    <p className="antes-main-desc">
                        ¡Felicidades! Ya estáis casados. Empezáis una nueva etapa juntos, vuestros primeros pasos como
                        marido y mujer y nos encantaría ayudaros a recorrer ese camino con buenos consejos para
                        vuestra recién estrenada vida en pareja.
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
                                                {DESPUES_BODA_SUBSECTIONS.map((sub, i) => (
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
