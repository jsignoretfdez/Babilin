import { useState, useRef } from 'react';
import { uploadMenu } from '../services/api';

const MenuUploader = ({ onUploadSuccess, onClose }) => {
  const [file, setFile] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

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
    if (!file || !month) {
      setError('Selecciona un archivo PDF y un mes');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('month', month);
      formData.append('year', year);

      await uploadMenu(formData);
      setSuccess('Menú subido correctamente');
      setFile(null);
      setMonth('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al subir el menú');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-xl p-8 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-sm text-headline-sm text-primary">Subir Menú PDF</h2>
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-label-sm text-on-surface-variant mb-2">Mes</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
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
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest px-4 py-3 font-body-md"
              min="2024"
              max="2030"
              required
            />
          </div>

          <div>
            <label className="block font-label-sm text-on-surface-variant mb-2">Archivo PDF</label>
            <div
              className="border-2 border-dashed border-outline-variant rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="material-symbols-outlined text-4xl text-primary mb-2">upload_file</span>
              {file ? (
                <p className="font-body-md text-on-surface">{file.name}</p>
              ) : (
                <p className="font-body-md text-on-surface-variant">Haz clic para seleccionar un PDF</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading || !file || !month}
            className="bg-primary text-on-primary font-label-lg px-6 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {uploading ? 'Subiendo...' : 'Subir Menú'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MenuUploader;
