import { useEffect } from 'react';
import './TrabajaConNosotros.css';

export default function TrabajaConNosotros() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="trabaja-page">
            {/* ── HERO ── */}
            <section className="trabaja-hero">
                <div className="trabaja-hero-content container">
                    <h1 className="trabaja-hero-title">Únete a nuestra historia</h1>
                    <p className="trabaja-hero-subtitle">
                        Estamos construyendo el futuro del sector nupcial en Uruguay. Déjanos tus datos y te avisaremos cuando se abra una vacante acorde a tu perfil.
                    </p>
                </div>
                <div className="trabaja-hero-bg"></div>
            </section>

            {/* ── FORMULARIO MVP ── */}
            <section className="trabaja-form-section container">
                <div className="form-card">
                    <h2>Bolsa de empleo</h2>
                    <p className="form-desc">Rellena este breve formulario y nuestro equipo de talento te contactará si surge una oportunidad.</p>

                    <form className="mvp-form" onSubmit={(e) => { e.preventDefault(); alert('¡Gracias por tu interés! Hemos recibido tus datos.'); }}>
                        <div className="form-group">
                            <label>Nombre completo</label>
                            <input type="text" className="input-field" placeholder="Ej. Ana García" required />
                        </div>

                        <div className="form-group">
                            <label>Email de contacto</label>
                            <input type="email" className="input-field" placeholder="tu@email.com" required />
                        </div>

                        <div className="form-group">
                            <label>Área de interés</label>
                            <select className="input-field" required>
                                <option value="">Selecciona un área...</option>
                                <option value="tech">Ingeniería / Tecnología</option>
                                <option value="design">Diseño / Producto</option>
                                <option value="marketing">Marketing / Contenidos</option>
                                <option value="sales">Ventas / Comercial</option>
                                <option value="support">Atención al cliente</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Enlace a tu perfil de LinkedIn o Portfolio</label>
                            <input type="url" className="input-field" placeholder="https://linkedin.com/in/..." />
                        </div>

                        <button type="submit" className="btn btn-primary submit-btn">Enviar candidatura</button>
                    </form>
                </div>
            </section>
        </div>
    );
}
