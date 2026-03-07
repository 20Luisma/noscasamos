import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Search, Filter, CheckCircle2, XCircle, HelpCircle, Trash2, Users } from 'lucide-react';
import './Invitados.css';

/* ─── Types ─────────────────────────────────────────────────── */
type RSVP = 'confirmado' | 'pendiente' | 'declinado';
type Group = 'Familia novia' | 'Familia novio' | 'Amigos' | 'Trabajo' | 'Sin grupo';

interface Guest {
    id: number;
    name: string;
    group: Group;
    rsvp: RSVP;
    menu: string;
}

/* ─── Features ──────────────────────────────────────────────── */
const FEATURES = [
    { emoji: '👤', title: 'Añade tus invitados', desc: 'Impórtalos desde tus contactos, tu email o un Excel. También puedes añadirlos uno a uno.' },
    { emoji: '🗂️', title: 'Agrúpalos', desc: 'Crea distintos grupos y organiza las mesas fácilmente.' },
    { emoji: '✉️', title: 'Pide confirmación de asistencia', desc: 'Conoce en todo momento quién ha confirmado y quién no ha respondido desde la web de boda.' },
];

/* ─── Initial data ───────────────────────────────────────────── */
const GROUPS: Group[] = ['Familia novia', 'Familia novio', 'Amigos', 'Trabajo', 'Sin grupo'];

const MENUS = ['No especificado', 'Estándar', 'Vegetariano', 'Vegano', 'Sin gluten'];

const INITIAL_GUESTS: Guest[] = [
    { id: 1, name: 'Ana García', group: 'Familia novia', rsvp: 'confirmado', menu: 'Estándar' },
    { id: 2, name: 'Luis Martínez', group: 'Familia novia', rsvp: 'confirmado', menu: 'Estándar' },
    { id: 3, name: 'María López', group: 'Familia novio', rsvp: 'confirmado', menu: 'Vegetariano' },
    { id: 4, name: 'Carlos Rodríguez', group: 'Familia novio', rsvp: 'pendiente', menu: 'No especificado' },
    { id: 5, name: 'Sofía Fernández', group: 'Amigos', rsvp: 'confirmado', menu: 'Estándar' },
    { id: 6, name: 'Diego Álvarez', group: 'Amigos', rsvp: 'declinado', menu: 'No especificado' },
    { id: 7, name: 'Paula Romero', group: 'Amigos', rsvp: 'pendiente', menu: 'No especificado' },
    { id: 8, name: 'Tomás González', group: 'Trabajo', rsvp: 'pendiente', menu: 'No especificado' },
    { id: 9, name: 'Laura Pérez', group: 'Trabajo', rsvp: 'confirmado', menu: 'Sin gluten' },
    { id: 10, name: 'Martín Díaz', group: 'Sin grupo', rsvp: 'pendiente', menu: 'No especificado' },
];

let nextId = 20;

/* ─── RSVP badge ─────────────────────────────────────────────── */
const RSVP_CONFIG: Record<RSVP, { label: string; icon: React.ElementType; className: string }> = {
    confirmado: { label: 'Confirmado', icon: CheckCircle2, className: 'rsvp-confirmed' },
    pendiente: { label: 'Pendiente', icon: HelpCircle, className: 'rsvp-pending' },
    declinado: { label: 'Declinado', icon: XCircle, className: 'rsvp-declined' },
};

