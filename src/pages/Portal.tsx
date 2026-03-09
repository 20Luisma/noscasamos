import { Link } from 'react-router-dom';
import './Portal.css';

export default function Portal() {
    return (
        <div className="portal-container">
            {/* Wedding Side (noscasamos.uy) */}
            <Link to="/noscasamos" className="portal-side bodas">
                <div className="portal-bg"></div>
                <div className="portal-overlay"></div>
                <div className="portal-content">
                    <h1 className="portal-logo">noscasamos.uy</h1>
                    <p className="portal-desc">Todo lo que necesitas para organizar la boda perfecta en Uruguay.</p>
                    <span className="portal-btn">Entrar a Bodas</span>
                </div>
            </Link>

            {/* Quinceañera Side (mis15.uy) */}
            <div className="portal-side quince" onClick={() => alert("¡La plataforma de 15 Años (mis15.uy) estará disponible muy pronto! Por ahora visita nuestra sección de Bodas.")}>
                <div className="portal-bg"></div>
                <div className="portal-overlay"></div>
                <div className="portal-content">
                    <h1 className="portal-logo">mis15.uy</h1>
                    <p className="portal-desc">Descubre los mejores proveedores y vestidos para tu fiesta de 15.</p>
                    <span className="portal-btn">Entrar a mis15</span>
                </div>
            </div>
        </div>
    );
}
