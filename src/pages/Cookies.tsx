import { useEffect } from 'react';
import './Legal.css';

export default function Cookies() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page">
            <div className="container">
                <div className="legal-header">
                    <h1>Política de Cookies</h1>
                    <p className="legal-update">Última actualización: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="legal-content-card">
                    <div className="legal-text">
                        <h2>1. Uso de Cookies</h2>
                        <p>El sitio web <strong>noscasamos.uy</strong> utiliza cookies y tecnologías con fines similares para asegurar el correcto funcionamiento de la plataforma, medir el tráfico, y ofrecer una experiencia de usuario personalizada. Al navegar por este sitio web, usted consiente la instalación de estas cookies en su dispositivo.</p>

                        <h2>2. Tipología de Cookies</h2>
                        <p>A efectos de mantener la transparencia de nuestra operativa, detallamos a continuación la clasificación de cookies implementadas:</p>
                        <ul>
                            <li><strong>Cookies estrictamente necesarias:</strong> Indispensables para la prestación de los servicios solicitados por el usuario, la navegación por la plataforma y la utilización de las diferentes opciones o servicios que en ella existen, como controlar el fraude, identificar la sesión, o acceder a áreas de acceso restringido.</li>
                            <li><strong>Cookies de rendimiento y análisis:</strong> Aquellas que permiten el seguimiento y análisis del comportamiento de los usuarios en los sitios web a los que están vinculadas, destinadas a la medición de la actividad para introducir mejoras en función del análisis de los datos de uso.</li>
                            <li><strong>Cookies de personalización e interfaz:</strong> Aquellas que permiten recordar información para que el usuario acceda al servicio con determinadas características que pueden diferenciar su experiencia de la de otros usuarios (ej. el idioma).</li>
                        </ul>

                        <h2>3. Transferencia y Cookies de Terceros</h2>
                        <p>Informamos que ciertos servicios son prestados mediante proveedores externos (tales como servicios de analítica provistos por Google Analytics). Dichos proveedores de servicios instalan sus propias cookies en su equipo en nuestro nombre, bajo sus respectivas políticas de privacidad.</p>

                        <h2>4. Gestión y Revocación del Consentimiento</h2>
                        <p>El usuario puede restringir, bloquear o borrar las cookies de <strong>noscasamos.uy</strong> utilizando su navegador. La operativa varía en función del navegador utilizado, pudiendo consultar la sección de Ayuda de su navegador para la gestión de las tecnologías de rastreo. La restricción de cookies estrictamente necesarias puede comprometer el normal funcionamiento del presente sitio web.</p>

                        <h2>5. Actualizaciones de la Política</h2>
                        <p>La presente Política de Cookies puede verse modificada en función de exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas por las respectivas autoridades de protección de datos.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
