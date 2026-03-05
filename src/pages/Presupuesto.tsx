import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Camera, Flower2, Gem, Music, Cake, Car, Plane, UtensilsCrossed, Shirt } from 'lucide-react';
import './Presupuesto.css';

/* ─── Data ──────────────────────────────────────────────────── */
const FEATURES = [
    {
        emoji: '🧮',
        title: 'Calcula el coste de cada servicio',
        desc: 'Inserta tu presupuesto inicial y obtén un coste estimado para las partidas de cada categoría.',
    },
    {
        emoji: '✏️',
        title: 'Personaliza según tus necesidades',
        desc: 'Ajusta tu presupuesto y crea nuevas categorías para ajustar los gastos que necesites.',
    },
    {
        emoji: '📊',
        title: 'Analiza tus gastos',
        desc: 'Controla tus gastos en todo momento y de forma muy visual a través de las estadísticas.',
    },
];

interface Category {
    id: number;
    label: string;
    icon: React.ElementType;
    color: string;
    pct: number; // default % of total
    estimado: number;
    pagado: number;
}

const DEFAULT_BUDGET = 20000;

const INITIAL_CATEGORIES: Category[] = [
    { id: 1, label: 'Banquete', icon: HomeIcon, color: '#e07b5a', pct: 45, estimado: 9000, pagado: 3000 },
    { id: 2, label: 'Foto y Vídeo', icon: Camera, color: '#6c63ff', pct: 10, estimado: 2000, pagado: 500 },
    { id: 3, label: 'Flores y Decoración', icon: Flower2, color: '#f9c74f', pct: 8, estimado: 1600, pagado: 0 },
    { id: 4, label: 'Joyería', icon: Gem, color: '#4cc9f0', pct: 5, estimado: 1000, pagado: 0 },
    { id: 5, label: 'Música', icon: Music, color: '#f72585', pct: 6, estimado: 1200, pagado: 0 },
    { id: 6, label: 'Torta', icon: Cake, color: '#7209b7', pct: 3, estimado: 600, pagado: 0 },
    { id: 7, label: 'Transporte', icon: Car, color: '#3a86ff', pct: 4, estimado: 800, pagado: 0 },
    { id: 8, label: 'Luna de miel', icon: Plane, color: '#06d6a0', pct: 10, estimado: 2000, pagado: 0 },
    { id: 9, label: 'Catering', icon: UtensilsCrossed, color: '#ff9f1c', pct: 5, estimado: 1000, pagado: 0 },
    { id: 10, label: 'Vestimenta', icon: Shirt, color: '#c77dff', pct: 4, estimado: 800, pagado: 0 },
];

/* ─── Donut SVG ─────────────────────────────────────────────── */
function DonutChart({ categories }: { categories: Category[] }) {
    const size = 180;
    const r = 70;
    const cx = size / 2;
    const cy = size / 2;
    const circ = 2 * Math.PI * r;

    let cumulative = 0;
    const total = categories.reduce((s, c) => s + c.pct, 0);
    const segments = categories.map(cat => {
        const frac = cat.pct / total;
        const dashLen = frac * circ;
        const offset = circ - cumulative * circ / total;
        cumulative += cat.pct;
        return { ...cat, dashLen, offset };
    });

    return (
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="donut-svg">
            {segments.map(s => (
                <circle
                    key={s.id}
                    cx={cx} cy={cy} r={r}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={28}
                    strokeDasharray={`${s.dashLen} ${circ - s.dashLen}`}
                    strokeDashoffset={s.offset}
                    className="donut-segment"
                />
            ))}
            <circle cx={cx} cy={cy} r={r - 20} fill="white" />
            <text x={cx} y={cy - 8} textAnchor="middle" className="donut-label-top">Total</text>
            <text x={cx} y={cy + 14} textAnchor="middle" className="donut-label-amount">
                ${categories.reduce((s, c) => s + c.estimado, 0).toLocaleString()}
            </text>
        </svg>
    );
}

