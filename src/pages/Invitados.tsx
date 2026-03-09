import { Link } from 'react-router-dom';
import { UserPlus, Layers, Mail, Search, CheckCircle2, Settings, Calculator, Table2, ClipboardList, CalendarHeart } from 'lucide-react';
import './Invitados.css';

/* ─── Components ────────────────────────────────────────────── */

function InvitadosHero() {
    return (
        <section className="inv-landing-hero">
            <div className="inv-hero-content container">
                <div className="inv-hero-left">
                    <nav className="inv-breadcrumb">
                        <Link to="/">Bodas</Link><span>/</span>
                        <span>Organización de la boda</span><span>/</span>
                        <strong>Gestor de Invitados</strong>
                    </nav>
                    <h1 className="inv-landing-title">Gestor de Invitados</h1>
                    <p className="inv-landing-sub">
                        Con el gestor de invitados gratuito de Bodas.net podrás crear de forma sencilla tu lista de invitados, mantenerla al día y pedir confirmación de asistencia en pocos clics.
                    </p>

                    <div className="inv-register-box">
                        <span className="inv-register-label">REGISTRARME</span>
                        <div className="inv-register-inputs">
                            <div className="inv-input-wrap user">
                                <input type="text" placeholder="Nombre y apellidos" />
                                <span className="inv-input-icon">👤</span>
                            </div>
                            <div className="inv-input-wrap email">
                                <input type="email" placeholder="Email" />
                                <span className="inv-input-icon">✉️</span>
                            </div>
                            <button className="btn-primary inv-btn-register">Empieza a organizar</button>
                        </div>
                        <div className="inv-register-footer">
                            <div className="inv-social-reg">
                                <span>También te puedes registrar con:</span>
                                <div className="inv-social-icons">
                                    <button className="inv-social-btn google">G</button>
                                    <button className="inv-social-btn facebook">f</button>
                                    <button className="inv-social-btn apple"></button>
                                </div>
                            </div>
                            <div className="inv-login-link">
                                ¿Ya tienes cuenta? <strong>Accede</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="inv-hero-right">
                    <div className="inv-hero-graphic-wrapper">
                        {/* A graphic showing a phone mockup overlaying an image, matching the requested hero */}
                        <div className="inv-hero-graphic-image">
                            {/* Represents the wedding background image in the hero */}
                            <img src="https://cdn0.bodas.net/vendor/02970/3_2/960/jpg/marinacarlos-exportbodas-net_1_202970-166636377126452.jpeg" alt="Wedding guests overlay" />
                        </div>
                        <div className="inv-hero-graphic-phone">
                            <PhoneMockup>
                                <Mockup1 />
                            </PhoneMockup>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function InvitadosFeatures() {
    return (
        <section className="inv-features-sec">
            <div className="container inv-features-inner text-center">
                <h2>Mantén tu lista de invitados al día</h2>
                <p className="inv-features-desc">
                    Vuestra familia, los amigos, los compañeros de trabajo... organízalos cómodamente con la herramienta de Invitados y gestiona todos los detalles.
                </p>

                <div className="inv-features-grid">
                    <div className="inv-feature-item">
                        <div className="inv-feat-bubble blue-bg">
                            <UserPlus size={40} className="inv-feat-icon" strokeWidth={1.5} />
                            <div className="inv-feat-badge green">+</div>
                        </div>
                        <h3>Añade tus invitados</h3>
                        <p>Impórtalos desde tus contactos, tu email o un Excel. También puedes añadirlos uno a uno.</p>
                    </div>
                    <div className="inv-feature-item">
                        <div className="inv-feat-bubble cyan-bg">
                            <Layers size={40} className="inv-feat-icon" strokeWidth={1.5} />
                            <div className="inv-feat-badge arrow">↑</div>
                        </div>
                        <h3>Agrúpalos</h3>
                        <p>Crea distintos grupos y organiza las mesas fácilmente.</p>
                    </div>
                    <div className="inv-feature-item">
                        <div className="inv-feat-bubble peach-bg">
                            <Mail size={40} className="inv-feat-icon" strokeWidth={1.5} />
                            <div className="inv-feat-badge heart">♡</div>
                        </div>
                        <h3>Pide confirmación de asistencia</h3>
                        <p>Conoce en todo momento quién ha confirmado y quién no ha respondido desde la web de boda.</p>
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

            <div className="inv-search-wrap" style={{ marginBottom: '16px' }}>
                <Search size={14} className="inv-search-icon" style={{ left: '10px' }} />
                <input type="text" placeholder="Buscar invitados" className="inv-search-input" style={{ fontSize: '12px', paddingLeft: '28px', background: '#f5f5f5', border: 'none' }} disabled />
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
                    <CheckCircle2 size={14} color="#ddd" />
                    <span style={{ fontSize: '12px', color: '#333' }}>Cristina García</span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4CAF50', marginLeft: 'auto' }}></span>
                </div>
                <div style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={14} color="#ddd" />
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
            <span className="m-back">‹ GESTOR DE INVITADOS</span>
            <h4>Modificar invitado</h4>
        </div>
        <div className="m-task-detail" style={{ padding: '16px', background: '#f9f9f9' }}>
            <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
                <input type="text" value="Cristina" style={{ width: '100%', padding: '12px', border: 'none', borderBottom: '1px solid #eee', fontSize: '13px', boxSizing: 'border-box' }} disabled />
                <input type="text" value="García" style={{ width: '100%', padding: '12px', border: 'none', fontSize: '13px', boxSizing: 'border-box' }} disabled />
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <div style={{ flex: 1, padding: '8px', fontSize: '10px', textAlign: 'center', background: '#e8f8f5', color: '#06a07a', borderRadius: '4px', fontWeight: 'bold' }}>Confirmado</div>
                <div style={{ flex: 1, padding: '8px', fontSize: '10px', textAlign: 'center', border: '1px solid #ddd', color: '#666', borderRadius: '4px' }}>Pendiente</div>
                <div style={{ flex: 1, padding: '8px', fontSize: '10px', textAlign: 'center', border: '1px solid #ddd', color: '#666', borderRadius: '4px' }}>Cancelado</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#fff', border: '1px solid #eee', borderRadius: '8px', fontSize: '12px' }}>
                    <span>Novios</span>
                    <span style={{ color: '#888' }}>⌄</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#fff', border: '1px solid #eee', borderRadius: '8px', fontSize: '12px' }}>
                    <span>Presidencial (4/6)</span>
                    <span style={{ color: '#888' }}>⌄</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#fff', border: '1px solid #eee', borderRadius: '8px', fontSize: '12px' }}>
                    <span style={{ color: '#888' }}>Escoger menú</span>
                    <span style={{ color: '#888' }}>⌄</span>
                </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderBottom: '1px solid #eee' }}>
                    <span style={{ color: '#888', fontSize: '12px' }}>@</span>
                    <span style={{ fontSize: '12px' }}>userpersona@noscasamos.uy</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px' }}>
                    <span style={{ color: '#888', fontSize: '12px' }}>📱</span>
                    <span style={{ color: '#aaa', fontSize: '12px' }}>Teléfono</span>
                </div>
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
                <span>Grupos</span>
                <span className="active">Menús</span>
                <span>Estadísticas</span>
            </div>
        </div>
        <div className="m-task-detail" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <div className="m-add-btn-small" style={{ background: '#E45063', opacity: 0.5 }}>+ Invitado</div>
                <div className="m-btn-outline" style={{ color: '#E45063', borderColor: '#E45063', background: '#fdf0f1' }}>+ Menú</div>
                <span className="m-icon-btn-small" style={{ marginLeft: 'auto', border: '1px solid #ddd', padding: '4px 8px', borderRadius: '4px' }}>Todos ⌄</span>
            </div>

            <div className="inv-search-wrap" style={{ marginBottom: '16px' }}>
                <Search size={14} className="inv-search-icon" style={{ left: '10px' }} />
                <input type="text" placeholder="Buscar invitados" className="inv-search-input" style={{ fontSize: '12px', paddingLeft: '28px', background: '#f5f5f5', border: 'none' }} disabled />
            </div>

            <div style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', padding: '12px', background: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '32px', height: '32px', background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🍽️</div>
                        <div>
                            <strong style={{ fontSize: '13px', display: 'block' }}>Adultos</strong>
                            <small style={{ color: '#888', fontSize: '10px' }}>4 invitados</small>
                        </div>
                    </div>
                    <span style={{ color: '#666' }}>⌃</span>
                </div>

                {/* Simulated popup dialog for menu */}
                <div style={{ position: 'relative', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '16px', marginTop: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <div style={{ position: 'absolute', top: '8px', right: '8px', color: '#aaa', fontSize: '12px' }}>✕</div>
                    <strong style={{ fontSize: '11px', display: 'block', marginBottom: '8px' }}>Nombre del menú</strong>
                    <input type="text" value="Adultos" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box' }} disabled />
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
                <div className="agenda-alt-mockup-wrapper" style={{ background: '#fcebe9' /* Light peach color as default */ }}>
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

export default function Invitados() {
    return (
        <div className="agenda-landing">
            <InvitadosHero />

            <div style={{ padding: '4rem 0 2rem' }}>
                <InvitadosFeatures />
            </div>

            <div className="agenda-progress-intro container text-center" style={{ paddingTop: '2rem' }}>
                <h2>La información de los invitados en un solo lugar</h2>
                <p>Gestiona cómodamente todos los detalles de tu lista de invitados: crea grupos, asigna menús y mesas y pide de forma rápida y sencilla confirmación de asistencia o la dirección postal para enviar la invitación.</p>
            </div>

            <AlternateSection
                title="Crea grupos de invitados"
                desc="Podrás agrupar a tus invitados en diferentes grupos para organizar las mesas."
                action="CREA UN NUEVO GRUPO"
                mockup={<PhoneMockup><Mockup1 /></PhoneMockup>}
                reverse={true}
            />

            <AlternateSection
                title="Comprueba si han confirmado asistencia"
                desc="Mantente al día de quién ha confirmado que acudirá y quién aún no ha respondido."
                action="REVISA TU LISTA DE INVITADOS"
                mockup={<PhoneMockup><Mockup2 /></PhoneMockup>}
            />

            <AlternateSection
                title="Asigna los menús"
                desc="Tanto si tienes niños en tu boda como si hay menús para intolerantes u opciones veganas, asigna a cada invitado su menú y olvídate de complicaciones."
                action="ASIGNA UN MENÚ"
                reverse={true}
                mockup={<PhoneMockup><Mockup3 /></PhoneMockup>}
            />

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
