import { Link } from 'react-router-dom';
import { Mail, Users, Settings, ClipboardList, Table2, Calculator } from 'lucide-react';
import './WebBoda.css';

/* ─── Shared Components ─────────────────────────────────────── */

function PhoneMockup({ children }: { children: React.ReactNode }) {
    return (
        <div className="wb-mockup-phone">
            <div className="wb-mockup-notch"></div>
            <div className="wb-mockup-screen">
                <div className="wb-mockup-header">
                    <span>09:41</span>
                    <div className="wb-mockup-status">
                        <span className="wb-mockup-icon-signal"></span>
                        <span className="wb-mockup-icon-wifi"></span>
                        <span className="wb-mockup-icon-battery"></span>
                    </div>
                </div>
                <div className="wb-mockup-app-bar">
                    <div className="wb-mockup-menu-icon" />
                    <span className="wb-mockup-logo">🤍</span>
                    <div className="wb-mockup-avatar">♡</div>
                </div>
                <div className="wb-mockup-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

function AlternateSection({ title, desc, action, mockup, reverse = false, bgClass = '' }: { title: string, desc: string, action: string, mockup: React.ReactNode, reverse?: boolean, bgClass?: string }) {
    return (
        <section className={`wb-alt-sec ${bgClass}`}>
            <div className={`container wb-alt-inner ${reverse ? 'reverse' : ''}`}>
                <div className="wb-alt-text">
                    <h2>{title}</h2>
                    <p>{desc}</p>
                    {action && <a href="#" className="wb-alt-action">{action}</a>}
                </div>
                <div className="wb-alt-mockup-wrapper">
                    {mockup}
                </div>
            </div>
        </section>
    );
}

function ToolCard({ title, desc, action, actionTo, icon: Icon, colorClass }: { title: string, desc: string, action: string, actionTo: string, icon: React.ElementType, colorClass: string }) {
    return (
        <div className="toolbox-card">
            <div className={`toolbox-icon-wrap ${colorClass}`}>
                <Icon size={32} />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <Link to={actionTo} className="toolbox-action">{action}</Link>
        </div>
    );
}

/* ─── Mockup Screens ────────────────────────────────────────── */

const Mockup1 = () => (
    <>
        <div className="m-wb-hero" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url("https://images.ecestaticos.com/598FDIi8qURqlxipt3PZic3ipcw=/0x0:1600x901/1440x810/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fbe8%2F410%2F16c%2Fbe841016cd2bfb159ead1eae08e9d424.jpg")' }}>
            <h2>ELENA Y JUAN</h2>
            <p>30 DE SEPTIEMBRE DE 2025</p>
        </div>
        <div className="m-wb-body">
            <h3>¡Nos casamos!</h3>
            <p>Y queremos celebrarlo con todos ustedes. Acompáñennos en este día tan especial.</p>
            <button className="m-wb-btn">Ver Invitación</button>
        </div>
    </>
);

const Mockup2 = () => (
    <>
        <div className="m-wb-header-bar">
            <span>‹ Atrás</span>
            <strong>Configuración</strong>
        </div>
        <div className="m-wb-settings">
            <div className="m-wb-field">
                <label>Nombre</label>
                <div className="m-wb-input">Elena y Juan</div>
            </div>
            <div className="m-wb-field">
                <label>Título</label>
                <div className="m-wb-input">¡Nos casamos!</div>
            </div>
            <div className="m-wb-field">
                <label>Fecha de la boda</label>
                <div className="m-wb-input">30 Septiembre 2025</div>
            </div>
            <button className="m-wb-btn primary">Guardar</button>
        </div>
    </>
);

/* ─── Main Component ─────────────────────────────────────── */

export default function WebBoda() {
    return (
        <div className="webboda-landing">

            {/* ── HERO ── */}
            <section className="wb-landing-hero">
                <div className="wb-hero-content container">
                    <div className="wb-hero-left">
                        <nav className="wb-breadcrumb">
                            <Link to="/">Bodas</Link><span>/</span>
                            <span>Organización de la boda</span><span>/</span>
                            <strong>Tu propia web de boda gratuita</strong>
                        </nav>
                        <h1 className="wb-landing-title">Web de Boda</h1>
                        <p className="wb-landing-sub">Crea gratis una web personalizada para tu boda en pocos pasos y comparte con tus invitados todos los detalles del gran día.</p>

                        <div className="wb-register-box">
                            <span className="wb-register-label">REGISTRARME</span>
                            <div className="wb-register-inputs">
                                <div className="wb-input-wrap">
                                    <input type="text" placeholder="Nombre y apellidos" />
                                    <span className="wb-input-icon">👤</span>
                                </div>
                                <div className="wb-input-wrap">
                                    <input type="email" placeholder="Email" />
                                    <Mail className="wb-input-icon" />
                                </div>
                            </div>
                            <button className="btn-primary wb-btn-register">Empieza a organizar</button>

                            <div className="wb-register-footer mt-4">
                                <div className="wb-social-reg">
                                    <span>También te puedes registrar con:</span>
                                    <div className="wb-social-icons">
                                        <button className="wb-social-btn">G</button>
                                        <button className="wb-social-btn">f</button>
                                        <button className="wb-social-btn">A</button>
                                    </div>
                                </div>
                                <div className="wb-login-link">
                                    ¿Ya tienes cuenta? <strong><Link to="/">Accede</Link></strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wb-hero-right">
                        {/* Decorative templates image mimicking bodas.net */}
                        <div className="wb-hero-graphic">
                            <div className="wb-mock-laptop">
                                <div className="wb-mock-browser">
                                    <div className="wb-mock-dots"><span></span><span></span><span></span></div>
                                    <div className="wb-mock-url">noscasamos.uy</div>
                                </div>
                                <div className="wb-mock-screen" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")' }}>
                                    <div className="wb-mock-title-overlay">
                                        <h1>ELENA Y JUAN</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="wb-mock-mobile">
                                <div className="wb-mock-m-notch"></div>
                                <div className="wb-mock-m-screen" style={{ backgroundImage: 'url("https://images.squarespace-cdn.com/content/v1/669e561cbff1b449d2979259/75e6589e-3b1c-4934-9753-d08251bd92c0/Ciudad+105.jpg")' }}>
                                    <div className="wb-mock-title-overlay m-vertical">
                                        <h2>Nos casamos</h2>
                                        <p>30 Septiembre 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="wb-features-sec">
                <div className="container wb-features-inner">
                    <h2>Consigue una web a la última, fácil de usar y personalizable</h2>
                    <p className="wb-features-desc">Elige tu diseño favorito, añade los detalles de la boda y comparte con tus invitados.</p>
                    <div className="wb-features-grid">
                        <div className="wb-feature-item">
                            <div className="wb-feature-icon glass">🍸</div>
                            <h3>Comparte los detalles</h3>
                            <p>Informa a los invitados sobre el programa, localizaciones y novedades de la boda.</p>
                        </div>
                        <div className="wb-feature-item">
                            <div className="wb-feature-icon email">💌</div>
                            <h3>Pide confirmación de asistencia</h3>
                            <p>Las respuestas de tus invitados se sincronizan con la Lista de Invitados.</p>
                        </div>
                        <div className="wb-feature-item">
                            <div className="wb-feature-icon camera">📷</div>
                            <h3>El álbum de tu boda</h3>
                            <p>Crea tu álbum en Wedshoots para que los invitados suban las fotos que hagan durante la boda.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TEMPLATES ── */}
            <section className="wb-templates-preview bg-light">
                <div className="container text-center">
                    <h2>Crea y personaliza tu web de boda en minutos</h2>
                    <p className="wb-templates-sub">Elige entre decenas de diseños el que más te guste, personaliza las secciones y comparte la web con tus invitados.</p>

                    <div className="wb-template-cards">
                        <div className="wb-t-card">
                            <div className="wb-t-img" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80")' }}>
                                <div className="wb-t-overlay">
                                    <h4>ELENA Y JUAN</h4>
                                </div>
                            </div>
                        </div>
                        <div className="wb-t-card primary">
                            <div className="wb-t-img" style={{ backgroundImage: 'url("https://cdn0.bodas.net/vendor/02970/3_2/960/jpg/marinacarlos-exportbodas-net_1_202970-166636377126452.jpeg")' }}>
                                <div className="wb-t-overlay dark">
                                    <h4></h4>
                                </div>
                            </div>
                        </div>
                        <div className="wb-t-card">
                            <div className="wb-t-img" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80")' }}>
                                <div className="wb-t-overlay">
                                    <h4>ELENA Y JUAN</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="wb-more-btn-elegant">Ver más diseños <span>→</span></button>
                </div>
            </section>

            {/* ── ALTERNATE SECTIONS ── */}
            <AlternateSection
                title="Fácil de compartir"
                desc="Mantén a tus invitados informados de todas las novedades e interactúa con ellos a través de tu web. Comparte las localizaciones, pídeles fácilmente que confirmen asistencia o crea encuestas para saber su opinión sobre ciertos aspectos. Todo en un solo lugar. Rápido y muy fácil de usar."
                action="COMPARTE TU WEB DE BODA"
                mockup={<PhoneMockup><Mockup1 /></PhoneMockup>}
            />

            <AlternateSection
                title="Personalizable"
                desc="Personaliza tu web de boda con un diseño único que se adapte al estilo de tu gran día. Cambia colores y tipografía, sube tus fotos de la sección sobre nosotros y añade tantas secciones como quieras hasta que consigas el resultado que buscas."
                action="PERSONALIZA TU DISEÑO"
                reverse={true}
                bgClass="bg-light"
                mockup={<PhoneMockup><Mockup2 /></PhoneMockup>}
            />

            {/* ── TOOLBOX ── */}
            <section className="agenda-toolbox-sec">
                <div className="container text-center">
                    <h2>La organización de tu boda, fácil y sencilla</h2>
                    <p className="agenda-toolbox-sub">Disfruta con la organización, aquí empieza la boda de tus sueños.</p>

                    <div className="toolbox-grid">
                        <ToolCard
                            title="Agenda de Tareas"
                            desc="La lista de tareas más completa para que no se te olvide nada."
                            action="CONSIGUE TU LISTA DE TAREAS"
                            actionTo="/agenda"
                            icon={ClipboardList}
                            colorClass="blue"
                        />
                        <ToolCard
                            title="Mis Proveedores"
                            desc="Guarda los proveedores que te gusten, añade notas internas y envía mensajes."
                            action="GESTIONA TUS PROVEEDORES"
                            actionTo="/directorio"
                            icon={Settings}
                            colorClass="pink"
                        />
                        <ToolCard
                            title="Presupuesto"
                            desc="¡Haz números! Te ayudaremos a que ajustes tu presupuesto y no te gastes ni un euro de más."
                            action="REVISA TU PRESUPUESTO"
                            actionTo="/presupuesto"
                            icon={Calculator}
                            colorClass="blue-dark"
                        />
                        <ToolCard
                            title="Organizador de Mesas"
                            desc="Sienta a tus invitados en las mesas, imprime el plano definitivo y envíalo al lugar del banquete."
                            action="ORGANIZA LAS MESAS"
                            actionTo="/mesas"
                            icon={Table2}
                            colorClass="orange"
                        />
                        <ToolCard
                            title="Gestor de Invitados"
                            desc="Crea fácilmente la lista de invitados y solicita confirmación de asistencia."
                            action="AÑADE NUEVO INVITADO"
                            actionTo="/invitados"
                            icon={Users}
                            colorClass="cyan"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}
