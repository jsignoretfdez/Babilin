import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm">
        <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-4">
              <Link to="/">
                <img alt="Babilín Logo" className="h-16 md:h-20 w-auto object-contain" src="/imagenes/logo.png" />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="hidden md:flex items-center gap-4">
                  <span className="font-label-lg text-on-surface-variant">Hola, {user.name}</span>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="bg-primary-container text-on-primary-container font-label-lg px-6 py-2 rounded-lg hover:opacity-80 transition-opacity">
                      Admin
                    </Link>
                  )}
                  {user.role === 'parent' && (
                    <Link to="/padres" className="bg-primary-container text-on-primary-container font-label-lg px-6 py-2 rounded-lg hover:opacity-80 transition-opacity">
                      Portal Padres
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-primary font-label-lg px-6 py-2 rounded-lg border border-primary hover:bg-primary/5 transition-colors">
                    Salir
                  </button>
                </div>
              ) : (
                <Link to="/login" className="hidden md:block bg-primary-container text-on-primary-container font-label-lg px-6 py-2 rounded-lg hover:opacity-80 transition-opacity">
                  Acceso padres
                </Link>
              )}
              <button className="md:hidden text-primary p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <span className="material-symbols-outlined text-3xl">menu</span>
              </button>
            </div>
          </div>
          <nav className="hidden md:flex items-center justify-center gap-8 h-12 border-t border-outline-variant/30">
            <Link className="font-label-md text-label-md text-primary font-bold hover:opacity-80 transition-opacity uppercase tracking-wide" to="/">
              Inicio
            </Link>
            <a className="font-label-md text-label-md text-on-surface-variant hover:opacity-80 transition-opacity uppercase tracking-wide" href="/#sobre-nosotros">
              Sobre nosotros
            </a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:opacity-80 transition-opacity uppercase tracking-wide" href="/#proyecto-educativo">
              Proyecto educativo
            </a>
            <Link className="font-label-md text-label-md text-on-surface-variant hover:opacity-80 transition-opacity uppercase tracking-wide" to="/galeria">
              Instalaciones
            </Link>
            <a className="font-label-md text-label-md text-on-surface-variant hover:opacity-80 transition-opacity uppercase tracking-wide" href="/#contacto">
              Contacto
            </a>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-surface/95 backdrop-blur-lg px-margin-mobile flex flex-col gap-6">
          <div className="flex justify-end p-margin-mobile h-24 items-center">
            <button className="text-primary p-2" onClick={() => setMobileMenuOpen(false)}>
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>
          <nav className="flex flex-col gap-6 items-center text-center">
            <Link className="font-headline-sm text-headline-sm text-primary font-bold" to="/" onClick={() => setMobileMenuOpen(false)}>
              Inicio
            </Link>
            <a className="font-headline-sm text-headline-sm text-on-surface-variant" href="/#sobre-nosotros" onClick={() => setMobileMenuOpen(false)}>
              Sobre nosotros
            </a>
            <a className="font-headline-sm text-headline-sm text-on-surface-variant" href="/#proyecto-educativo" onClick={() => setMobileMenuOpen(false)}>
              Proyecto educativo
            </a>
            <Link className="font-headline-sm text-headline-sm text-on-surface-variant" to="/galeria" onClick={() => setMobileMenuOpen(false)}>
              Instalaciones
            </Link>
            <a className="font-headline-sm text-headline-sm text-on-surface-variant" href="/#contacto" onClick={() => setMobileMenuOpen(false)}>
              Contacto
            </a>
            <hr className="w-full border-outline-variant/30 my-4" />
            {user ? (
              <>
                <span className="font-label-lg text-on-surface-variant">Hola, {user.name}</span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="bg-primary-container text-on-primary-container font-label-lg px-10 py-4 rounded-lg w-full max-w-xs" onClick={() => setMobileMenuOpen(false)}>
                    Admin
                  </Link>
                )}
                {user.role === 'parent' && (
                  <Link to="/padres" className="bg-primary-container text-on-primary-container font-label-lg px-10 py-4 rounded-lg w-full max-w-xs" onClick={() => setMobileMenuOpen(false)}>
                    Portal Padres
                  </Link>
                )}
                <button onClick={handleLogout} className="text-primary font-label-lg px-10 py-4 rounded-lg border border-primary w-full max-w-xs">
                  Salir
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-primary-container text-on-primary-container font-label-lg px-10 py-4 rounded-lg w-full max-w-xs" onClick={() => setMobileMenuOpen(false)}>
                Acceso padres
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
