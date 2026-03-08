import { useEffect } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import './Contacto.css';

export default function Contacto() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="contacto-page">
            {/* ── HERO ── */}
            <section className="contacto-hero">
                <div className="contacto-hero-content container">
                    <h1 className="contacto-hero-title">Estamos para ayudarte</h1>
                    <p className="contacto-hero-subtitle">
                        ¿Tienes dudas sobre cómo publicar tu empresa, organizar tu boda o colaborar con nosotros? Escríbenos o llámanos.
                    </p>
                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="contacto-content container">

                {/* Info Column */}
                <div className="contacto-info">
                    <h2>Nuestras Oficinas</h2>
                    <p className="info-intro">
                        Nuestro equipo trabaja para ofrecer el directorio de bodas número uno en Uruguay, con presencia internacional.
                    </p>

                    <div className="office-card">
                        <div className="office-header">
                            <MapPin className="office-icon" />
                            <h3>Uruguay</h3>
                        </div>
                        <p className="office-city">Montevideo</p>
                        <div className="office-detail">
                            <Phone size={16} />
                            <span>UY +598 99 845030</span>
                        </div>
                    </div>

                    <div className="office-card">
                        <div className="office-header">
                            <MapPin className="office-icon" />
                            <h3>España</h3>
                        </div>
                        <p className="office-city">Barcelona</p>
                        <div className="office-detail">
                            <Phone size={16} />
                            <span>ES +34 631 54 38 66</span>
                        </div>
                    </div>

                    <div className="general-contact">
                        <div className="office-detail">
                            <Mail size={16} />
                            <a href="mailto:hola@noscasamos.uy">hola@noscasamos.uy</a>
                        </div>
                    </div>
                </div>

                {/* Form Column */}
                <div className="contacto-form-wrapper">
                    <h2>Envíanos un mensaje</h2>
                    <form className="contacto-form" onSubmit={(e) => { e.preventDefault(); alert('¡Mensaje enviado!'); }}>
                        <div className="form-row">
                            <div className="form-group row-item">
                                <label>Nombre</label>
                                <input type="text" className="input-field" placeholder="Tu nombre..." required />
                            </div>
                            <div className="form-group row-item">
                                <label>Email</label>
                                <input type="email" className="input-field" placeholder="tu@email.com" required />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Motivo de la consulta</label>
                            <select className="input-field" required>
                                <option value="">Selecciona...</option>
                                <option value="pareja">Soy una pareja organizando la boda</option>
                                <option value="proveedor">Soy un proveedor / empresa</option>
                                <option value="soporte">Soporte técnico</option>
                                <option value="otros">Otras consultas</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Mensaje</label>
                            <textarea className="input-field" rows={5} placeholder="¿En qué te podemos ayudar?" required></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary submit-btn">Enviar Mensaje</button>
                    </form>
                </div>

            </section>
        </div>
    );
}
