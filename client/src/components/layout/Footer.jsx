import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-t border-outline-variant/30">
      <div className="max-w-max-width mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-outline-variant/30 items-center text-center md:text-left">
          <div>
            <h4 className="font-headline-sm text-on-surface mb-2">Escuela Infantil Babilín</h4>
            <p className="font-body-md text-on-surface-variant">Centro Autorizado por la Comunidad de Madrid. Educación infantil bilingüe en Lucero, Madrid.</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
            <Link className="font-label-md text-on-surface-variant hover:text-primary transition-colors" to="/">Inicio</Link>
            <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="/#sobre-nosotros">Sobre nosotros</a>
            <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="/#proyecto-educativo">Proyecto</a>
            <Link className="font-label-md text-on-surface-variant hover:text-primary transition-colors" to="/galeria">Instalaciones</Link>
            <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="/#contacto">Contacto</a>
          </nav>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="font-label-sm text-on-surface-variant/70">© {new Date().getFullYear()} Babilín Escuela Infantil Bilingüe Lucero, Madrid. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a className="font-label-sm text-on-surface-variant/70 hover:text-primary transition-colors" href="#">Privacidad</a>
            <a className="font-label-sm text-on-surface-variant/70 hover:text-primary transition-colors" href="#">Legal</a>
            <a className="font-label-sm text-on-surface-variant/70 hover:text-primary transition-colors" href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
