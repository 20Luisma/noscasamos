import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-color)',
            padding: '3rem 2rem',
            fontFamily: 'var(--font-body)',
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '2rem',
            }}>
                {/* Brand */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                        <Heart size={18} style={{ color: 'var(--primary)', fill: 'none', stroke: 'var(--primary)' }} />
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--secondary)' }}>
                            noscasamos
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', maxWidth: '240px', lineHeight: '1.6' }}>
                        El directorio de bodas más completo de Uruguay.
                    </p>
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                    <div>
                        <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-light)', fontWeight: 600, marginBottom: '0.75rem' }}>
                            Explorar
                        </p>
                        {['Banquetes', 'Fotógrafos', 'Música', 'Catering'].map(l => (
                            <Link key={l} to="/directorio" style={{ display: 'block', color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '0.4rem', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--text-main)'}
                                onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--text-light)'}
                            >{l}</Link>
                        ))}
                    </div>
                    <div>
                        <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-light)', fontWeight: 600, marginBottom: '0.75rem' }}>
                            Empresa
                        </p>
                        {['Sobre nosotros', 'Trabaja con nosotros', 'Contacto', 'Prensa'].map(l => (
                            <span key={l} style={{ display: 'block', color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '0.4rem', cursor: 'pointer' }}>{l}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{
                maxWidth: '1200px',
                margin: '2rem auto 0',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
            }}>
                <p style={{ color: 'var(--text-light)', fontSize: '0.78rem', letterSpacing: '0.02em' }}>
                    © {new Date().getFullYear()} noscasamos · Todos los derechos reservados
                </p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    {['Privacidad', 'Términos', 'Cookies'].map(l => (
                        <span key={l} style={{ color: 'var(--text-light)', fontSize: '0.78rem', cursor: 'pointer' }}>{l}</span>
                    ))}
                </div>
            </div>
        </footer>
    );
}
