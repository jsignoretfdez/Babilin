import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Inicio = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Babilín - Escuela Infantil Bilingüe en Lucero, Madrid",
    "description": "Escuela infantil bilingüe en el barrio de Lucero. Centro autorizado por la Comunidad de Madrid. Inmersión en inglés, cocina propia, metro y autobús."
  };

  return (
    <>
      <Helmet>
        <title>Babilín - Escuela Infantil Bilingüe en Lucero, Madrid</title>
        <meta name="description" content="Escuela infantil bilingüe autorizada en Madrid (Lucero). Educación de 0 a 3 años con inmersión en inglés. Metro Lucero L6 a 200m. Concierta tu visita." />
        <meta property="og:title" content="Babilín - Escuela Infantil Bilingüe en Lucero, Madrid" />
        <meta property="og:description" content="Centro autorizado de educación infantil bilingüe en Lucero, Madrid. Inglés nativo, cocina propia, horario ampliado. Metro Lucero y autobuses 31, 39, 158." />
        <meta property="og:url" content="https://babilin.es/" />
        <link rel="canonical" href="https://babilin.es/" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 md:py-20 flex flex-col md:flex-row items-center gap-8 max-w-[1280px] mx-auto">
        <div className="flex-1 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 bg-tertiary-container/30 text-on-tertiary-container px-3 py-1 rounded-lg w-fit">
            <span className="material-symbols-outlined text-sm">language</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider">Bilingüismo</span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
            Comenzando a descubrir <span className="text-primary">bilingual future.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            Descubre el espacio donde tu hijo/a podrá desarrollarse en un entorno seguro y estimulante, con una pedagogía basada en el juego y la inmersión lingüística.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a className="inline-flex justify-center items-center bg-primary text-on-primary font-label-lg text-label-lg px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-[0_8px_16px_rgba(190,217,238,0.3)]" href="#contacto">
              Reservar cita
            </a>
            <a className="inline-flex justify-center items-center border-2 border-primary-container text-primary font-label-lg text-label-lg px-6 py-3 rounded-lg hover:bg-primary-container/20 transition-colors" href="#sobre-nosotros">
              Saber más
            </a>
          </div>
        </div>
        <div className="flex-1 w-full aspect-square md:aspect-[4/3] rounded-lg overflow-hidden relative shadow-[0_20px_40px_rgba(190,217,238,0.2)] border border-surface-container-lowest">
          <img alt="Children playing" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfAR3Co6psQZK54GQmYqHCT2iYHeFniYMD4L_8mkLLjqC3hQRq8fYWDUsAUbv8R6j0nBU1Q8kNfoYxPKZTOvTpcEsR4yYkFJYoq_ee-Uwp_cIncHDjQxoygajyct9vm7ZfrZu6EvukT_uunna4-tQzJCtpHkjUWii5DJNGFvNsOhX5gm14zPBQTlrN3GveOycx3Iw_7Cajwkmbl36YPjBaGXpdsZKBeWsc0VOTPt-X1nhTfj_TesHkDGHJfRZoyy7q9c74O4fi9no" />
        </div>
      </section>

      {/* Centro Autorizado Badge */}
      <section className="bg-primary-container/20 py-8 px-margin-mobile">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
          <span className="material-symbols-outlined text-primary text-4xl">verified</span>
          <div>
            <h3 className="font-headline-sm text-on-surface">Centro Autorizado por la Comunidad de Madrid</h3>
            <p className="font-body-md text-on-surface-variant">Cumplimos con todos los requisitos y normativas de educación infantil.</p>
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 md:py-20 scroll-mt-36" id="sobre-nosotros">
        <div className="max-w-[800px] mx-auto text-center flex flex-col gap-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">Sobre Nosotros</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            En Babilín, creemos que los primeros años son fundamentales para el desarrollo integral del niño. Nuestra filosofía se basa en el respeto, el cariño y la estimulación temprana a través del juego, creando un entorno seguro y feliz donde cada niño puede desarrollar su máximo potencial a su propio ritmo.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 md:py-20 bg-surface-container-low/50 scroll-mt-36" id="proyecto-educativo">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Nuestros Pilares Educativos</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Juego basado en la exploración y el descubrimiento</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[0_10px_30px_rgba(190,217,238,0.15)] border border-surface-variant/50 flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary-container/30 text-primary rounded-full flex items-center justify-center mb-2">
                <span className="material-symbols-outlined">forum</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Inmersión Nativa</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">A diario interactuamos en inglés para asegurar una adquisición natural del lenguaje desde el primer día.</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[0_10px_30px_rgba(190,217,238,0.15)] border border-surface-variant/50 flex flex-col gap-4 md:col-span-2">
              <div className="w-12 h-12 bg-tertiary-container/30 text-tertiary rounded-full flex items-center justify-center mb-2">
                <span className="material-symbols-outlined">psychology_alt</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Inteligencia Emocional</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Priorizamos el desarrollo de habilidades emocionales y sociales a través de juegos guiados y actividades conscientes, construyendo una base sólida para el aprendizaje futuro.</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[0_10px_30px_rgba(190,217,238,0.15)] border border-surface-variant/50 flex flex-col gap-4 md:col-span-2">
              <div className="w-12 h-12 bg-secondary-container/30 text-secondary rounded-full flex items-center justify-center mb-2">
                <span className="material-symbols-outlined">nature_people</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Exploracion</h3>
              <p className="font-body-md text-body-md text-on-surface-variant"> A diario salimos a explorar nuestro patio, fomentando el desarrollo físico y la conexión con los compañeros.</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[0_10px_30px_rgba(190,217,238,0.15)] border border-surface-variant/50 flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary-container/30 text-primary rounded-full flex items-center justify-center mb-2">
                <span className="material-symbols-outlined">palette</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Expresiones Creativas</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Arte, música y movimiento se integran diariamente para estimular la creatividad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instalaciones */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 md:py-20 scroll-mt-36" id="instalaciones">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Nuestras Instalaciones</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-2xl mx-auto">Espacios luminosos, seguros y diseñados específicamente para las necesidades de los más pequeños.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="aspect-square bg-surface-variant rounded-lg overflow-hidden">
              <div className="w-full h-full bg-primary-container/20 flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-primary/50">photo_camera</span></div>
            </div>
            <div className="aspect-square bg-surface-variant rounded-lg overflow-hidden">
              <div className="w-full h-full bg-secondary-container/20 flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-secondary/50">photo_camera</span></div>
            </div>
            <div className="aspect-square bg-surface-variant rounded-lg overflow-hidden">
              <div className="w-full h-full bg-tertiary-container/20 flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-tertiary/50">photo_camera</span></div>
            </div>
            <div className="aspect-square bg-surface-variant rounded-lg overflow-hidden">
              <div className="w-full h-full bg-primary-container/20 flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-primary/50">photo_camera</span></div>
            </div>
          </div>
          <Link className="inline-flex justify-center items-center border border-outline text-on-surface font-label-lg px-6 py-2 rounded-lg hover:bg-surface-variant transition-colors" to="/galeria">
            Galería completa
          </Link>
        </div>
      </section>

      {/* Servicios */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 md:py-20 bg-surface-container-low/50">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-10 text-center">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-surface-variant/50">
              <span className="material-symbols-outlined text-primary mb-4 text-3xl">school</span>
              <h3 className="font-headline-sm mb-2">Becas CAM</h3>
              <p className="font-body-md text-on-surface-variant">Tramitamos y aceptamos las Becas de la Comunidad de Madrid para el primer ciclo de Educación Infantil.</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-surface-variant/50">
              <span className="material-symbols-outlined text-primary mb-4 text-3xl">redeem</span>
              <h3 className="font-headline-sm mb-2">Cheques Guardería</h3>
              <p className="font-body-md text-on-surface-variant">Aceptamos todos los cheques guardería (Edenred, Sodexo, Cobee, etc.) como forma de pago.</p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-surface-variant/50">
              <span className="material-symbols-outlined text-primary mb-4 text-3xl">account_balance</span>
              <h3 className="font-headline-sm mb-2">Deducciones Fiscales</h3>
              <p className="font-body-md text-on-surface-variant">Al ser un centro autorizado, te beneficias de las deducciones fiscales por gastos de guardería en la renta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 md:py-20 scroll-mt-36" id="contacto">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <h2 className="font-headline-md text-headline-md text-on-surface">Contacta con Nosotros</h2>
            <p className="font-body-md text-on-surface-variant">Estamos encantados de resolver cualquier duda y organizar una visita para que conozcas nuestra escuela.</p>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block font-label-sm text-on-surface-variant mb-1" htmlFor="name">Nombre</label>
                <input className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest" id="name" type="text" />
              </div>
              <div>
                <label className="block font-label-sm text-on-surface-variant mb-1" htmlFor="email">Email</label>
                <input className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest" id="email" type="email" />
              </div>
              <div>
                <label className="block font-label-sm text-on-surface-variant mb-1" htmlFor="message">Mensaje</label>
                <textarea className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest" id="message" rows="4"></textarea>
              </div>
              <button className="bg-primary text-on-primary font-label-lg px-6 py-3 rounded-lg hover:opacity-90 transition-opacity w-fit mt-2" type="button">
                Enviar Mensaje
              </button>
            </form>
          </div>
          <div className="bg-surface-variant rounded-lg overflow-hidden flex flex-col">
            <div className="flex-1 bg-surface-container flex items-center justify-center p-8 text-center border-b border-outline-variant/30">
              <div className="flex flex-col items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl">map</span>
                <span className="font-label-lg">Donde Estamos</span>
              </div>
            </div>
            <div className="p-6 bg-surface-container-lowest">
              <h3 className="font-headline-sm mb-2 text-on-surface">Escuela infantil Babilin</h3>
              <p className="font-body-md text-on-surface-variant flex items-center gap-2 mb-1"><span className="material-symbols-outlined text-sm">location_on</span> Calle Almazán, 2, 28011 Madrid (Lucero)</p>
              <p className="font-body-md text-on-surface-variant flex items-center gap-2 mb-1"><span className="material-symbols-outlined text-sm">directions_subway</span> Metro Lucero (L6) a 200m</p>
              <p className="font-body-md text-on-surface-variant flex items-center gap-2 mb-1"><span className="material-symbols-outlined text-sm">directions_bus</span> Autobuses 31, 39, 158</p>
              <p className="font-body-md text-on-surface-variant flex items-center gap-2 mb-1"><span className="material-symbols-outlined text-sm">phone</span> +34 91X XXX XXX</p>
              <p className="font-body-md text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-sm">mail</span> info@babilin.es</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Inicio;
