import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, UserPlus, Users, Grid, List } from 'lucide-react';
import './Mesas.css';

/* ─── Types ─────────────────────────────────────────────────── */
type TableType = 'round' | 'rectangular' | 'presidential';

interface Guest {
    id: number;
    name: string;
    tableId: number | null; // null = sin asignar
}

interface Table {
    id: number;
    name: string;
    type: TableType;
    seats: number;
}

/* ─── Features ──────────────────────────────────────────────── */
const FEATURES = [
    { emoji: '👥', title: 'Añade invitados', desc: 'Añade invitados, muévelos por las mesas y crea las combinaciones que necesites hasta que encuentres el lugar adecuado para cada uno.' },
    { emoji: '🖨️', title: 'Imprime y comparte el resultado', desc: 'Podrás enviar y compartir el resultado con el espacio del banquete o el wedding planner para que preparen el salón con tus indicaciones.' },
    { emoji: '📋', title: 'Visualiza tu plano o listado', desc: 'Cuentas con dos opciones de visualización e impresión del organizador de mesas: plano de mesas y listado de invitados por mesa.' },
];

/* ─── Initial data ───────────────────────────────────────────── */
const INIT_TABLES: Table[] = [
    { id: 1, name: 'Mesa 1', type: 'round', seats: 8 },
    { id: 2, name: 'Mesa 2', type: 'round', seats: 8 },
    { id: 3, name: 'Presidencial', type: 'presidential', seats: 6 },
];

const INIT_GUESTS: Guest[] = [
    { id: 1, name: 'Ana García', tableId: 1 },
    { id: 2, name: 'Luis Martínez', tableId: 1 },
    { id: 3, name: 'María López', tableId: 1 },
    { id: 4, name: 'Carlos Rodríguez', tableId: 2 },
    { id: 5, name: 'Sofía Fernández', tableId: 2 },
    { id: 6, name: 'Diego Álvarez', tableId: null },
    { id: 7, name: 'Paula Romero', tableId: null },
    { id: 8, name: 'Tomás González', tableId: null },
];

let nextTableId = 10;
let nextGuestId = 20;

/* ─── Table shape icon ── simple SVG ────────────────────────── */
function TableIcon({ type, size = 28 }: { type: TableType; size?: number }) {
    if (type === 'round') return (
        <svg width={size} height={size} viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="13" fill="#fde8e8" stroke="#c8264a" strokeWidth="2" />
        </svg>
    );
    if (type === 'presidential') return (
        <svg width={size} height={size} viewBox="0 0 40 20">
            <rect x="2" y="4" width="36" height="12" rx="4" fill="#fde8e8" stroke="#c8264a" strokeWidth="2" />
        </svg>
    );
    return (
        <svg width={size} height={size} viewBox="0 0 32 32">
            <rect x="4" y="4" width="24" height="24" rx="4" fill="#fde8e8" stroke="#c8264a" strokeWidth="2" />
        </svg>
    );
}

