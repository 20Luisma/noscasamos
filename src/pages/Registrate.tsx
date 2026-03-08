import { Eye, EyeOff, Facebook, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registrate.css';

const Registrate = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="registrate-page">
            <header className="registrate-header">
                <Link to="/" className="registrate-logo">
                    <span className="heart-icon">❤</span>
                    <span className="logo-text">noscasamos.uy</span>
                </Link>
            </header>

            <main className="registrate-container">
                <div className="registrate-box">

                    {/* Left Side: Image Banner */}
                    <div className="registrate-banner">
                        <div className="banner-overlay"></div>
                        <div className="banner-content">
                            <h2 className="banner-text-script">Sí, Quiero</h2>
                            <h1 className="banner-text-highlight">disfrutar</h1>
                            <p className="banner-text-sub">ORGANIZANDO MI BODA</p>
                        </div>
                    </div>

                    {/* Right Side: Form Container */}
                    <div className="registrate-form-section">
                        {/* Social Auth Buttons */}
                        <div className="social-auth-buttons">
                            <button className="btn-social btn-facebook">
                                <Facebook size={20} color="#1877F2" className="social-icon" />
                                <span>Continúa con Facebook</span>
                            </button>
                            <button className="btn-social btn-google">
                                {/* SVG Google Icon */}
                                <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span>Continúa con Google</span>
                            </button>
                            <button className="btn-social btn-apple">
                                {/* SVG Apple Icon */}
                                <svg className="social-icon" viewBox="0 0 384 512" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill="#000000" />
                                </svg>
                                <span>Continúa con Apple</span>
                            </button>
                        </div>

                        <div className="divider">
                            <span>O regístrate utilizando tu email</span>
                        </div>

                        {/* Registration Form */}
                        <form className="registrate-form">

                            <div className="form-group input-icon-right">
                                <label className="sr-only">Nombre y apellidos</label>
                                <input type="text" placeholder="Nombre y apellidos" required />
                                <span className="input-icon">👤</span>
                            </div>

                            <div className="form-group input-icon-right">
                                <label className="sr-only">Email</label>
                                <input type="email" placeholder="Email" required />
                                <Mail size={18} className="input-icon lucide" color="#999" />
                            </div>

                            <div className="form-group input-icon-right">
                                <label className="sr-only">Contraseña</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Contraseña"
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn-toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} color="#999" /> : <Eye size={18} color="#999" />}
                                </button>
                            </div>

                            <div className="form-group">
                                <label className="sr-only">Vives en...</label>
                                <select defaultValue="Uruguay" className="select-country">
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Chile">Chile</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="España">España</option>
                                    <option value="México">México</option>
                                    <option value="Peru">Perú</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group form-col input-icon-right">
                                    <label className="sr-only">Nos casamos el</label>
                                    <input type="text" placeholder="Nos casamos el" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }} />
                                    <span className="input-icon">📅</span>
                                </div>
                                <div className="form-group form-col input-icon-right">
                                    <label className="sr-only">Teléfono</label>
                                    <input type="tel" placeholder="Teléfono" />
                                    <span className="input-icon">📱</span>
                                </div>
                            </div>

                            <div className="form-group role-selector">
                                <span className="role-label">Yo soy</span>

                                <label className="radio-label">
                                    <input type="radio" name="role" value="novia" defaultChecked />
                                    <span className="radio-custom"></span>
                                    <span className="radio-text">👰 Novia</span>
                                </label>

                                <label className="radio-label">
                                    <input type="radio" name="role" value="novio" />
                                    <span className="radio-custom"></span>
                                    <span className="radio-text">🤵 Novio</span>
                                </label>

                                <label className="radio-label">
                                    <input type="radio" name="role" value="otros" />
                                    <span className="radio-custom"></span>
                                    <span className="radio-text">Otros</span>
                                </label>
                            </div>

                            <div className="form-group checkbox-group">
                                <label className="check-label">
                                    <input type="checkbox" required />
                                    <span className="check-custom"></span>
                                    <span className="check-text">
                                        He leído y acepto las <a href="#">condiciones de uso</a> y de <a href="#">Privacidad</a>
                                    </span>
                                </label>
                            </div>

                            <button type="submit" className="btn-submit-register">Registrarme</button>
                        </form>

                        <div className="form-footer">
                            <span>¿Ya tienes cuenta? </span>
                            <Link to="/accede" className="link-accede">Accede</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Registrate;