/* ─── Component ─────────────────────────────────────────────── */
export default function Invitados() {
    const [guests, setGuests] = useState<Guest[]>(INITIAL_GUESTS);
    const [search, setSearch] = useState('');
    const [filterGroup, setFGroup] = useState<Group | 'Todos'>('Todos');
    const [filterRsvp, setFRsvp] = useState<RSVP | 'Todos'>('Todos');
    const [showForm, setShowForm] = useState(false);

    // New guest form state
    const [newName, setNewName] = useState('');
    const [newGroup, setNewGroup] = useState<Group>('Sin grupo');
    const [newMenu, setNewMenu] = useState('No especificado');

    // ── Stats ──
    const total = guests.length;
    const confirmed = guests.filter(g => g.rsvp === 'confirmado').length;
    const pending = guests.filter(g => g.rsvp === 'pendiente').length;
    const declined = guests.filter(g => g.rsvp === 'declinado').length;

    // ── Filtered list ──
    const filtered = guests.filter(g => {
        const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
        const matchGroup = filterGroup === 'Todos' || g.group === filterGroup;
        const matchRsvp = filterRsvp === 'Todos' || g.rsvp === filterRsvp;
        return matchSearch && matchGroup && matchRsvp;
    });

    // ── Add guest ──
    const addGuest = () => {
        if (!newName.trim()) return;
        setGuests(prev => [...prev, { id: nextId++, name: newName.trim(), group: newGroup, rsvp: 'pendiente', menu: newMenu }]);
        setNewName(''); setNewGroup('Sin grupo'); setNewMenu('No especificado');
        setShowForm(false);
    };

    // ── Delete guest ──
    const deleteGuest = (id: number) => setGuests(prev => prev.filter(g => g.id !== id));

    // ── Toggle RSVP ──
    const cycleRsvp = (id: number) => {
        const order: RSVP[] = ['pendiente', 'confirmado', 'declinado'];
        setGuests(prev => prev.map(g => {
            if (g.id !== id) return g;
            const next = order[(order.indexOf(g.rsvp) + 1) % order.length];
            return { ...g, rsvp: next };
        }));
    };

    return (
        <div className="invitados-page">

            {/* ── HERO ── */}
            <section className="inv-hero">
                <div className="inv-hero-left">
                    <nav className="inv-breadcrumb">
                        <Link to="/">Inicio</Link><span>/</span>
                        <span>Mi boda</span><span>/</span>
                        <strong>Gestor de Invitados</strong>
                    </nav>
                    <h1 className="inv-hero-title">Gestor de Invitados</h1>
                    <p className="inv-hero-sub">Con el gestor de invitados gratuito podrás crear de forma sencilla tu lista de invitados, mantenerla al día y pedir confirmación de asistencia en pocos clics.</p>
                    <a href="#lista" className="btn-primary inv-cta">Gestionar invitados</a>
                    <p className="inv-login-hint">¿Ya tienes cuenta? <Link to="/" className="inv-link">Accede</Link></p>
                </div>
                <div className="inv-hero-right">
                    {/* Mini app mockup */}
                    <div className="inv-app-card">
                        <div className="inv-app-header">
                            <span className="inv-app-title">Gestor de Invitados</span>
                            <div className="inv-app-tabs">
                                <span className="inv-app-tab active">Mesas</span>
                                <span className="inv-app-tab">Grupos</span>
                                <span className="inv-app-tab">Menús</span>
                            </div>
                        </div>
                        <div className="inv-app-stats">
                            <div className="inv-app-stat confirmed"><CheckCircle2 size={14} /> {confirmed} Confirmados</div>
                            <div className="inv-app-stat pending"><HelpCircle size={14} /> {pending} Pendientes</div>
                            <div className="inv-app-stat declined"><XCircle size={14} /> {declined} Declinados</div>
                        </div>
                        <div className="inv-app-list">
                            {INITIAL_GUESTS.slice(0, 5).map(g => {
                                return (
                                    <div key={g.id} className="inv-app-row">
                                        <div className="inv-app-avatar">{g.name[0]}</div>
                                        <div className="inv-app-name">{g.name}</div>
                                        <span className={`inv-app-dot ${g.rsvp}`} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="inv-features">
                <div className="container inv-features-inner">
                    <h2>Mantén tu lista de invitados al día</h2>
                    <p className="inv-feat-sub">Tu familia, los amigos, los compañeros de trabajo... organízalos cómodamente con la herramienta de Invitados y gestiona todos los detalles.</p>
                    <div className="inv-features-grid">
                        {FEATURES.map(f => (
                            <div key={f.title} className="inv-feature-card">
                                <span className="inv-feat-emoji">{f.emoji}</span>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GUEST MANAGER ── */}
            <section className="inv-manager container" id="lista">

                {/* Stats bar */}
                <div className="inv-stats-bar">
                    <div className="inv-stat-chip total"><Users size={15} /> {total} invitados</div>
                    <div className="inv-stat-chip confirmed"><CheckCircle2 size={15} /> {confirmed} confirmados</div>
                    <div className="inv-stat-chip pending"><HelpCircle size={15} /> {pending} pendientes</div>
                    <div className="inv-stat-chip declined"><XCircle size={15} /> {declined} declinados</div>
                </div>

                {/* Toolbar */}
                <div className="inv-toolbar">
                    <div className="inv-search-wrap">
                        <Search size={16} className="inv-search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar invitado..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="inv-search-input"
                        />
                    </div>
                    <div className="inv-filters">
                        <Filter size={15} />
                        <select value={filterGroup} onChange={e => setFGroup(e.target.value as Group | 'Todos')} className="inv-select">
                            <option value="Todos">Todos los grupos</option>
                            {GROUPS.map(g => <option key={g}>{g}</option>)}
                        </select>
                        <select value={filterRsvp} onChange={e => setFRsvp(e.target.value as RSVP | 'Todos')} className="inv-select">
                            <option value="Todos">Todos los estados</option>
                            <option value="confirmado">Confirmados</option>
                            <option value="pendiente">Pendientes</option>
                            <option value="declinado">Declinados</option>
                        </select>
                    </div>
                    <button className="inv-add-btn" onClick={() => setShowForm(v => !v)}>
                        <UserPlus size={16} /> Añadir invitado
                    </button>
                </div>

                {/* Add form */}
                {showForm && (
                    <div className="inv-form-row">
                        <input className="inv-form-input" placeholder="Nombre completo" value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addGuest()} autoFocus />
                        <select className="inv-form-select" value={newGroup} onChange={e => setNewGroup(e.target.value as Group)}>
                            {GROUPS.map(g => <option key={g}>{g}</option>)}
                        </select>
                        <select className="inv-form-select" value={newMenu} onChange={e => setNewMenu(e.target.value)}>
                            {MENUS.map(m => <option key={m}>{m}</option>)}
                        </select>
                        <button className="btn-primary inv-form-save" onClick={addGuest}>Guardar</button>
                        <button className="inv-form-cancel" onClick={() => setShowForm(false)}>Cancelar</button>
                    </div>
                )}

                {/* Table */}
                <div className="inv-table-wrap">
                    <div className="inv-table-head">
                        <span>Invitado</span>
                        <span>Grupo</span>
                        <span>Menú</span>
                        <span>RSVP</span>
                        <span></span>
                    </div>
                    {filtered.length === 0
                        ? <p className="inv-empty">No hay invitados que coincidan con el filtro.</p>
                        : filtered.map(g => {
                            const cfg = RSVP_CONFIG[g.rsvp];
                            const Icon = cfg.icon;
                            return (
                                <div key={g.id} className="inv-table-row">
                                    <div className="inv-guest-name">
                                        <div className="inv-avatar">{g.name[0]}</div>
                                        <span>{g.name}</span>
                                    </div>
                                    <div className="inv-group-badge">{g.group}</div>
                                    <div className="inv-menu-text">{g.menu}</div>
                                    <button className={`inv-rsvp-badge ${cfg.className}`} onClick={() => cycleRsvp(g.id)} title="Clic para cambiar estado">
                                        <Icon size={13} /> {cfg.label}
                                    </button>
                                    <button className="inv-del-btn" onClick={() => deleteGuest(g.id)}><Trash2 size={14} /></button>
                                </div>
                            );
                        })
                    }
                </div>
            </section>
        </div>
    );
}
