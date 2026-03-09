import { Link } from 'react-router-dom';
import { CheckCircle2, ClipboardList, BarChart2, LayoutDashboard, CalendarHeart, Settings, Users, Calculator, Table2 } from 'lucide-react';
import './Agenda.css';

/* ─── Components ────────────────────────────────────────────── */

function AgendaHero() {
    return (
        <section className="agenda-landing-hero">
            <div className="agenda-hero-content container">
                <div className="agenda-hero-left">
                    <nav className="agenda-breadcrumb">
                        <Link to="/">Bodas</Link><span>/</span>
                        <span>Organización de la boda</span><span>/</span>
                        <strong>Agenda de Tareas</strong>
                    </nav>
                    <h1 className="agenda-landing-title">Agenda de Tareas gratuita</h1>
                    <p className="agenda-landing-sub">
                        Organiza tu boda paso a paso con la agenda de tareas más completa.
                    </p>

                    <div className="agenda-register-box">
                        <span className="agenda-register-label">REGISTRARME</span>
                        <div className="agenda-register-inputs">
                            <div className="agenda-input-wrap">
                                <input type="text" placeholder="Nombre y apellidos" />
                                <span className="agenda-input-icon">👤</span>
                            </div>
                            <div className="agenda-input-wrap">
                                <input type="email" placeholder="Email" />
                                <span className="agenda-input-icon">✉️</span>
                            </div>
                            <button className="btn-primary agenda-btn-register">Empieza a organizar</button>
                        </div>
                        <div className="agenda-register-footer">
                            <div className="agenda-social-reg">
                                <span>También te puedes registrar con:</span>
                                <div className="agenda-social-icons">
                                    <button className="agenda-social-btn google">G</button>
                                    <button className="agenda-social-btn facebook">f</button>
                                    <button className="agenda-social-btn apple"></button>
                                </div>
                            </div>
                            <div className="agenda-login-link">
                                ¿Ya tienes cuenta? <strong>Accede</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="agenda-hero-right">
                    <div className="agenda-decorative-card">
                        {/* A nice static visual representation of a task list */}
                        <div className="agenda-dec-item done">
                            <CheckCircle2 size={24} className="agenda-dec-check done" />
                            <div className="agenda-dec-info">
                                <strong>Elegir la fecha de la boda</strong>
                                <span>23 enero · Planificación</span>
                            </div>
                        </div>
                        <div className="agenda-dec-item done">
                            <CheckCircle2 size={24} className="agenda-dec-check done" />
                            <div className="agenda-dec-info">
                                <strong>Buscar y reservar el lugar para el banquete</strong>
                                <span>25 enero · Banquete</span>
                            </div>
                        </div>
                        <div className="agenda-dec-item done">
                            <CheckCircle2 size={24} className="agenda-dec-check done" />
                            <div className="agenda-dec-info">
                                <strong style={{ textDecoration: 'line-through', color: '#aaa' }}>Comunicar el enlace a familiares y amigos</strong>
                                <span>5 febrero · Planificación</span>
                            </div>
                        </div>
                        <div className="agenda-dec-item">
                            <CheckCircle2 size={24} className="agenda-dec-check" />
                            <div className="agenda-dec-info">
                                <strong>Descargar la app</strong>
                                <span>5 febrero · Planificación</span>
                            </div>
                        </div>

                        {/* Little decorative images floating around like bodas.net */}
                        <div className="agenda-dec-floating-imgs">
                            <div className="agenda-dec-img img1"></div>
                            <div className="agenda-dec-img img2"></div>
                            <div className="agenda-dec-img img3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AgendaFeatures() {
    return (
        <section className="agenda-features-sec">
            <div className="container agenda-features-inner">
                <h2>El listado de tareas más detallado para tener al día la organización de tu boda</h2>
                <p className="agenda-features-desc">
                    Planifica tu boda paso a paso, sin estrés. Te facilitamos una completa lista de tareas para guiarte en tu camino al altar.
                </p>

                <div className="agenda-features-grid">
                    <div className="agenda-feature-item">
                        <div className="agenda-feature-icon calc">
                            <ClipboardList size={38} strokeWidth={1.5} />
                        </div>
                        <h3>Personaliza tus tareas</h3>
                        <p>Añade, elimina o edita el listado inicial y personalízalo a tu gusto siempre que quieras.</p>
                    </div>
                    <div className="agenda-feature-item">
                        <div className="agenda-feature-icon doc">
                            <BarChart2 size={38} strokeWidth={1.5} />
                        </div>
                        <h3>Consulta tu progreso</h3>
                        <p>Haz seguimiento de tus tareas usando los filtros de estado y fecha y mantén tu lista al día.</p>
                    </div>
                    <div className="agenda-feature-item">
                        <div className="agenda-feature-icon chart">
                            <LayoutDashboard size={38} strokeWidth={1.5} />
                        </div>
                        <h3>Todo en el mismo lugar</h3>
                        <p>Tu Presupuesto y Proveedores vinculados con tu Agenda para que lo tengas todo controlado.</p>
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
            <span className="m-back">‹ GESTOR DE TAREAS</span>
            <div className="m-top-actions">
                <span className="m-btn-outline">✓ Completar</span>
                <span className="m-icon-btn">✏️</span>
                <span className="m-icon-btn">🗑️</span>
            </div>
        </div>
        <div className="m-task-detail">
            <h4>¡Nos casamos! ¿Y ahora qué?</h4>
            <p>
                ¡Felicidades! Ya os habéis decidido a dar el gran paso y a partir de ahora se os presenta un largo camino para organizar juntos vuestra boda.
                Con esta agenda de tareas de noscasamos.uy todo será mucho más fácil.
                <br /><br />
                Lo primero que debéis pensar es qué tipo de ceremonia queréis...
            </p>
        </div>
    </>
);

const Mockup2 = () => (
    <>
        <div className="m-page-header">
            <span className="m-back">‹ MI BODA</span>
            <div className="m-header-row">
                <h4>Gestor de tareas</h4>
                <div className="m-add-btn-small">+ Añadir</div>
            </div>
            <p className="m-progress-txt">Has completado <b>0</b> de <b>104</b> tareas</p>
            <div className="m-progress-bar-thin"></div>
            <div className="m-filter-row">
                <span>Filtrar por:</span>
                <strong>Pendientes ⌄</strong>
            </div>
            <div className="m-pills-row">
                <span className="m-pill active">Todas</span>
                <span className="m-pill">Esenciales</span>
                <span className="m-pill">Planificación</span>
            </div>
        </div>
        <div className="m-task-list">
            <div className="m-tl-group">ANTES DE DICIEMBRE 2024<br /><small>(De 10 a 12 meses)</small></div>
            <div className="m-tl-item"><span className="m-tl-check"></span> <div><b>¡Nos casamos! ¿Y ahora qué?</b><span>Planificación</span></div></div>
            <div className="m-tl-item"><span className="m-tl-check"></span> <div><b>Empezamos con la organización</b><span>Planificación</span></div></div>
        </div>
    </>
);

const Mockup3 = () => (
    <>
        <div className="m-page-header">
            <div className="m-header-row">
                <h4>Gestor de tareas</h4>
            </div>
            <div className="m-tabs">
                <span className="active">En curso</span>
                <span>Completadas</span>
            </div>
        </div>
        <div className="m-task-list">
            <div className="m-tl-item done-mockup">
                <span className="m-tl-check done">✓ Completada</span>
                <span className="m-icon-btn-small">✏️</span>
                <span className="m-icon-btn-small">🗑️</span>
            </div>
            <div className="m-tl-item info">
                <span className="m-icon-grey">📅</span>
                <span>De 10 a 12 meses</span>
            </div>
            <div className="m-tl-item info">
                <span className="m-icon-grey">🍽️</span>
                <span>Banquete</span>
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
                <div className="agenda-alt-mockup-wrapper">
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

export default function Agenda() {
    return (
        <div className="agenda-landing">
            <AgendaHero />
            <AgendaFeatures />

            {/* No te pierdas nada */}
            <div className="agenda-progress-intro container text-center">
                <h2>No te pierdas nada</h2>
                <p>Organizar una boda conlleva muchos detalles que debes tener en cuenta. Este listado te ayudará a no perder el control, a planificarte y a anticiparte a los acontecimientos. ¡Relájate y disfruta de esta bonita etapa que acabas de empezar!</p>
            </div>

            <AlternateSection
                title="¿Por dónde empezar?"
                desc="Sigue la lista, mira las próximas tareas y no te pierdas ningún detalle."
                action="VER LA PRIMERA TAREA"
                mockup={<PhoneMockup><Mockup1 /></PhoneMockup>}
            />

            <AlternateSection
                title="Consulta el progreso"
                desc="Comprueba fácilmente qué tareas has completado ya y cuáles te faltan por hacer. Conoce en todo momento el estado de la planificación."
                action="VER SIGUIENTE TAREA"
                reverse={true}
                mockup={<PhoneMockup><Mockup2 /></PhoneMockup>}
            />

            <AlternateSection
                title="Sincroniza con el Presupuestador y los Proveedores"
                desc="Al crear nuevas tareas o modificar su estado, todo se mantiene sincronizado para que puedas hacer un seguimiento de tu boda desde cualquier rincón."
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

