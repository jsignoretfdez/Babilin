import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getCurrentMenu, downloadMenuPdf, getProgrammingByClassroom, downloadProgrammingPdf } from '../services/api';

const AccesoPadres = () => {
  const [menu, setMenu] = useState(null);
  const [downloadingMenu, setDownloadingMenu] = useState(false);
  const [programming, setProgramming] = useState({ ositos: null, leones: null, monitos: null });
  const [downloadingProg, setDownloadingProg] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const menuRes = await getCurrentMenu();
      setMenu(menuRes.data);
    } catch (err) {
      console.log('No hay menú disponible');
    }

    for (const classroom of ['ositos', 'leones', 'monitos']) {
      try {
        const res = await getProgrammingByClassroom(classroom);
        setProgramming(prev => ({ ...prev, [classroom]: res.data }));
      } catch (err) {
        console.log(`No hay programación para ${classroom}`);
      }
    }
  };

  const handleDownloadMenu = async () => {
    if (!menu) return;
    setDownloadingMenu(true);
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
      setDownloadingMenu(false);
    }
  };

  const handleDownloadProgramming = async (classroom) => {
    const prog = programming[classroom];
    if (!prog) return;
    setDownloadingProg(classroom);
    try {
      const blob = await downloadProgrammingPdf(prog.id);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `programacion-${classroom}-${prog.month}-${prog.year}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error al descargar:', err);
    } finally {
      setDownloadingProg('');
    }
  };

  const classrooms = [
    {
      id: 'monitos',
      name: 'Aula Monitos',
      age: 'De 2 a 3 años',
      color: 'primary-container',
      textColor: 'primary',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNfbnrnQxX6YkgkWEaH-h23j82TIaUj5ZUoDgsHUIYuuGTKK2cfwdXIuRKedrTjkHU-afs7nv1CwDteejcZmYde7_H_kS5UE8wzAzHqcLy-P1p4usnOHmrkUqtXIWLyDM4nPI1I8HGvYxy1F7L1tMCMGBN5VrsqH1HtdaxVlP2bVfVZ6pkHbRmmY6VtFOxC6YTcbAPuSsaKAybF7XncMcW36pdEdIn2uQcFEr7Cb3jf37qgalbz9ict7MCTiJfkqJLkWpr1Y5I1SQ'
    },
    {
      id: 'leones',
      name: 'Aula Leones',
      age: 'De 1 a 2 años',
      color: 'tertiary-container',
      textColor: 'tertiary',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA67eYFJ8Da59cNLP0wUVtoZcdCIY4qNYHGZ2A8p297u-a-MwQWKCLqvNe9miLy4nnOpcXi4ABzSXcaoMHJOe9wjbOMzJxKhrMM46irhnBks_FuAz-TfwmHijVg6A2lQW28gIwiXVZn-W3_om2HO4_pNoaIbwrY5NF0Oj_7aqp1bUX10hY5ovHuudT4eQpJDtHgBQfe9FXjq-UOA8afR4flTklMrRWjkkh60VKtc_HoCIN3hKaTWsz0rKtqluhvpqx_r4SLiu3LJBU'
    },
    {
      id: 'ositos',
      name: 'Aula Ositos',
      age: 'De 0 a 1 año',
      color: 'secondary-container',
      textColor: 'secondary',
      image: 'https://lh3.googleusercontent.com/aida/ADBb0ujop8FfOMi7cSzpu64tN12iY7S7K-meVtLUE6EKajLAb74bO1M-uS6diGPqZBzEALHpGwaC0PPu0dBs0-RW097a9nYC-Uby4u3Mh4o4yEHRXyPoqsjf1tgNOzD2zEQTnYR4Vy-FZF_4lR6Qhy1oqCrR5QrLTjhtTO5GY-GTwZZTwnPdxrcgl0zrHlDzu5nTt4aZ7KnYTG8hIFPtrAswZBwBi6-OsH6i_bV9yBP8fHsdiXRDmiwSZ6nPDQ'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Portal de Padres | Babilín Escuela Infantil</title>
        <meta name="description" content="Portal de familias de Babilín. Accede a la programación de aulas, menú mensual y actividades de tu hijo en nuestra escuela infantil." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="px-margin-mobile md:px-margin-desktop py-12 md:py-20 max-w-max-width mx-auto">
      {/* Welcome Section */}
      <section className="mb-12 text-center">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-4">Acceso Padres</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Bienvenidos al portal de familias. Aquí podrán consultar la información diaria de las actividades, eventos importantes y el menú mensual de sus pequeños.
        </p>
      </section>

      {/* Aulas Section */}
      <section className="mb-16">
        <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined">child_care</span>
          Aulas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <div key={classroom.id} className="group block relative rounded-2xl overflow-hidden bg-surface-container-lowest border border-surface-container-high shadow-sm hover:shadow-[0_10px_30px_rgba(190,217,238,0.15)] transition-all duration-300">
              <div className="h-48 w-full bg-primary-container/20 relative">
                <img alt={classroom.name} className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-500" src={classroom.image} />
              </div>
              <div className="p-6">
                <h3 className={`font-headline-sm text-headline-sm text-${classroom.textColor} mb-2`}>{classroom.name}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">{classroom.age}</p>
                {programming[classroom.id] && (
                  <div className="flex flex-col gap-2">
                    <Link
                      to={`/programacion/${classroom.id}`}
                      className={`inline-flex items-center gap-1 font-label-lg text-label-lg text-${classroom.textColor} group-hover:underline decoration-2 underline-offset-4`}
                    >
                      Ver programación <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                    <button
                      onClick={() => handleDownloadProgramming(classroom.id)}
                      disabled={downloadingProg === classroom.id}
                      className="inline-flex items-center gap-1 font-label-sm text-on-surface-variant hover:text-primary transition-colors disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-sm">{downloadingProg === classroom.id ? 'hourglass_empty' : 'download'}</span>
                      {downloadingProg === classroom.id ? 'Descargando...' : 'Descargar PDF'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menú Mensual Section */}
      <section className="mb-12">
        <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined">restaurant</span>
          Menú Mensual
        </h2>
        <div className="bg-surface-container-lowest rounded-3xl p-8 border border-surface-container-low shadow-[0_10px_30px_rgba(190,217,238,0.1)] flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 w-32 h-32 rounded-full bg-primary-container/30 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined" style={{ fontSize: 64, fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
              {menu ? `Menú de ${menu.month} ${menu.year}` : 'Menú Mensual'}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-lg">
              {menu
                ? 'Consulta el menú basal y las adaptaciones para alergias e intolerancias de este mes, elaborado por nuestros nutricionistas.'
                : 'Aún no hay un menú disponible para este mes. Pronto estará disponible.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {menu && (
                <button
                  onClick={handleDownloadMenu}
                  disabled={downloadingMenu}
                  className="bg-primary hover:bg-primary/90 text-on-primary font-label-lg text-label-lg py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">{downloadingMenu ? 'hourglass_empty' : 'download'}</span>
                  {downloadingMenu ? 'Descargando...' : 'Descargar PDF'}
                </button>
              )}
              <Link
                to="/menu"
                className="bg-transparent border-2 border-primary-container text-primary font-label-lg text-label-lg py-3 px-6 rounded-full hover:bg-primary-container/10 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">visibility</span>
                Ver Online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default AccesoPadres;
