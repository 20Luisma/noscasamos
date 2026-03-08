import { useEffect } from 'react';
import { Heart, Users, Search, Handshake } from 'lucide-react';
import './SobreNosotros.css';

export default function SobreNosotros() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="sobre-page">
            {/* ── HERO ── */}
            <section className="sobre-hero">
                <div className="sobre-hero-content container">
                    <h1 className="sobre-hero-title">Ayudamos a las parejas a vivir el mejor día de sus vidas</h1>
                    <p className="sobre-hero-subtitle">
                        En <strong>noscasamos</strong> creemos que organizar una boda debería ser tan emocionante y alegre como la boda en sí misma.
                        Somos el directorio nupcial líder en Uruguay, conectando a parejas con los profesionales de bodas más destacados del país.
                    </p>
                </div>
                <div className="sobre-hero-bg"></div>
            </section>

            {/* ── METRICS (Stats) ── */}
            <section className="sobre-stats container">
                <div className="stat-card">
                    <div className="stat-number">+1.500</div>
                    <div className="stat-label">Proveedores en Uruguay</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">10.000</div>
                    <div className="stat-label">Parejas felices al año</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">+50.000</div>
                    <div className="stat-label">Opiniones reales</div>
                </div>
            </section>

            {/* ── NOSOTROS INFO ── */}
            <section className="sobre-info container">
                <div className="sobre-info-text">
                    <h2>Nuestra Misión</h2>
                    <p>
                        Nuestra misión es hacer que la planificación de bodas sea accesible, inspiradora y sin estrés para todas las parejas de Uruguay,
                        ofreciendo la plataforma más completa con herramientas de planificación gratuitas, inspiración diaria y un directorio de
                        proveedores de confianza.
                    </p>
                    <p>
                        Desde los lugares más idílicos en Punta del Este hasta las estancias más tradicionales en el interior, trabajamos día a día
                        para que cada historia de amor tenga la celebración que merece.
                    </p>
                </div>
                <div className="sobre-info-image">
                    <img src="https://images.ecestaticos.com/5BuWLgl0Wsh5nshR8OkWUN9slNQ=/78x1:2099x1517/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Ffd7%2Fe82%2F635%2Ffd7e82635bff8bb2d88981db238f1c26.jpg" alt="Pareja casándose y celebrando" />
                </div>
            </section>

            {/* ── NUESTROS VALORES ── */}
            <section className="sobre-valores">
                <div className="container">
                    <h2 className="valores-title">Nuestros valores</h2>
                    <div className="valores-grid">
                        <div className="valor-card">
                            <Heart className="valor-icon" size={32} />
                            <h3>Pasión por el amor</h3>
                            <p>Nos mueve celebrar las historias verdaderas y acompañar a las parejas en su aventura hacia el altar.</p>
                        </div>
                        <div className="valor-card">
                            <Search className="valor-icon" size={32} />
                            <h3>Transparencia total</h3>
                            <p>Creemos en las opiniones reales y la información accesible para ayudar a tomar las mejores decisiones.</p>
                        </div>
                        <div className="valor-card">
                            <Users className="valor-icon" size={32} />
                            <h3>Comunidad unida</h3>
                            <p>Conectamos personas. Construimos una comunidad donde novias, novios y proveedores se impulsan mutuamente.</p>
                        </div>
                        <div className="valor-card">
                            <Handshake className="valor-icon" size={32} />
                            <h3>Confianza</h3>
                            <p>Solo trabajamos con profesionales verificados que cumplen con nuestros estándares de calidad para tu gran día.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