/* ─── Component ─────────────────────────────────────────────── */
export default function Presupuesto() {
    const [budget, setBudget] = useState(DEFAULT_BUDGET);
    const [categories, setCategories] = useState<Category[]>(
        INITIAL_CATEGORIES.map(c => ({ ...c, estimado: Math.round(DEFAULT_BUDGET * c.pct / 100) }))
    );

    const totalEstimado = categories.reduce((s, c) => s + c.estimado, 0);
    const totalPagado = categories.reduce((s, c) => s + c.pagado, 0);
    const remaining = budget - totalEstimado;

    const updateEstimado = (id: number, val: number) =>
        setCategories(prev => prev.map(c => c.id === id ? { ...c, estimado: val } : c));

    const applyBudget = (newBudget: number) => {
        setBudget(newBudget);
        setCategories(prev => prev.map(c => ({ ...c, estimado: Math.round(newBudget * c.pct / 100) })));
    };

    return (
        <div className="presupuesto-page">

            {/* ── HERO ── */}
            <section className="pres-hero">
                <div className="pres-hero-left">
                    <nav className="pres-breadcrumb">
                        <Link to="/">Inicio</Link><span>/</span>
                        <span>Mi boda</span><span>/</span>
                        <strong>Presupuesto</strong>
                    </nav>
                    <h1 className="pres-hero-title">Presupuestador de Boda</h1>
                    <p className="pres-hero-sub">Controla todos tus gastos de la forma más sencilla y efectiva y evita sorpresas de última hora con el Presupuestador gratuito.</p>

                    <div className="pres-budget-input-wrap">
                        <label>Presupuesto total estimado</label>
                        <div className="pres-budget-input-row">
                            <span className="pres-currency">$</span>
                            <input
                                type="number"
                                value={budget}
                                min={0}
                                onChange={e => applyBudget(Number(e.target.value))}
                                className="pres-budget-input"
                            />
                            <button className="btn-primary pres-apply-btn" onClick={() => applyBudget(budget)}>
                                Aplicar
                            </button>
                        </div>
                    </div>

                    <div className="pres-hero-stats">
                        <div className="pres-stat">
                            <span className="pres-stat-label">Presupuesto</span>
                            <span className="pres-stat-val">${budget.toLocaleString()}</span>
                        </div>
                        <div className="pres-stat">
                            <span className="pres-stat-label">Estimado</span>
                            <span className="pres-stat-val pres-stat-est">${totalEstimado.toLocaleString()}</span>
                        </div>
                        <div className="pres-stat">
                            <span className="pres-stat-label">Pagado</span>
                            <span className="pres-stat-val pres-stat-paid">${totalPagado.toLocaleString()}</span>
                        </div>
                        <div className="pres-stat">
                            <span className="pres-stat-label">Restante</span>
                            <span className={`pres-stat-val ${remaining < 0 ? 'pres-stat-over' : 'pres-stat-ok'}`}>
                                ${remaining.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Donut chart preview */}
                <div className="pres-hero-right">
                    <div className="pres-chart-card">
                        <DonutChart categories={categories} />
                        <div className="pres-legend">
                            {categories.slice(0, 5).map(c => (
                                <div key={c.id} className="pres-legend-item">
                                    <span className="pres-legend-dot" style={{ background: c.color }} />
                                    <span className="pres-legend-label">{c.label}</span>
                                    <span className="pres-legend-amt">${c.estimado.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="pres-features">
                <div className="container pres-features-inner">
                    <h2>Los gastos de tu boda bajo control</h2>
                    <p className="pres-features-sub">Mantén a raya el presupuesto de tu boda. Controla los gastos, programa pagos y haz seguimiento de lo que está pendiente de pagar, ¡y todo ello sin pasarte un solo peso del presupuesto inicial!</p>
                    <div className="pres-features-grid">
                        {FEATURES.map(f => (
                            <div key={f.title} className="pres-feature-card">
                                <span className="pres-feature-emoji">{f.emoji}</span>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DESGLOSE ── */}
            <section className="pres-table-section container">
                <h2 className="pres-table-title">Desglose por categoría</h2>
                <div className="pres-table-wrap">
                    <div className="pres-table-head">
                        <span>Categoría</span>
                        <span>Estimado</span>
                        <span>Pagado</span>
                        <span>Pendiente</span>
                        <span>% del total</span>
                    </div>
                    {categories.map(cat => (
                        <div key={cat.id} className="pres-table-row">
                            <div className="pres-table-cat">
                                <span className="pres-cat-dot" style={{ background: cat.color }} />
                                <cat.icon size={16} className="pres-cat-icon" />
                                <span>{cat.label}</span>
                            </div>
                            <div className="pres-table-field">
                                <span className="pres-currency-sm">$</span>
                                <input
                                    type="number"
                                    value={cat.estimado}
                                    min={0}
                                    onChange={e => updateEstimado(cat.id, Number(e.target.value))}
                                    className="pres-amount-input"
                                />
                            </div>
                            <div className="pres-table-paid">${cat.pagado.toLocaleString()}</div>
                            <div className={`pres-table-pending ${cat.estimado - cat.pagado > 0 ? 'pend' : 'ok'}`}>
                                ${(cat.estimado - cat.pagado).toLocaleString()}
                            </div>
                            <div className="pres-table-pct-wrap">
                                <div className="pres-pct-bar">
                                    <div
                                        className="pres-pct-fill"
                                        style={{ width: `${Math.min(100, Math.round(cat.estimado / (totalEstimado || 1) * 100))}%`, background: cat.color }}
                                    />
                                </div>
                                <span>{Math.round(cat.estimado / (totalEstimado || 1) * 100)}%</span>
                            </div>
                        </div>
                    ))}
                    <div className="pres-table-total">
                        <span>TOTAL</span>
                        <span>${totalEstimado.toLocaleString()}</span>
                        <span>${totalPagado.toLocaleString()}</span>
                        <span>${(totalEstimado - totalPagado).toLocaleString()}</span>
                        <span>100%</span>
                    </div>
                </div>
            </section>

        </div>
    );
}
