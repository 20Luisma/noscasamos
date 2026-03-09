import { Link } from 'react-router-dom';
import { Settings, Calculator, Table2, ClipboardList, CalendarHeart } from 'lucide-react';
import './Mesas.css';

/* ─── Components ────────────────────────────────────────────── */

function MesasHero() {
    return (
        <section className="mesas-landing-hero">
            <div className="mesas-hero-content container">
                <div className="mesas-hero-left">
                    <nav className="mesas-breadcrumb">
                        <Link to="/">Bodas</Link><span>/</span>
                        <span>Organización de la boda</span><span>/</span>
                        <strong>Organizador de Mesas</strong>
                    </nav>
                    <h1 className="mesas-landing-title">Organizador de Mesas</h1>
                    <p className="mesas-landing-sub">
                        Sentar a tus invitados en las mesas será un juego de niños. Rápido, sencillo y divertido.
                    </p>

                    <div className="mesas-register-box">
                        <span className="mesas-register-label">REGISTRARME</span>
                        <div className="mesas-register-inputs">
                            <div className="mesas-input-wrap user">
                                <input type="text" placeholder="Nombre y apellidos" />
                                <span className="mesas-input-icon">👤</span>
                            </div>
                            <div className="mesas-input-wrap email">
                                <input type="email" placeholder="Email" />
                                <span className="mesas-input-icon">✉️</span>
                            </div>
                            <button className="btn-primary mesas-btn-register">Empieza a organizar</button>
                        </div>
                        <div className="mesas-register-footer">
                            <div className="mesas-social-reg">
                                <span>También te puedes registrar con:</span>
                                <div className="mesas-social-icons">
                                    <button className="mesas-social-btn google">
                                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                    </button>
                                    <button className="mesas-social-btn facebook" style={{ color: '#1877F2', fontWeight: 900 }}>f</button>
                                    <button className="mesas-social-btn apple" style={{ fontSize: '1.2rem' }}></button>
                                </div>
                            </div>
                            <div className="mesas-login-link">
                                ¿Ya tienes cuenta? <strong style={{ color: '#E45063' }}>Accede</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mesas-hero-right">
                    <div className="mesas-hero-graphic-wrapper">
                        <div className="mesas-hero-graphic-image">
                            {/* Graphic showing tables background image */}
                            <img src="https://cdn0.bodas.net/vendor/53033/3_2/1280/jpg/attraversiamo-268_1_153033-165357232339812.jpeg" alt="Sillas para el banquete" />
                        </div>
                        <div className="mesas-hero-graphic-card">
                            <div className="mesas-mockup-card">
                                <div className="mesas-mc-tabs">
                                    <span className="mesas-mc-tab active">Invitados</span>
                                    <span className="mesas-mc-tab">Mesa</span>
                                </div>
                                <div className="mesas-mc-field">
                                    <label>Nombre de la mesa</label>
                                    <input type="text" value="Mesa 12" disabled />
                                </div>
                                <div className="mesas-mc-field">
                                    <label>Número de sillas</label>
                                    <div className="mesas-mc-stepper">
                                        <span>14</span>
                                        <div className="mesas-mc-stepper-btns">
                                            <button disabled>-</button>
                                            <button disabled>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mesas-mc-shapes">
                                    <label>Tipo de mesa</label>
                                    <div className="mesas-mc-shape-options">
                                        <div className="mesas-mc-shape active"><div className="round-dots"></div></div>
                                        <div className="mesas-mc-shape"><div className="square"></div></div>
                                        <div className="mesas-mc-shape"><div className="rect-dots"></div></div>
                                        <div className="mesas-mc-shape"><div className="u-shape"></div></div>
                                        <div className="mesas-mc-shape"><div className="l-shape"></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MesasFeatures() {
    return (
        <section className="mesas-features-sec">
            <div className="container mesas-features-inner text-center">
                <h2>Ubicar a cada invitado de la lista en su mesa será como un juego</h2>
                <p className="mesas-features-desc">
                    Crea tantas mesas como quieras, personalízalas y mueve a los invitados haciendo todas las combinaciones que necesites.
                </p>

                <div className="mesas-features-grid">
                    <div className="mesas-feature-item">
                        <div className="mesas-feat-icon-wrap">
                            {/* Custom SVG approximating the "Añade invitados / Table 12" handwritten style */}
                            <svg width="60" height="70" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                                <rect x="25" y="20" width="50" height="60" rx="8" fill="none" stroke="#E45063" strokeWidth="4" />
                                <text x="50" y="45" fontFamily="monospace" fontSize="14" fill="#333" textAnchor="middle">TABLE</text>
                                <text x="50" y="70" fontFamily="sans-serif" fontSize="24" fontWeight="bold" fill="#333" textAnchor="middle">12</text>
                                <circle cx="50" cy="95" r="8" fill="#FDE047" stroke="#333" strokeWidth="3" />
                                <line x1="50" y1="103" x2="50" y2="115" stroke="#333" strokeWidth="3" />
                                <line x1="40" y1="115" x2="60" y2="115" stroke="#333" strokeWidth="3" />
                            </svg>
                        </div>
                        <h3>Añade invitados</h3>
                        <p>Añade invitados, muévelos por las mesas y crea las combinaciones que necesites hasta que encuentres el lugar adecuado para cada uno.</p>
                    </div>
                    <div className="mesas-feature-item">
                        <div className="mesas-feat-icon-wrap">
                            {/* Custom SVG approximating the "Chair" icon */}
                            <svg width="60" height="70" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                                <rect x="30" y="20" width="40" height="45" fill="none" stroke="#6B4D3C" strokeWidth="4" />
                                <line x1="30" y1="35" x2="70" y2="35" stroke="#6B4D3C" strokeWidth="4" />
                                <line x1="30" y1="50" x2="70" y2="50" stroke="#6B4D3C" strokeWidth="4" />
                                <rect x="25" y="65" width="50" height="10" fill="#6B4D3C" />
                                <line x1="30" y1="75" x2="30" y2="110" stroke="#6B4D3C" strokeWidth="5" strokeLinecap="round" />
                                <line x1="70" y1="75" x2="70" y2="110" stroke="#6B4D3C" strokeWidth="5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3>Imprime y comparte el resultado</h3>
                        <p>Podrás enviar y compartir el resultado con el espacio del banquete o el wedding planner para que preparen el salón con tus indicaciones.</p>
                    </div>
                    <div className="mesas-feature-item">
                        <div className="mesas-feat-icon-wrap">
                            {/* Custom SVG approximating the "Clipboard / List" icon */}
                            <svg width="60" height="70" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                                <rect x="20" y="30" width="60" height="80" rx="4" fill="none" stroke="#4A5568" strokeWidth="4" />
                                <rect x="40" y="20" width="20" height="15" rx="2" fill="none" stroke="#4A5568" strokeWidth="4" />
                                <circle cx="50" cy="27" r="2" fill="#4A5568" />
                                <line x1="35" y1="50" x2="65" y2="50" stroke="#E45063" strokeWidth="3" strokeDasharray="4 4" />
                                <line x1="35" y1="65" x2="80" y2="65" stroke="#A0AEC0" strokeWidth="3" />
                                <line x1="35" y1="80" x2="60" y2="80" stroke="#A0AEC0" strokeWidth="3" />
                                <line x1="35" y1="95" x2="70" y2="95" stroke="#A0AEC0" strokeWidth="3" />
                            </svg>
                        </div>
                        <h3>Visualiza tu plano o listado</h3>
                        <p>Cuentas con dos opciones de visualización e impresión del organizador de mesas: plano de mesas y listado de invitados por mesa.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PhoneMockup({ topContent, children }: { topContent?: React.ReactNode, children: React.ReactNode }) {
    return (
        <div className="mockup-phone">
            <div className="mockup-notch"></div>
            <div className="mockup-screen">
                <div className="mockup-header">
                    <span className="mockup-time">9:41</span>
                    <div className="mockup-status">
                        <span className="mockup-icon-signal"></span>
                        <span className="mockup-icon-wifi"></span>
                        <span className="mockup-icon-battery"></span>
                    </div>
                </div>
                <div className="mockup-app-bar">
                    <div className="mockup-menu-icon" />
                    <div className="mockup-logo">🤍 noscasamos</div>
                    <div className="mockup-avatar">C</div>
                </div>
                {topContent}
                <div className="mockup-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

/* ─── Mockup Contents ────────────────────────────────────── */

const Mockup1 = () => (
    <>
        <div className="m-page-header">
            <span className="m-back">‹ MI BODA</span>
            <h4>Gestor de Invitados</h4>
            <div className="m-tabs" style={{ marginTop: '12px' }}>
                <span className="active">Mesas</span>
                <span>Grupos</span>
                <span>Menús</span>
                <span>Estadísticas</span>
            </div>
        </div>
        <div className="m-task-detail" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <div className="m-add-btn-small" style={{ background: '#E45063' }}>+ Invitado</div>
                <div className="m-btn-outline" style={{ color: '#E45063', borderColor: '#E45063' }}>+ Mesa</div>
                <span className="m-icon-btn-small" style={{ marginLeft: 'auto', border: '1px solid #ddd', padding: '4px 8px', borderRadius: '4px' }}>Todos ⌄</span>
            </div>

            <div style={{ position: 'relative', marginBottom: '16px' }}>
                <span style={{ position: 'absolute', top: '8px', left: '10px', fontSize: '12px' }}>🔍</span>
                <input type="text" placeholder="Buscar invitados" style={{ width: '100%', padding: '8px 8px 8px 30px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box' }} disabled />
            </div>

            <div style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa', borderBottom: '1px solid #eee' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Table2 size={16} color="#666" />
                        <div>
                            <strong style={{ fontSize: '13px', display: 'block' }}>Presidencial</strong>
                            <small style={{ color: '#888', fontSize: '10px' }}>4 asientos libres</small>
                        </div>
                    </div>
                    <span style={{ color: '#666' }}>⌃</span>
                </div>
                <div style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #eee' }}>
                    <span style={{ color: '#ddd' }}>✓</span>
                    <span style={{ fontSize: '12px', color: '#333' }}>Cristina García</span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50', marginLeft: 'auto' }}></span>
                </div>
                <div style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#ddd' }}>✓</span>
                    <span style={{ fontSize: '12px', color: '#333' }}>Miguel González</span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50', marginLeft: 'auto' }}></span>
                </div>
            </div>
        </div>
    </>
);

const Mockup2 = () => (
    <>
        <div className="m-page-header">
            <span className="m-back">‹ MI BODA</span>
            <h4>Gestor de Invitados</h4>
            <div className="m-tabs" style={{ marginTop: '12px' }}>
                <span className="active">Mesas</span>
                <span>Grupos</span>
                <span>Menús</span>
                <span>Estadísticas</span>
            </div>
        </div>
        <div className="m-task-detail" style={{ padding: '16px', background: '#e0e0e0', height: '100%' }}>
            {/* Simulating the "Añadir Mesa" bottom sheet modal overlay */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', padding: '16px', boxShadow: '0 -4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                    <span style={{ color: '#aaa', fontSize: '14px' }}>✕</span>
                </div>

                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Tipo de mesa</label>
                <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '16px', overflow: 'hidden' }}>
                    <div style={{ flex: 1, padding: '12px', textAlign: 'center', background: '#f9f9f9', borderRight: '1px solid #ddd' }}>🔆</div>
                    <div style={{ flex: 1, padding: '12px', textAlign: 'center', borderRight: '1px solid #ddd' }}>▭</div>
                    <div style={{ flex: 1, padding: '12px', textAlign: 'center' }}>◖</div>
                </div>

                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Nombre de la mesa</label>
                <input type="text" placeholder="Nombre de la mesa" style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '8px', fontSize: '12px', boxSizing: 'border-box', marginBottom: '16px' }} disabled />

                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Asientos</label>
                <input type="text" placeholder="8" style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '8px', fontSize: '12px', boxSizing: 'border-box' }} disabled />
            </div>
        </div>
    </>
);

const Mockup3 = () => (
    <>
        <div className="m-page-header">
            <span className="m-back">‹ MI BODA</span>
            <h4>Gestor de Invitados</h4>
            <div className="m-tabs" style={{ marginTop: '12px' }}>
                <span>Mesas</span>
                <span className="active">Grupos</span>
                <span>Menús</span>
                <span>Estadísticas</span>
            </div>
        </div>
        <div className="m-task-detail" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <div className="m-add-btn-small" style={{ background: '#E45063', opacity: 0.5 }}>+ Invitado</div>
                <div className="m-btn-outline" style={{ color: '#E45063', borderColor: '#E45063', background: '#fdf0f1' }}>+ Grupo</div>
                <span className="m-icon-btn-small" style={{ marginLeft: 'auto', border: '1px solid #ddd', padding: '4px 8px', borderRadius: '4px' }}>Todos ⌄</span>
            </div>

            <div style={{ position: 'relative', marginBottom: '16px' }}>
                <span style={{ position: 'absolute', top: '8px', left: '10px', fontSize: '12px' }}>🔍</span>
                <input type="text" placeholder="Buscar invitados" style={{ width: '100%', padding: '8px 8px 8px 30px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box', background: '#f5f5f5' }} disabled />
            </div>

            <div style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', padding: '12px', background: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '32px', height: '32px', background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👥</div>
                        <div>
                            <strong style={{ fontSize: '13px', display: 'block' }}>Novios</strong>
                            <small style={{ color: '#888', fontSize: '10px' }}>2 invitados</small>
                        </div>
                    </div>
                    <span style={{ color: '#666' }}>⌃</span>
                </div>

                {/* Simulated popup dialog for group */}
                <div style={{ position: 'relative', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '16px', marginTop: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <div style={{ position: 'absolute', top: '8px', right: '8px', color: '#aaa', fontSize: '12px' }}>✕</div>
                    <strong style={{ fontSize: '11px', display: 'block', marginBottom: '8px' }}>Nombre grupo</strong>
                    <input type="text" value="Familia Cristina" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box' }} disabled />
                </div>
            </div>
        </div>
    </>
);


/* ─── Layout blocks ──────────────────────────────────────── */

function AlternateSection({ title, desc, action, mockup, reverse = false, bgClass = '' }: { title: string, desc: string, action?: string, mockup: React.ReactNode, reverse?: boolean, bgClass?: string }) {
    return (
        <section className={`agenda-alt-sec ${bgClass}`}>
            <div className={`container agenda-alt-inner ${reverse ? 'reverse' : ''}`}>
                <div className="agenda-alt-text">
                    <h2>{title}</h2>
                    <p>{desc}</p>
                    {action && <a href="#" className="agenda-alt-action">{action}</a>}
                </div>
                <div className="agenda-alt-mockup-wrapper" style={{ background: '#fcebe9' }}>
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

/* ─── Main Component ─────────────────────────────────────── */

export default function Mesas() {
    return (
        <div className="mesas-landing">
            <MesasHero />

            <div className="agenda-progress-intro container text-center" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
                <h2>Encuentra el lugar adecuado para cada invitado en el banquete</h2>
                <p>Padres, hermanos, primos, parientes lejanos, compañeros de trabajo, amigos... Saber dónde vas a sentar a cada uno de ellos será muy fácil con el Organizador de Mesas.</p>
            </div>

            <AlternateSection
                title="Crea tu plano de mesas"
                desc="Añade mesas redondas, cuadradas o de tipo presidencial con el número de asientos que necesitas y muévelas por el plano hasta que encuentres la distribución ideal para tu salón."
                action="CREA TU PLANO DE MESAS"
                mockup={<PhoneMockup><Mockup1 /></PhoneMockup>}
                reverse={true}
            />

            <AlternateSection
                title="Sienta a los invitados"
                desc="Tu Lista de invitados está sincronizada con el plano de mesas. Solo tendrás que arrastrar y mover a los invitados por el plano hasta llevarlos a la mesa correcta."
                action="AÑADE TU LISTA DE INVITADOS"
                mockup={<PhoneMockup><Mockup2 /></PhoneMockup>}
            />

            <AlternateSection
                title="Comparte tu plano de mesas"
                desc="Imprime, envía o exporta en formato plano o lista y comparte el resultado de tus mesas con el lugar del banquete o el wedding planner."
                action="ORGANIZA LAS MESAS DEL BANQUETE"
                reverse={true}
                mockup={<PhoneMockup><Mockup3 /></PhoneMockup>}
            />

            <MesasFeatures />

            <section className="agenda-toolbox-sec">
                <div className="container text-center">
                    <h2>La organización de tu boda, fácil y sencilla</h2>
                    <p className="agenda-toolbox-sub">Disfruta con la organización, aquí empieza la boda de tus sueños.</p>

                    <div className="toolbox-grid">
                        <ToolCard
                            title="Mis Proveedores"
                            desc="Guarda los proveedores que te gusten, añade notas internas y envía mensajes."
                            action="GESTIONA TUS PROVEEDORES"
                            actionTo="/directorio"
                            icon={Settings}
                            colorClass="blue"
                        />
                        <ToolCard
                            title="Web de Boda"
                            desc="Crea tu web, personalízala a tu gusto y compártela con tus invitados."
                            action="ELIGE UN DISEÑO"
                            actionTo="/web-boda"
                            icon={CalendarHeart}
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
                            title="Agenda de Tareas"
                            desc="El listado de tareas más detallado para tener al día la organización de tu boda."
                            action="GESTIONA TUS TAREAS"
                            actionTo="/agenda"
                            icon={ClipboardList}
                            colorClass="blue-dark"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