/* ─── Component ─────────────────────────────────────────────── */
export default function Mesas() {
    const [tables, setTables] = useState<Table[]>(INIT_TABLES);
    const [guests, setGuests] = useState<Guest[]>(INIT_GUESTS);
    const [view, setView] = useState<'plan' | 'list'>('plan');
    const [newGuestName, setNewGuestName] = useState('');
    const [selectedGuest, setSelectedGuest] = useState<number | null>(null);

    // ── Computed ──
    const unassigned = guests.filter(g => g.tableId === null);
    const totalSeats = tables.reduce((s, t) => s + t.seats, 0);
    const assignedCount = guests.filter(g => g.tableId !== null).length;

    // ── Add table ──
    const addTable = () => {
        const id = nextTableId++;
        setTables(prev => [...prev, { id, name: `Mesa ${tables.length + 1}`, type: 'round', seats: 8 }]);
    };

    // ── Remove table ── unassign guests first
    const removeTable = (id: number) => {
        setGuests(prev => prev.map(g => g.tableId === id ? { ...g, tableId: null } : g));
        setTables(prev => prev.filter(t => t.id !== id));
    };

    // ── Add guest ──
    const addGuest = () => {
        if (!newGuestName.trim()) return;
        setGuests(prev => [...prev, { id: nextGuestId++, name: newGuestName.trim(), tableId: null }]);
        setNewGuestName('');
    };

    // ── Assign selected guest to table ──
    const assignToTable = (tableId: number) => {
        if (selectedGuest === null) return;
        const table = tables.find(t => t.id === tableId);
        if (!table) return;
        const seated = guests.filter(g => g.tableId === tableId).length;
        if (seated >= table.seats) return; // full
        setGuests(prev => prev.map(g => g.id === selectedGuest ? { ...g, tableId } : g));
        setSelectedGuest(null);
    };

    // ── Remove guest from table ──
    const removeFromTable = (guestId: number) => {
        setGuests(prev => prev.map(g => g.id === guestId ? { ...g, tableId: null } : g));
    };

    return (
        <div className="mesas-page">

            {/* ── HERO ── */}
            <section className="mesas-hero">
                <div className="mesas-hero-left">
                    <nav className="mesas-breadcrumb">
                        <Link to="/">Inicio</Link><span>/</span>
                        <span>Mi boda</span><span>/</span>
                        <strong>Organizador de Mesas</strong>
                    </nav>
                    <h1 className="mesas-hero-title">Organizador de Mesas</h1>
                    <p className="mesas-hero-sub">Sentar a tus invitados en las mesas será un juego de niños. Rápido, sencillo y divertido.</p>
                    <div className="mesas-hero-stats">
                        <div className="mesas-stat">
                            <strong>{tables.length}</strong>
                            <span>Mesas</span>
                        </div>
                        <div className="mesas-stat">
                            <strong>{guests.length}</strong>
                            <span>Invitados</span>
                        </div>
                        <div className="mesas-stat">
                            <strong>{assignedCount} / {totalSeats}</strong>
                            <span>Asientos usados</span>
                        </div>
                    </div>
                    <a href="#organizador" className="btn-primary mesas-cta">Organizar ahora</a>
                </div>
                <div className="mesas-hero-right">
                    <div className="mesas-preview-card">
                        <div className="mesas-preview-tabs">
                            <span className="mesas-preview-tab active">Invitados</span>
                            <span className="mesas-preview-tab">Mesa</span>
                        </div>
                        {INIT_TABLES.map(t => (
                            <div key={t.id} className="mesas-preview-row">
                                <TableIcon type={t.type} size={22} />
                                <div>
                                    <p>{t.name}</p>
                                    <span>{INIT_GUESTS.filter(g => g.tableId === t.id).length} / {t.seats} asientos</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="mesas-features">
                <div className="container mesas-features-inner">
                    <h2>Ubicar a cada invitado de la lista en su mesa será como un juego</h2>
                    <p className="mesas-feat-sub">Crea tantas mesas como quieras, personalízalas y mueve a los invitados haciendo todas las combinaciones que necesites.</p>
                    <div className="mesas-features-grid">
                        {FEATURES.map(f => (
                            <div key={f.title} className="mesas-feature-card">
                                <span className="mesas-feat-emoji">{f.emoji}</span>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ORGANIZADOR ── */}
            <section className="mesas-tool container" id="organizador">
                <div className="mesas-tool-header">
                    <h2>Tu plano de mesas</h2>
                    <div className="mesas-view-toggle">
                        <button className={view === 'plan' ? 'active' : ''} onClick={() => setView('plan')}><Grid size={16} /> Plano</button>
                        <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><List size={16} /> Listado</button>
                    </div>
                </div>

                <div className="mesas-tool-body">

                    {/* Left: unassigned guests */}
                    <aside className="mesas-sidebar">
                        <h3><Users size={16} /> Sin asignar ({unassigned.length})</h3>
                        <div className="mesas-add-guest">
                            <input
                                type="text"
                                placeholder="Nombre del invitado"
                                value={newGuestName}
                                onChange={e => setNewGuestName(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addGuest()}
                            />
                            <button onClick={addGuest} className="mesas-add-btn"><UserPlus size={16} /></button>
                        </div>
                        <div className="mesas-guest-list">
                            {unassigned.length === 0
                                ? <p className="mesas-empty-msg">¡Todos asignados! 🎉</p>
                                : unassigned.map(g => (
                                    <div
                                        key={g.id}
                                        className={`mesas-guest-chip ${selectedGuest === g.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedGuest(selectedGuest === g.id ? null : g.id)}
                                    >
                                        <span>{g.name}</span>
                                    </div>
                                ))
                            }
                        </div>
                        {selectedGuest !== null && (
                            <p className="mesas-hint">← Haz clic en una mesa para asignar a <strong>{guests.find(g => g.id === selectedGuest)?.name}</strong></p>
                        )}
                        <button className="mesas-add-table-btn" onClick={addTable}>
                            <Plus size={16} /> Añadir mesa
                        </button>
                    </aside>

                    {/* Right: plan / list view */}
                    <div className="mesas-plan">
                        {view === 'plan' ? (
                            <div className="mesas-grid">
                                {tables.map(t => {
                                    const seated = guests.filter(g => g.tableId === t.id);
                                    const free = t.seats - seated.length;
                                    const isFull = free === 0;
                                    return (
                                        <div
                                            key={t.id}
                                            className={`mesas-table-card ${selectedGuest !== null && !isFull ? 'clickable' : ''}`}
                                            onClick={() => assignToTable(t.id)}
                                        >
                                            <div className="mesas-card-header">
                                                <TableIcon type={t.type} size={26} />
                                                <div>
                                                    <span className="mesas-card-name">{t.name}</span>
                                                    <span className="mesas-card-sub">{seated.length}/{t.seats} · {isFull ? '🔴 Completa' : `🟢 ${free} libre${free > 1 ? 's' : ''}`}</span>
                                                </div>
                                                <button className="mesas-del-btn" onClick={e => { e.stopPropagation(); removeTable(t.id); }}><Trash2 size={14} /></button>
                                            </div>
                                            <div className="mesas-seated-list">
                                                {seated.map(g => (
                                                    <div key={g.id} className="mesas-seated-guest">
                                                        <span>{g.name}</span>
                                                        <button onClick={e => { e.stopPropagation(); removeFromTable(g.id); }}>✕</button>
                                                    </div>
                                                ))}
                                                {Array.from({ length: free }).map((_, i) => (
                                                    <div key={`empty-${i}`} className="mesas-empty-seat">Asiento libre</div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="mesas-list-view">
                                {tables.map(t => {
                                    const seated = guests.filter(g => g.tableId === t.id);
                                    return (
                                        <div key={t.id} className="mesas-list-row">
                                            <div className="mesas-list-row-header">
                                                <TableIcon type={t.type} size={20} />
                                                <strong>{t.name}</strong>
                                                <span className="mesas-list-badge">{seated.length}/{t.seats}</span>
                                            </div>
                                            {seated.length === 0
                                                ? <p className="mesas-empty-msg">Sin invitados asignados</p>
                                                : seated.map(g => <div key={g.id} className="mesas-list-guest">{g.name}</div>)
                                            }
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>

        </div>
    );
}
