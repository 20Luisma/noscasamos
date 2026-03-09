import { Link } from 'react-router-dom';
import { Home as HomeIcon, Camera, Flower2, Gem, Calculator, FileText, PieChart, Settings, CalendarHeart, ClipboardList, Table2, Users } from 'lucide-react';
import './Presupuesto.css';

/* ─── Components ────────────────────────────────────────────── */

function PresupuestoHero() {
    return (
        <section className="pres-landing-hero">
            <div className="pres-hero-content container">
                <div className="pres-hero-left">
                    <nav className="pres-breadcrumb">
                        <Link to="/">Bodas</Link><span>/</span>
                        <span>Organización de la boda</span><span>/</span>
                        <strong>Presupuestador</strong>
                    </nav>
                    <h1 className="pres-landing-title">Presupuestador de Boda</h1>
                    <p className="pres-landing-sub">
                        Controla todos tus gastos de la forma más sencilla y efectiva y evita
                        sorpresas de última hora con el Presupuestador gratuito.
                    </p>

                    <div className="pres-register-box">
                        <span className="pres-register-label">REGISTRARME</span>
                        <div className="pres-register-inputs">
                            <div className="pres-input-wrap">
                                <input type="text" placeholder="Nombre y apellidos" />
                                <span className="pres-input-icon">👤</span>
                            </div>
                            <div className="pres-input-wrap">
                                <input type="email" placeholder="Email" />
                                <span className="pres-input-icon">✉️</span>
                            </div>
                            <button className="btn-primary pres-btn-register">Empieza a organizar</button>
                        </div>
                        <div className="pres-register-footer">
                            <div className="pres-social-reg">
                                <span>También te puedes registrar con:</span>
                                <div className="pres-social-icons">
                                    <button className="pres-social-btn google">G</button>
                                    <button className="pres-social-btn facebook">f</button>
                                    <button className="pres-social-btn apple"></button>
                                </div>
                            </div>
                            <div className="pres-login-link">
                                ¿Ya tienes cuenta? <strong>Accede</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pres-hero-right">
                    <div className="pres-decorative-card">
                        <div className="pres-dec-item">
                            <div className="pres-dec-icon"><HomeIcon size={20} /></div>
                            <div className="pres-dec-info">
                                <strong>Banquete</strong>
                                <span>Coste estimado 11.147 €</span>
                            </div>
                        </div>
                        <div className="pres-dec-item">
                            <div className="pres-dec-icon"><Camera size={20} /></div>
                            <div className="pres-dec-info">
                                <strong>Foto y Vídeo</strong>
                                <span>Coste estimado 1.443 €</span>
                            </div>
                        </div>
                        <div className="pres-dec-item">
                            <div className="pres-dec-icon"><Flower2 size={20} /></div>
                            <div className="pres-dec-info">
                                <strong>Flores y Decoración</strong>
                                <span>Coste estimado 622 €</span>
                            </div>
                        </div>
                        <div className="pres-dec-item">
                            <div className="pres-dec-icon"><Gem size={20} /></div>
                            <div className="pres-dec-info">
                                <strong>Joyería</strong>
                                <span>Coste estimado 439 €</span>
                            </div>
                        </div>
                        {/* Decorative Chart slice on the side */}
                        <div className="pres-dec-chart"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PresupuestoFeatures() {
    return (
        <section className="pres-features-sec">
            <div className="container pres-features-inner">
                <h2>Los gastos de tu boda bajo control</h2>
                <p className="pres-features-desc">
                    Mantén a raya el presupuesto de tu boda. Controla los gastos, programa pagos y haz seguimiento de lo que está pendiente de pagar, y todo ello ¡sin pasarte un solo euro del presupuesto inicial!
                </p>

                <div className="pres-features-grid">
                    <div className="pres-feature-item">
                        <div className="pres-feature-icon calc">
                            <Calculator size={36} strokeWidth={1.5} />
                        </div>
                        <h3>Calcula el coste de cada servicio</h3>
                        <p>Inserta tu presupuesto inicial y obtén un coste estimado para las partidas de cada categoría.</p>
                    </div>
                    <div className="pres-feature-item">
                        <div className="pres-feature-icon doc">
                            <FileText size={36} strokeWidth={1.5} />
                        </div>
                        <h3>Personaliza según tus necesidades</h3>
                        <p>Ajusta tu presupuesto y crea nuevas categorías para ajustar los gastos que necesites.</p>
                    </div>
                    <div className="pres-feature-item">
                        <div className="pres-feature-icon chart">
                            <PieChart size={36} strokeWidth={1.5} />
                        </div>
                        <h3>Analiza tus gastos</h3>
                        <p>Controla tus gastos en todo momento y de forma muy visual a través de las estadísticas.</p>
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
            <h4>Mi presupuesto</h4>
            <span className="m-add">+ AÑADIR</span>
        </div>
        <div className="m-budget-summary">
            <div className="m-bs-box">
                <span className="m-bs-icon">🐷</span>
                <strong>COSTE ESTIMADO</strong>
                <b>20.000 €</b>
                <a href="#">Modificar</a>
            </div>
            <div className="m-bs-box">
                <span className="m-bs-icon">💸</span>
                <strong>COSTE FINAL</strong>
                <b>0 €</b>
                <small>Pagado: 0 €</small>
                <small>Pendiente: 0 €</small>
            </div>
        </div>
        <div className="m-cat-list">
            <div className="m-cat-row"><span>⛪ CEREMONIA</span> <span>⌄</span></div>
            <div className="m-cat-row"><span>🍽️ BANQUETE</span> <span>⌄</span></div>
            <div className="m-cat-row"><span>🎵 MÚSICA</span> <span>⌄</span></div>
            <div className="m-cat-row"><span>✉️ INVITACIONES</span> <span>⌄</span></div>
        </div>
    </>
);

const Mockup2 = () => (
    <>
        <div className="m-page-header">
            <span className="m-back">‹ PRESUPUESTO</span>
            <h4>Añadir/Modificar Pagos</h4>
        </div>
        <div className="m-tabs">
            <span className="active">Gasto</span>
            <span>Pagos <b>0</b></span>
        </div>
        <div className="m-cost-summary">
            <div>
                <span className="m-icon">🐷</span>
                <small>Coste Estimado</small>
                <strong>98€</strong>
            </div>
            <div className="m-divider"></div>
            <div>
                <span className="m-icon">💰</span>
                <small>Total Pagado</small>
                <strong>0€</strong>
            </div>
        </div>
        <div className="m-empty-state">
            <span className="m-empty-icon">🪙</span>
            <p>No existe ningún pago para el presupuesto de Donativo iglesia</p>
            <button className="m-btn-add">Añadir pago</button>
        </div>
    </>
);

const Mockup3 = () => (
    <>
        <div className="m-page-header no-border">
            <span className="m-add">+ Añadir Gasto</span>
        </div>
        <div className="m-cat-group">
            <div className="m-cat-title">
                <span>🎵 MÚSICA</span>
                <span>⌃</span>
            </div>
            <div className="m-exp-item">
                <strong>Música ceremonia</strong>
                <div className="m-exp-row">
                    <span>Coste: 328,00 (estimado)</span>
                    <span>Pagado: 0,00</span>
                </div>
            </div>
            <div className="m-exp-item">
                <strong>Música banquete</strong>
                <div className="m-exp-row">
                    <span>Coste: 525,00 (estimado)</span>
                    <span>Pagado: 0,00</span>
                </div>
            </div>
            <div className="m-add-link">+ Añadir Gasto</div>
        </div>
        <div className="m-cat-group mt-2">
            <div className="m-cat-title">
                <span>✉️ INVITACIONES</span>
                <span>⌃</span>
            </div>
            <div className="m-exp-item">
                <strong>Invitaciones</strong>
                <div className="m-exp-row">
                    <span>Coste: 249,00 (estimado)</span>
                    <span>Pagado: 0,00</span>
                </div>
            </div>
        </div>
    </>
);


/* ─── Layout blocks ──────────────────────────────────────── */

function AlternateSection({ title, desc, action, mockup, reverse = false, bgClass = '' }: { title: string, desc: string, action: string, mockup: React.ReactNode, reverse?: boolean, bgClass?: string }) {
    return (
        <section className={`pres-alt-sec ${bgClass}`}>
            <div className={`container pres-alt-inner ${reverse ? 'reverse' : ''}`}>
                <div className="pres-alt-text">
                    <h2>{title}</h2>
                    <p>{desc}</p>
                    {action && <a href="#" className="pres-alt-action">{action}</a>}
                </div>
                <div className="pres-alt-mockup-wrapper">
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

export default function Presupuesto() {
    return (
        <div className="presupuesto-landing">
            <PresupuestoHero />
            <PresupuestoFeatures />

            {/* Consulta tu progreso */}
            <div className="pres-progress-intro container text-center">
                <h2>Consulta tu progreso</h2>
                <p>Controla los gastos de tu boda en cualquier momento y lugar y gestiona los pagos con los proveedores.</p>
            </div>

            <AlternateSection
                title="Establece un coste por proveedor"
                desc="Incluye información de todos los gastos con los proveedores: añade notas, crea vencimientos para los pagos y mucho más."
                action="AÑADE DETALLES DEL PROVEEDOR"
                mockup={<PhoneMockup><Mockup1 /></PhoneMockup>}
            />

            <AlternateSection
                title="Analiza tus gastos"
                desc="Compara los pagos previstos con los finales gracias a las estadísticas y ajústate a tu presupuesto. ¡Cada euro estará bajo control!"
                action="AÑADE TUS GASTOS"
                reverse={true}
                mockup={<PhoneMockup><Mockup2 /></PhoneMockup>}
            />

            <AlternateSection
                title="Presupuesto controlado"
                desc="Al crear nuevos gastos o realizar pagos, todo se mantiene sincronizado para que puedas hacer un seguimiento del presupuesto en todo momento."
                action="CONTROLA TUS GASTOS"
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
                            title="Agenda de Tareas"
                            desc="El listado de tareas más detallado para tener al día la organización de tu boda."
                            action="GESTIONA TUS TAREAS"
                            actionTo="/agenda"
                            icon={ClipboardList}
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
