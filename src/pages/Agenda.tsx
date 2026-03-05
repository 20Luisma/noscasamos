import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, ClipboardList, BarChart2, LayoutDashboard } from 'lucide-react';
import './Agenda.css';

/* ─── Data ──────────────────────────────────────────────────────── */
const FEATURES = [
    {
        icon: ClipboardList,
        title: 'Personaliza tus tareas',
        desc: 'Añade, elimina o edita el listado inicial y personalízalo a tu gusto siempre que quieras.',
    },
    {
        icon: BarChart2,
        title: 'Consulta tu progreso',
        desc: 'Haz seguimiento de tus tareas usando los filtros de estado y fecha y mantén tu lista al día.',
    },
    {
        icon: LayoutDashboard,
        title: 'Todo en el mismo lugar',
        desc: 'Tu presupuesto y proveedores vinculados con tu Agenda para que lo tengas todo controlado.',
    },
];

const TASK_GROUPS = [
    {
        label: 'Antes de diciembre 2024',
        subtitle: 'De 10 a 12 meses',
        tasks: [
            { id: 1, text: '¡Nos casamos! ¿Y ahora qué?', cat: 'Planificación', done: true },
            { id: 2, text: 'Empezamos con la organización', cat: 'Planificación', done: true },
            { id: 3, text: 'Elegir la fecha de la boda', cat: 'Planificación', done: false },
            { id: 4, text: 'Buscar y reservar el lugar para el banquete', cat: 'Banquete', done: false },
        ],
    },
    {
        label: 'Antes de marzo 2025',
        subtitle: 'De 7 a 9 meses',
        tasks: [
            { id: 5, text: 'Contratar fotógrafo y videógrafo', cat: 'Proveedores', done: false },
            { id: 6, text: 'Elegir vestido de novia', cat: 'Novia', done: false },
            { id: 7, text: 'Definir lista de invitados', cat: 'Invitados', done: false },
            { id: 8, text: 'Reservar música o DJ', cat: 'Música', done: false },
        ],
    },
    {
        label: 'Antes de junio 2025',
        subtitle: 'De 4 a 6 meses',
        tasks: [
            { id: 9, text: 'Enviar invitaciones', cat: 'Invitados', done: false },
            { id: 10, text: 'Contratar servicio de catering', cat: 'Banquete', done: false },
            { id: 11, text: 'Organizar viaje de luna de miel', cat: 'Luna de miel', done: false },
        ],
    },
];

/* ─── Component ─────────────────────────────────────────────────── */
export default function Agenda() {
    const [checked, setChecked] = useState<number[]>(
        TASK_GROUPS.flatMap(g => g.tasks.filter(t => t.done).map(t => t.id))
    );

    const toggle = (id: number) =>
        setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

    const totalTasks = TASK_GROUPS.flatMap(g => g.tasks).length;
    const completedTasks = checked.length;
    const progressPct = Math.round((completedTasks / totalTasks) * 100);

    return (
        <div className="agenda-page">

            {/* ── HERO ── */}
            <section className="agenda-hero">
                <div className="agenda-hero-left">
                    <nav className="agenda-breadcrumb">
                        <Link to="/">Inicio</Link>
                        <span>/</span>
                        <span>Mi boda</span>
                        <span>/</span>
                        <strong>Agenda de Tareas</strong>
                    </nav>
                    <h1 className="agenda-hero-title">Agenda de Tareas gratuita</h1>
                    <p className="agenda-hero-sub">Organiza tu boda paso a paso con la agenda de tareas más completa.</p>

                    <div className="agenda-cta-group">
                        <Link to="#tasks" className="btn-primary agenda-cta-btn">Empieza a organizar</Link>
                        <p className="agenda-login-hint">¿Ya tienes cuenta? <Link to="/" className="agenda-link">Accede</Link></p>
                    </div>
                </div>

                {/* Mini task preview */}
                <div className="agenda-hero-right">
                    <div className="agenda-preview-card">
                        <div className="agenda-preview-header">
                            <span className="agenda-preview-label">GESTOR DE TAREAS</span>
                            <span className="agenda-preview-count">{completedTasks} de {totalTasks} completadas</span>
                        </div>
                        <div className="agenda-preview-progress-bar">
                            <div className="agenda-preview-progress-fill" style={{ width: `${progressPct}%` }} />
                        </div>
                        <div className="agenda-preview-tasks">
                            {TASK_GROUPS[0].tasks.map(t => (
                                <div key={t.id} className={`agenda-preview-task ${checked.includes(t.id) ? 'done' : ''}`}>
                                    {checked.includes(t.id)
                                        ? <CheckCircle2 size={18} className="apt-check done" />
                                        : <Circle size={18} className="apt-check" />}
                                    <div>
                                        <p>{t.text}</p>
                                        <span>{t.cat}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="agenda-features">
                <div className="agenda-features-inner container">
                    <h2>El listado de tareas más detallado para tener al día la organización de tu boda</h2>
                    <p className="agenda-features-sub">Planifica tu boda paso a paso, sin estrés. Te facilitamos una completa lista de tareas para guiarte en tu camino al altar.</p>
                    <div className="agenda-features-grid">
                        {FEATURES.map(f => (
                            <div key={f.title} className="agenda-feature-card">
                                <f.icon size={44} className="agenda-feature-icon" strokeWidth={1.2} />
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TASK LIST ── */}
            <section className="agenda-tasks-section container" id="tasks">
                <div className="agenda-tasks-header">
                    <h2>Tu lista de tareas</h2>
                    <div className="agenda-progress-summary">
                        <div className="agenda-progress-bar">
                            <div className="agenda-progress-fill" style={{ width: `${progressPct}%` }} />
                        </div>
                        <span>{completedTasks} de {totalTasks} tareas completadas ({progressPct}%)</span>
                    </div>
                </div>

                {TASK_GROUPS.map(group => (
                    <div key={group.label} className="agenda-task-group">
                        <div className="agenda-group-header">
                            <h3>{group.label}</h3>
                            <span className="agenda-group-sub">{group.subtitle}</span>
                        </div>
                        <div className="agenda-task-list">
                            {group.tasks.map(task => (
                                <div
                                    key={task.id}
                                    className={`agenda-task-item ${checked.includes(task.id) ? 'done' : ''}`}
                                    onClick={() => toggle(task.id)}
                                >
                                    <button className="agenda-task-check" aria-label="Completar tarea">
                                        {checked.includes(task.id)
                                            ? <CheckCircle2 size={22} className="check-icon done" />
                                            : <Circle size={22} className="check-icon" />}
                                    </button>
                                    <div className="agenda-task-info">
                                        <span className="agenda-task-text">{task.text}</span>
                                        <span className="agenda-task-cat">{task.cat}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* ── BOTTOM CTA ── */}
            <section className="agenda-bottom-cta">
                <h2>No te pierdas nada</h2>
                <p>Organizar una boda conlleva muchos detalles que debes tener en cuenta. Esta agenda te ayudará a no perder el control, a planificarte y a anticiparte a los acontecimientos. ¡Relájate y disfruta de esta bonita etapa!</p>
                <Link to="/" className="btn-primary">Crear cuenta gratis</Link>
            </section>

        </div>
    );
}
