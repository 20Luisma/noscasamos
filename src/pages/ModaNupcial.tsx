import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, Calendar, Users, Grid, Calculator, Globe } from 'lucide-react';
import './AntesBoda.css'; // Reusing the exact same layout CSS

/* ─── Mock Data ────────────────────────────────────────────── */

type Category = 'Todos' | 'La novia' | 'El novio' | 'Los invitados';

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
    { name: 'Todos', count: 1225 },
    { name: 'La novia', count: 867 },
    { name: 'El novio', count: 86 },
    { name: 'Los invitados', count: 272 },
];

const ARTICLES: Article[] = [
    {
        id: 1,
        category: 'La novia',
        title: 'Estos son los zapatos de novia que pondrán de acuerdo a Millennials y Gen Z',
        excerpt: 'La diseñadora de moda nupcial Danielle Frankel y la icónica marca de sandalias, Birkenstock se han unido para ofrecer una colección de zapatos de novia que cumple con nuestra regla fashion favorita: CEE, comodidad, estilo y exclusividad. ¡Descúbrela!',
        author: 'Laura Hernandez',
        date: '30/01/2026',
        img: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=800', // Example placeholder women shoes / fashion
        featured: true,
    },
    {
        id: 2,
        category: 'La novia',
        title: '12 famosas que lucieron vestidos de novia de Valentino en sus bodas',
        excerpt: 'Sus diseños (y él) no necesitan presentación, pues se conocen en todo el mundo. Valentino, uno de los diseñadores italianos más reconocidos del mundo, ha muerto a los 93 años. Repasamos 12 de los vestidos más icónicos del \'emperador de la moda\'.',
        author: 'Sonia Murillo',
        date: '20/01/2026',
        img: 'https://cdn0.bodas.net/article/9114/original/1280/jpeg/74119-beatrice-borreomo.jpeg',
        featured: true,
    },
    {
        id: 3,
        category: 'El novio',
        title: 'Tendencias en trajes de novio 2026: ¡descubre lo último en moda masculina!',
        excerpt: '¿Te casas y quieres lucir impecable en tu gran día? Descubre las últimas tendencias en trajes de novio 2026: colores, cortes, tejidos y todos los detalles que marcan la diferencia. ¡Encuentra tu estilo perfecto!',
        author: 'Carla González',
        date: '15/01/2026',
        img: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=600', // Example placeholder groom suit
    },
    {
        id: 4,
        category: 'Los invitados',
        title: 'Inspiración para invitadas: looks perfectos para bodas de día y de noche',
        excerpt: 'Si tienes una boda a la vista y aún no sabes qué ponerte, estás en el lugar indicado. Hemos seleccionado los mejores looks para invitadas, tanto si la celebración es de día como de noche. ¡Triunfarás seguro!',
        author: 'Andrea Tovar',
        date: '10/01/2026',
        img: 'https://s3.ppllstatics.com/diariovasco/www/multimedia/202107/16/media/cortadas/chiara-ok-kti-U1401051917701D6D-1248x770@Diario%20Vasco.jpg',
    },
];

const SECCIONES = [
    { label: 'Antes de la boda', count: null },
    { label: 'La ceremonia de boda', count: null },
    { label: 'El banquete', count: null },
    { label: 'Moda nupcial', count: null, active: true },
    { label: 'Luna de miel', count: null },
    { label: 'Después de la boda', count: null },
    { label: 'Hazlo tú mism@', count: null },
    { label: 'Crónicas de boda', count: null },
];

const MODA_NUPCIAL_SUBSECTIONS = [
    { label: 'La novia', count: 867 },
    { label: 'El novio', count: 86 },
    { label: 'Los invitados', count: 272 },
];

const ORGANIZADOR_LINKS = [
    { label: 'Agenda de Tareas', icon: Calendar },
    { label: 'Gestor de Invitados', icon: Users },
    { label: 'Organizador de Mesas', icon: Grid },
    { label: 'Presupuestador', icon: Calculator },
    { label: 'Web de Boda', icon: Globe },
];

export default function ModaNupcial() {
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
                        <strong>Moda nupcial</strong>
                    </nav>
                    <div className="antes-search">
                        <Search size={16} className="antes-search-icon" />
                        <input type="text" placeholder="Buscar" />
                    </div>
                </header>

                {/* ── MAIN HEADER INFO ── */}
                <section className="antes-title-section">
                    <h1 className="antes-main-title">Moda nupcial</h1>
                    <p className="antes-main-desc">
                        Descubre las nuevas colecciones de vestidos de novia, las últimas tendencias en trajes de novio y
                        el look perfecto para tus damas de honor. Con nuestras ideas y consejos, estarás radiante el día
                        de tu boda: zapatos, lencería, complementos...
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
                                                {MODA_NUPCIAL_SUBSECTIONS.map((sub, i) => (
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
