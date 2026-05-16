import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import MenuUploader from '../components/MenuUploader';
import ProgrammingUploader from '../components/ProgrammingUploader';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [showMenuUploader, setShowMenuUploader] = useState(false);
  const [showProgrammingUploader, setShowProgrammingUploader] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState('');

  const handleProgrammingUpload = (classroom) => {
    setSelectedClassroom(classroom);
    setShowProgrammingUploader(true);
  };

  return (
    <>
      <Helmet>
        <title>Administración | Babilín Escuela Infantil</title>
        <meta name="description" content="Panel de administración de Babilín. Gestiona menús y programaciones de aula." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="px-margin-mobile md:px-margin-desktop py-8 max-w-max-width mx-auto w-full space-y-8">
      {/* Welcome Header */}
      <section className="mb-8">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">
          Bienvenido, {user?.name || 'Parents'}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Este es tu panel de administración. Aquí puedes gestionar las actividades diarias, eventos importantes y el menú mensual para tus pequeños.
        </p>
      </section>

      {/* Menú Mensual Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary">restaurant</span>
          <h2 className="font-headline-sm text-headline-sm text-primary">Menú Mensual</h2>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_10px_30px_rgba(190,217,238,0.15)] border border-surface-container">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-label-lg text-label-lg text-on-surface">Gestión del Menú</h3>
            <span className="bg-primary-container text-on-primary-container font-label-sm text-label-sm px-3 py-1 rounded-full">Mensual</span>
          </div>
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="bg-tertiary-container text-on-tertiary-container p-2 rounded-lg mt-1">
                <span className="material-symbols-outlined">bakery_dining</span>
              </div>
              <div>
                <p className="font-label-lg text-label-lg text-on-surface">Subir Menú</p>
                <p className="font-body-md text-body-md text-on-surface-variant">Sube el menú mensual en formato PDF para que las familias puedan consultarlo.</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowMenuUploader(true)}
            className="w-full py-3 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">upload_file</span>
            Subir Menú PDF
          </button>
          <Link to="/menu" className="w-full mt-3 py-3 rounded-lg border border-primary text-primary font-label-lg text-label-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">calendar_month</span>
            Ver Menú Completo
          </Link>
        </div>
      </section>

      {/* Planes de Aula Section */}
      <section className="space-y-4 mt-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary">school</span>
          <h2 className="font-headline-sm text-headline-sm text-primary">Planes de Aula</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Baby Class - Ositos */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_10px_30px_rgba(190,217,238,0.15)] border border-surface-container flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 bg-secondary-container/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-2xl">crib</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Ositos</h3>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-2">0 - 1 Years</p>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-6">
              Nos centramos en la exploración sensorial con juguetes blandos y materiales texturizados. Introducimos canciones de cuna relajantes durante la siesta.
            </p>
            <button
              onClick={() => handleProgrammingUpload('ositos')}
              className="text-primary font-label-lg text-label-lg flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              Añadir Programación <span className="material-symbols-outlined text-sm">upload_file</span>
            </button>
          </div>

          {/* Toddler Class - Leones */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_10px_30px_rgba(190,217,238,0.15)] border border-surface-container flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-secondary-fixed text-on-secondary-fixed p-3 rounded-full">
                <span className="material-symbols-outlined">pets</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Leones</h3>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-2">1 - 2 Years</p>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-6">
              Exploración de colores mediante la pintura con los dedos y juegos sencillos de reconocimiento de formas. El tiempo dedicado a la música se centra en el ritmo.
            </p>
            <button
              onClick={() => handleProgrammingUpload('leones')}
              className="text-primary font-label-lg text-label-lg flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              Añadir Programación <span className="material-symbols-outlined text-sm">upload_file</span>
            </button>
          </div>

          {/* Preschool Class - Monitos */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_10px_30px_rgba(190,217,238,0.15)] border border-surface-container flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary-fixed text-on-primary-fixed p-3 rounded-full">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Monitos</h3>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-2">2 - 3 Years</p>
            <p className="font-body-md text-body-md text-on-surface-variant flex-grow mb-6">
              Introducción a las hojas de otoño y los cambios climáticos. Practicaremos la motricidad fina con tijeras de seguridad y pegamento.
            </p>
            <button
              onClick={() => handleProgrammingUpload('monitos')}
              className="text-primary font-label-lg text-label-lg flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              Añadir Programación <span className="material-symbols-outlined text-sm">upload_file</span>
            </button>
          </div>
        </div>
      </section>

      {/* Menu Uploader Modal */}
      {showMenuUploader && (
        <MenuUploader
          onUploadSuccess={() => setShowMenuUploader(false)}
          onClose={() => setShowMenuUploader(false)}
        />
      )}

      {/* Programming Uploader Modal */}
      {showProgrammingUploader && (
        <ProgrammingUploader
          classroom={selectedClassroom}
          onUploadSuccess={() => setShowProgrammingUploader(false)}
          onClose={() => setShowProgrammingUploader(false)}
        />
      )}
    </div>
    </>
  );
};

export default AdminDashboard;
