import { useEffect } from 'react';
import './Legal.css';

export default function Terminos() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page">
            <div className="container">
                <div className="legal-header">
                    <h1>Términos y Condiciones</h1>
                    <p className="legal-update">Última actualización: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="legal-content-card">
                    <div className="legal-text">
                        <h2>1. Aceptación de los términos</h2>
                        <p>Al acceder y utilizar <strong>noscasamos.uy</strong>, aceptas estar sujeto a estos Términos y Condiciones de uso. Si no estás de acuerdo con alguna parte, se te prohíbe utilizar nuestro servicio.</p>

                        <h2>2. Uso del sitio</h2>
                        <p>El sitio proporciona un directorio para conectar a parejas que organizan su boda con proveedores de servicios nupciales. Al usar el sitio, te comprometes a:</p>
                        <ul>
                            <li>Proporcionar información verdadera, exacta y actual.</li>
                            <li>No utilizar el sitio con fines ilícitos o no autorizados.</li>
                            <li>No interferir ni interrumpir la seguridad o el funcionamiento del sitio.</li>
                        </ul>

                        <h2>3. Contenido del usuario</h2>
                        <p>Al publicar valoraciones, imágenes o descripciones de empresas, garantizas que tienes los derechos sobre ese contenido y nos otorgas una licencia no exclusiva para mostrarlo en la plataforma. Nos reservamos el derecho a eliminar contenido inapropiado.</p>

                        <h2>4. Relación con los proveedores</h2>
                        <p><strong>noscasamos.uy</strong> actúa como intermediario informativo. No somos responsables de los contratos, servicios, o discrepancias que surjan directamente entre las parejas y los proveedores listados.</p>

                        <h2>5. Propiedad intelectual</h2>
                        <p>Todo el contenido original del sitio, incluyendo diseño, textos institucionales, logotipos e imágenes corporativas, son propiedad exclusiva de <strong>noscasamos.uy</strong> y están protegidos por las leyes de propiedad intelectual.</p>

                        <h2>6. Modificaciones</h2>
                        <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del sitio tras cualquier cambio constituye la aceptación de los nuevos Términos y Condiciones.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
