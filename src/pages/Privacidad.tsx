import { useEffect } from 'react';
import './Legal.css';

export default function Privacidad() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page">
            <div className="container">
                <div className="legal-header">
                    <h1>Política de Privacidad</h1>
                    <p className="legal-update">Última actualización: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="legal-content-card">
                    <div className="legal-text">
                        <h2>1. Introducción</h2>
                        <p>En <strong>noscasamos.uy</strong> respetamos tu privacidad y estamos comprometidos con la protección de los datos personales de nuestros usuarios. Esta política explica cómo recopilamos, usamos y protegemos tu información cuando utilizas nuestro sitio web.</p>

                        <h2>2. Información que recopilamos</h2>
                        <p>Podemos recopilar dos tipos de información:</p>
                        <ul>
                            <li><strong>Datos proporcionados por el usuario:</strong> Nombre, dirección de correo electrónico, teléfono, detalles de la boda y cualquier otra información que ofrezcas al registrarte o contactarnos.</li>
                            <li><strong>Datos recogidos automáticamente:</strong> Direcciones IP, tipo de navegador, páginas visitadas y tiempos de navegación mediante el uso de cookies.</li>
                        </ul>

                        <h2>3. Uso de la información</h2>
                        <p>Utilizamos la información recopilada para:</p>
                        <ul>
                            <li>Proporcionar y mejorar nuestros servicios.</li>
                            <li>Personalizar tu experiencia como pareja organizadora o proveedor.</li>
                            <li>Enviar comunicaciones relevantes, como actualizaciones o respuestas a consultas.</li>
                        </ul>

                        <h2>4. Compartir información</h2>
                        <p>No vendemos ni alquilamos tus datos personales a terceros. Podemos compartir información con proveedores de servicios de confianza que nos asisten en operar el sitio, siempre bajo confidencialidad estricta.</p>

                        <h2>5. Seguridad de los datos</h2>
                        <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra acceso no autorizado, alteración, divulgación o destrucción.</p>

                        <h2>6. Tus derechos</h2>
                        <p>Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento. Para ejercer estos derechos, contáctanos en <a href="mailto:hola@noscasamos.uy">hola@noscasamos.uy</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
