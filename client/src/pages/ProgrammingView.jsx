import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProgrammingByClassroom, downloadProgrammingPdf, generateProgrammingPdf } from '../services/api';

const ProgrammingView = () => {
  const { classroom } = useParams();
  const navigate = useNavigate();
  const [programming, setProgramming] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const classroomNames = {
    ositos: 'Ositos',
    leones: 'Leones',
    monitos: 'Monitos'
  };

  const classroomIcons = {
    ositos: 'crib',
    leones: 'pets',
    monitos: 'smart_toy'
  };

  const classroomImages = {
    ositos: '/imagenes/osito.png',
    leones: '/imagenes/Leon.png',
    monitos: '/imagenes/mono.png'
  };

  useEffect(() => {
    loadProgramming();
  }, [classroom]);

  const loadProgramming = async () => {
    try {
      const res = await getProgrammingByClassroom(classroom);
      setProgramming(res.data);
    } catch (err) {
      console.log('No hay programación disponible');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!programming) return;
    setDownloading(true);
    try {
      let blob;
      if (programming.pdf_path) {
        // Download the uploaded PDF
        blob = await downloadProgrammingPdf(programming.id);
      } else {
        // Generate PDF from structured content
        blob = await generateProgrammingPdf(programming.id);
      }
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `programacion-${classroom}-${programming.month}-${programming.year}.pdf`);
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

  const formatText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      
      // Detect if line starts with bullet point or dash
      if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
        return (
          <li key={i} className="ml-4 mb-2 list-disc">
            {trimmed.replace(/^[•\-*]\s*/, '')}
          </li>
        );
      }
      
      return <p key={i} className="mb-3">{trimmed}</p>;
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">refresh</span>
      </div>
    );
  }

  if (!programming) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-margin-mobile">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">school</span>
          <h3 className="font-headline-sm text-on-surface-variant mb-2">No hay programación disponible</h3>
          <p className="font-body-md text-on-surface-variant mb-8">
            Aún no se ha subido programación para el aula de {classroomNames[classroom] || classroom}.
          </p>
          <button
            onClick={() => navigate('/padres')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-container text-on-primary-container font-label-lg hover:opacity-80 transition-opacity"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Volver a Portal de Padres
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[300px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={classroomImages[classroom] || classroomImages.monitos}
            alt={`Aula ${classroomNames[classroom]}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-surface"></div>
        </div>
        
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop pb-8">
          <div className="max-w-4xl mx-auto">
            {/* Info line */}
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-black-300 text-on-tertiary-container font-fredoka text-lg font-medium mb-3">
              Clase: {programming.class_info || classroomNames[classroom]} • Curso: {programming.course || '2025/2026'} • Mes: {programming.month}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-margin-mobile md:px-margin-desktop py-8 md:py-12 max-w-4xl mx-auto">
        <div className="space-y-6">
          
          {/* Main Card with Header inside */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-[0_10px_40px_rgba(190,217,238,0.2)] border border-surface-container overflow-hidden">
            
            {/* Card Header - Unit Title */}
            <div className="bg-primary-container/20 p-6 md:p-8 border-b border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-fredoka text-xs font-medium mb-3">
                    <span className="material-symbols-outlined text-sm">school</span>
                    UNIDAD DIDÁCTICA
                  </span>
                  <h1 className="font-fredoka text-2xl md:text-3xl text-primary font-bold">
                    {programming.unit_title || 'Programación Mensual'}
                  </h1>
                  {programming.unit_subtitle && (
                    <p className="font-fredoka text-lg text-on-surface-variant mt-1">{programming.unit_subtitle}</p>
                  )}
                </div>
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl text-primary">{classroomIcons[classroom] || 'school'}</span>
                </div>
              </div>
            </div>

            {/* Unit Description */}
            {programming.unit_description && (
              <div className="p-6 md:p-8 border-b border-outline-variant/20">
                <div className="font-fredoka text-on-surface leading-relaxed">
                  {formatText(programming.unit_description)}
                </div>
              </div>
            )}

            {/* Routines Section */}
            {programming.routines_text && (
              <div className="p-6 md:p-8 bg-tertiary-container/5 border-b border-outline-variant/20">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-tertiary">tips_and_updates</span>
                  <h2 className="font-fredoka text-lg font-bold text-tertiary">Rutinas y Consejos</h2>
                </div>
                <div className="font-fredoka text-on-surface leading-relaxed">
                  {formatText(programming.routines_text)}
                </div>
              </div>
            )}

            {/* English Section */}
            {programming.english_text && (
              <div className="p-6 md:p-8 bg-secondary-container/5 border-b border-outline-variant/20">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-secondary">translate</span>
                  <h2 className="font-fredoka text-lg font-bold text-secondary">Inglés</h2>
                </div>
                <div className="font-fredoka text-on-surface leading-relaxed">
                  {formatText(programming.english_text)}
                </div>
              </div>
            )}

            {/* Important Days Section */}
            {programming.important_days_text && (
              <div className="p-6 md:p-8 bg-error-container/5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-error">event</span>
                  <h2 className="font-fredoka text-lg font-bold text-error">Días Importantes este Mes</h2>
                </div>
                <div className="font-fredoka text-on-surface leading-relaxed">
                  {formatText(programming.important_days_text)}
                </div>
              </div>
            )}
          </div>

          {/* Download Button - Always visible */}
          <div className="text-center pt-4">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-primary text-on-primary font-fredoka font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-xl">{downloading ? 'hourglass_empty' : 'download'}</span>
              {downloading ? 'Descargando...' : 'Descargar Programación PDF'}
            </button>
            <p className="font-fredoka text-sm text-on-surface-variant mt-2">
              Se generará un PDF con toda la información de la programación
            </p>
          </div>

          {/* Back Button */}
          <div className="text-center pt-4 pb-8">
            <button
              onClick={() => navigate('/padres')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors font-fredoka font-medium"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Volver a Portal de Padres
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProgrammingView;
