import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getCurrentMenu, downloadMenuPdf } from '../services/api';
import { parseMenuText } from '../utils/allergens';
import CalendarView from '../components/CalendarView';

const MenuView = () => {
  const [menu, setMenu] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    loadCurrentMenu();
  }, []);

  const loadCurrentMenu = async () => {
    try {
      const res = await getCurrentMenu();
      setMenu(res.data);

      if (res.data.parsed_data && Array.isArray(res.data.parsed_data)) {
        setMenuData(res.data.parsed_data);
      } else if (res.data.extracted_text) {
        const parsed = parseMenuText(res.data.extracted_text);
        setMenuData(parsed);
      }
    } catch (err) {
      console.log('No hay menú disponible');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!menu) return;
    setDownloading(true);
    try {
      const blob = await downloadMenuPdf(menu.id);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `menu-${menu.month}-${menu.year}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error al descargar:', err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">refresh</span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Menú Mensual | Babilín Escuela Infantil</title>
        <meta name="description" content="Menú mensual de Babilín. Cocina propia, menús equilibrados y adaptados a alergias e intolerancias. Escuela infantil bilingüe en Madrid." />
        <meta property="og:title" content="Menú Mensual | Babilín Escuela Infantil" />
        <meta property="og:description" content="Consulta el menú mensual de Babilín. Cocina propia y menús saludables para tu hijo." />
        <meta property="og:url" content="https://babilin.es/menu" />
        <link rel="canonical" href="https://babilin.es/menu" />
      </Helmet>
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative px-margin-mobile md:px-margin-desktop py-20 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-container rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-48 h-48 bg-secondary-container rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary-container text-on-tertiary-container font-label-sm mb-6">
            <span className="material-symbols-outlined text-[18px]">skillet</span>
            COCINA PROPIA Y SALUDABLE
          </span>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-6">Nuestra Cocina y Menú Mensual</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
            En Babilín, creemos que una buena alimentación es la base del crecimiento. Elaboramos menús equilibrados y llenos de sabor cada día en nuestras propias instalaciones.
          </p>
          {menu && (
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-on-primary font-label-lg shadow-lg hover:scale-105 transition-all disabled:opacity-50"
              >
                <span className="material-symbols-outlined">{downloading ? 'hourglass_empty' : 'download'}</span>
                {downloading ? 'Descargando...' : 'Descargar Menú PDF'}
              </button>
            </div>
          )}
        </div>
      </section>

    

      {/* Calendar Menu Display */}
      <section className="px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto">
        {menu ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-headline-md text-headline-md text-secondary">Menú Semanal</h2>
                <p className="font-body-md text-on-surface-variant">Menú de {menu.month} {menu.year}</p>
              </div>
            </div>
            <CalendarView menuData={menuData} />
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">restaurant</span>
            <h3 className="font-headline-sm text-on-surface-variant mb-2">No hay menú disponible</h3>
            <p className="font-body-md text-on-surface-variant">Aún no se ha subido ningún menú para este mes.</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
     
    </>
  );
};

export default MenuView;
