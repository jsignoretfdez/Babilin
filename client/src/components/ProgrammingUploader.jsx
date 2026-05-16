import { useState, useRef } from 'react';
import { uploadProgramming } from '../services/api';

const ProgrammingUploader = ({ classroom, onUploadSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    month: '',
    year: new Date().getFullYear(),
    course: '2025/2026',
    class_info: '',
    unit_title: '',
    unit_subtitle: '',
    unit_description: '',
    routines_text: '',
    english_text: '',
    important_days_text: ''
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const classroomNames = {
    ositos: 'Ositos (0-1 años)',
    leones: 'Leones (1-2 años)',
    monitos: 'Monitos (2-3 años)'
  };

  const classroomAges = {
    ositos: '0-1 años',
    leones: '1-2 años',
    monitos: '2-3 años'
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Solo se permiten archivos PDF');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.month) {
      setError('Selecciona un mes');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const submitData = new FormData();
      submitData.append('classroom', classroom);
      submitData.append('month', formData.month);
      submitData.append('year', formData.year);
      submitData.append('course', formData.course);
      submitData.append('class_info', `${classroomAges[classroom]}`);
      submitData.append('unit_title', formData.unit_title);
      submitData.append('unit_subtitle', formData.unit_subtitle);
      submitData.append('unit_description', formData.unit_description);
      submitData.append('routines_text', formData.routines_text);
      submitData.append('english_text', formData.english_text);
      submitData.append('important_days_text', formData.important_days_text);
      
      if (file) {
        submitData.append('pdf', file);
      }

      await uploadProgramming(submitData);
      setSuccess('Programación guardada correctamente');
      setFormData({
        month: '',
        year: new Date().getFullYear(),
        course: '2025/2026',
        class_info: '',
        unit_title: '',
        unit_subtitle: '',
        unit_description: '',
        routines_text: '',
        english_text: '',
        important_days_text: ''
      });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar la programación');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-xl p-6 md:p-8 max-w-2xl w-full shadow-xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-primary">Subir Programación</h2>
            <p className="font-body-sm text-on-surface-variant mt-1">{classroomNames[classroom] || classroom}</p>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-3 rounded-lg mb-4 font-body-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-tertiary-container text-on-tertiary-container p-3 rounded-lg mb-4 font-body-md text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mes, Año y Curso */}
          <div className="bg-surface-container rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-label-sm text-on-surface-variant mb-2">Mes *</label>
                <select
                  value={formData.month}
                  onChange={(e) => handleInputChange('month', e.target.value)}
                  className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest px-4 py-3 font-body-md"
                  required
                >
                  <option value="">Seleccionar mes</option>
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-label-sm text-on-surface-variant mb-2">Año</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                  className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest px-4 py-3 font-body-md"
                  min="2024"
                  max="2030"
                />
              </div>
              <div>
                <label className="block font-label-sm text-on-surface-variant mb-2">Curso</label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => handleInputChange('course', e.target.value)}
                  className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest px-4 py-3 font-body-md"
                  placeholder="2025/2026"
                />
              </div>
            </div>
          </div>

          {/* Unidad Didáctica */}
          <div className="bg-primary-container/10 rounded-lg p-4 border border-primary-container/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">school</span>
              <h3 className="font-label-lg text-primary">Unidad Didáctica</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-label-sm text-on-surface-variant mb-2">Título de la Unidad *</label>
                <input
                  type="text"
                  value={formData.unit_title}
                  onChange={(e) => handleInputChange('unit_title', e.target.value)}
                  className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest px-4 py-3 font-body-md"
                  placeholder="Ej: Mi familia"
                />
              </div>
              <div>
                <label className="block font-label-sm text-on-surface-variant mb-2">Subtítulo (opcional)</label>
                <input
                  type="text"
                  value={formData.unit_subtitle}
                  onChange={(e) => handleInputChange('unit_subtitle', e.target.value)}
                  className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest px-4 py-3 font-body-md"
                  placeholder="Ej: Los miembros de mi familia"
                />
              </div>
              <div>
                <label className="block font-label-sm text-on-surface-variant mb-2">Descripción / Objetivos</label>
                <textarea
                  value={formData.unit_description}
                  onChange={(e) => handleInputChange('unit_description', e.target.value)}
                  className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest px-4 py-3 font-body-md"
                  rows="6"
                  placeholder="Describe los objetivos y contenido de la unidad didáctica..."
                />
              </div>
            </div>
          </div>

          {/* Rutinas y Consejos */}
          <div className="bg-tertiary-container/10 rounded-lg p-4 border border-tertiary-container/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-tertiary">tips_and_updates</span>
              <h3 className="font-label-lg text-tertiary">Rutinas y Consejos</h3>
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-2">Rutinas y consejos para padres</label>
              <textarea
                value={formData.routines_text}
                onChange={(e) => handleInputChange('routines_text', e.target.value)}
                className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest px-4 py-3 font-body-md"
                rows="6"
                placeholder="Incluye rutinas diarias y consejos para estimular el desarrollo..."
              />
            </div>
          </div>

          {/* Inglés */}
          <div className="bg-secondary-container/10 rounded-lg p-4 border border-secondary-container/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary">translate</span>
              <h3 className="font-label-lg text-secondary">Inglés</h3>
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-2">Actividades de inglés este mes</label>
              <textarea
                value={formData.english_text}
                onChange={(e) => handleInputChange('english_text', e.target.value)}
                className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest px-4 py-3 font-body-md"
                rows="4"
                placeholder="Describe las actividades de inglés del mes..."
              />
            </div>
          </div>

          {/* Días Importantes */}
          <div className="bg-error-container/10 rounded-lg p-4 border border-error-container/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-error">event</span>
              <h3 className="font-label-lg text-error">Días Importantes</h3>
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-2">Eventos y celebraciones del mes</label>
              <textarea
                value={formData.important_days_text}
                onChange={(e) => handleInputChange('important_days_text', e.target.value)}
                className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest px-4 py-3 font-body-md"
                rows="4"
                placeholder="Incluye festivos, celebraciones escolares, eventos..."
              />
            </div>
          </div>

          {/* PDF opcional */}
          <div className="bg-surface-container rounded-lg p-4">
            <label className="block font-label-sm text-on-surface-variant mb-2">PDF de referencia (opcional)</label>
            <div
              className="border-2 border-dashed border-outline-variant rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="material-symbols-outlined text-3xl text-primary mb-2">upload_file</span>
              {file ? (
                <p className="font-body-md text-on-surface">{file.name}</p>
              ) : (
                <p className="font-body-md text-on-surface-variant">Haz clic para seleccionar un PDF (opcional)</p>
              )}
            </div>
          </div>

          {/* Botón guardar */}
          <button
            type="submit"
            disabled={uploading || !formData.month}
            className="w-full bg-primary text-on-primary font-label-lg px-6 py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">{uploading ? 'hourglass_empty' : 'save'}</span>
            {uploading ? 'Guardando...' : 'Guardar Programación'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProgrammingUploader;
