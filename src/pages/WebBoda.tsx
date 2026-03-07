import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Calendar, Clock, Share2, Camera } from 'lucide-react';
import './WebBoda.css';

/* ─── Features ──────────────────────────────────────────────── */
const FEATURES = [
    { emoji: '🍹', title: 'Comparte los detalles', desc: 'Informa a los invitados sobre el programa, localizaciones y novedades de la boda.' },
    { emoji: '✉️', title: 'Pide confirmación de asistencia', desc: 'Las respuestas de tus invitados se sincronizan con la Lista de Invitados.' },
    { emoji: '📷', title: 'El álbum de tu boda', desc: 'Crea tu álbum para que los invitados suban las fotos que hagan durante la boda.' },
];

/* ─── Templates ─────────────────────────────────────────────── */
const TEMPLATES = [
    { id: 1, name: 'Jardín Romántico', palette: ['#e8d5c4', '#c9a882', '#7a5c3a'], style: 'elegant', dark: false },
    { id: 2, name: 'Atardecer Dorado', palette: ['#f5c842', '#e07b5a', '#fff'], style: 'modern', dark: false },
    { id: 3, name: 'Noche Estrellada', palette: ['#1a1a2e', '#c8264a', '#fff'], style: 'dark', dark: true },
    { id: 4, name: 'Brisa de Mar', palette: ['#a8d8ea', '#aa96da', '#fff'], style: 'beach', dark: false },
    { id: 5, name: 'Bosque Encantado', palette: ['#2d6a4f', '#95d5b2', '#fff'], style: 'nature', dark: true },
    { id: 6, name: 'Floral Clásico', palette: ['#f7c5cc', '#e63946', '#fff'], style: 'classic', dark: false },
];

