import { Mail, Search, Users, Image as ImageIcon, Megaphone, Headphones, FileText, Settings, BarChart } from 'lucide-react';
import './AccesoEmpresas.css';
import { Link } from 'react-router-dom';

const AccesoEmpresas = () => {
    return (
        <div className="acceso-empresas-page">
            {/* Custom Header for PRO */}
            <header className="pro-header">
                <div className="pro-header-container">
                    <Link to="/" className="pro-logo">
                        <span className="heart-icon">❤</span>
                        <span className="logo-text">noscasamos.uy <span className="pro-badge">PRO</span></span>
                    </Link>
                    <nav className="pro-nav">
                        <Link to="/acceso-empresas" className="active">ACCESO EMPRESAS</Link>
                        <Link to="#">VISITA GUIADA</Link>
                        <Link to="#">SERVICIOS PREMIUM</Link>
                        <Link to="#">DESCARGAR APP</Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pro-hero">
                <div className="pro-hero-overlay"></div>
                <div className="pro-hero-content container">
                    <div className="pro-hero-text">
                        <h1>¡Haz crecer tu negocio con noscasamos.uy!</h1>
                        <ul className="pro-benefits">
                            <li>
                                <span className="check-icon">✓</span>
                                Recibe solicitudes de presupuesto de novios interesados en tus servicios.
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                Consigue nuevos clientes y multiplica el éxito de tu negocio.
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                Más de 63.000 proveedores ya confían en nosotros.
                            </li>
                        </ul>
                        <button className="btn-pro-register">Regístrate gratis</button>
                    </div>

                    <div className="pro-login-box">
                        <h2>ACCESO EMPRESAS</h2>
                        <form className="pro-login-form">
                            <div className="input-group">
                                <span className="input-icon">👤</span>
                                <input type="email" placeholder="correo@ejemplo.com" />
                            </div>
                            <div className="input-group">
                                <span className="input-icon">🔒</span>
                                <input type="password" placeholder="••••••••" />
                            </div>
                            <button type="submit" className="btn-pro-login">Accede</button>
                        </form>
                        <a href="#" className="forgot-password">¿Has olvidado tu contraseña?</a>
                    </div>
                </div>
            </section>

            {/* Three Columns Steps Section */}
            <section className="pro-steps container">
                <div className="pro-step">
                    <div className="step-icon">
                        <Search size={40} strokeWidth={1.5} />
                    </div>
                    <h3>Las parejas te encuentran</h3>
                    <p>Rellenan una solicitud de presupuesto con sus datos personales y los detalles del servicio en el que están interesados.</p>
                </div>
                <div className="pro-step">
                    <div className="step-icon">
                        <Mail size={40} strokeWidth={1.5} />
                    </div>
                    <h3>Recibes solicitudes</h3>
                    <p>Podrás responder con tu email, pero te recomendamos que uses tu menú de empresa, es más cómodo.</p>
                </div>
                <div className="pro-step">
                    <div className="step-icon">
                        <Users size={40} strokeWidth={1.5} />
                    </div>
                    <h3>Consigues una boda más</h3>
                    <p>Contactas con los novios que se han interesado en tus servicios y consigues un nuevo y valioso cliente.</p>
                </div>
            </section>

            {/* What we offer Section */}
            <section className="pro-offerings-wrapper">
                <div className="container pro-offerings">
                    <h2 className="section-title">¿Qué te ofrecemos?</h2>

                    <div className="offerings-content">
                        <div className="offerings-list">
                            <div className="offering-item">
                                <div className="offering-icon"><ImageIcon size={32} strokeWidth={1.5} /></div>
                                <p>Un completo escaparate donde te verán miles de novios interesados en tus servicios.</p>
                            </div>
                            <div className="offering-item">
                                <div className="offering-icon"><Megaphone size={32} strokeWidth={1.5} /></div>
                                <p>Una plataforma de comunicación y marketing de referencia en el sector de bodas online.</p>
                            </div>
                            <div className="offering-item">
                                <div className="offering-icon"><Headphones size={32} strokeWidth={1.5} /></div>
                                <p>Un completo equipo de profesionales a tu servicio y siempre disponible que hará crecer tu negocio.</p>
                            </div>
                        </div>

                        <div className="offerings-image">
                            {/* In a real app we'd put the mockup image here. Using a placeholder graphic that mimics the laptop/phone mockup */}
                            <div className="mockup-placeholder">
                                <div className="mockup-laptop">
                                    <div className="laptop-screen">
                                        <div className="laptop-header">
                                            <span style={{ color: '#f62f5e' }}>❤ noscasamos.uy</span>
                                            <span style={{ float: 'right', fontSize: '10px', marginTop: '4px' }}>Inicio | Estadísticas | Opiniones</span>
                                        </div>
                                        <div className="laptop-body"></div>
                                    </div>
                                    <div className="laptop-base"></div>
                                </div>
                                <div className="mockup-phone">
                                    <div className="phone-screen">
                                        <div className="phone-header" style={{ height: '20px', background: '#f62f5e', color: 'white', textAlign: 'center', fontSize: '10px', paddingTop: '4px' }}>noscasamos.uy</div>
                                        <div className="phone-body" style={{ background: '#f1f1f1', height: '100%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Management Menu Section */}
            <section className="pro-management container">
                <h2 className="section-title">Tu menú de gestión</h2>

                <div className="management-content">
                    <div className="management-stats-card">
                        <div className="stat-item">
                            <div className="stat-header">
                                <Mail size={24} className="stat-icon" />
                                <span className="stat-value">1.095</span>
                            </div>
                            <p className="stat-label">Solicitudes recibidas</p>
                            <p className="stat-meta">los últimos 12 meses</p>
                        </div>
                        <div className="stat-item">
                            <div className="stat-header">
                                <span className="stat-icon">⏱</span>
                                <span className="stat-value">00h 45m</span>
                            </div>
                            <p className="stat-label">Tiempo de respuesta</p>
                            <p className="stat-meta">los últimos 12 meses</p>
                        </div>
                        <div className="stat-item">
                            <div className="stat-header">
                                <span className="stat-icon">⭐</span>
                                <span className="stat-value">33</span>
                            </div>
                            <p className="stat-label">Opiniones</p>
                            <p className="stat-meta">los últimos 12 meses</p>
                        </div>
                        <div className="stat-item">
                            <div className="stat-header">
                                <span className="stat-icon">👁</span>
                                <span className="stat-value">239.724</span>
                            </div>
                            <p className="stat-label">Impresiones de tu apartado</p>
                            <p className="stat-meta">los últimos 12 meses</p>
                        </div>
                    </div>

                    <div className="management-features">
                        <div className="mgmt-feature-item">
                            <div className="mgmt-icon"><Settings size={30} strokeWidth={1.5} /></div>
                            <p>Es una herramienta sencilla para gestionar tu escaparate, subir fotos, vídeos, promociones...</p>
                        </div>
                        <div className="mgmt-feature-item">
                            <div className="mgmt-icon"><FileText size={30} strokeWidth={1.5} /></div>
                            <p>Tendrás un sistema seguro y eficaz para ordenar, buscar y responder tus solicitudes.</p>
                        </div>
                        <div className="mgmt-feature-item">
                            <div className="mgmt-icon"><BarChart size={30} strokeWidth={1.5} /></div>
                            <p>Además podrás pedir opiniones a las novias, revisar tus estadísticas y mucho más.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA Banner */}
            <section className="pro-cta-banner">
                <div className="pro-cta-overlay"></div>
                <div className="pro-cta-content container">
                    <h2>¡Haz crecer tu negocio con noscasamos.uy!</h2>
                    <button className="btn-pro-register">Regístrate gratis</button>
                </div>
            </section>
        </div>
    );
};

export default AccesoEmpresas;