/* ─── Mini wedding website preview ─────────────────────────── */
function TemplateCard({ tpl, selected, onClick }: { tpl: typeof TEMPLATES[0]; selected: boolean; onClick: () => void }) {
    const [bg, accent] = tpl.palette;
    return (
        <div className={`tpl-card ${selected ? 'selected' : ''}`} onClick={onClick}>
            <div className="tpl-preview" style={{ background: bg }}>
                {/* Fake header */}
                <div className="tpl-fake-nav" style={{ background: tpl.dark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)' }}>
                    <span style={{ color: tpl.dark ? '#fff' : '#333', fontSize: 5, letterSpacing: 1 }}>◆ ◆ ◆</span>
                </div>
                {/* Fake hero image block */}
                <div className="tpl-fake-hero" style={{ background: `linear-gradient(135deg, ${accent}55, ${bg})` }}>
                    <p className="tpl-fake-names" style={{ color: tpl.dark ? '#fff' : '#333' }}>SOFÍA & LUCAS</p>
                    <p className="tpl-fake-date" style={{ color: accent }}>15 Noviembre 2025</p>
                </div>
                <div className="tpl-fake-body">
                    <div className="tpl-fake-line" style={{ background: accent + '80' }} />
                    <div className="tpl-fake-line short" style={{ background: accent + '50' }} />
                </div>
                {selected && <div className="tpl-selected-badge">✓ Seleccionado</div>}
            </div>
            <p className="tpl-name">{tpl.name}</p>
        </div>
    );
}

/* ─── Component ─────────────────────────────────────────────── */
export default function WebBoda() {
    const [selectedTpl, setSelectedTpl] = useState(1);
    const [names, setNames] = useState({ novio: 'Lucas', novia: 'Sofía' });
    const [weddingDate, setDate] = useState('2025-11-15');
    const [venue, setVenue] = useState('Estancia La Paz, Canelones');
    const [message, setMessage] = useState('Con inmensa alegría les invitamos a celebrar el día más especial de nuestras vidas.');
    const [copied, setCopied] = useState(false);

    const tpl = TEMPLATES.find(t => t.id === selectedTpl) || TEMPLATES[0];
    const [bg, accent] = tpl.palette;

    const formattedDate = weddingDate
        ? new Date(weddingDate + 'T12:00:00').toLocaleDateString('es-UY', { day: 'numeric', month: 'long', year: 'numeric' })
        : '—';

    const handleCopy = () => {
        navigator.clipboard.writeText('https://noscasamos.uy/boda/sofia-lucas-2025');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="webboda-page">

            {/* ── HERO ── */}
            <section className="wb-hero">
                <div className="wb-hero-left">
                    <nav className="wb-breadcrumb">
                        <Link to="/">Inicio</Link><span>/</span>
                        <span>Mi boda</span><span>/</span>
                        <strong>Web de Boda</strong>
                    </nav>
                    <h1 className="wb-hero-title">Web de Boda</h1>
                    <p className="wb-hero-sub">Crea gratis una web personalizada para tu boda en pocos pasos y comparte con tus invitados todos los detalles del gran día.</p>
                    <a href="#editor" className="btn-primary wb-cta">Empieza a personalizar</a>
                    <p className="wb-login-hint">¿Ya tienes cuenta? <Link to="/" className="wb-link">Accede</Link></p>
                </div>
                <div className="wb-hero-right">
                    {/* Stacked device mockup */}
                    <div className="wb-devices">
                        <div className="wb-tablet-wrap">
                            <div className="wb-tablet" style={{ background: bg }}>
                                <div className="wb-t-nav" style={{ background: tpl.dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.8)' }}>
                                    <span style={{ color: tpl.dark ? '#fff' : '#333', fontSize: 8 }}>noscasamos.uy</span>
                                </div>
                                <div className="wb-t-hero" style={{ background: `linear-gradient(135deg, ${accent}55, ${bg})` }}>
                                    <p style={{ color: tpl.dark ? '#fff' : '#333', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>{names.novia.toUpperCase()} & {names.novio.toUpperCase()}</p>
                                    <p style={{ color: accent, fontSize: 9 }}>{formattedDate}</p>
                                </div>
                                <div style={{ padding: '6px 10px' }}>
                                    <div style={{ height: 3, background: accent + '60', borderRadius: 2, marginBottom: 3 }} />
                                    <div style={{ height: 3, width: '60%', background: accent + '40', borderRadius: 2 }} />
                                </div>
                            </div>
                        </div>
                        <div className="wb-phone-wrap">
                            <div className="wb-phone" style={{ background: tpl.dark ? '#1a1a2e' : '#f5f0ea' }}>
                                <div style={{ padding: '8px 8px 4px' }}>
                                    <p style={{ color: tpl.dark ? '#fff' : '#333', fontSize: 7, fontWeight: 700, textAlign: 'center', letterSpacing: 0.5 }}>{names.novia} & {names.novio}</p>
                                </div>
                                <div style={{ height: 40, background: `linear-gradient(135deg, ${accent}55, ${bg})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Heart size={14} fill={accent} color={accent} />
                                </div>
                                <div style={{ padding: '4px 8px' }}>
                                    <div style={{ height: 2, background: accent + '60', borderRadius: 1, marginBottom: 2 }} />
                                    <div style={{ height: 2, width: '70%', background: accent + '40', borderRadius: 1 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="wb-features">
                <div className="container wb-features-inner">
                    <h2>Consigue una web a la última, fácil de usar y personalizable</h2>
                    <p className="wb-feat-sub">Elige tu diseño favorito, añade los detalles de la boda y comparte con tus invitados.</p>
                    <div className="wb-features-grid">
                        {FEATURES.map(f => (
                            <div key={f.title} className="wb-feature-card">
                                <span className="wb-feat-emoji">{f.emoji}</span>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TEMPLATE GALLERY ── */}
            <section className="wb-templates container">
                <h2 className="wb-section-title">Crea y personaliza tu web de boda en minutos</h2>
                <p className="wb-section-sub">Elige entre decenas de diseños el que más te guste, personaliza las secciones y comparte la web con tus invitados.</p>
                <div className="wb-tpl-grid">
                    {TEMPLATES.map(t => (
                        <TemplateCard key={t.id} tpl={t} selected={selectedTpl === t.id} onClick={() => setSelectedTpl(t.id)} />
                    ))}
                </div>
            </section>

            {/* ── EDITOR / PREVIEW ── */}
            <section className="wb-editor container" id="editor">
                <h2 className="wb-section-title">Personaliza tu web de boda</h2>
                <div className="wb-editor-body">

                    {/* Form */}
                    <div className="wb-form">
                        <div className="wb-form-row">
                            <div className="wb-field">
                                <label>Nombre de la novia</label>
                                <input value={names.novia} onChange={e => setNames(p => ({ ...p, novia: e.target.value }))} />
                            </div>
                            <div className="wb-field">
                                <label>Nombre del novio</label>
                                <input value={names.novio} onChange={e => setNames(p => ({ ...p, novio: e.target.value }))} />
                            </div>
                        </div>
                        <div className="wb-field">
                            <label><Calendar size={14} /> Fecha de la boda</label>
                            <input type="date" value={weddingDate} onChange={e => setDate(e.target.value)} />
                        </div>
                        <div className="wb-field">
                            <label><MapPin size={14} /> Lugar de celebración</label>
                            <input value={venue} onChange={e => setVenue(e.target.value)} placeholder="Nombre del lugar, ciudad" />
                        </div>
                        <div className="wb-field">
                            <label>Mensaje para los invitados</label>
                            <textarea rows={3} value={message} onChange={e => setMessage(e.target.value)} />
                        </div>

                        <div className="wb-share-row">
                            <div className="wb-share-url">
                                <Share2 size={14} />
                                <span>noscasamos.uy/boda/sofia-lucas-2025</span>
                            </div>
                            <button className="wb-copy-btn" onClick={handleCopy}>
                                {copied ? '✓ Copiado' : 'Copiar enlace'}
                            </button>
                        </div>
                    </div>

                    {/* Live preview */}
                    <div className="wb-preview-wrap">
                        <p className="wb-preview-label"><Camera size={13} /> Vista previa</p>
                        <div className="wb-preview-site" style={{ background: bg }}>
                            <div className="wb-ps-nav" style={{ background: tpl.dark ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.85)' }}>
                                <span style={{ color: tpl.dark ? '#fff' : '#555', fontSize: 10 }}>noscasamos.uy</span>
                                <div className="wb-ps-nav-links" style={{ color: tpl.dark ? '#ccc' : '#888' }}>
                                    <span>Inicio</span><span>Programa</span><span>Lugar</span><span>RSVP</span>
                                </div>
                            </div>
                            <div className="wb-ps-hero" style={{ background: `linear-gradient(135deg, ${accent}40, ${bg}ee)` }}>
                                <Heart size={20} fill={accent} color={accent} className="wb-ps-heart" />
                                <h3 style={{ color: tpl.dark ? '#fff' : '#2c2c2c' }}>
                                    {names.novia} & {names.novio}
                                </h3>
                                <div className="wb-ps-meta">
                                    <span style={{ color: accent }}><Calendar size={12} /> {formattedDate}</span>
                                    <span style={{ color: tpl.dark ? '#ccc' : '#666' }}><MapPin size={12} /> {venue || '—'}</span>
                                    <span style={{ color: tpl.dark ? '#ccc' : '#666' }}><Clock size={12} /> 19:00 hs</span>
                                </div>
                            </div>
                            <div className="wb-ps-body">
                                <p className="wb-ps-msg" style={{ color: tpl.dark ? '#ccc' : '#555' }}>{message}</p>
                                <button className="wb-ps-rsvp" style={{ background: accent, color: tpl.dark || accent === '#c8264a' ? '#fff' : '#fff' }}>
                                    Confirmar asistencia
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
