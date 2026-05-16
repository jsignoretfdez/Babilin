import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/padres');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Acceso Padres | Babilín Escuela Infantil</title>
        <meta name="description" content="Portal de acceso para familias de Babilín. Consulta actividades, menús e información sobre el aula de tu hijo." />
        <meta property="og:title" content="Acceso Padres | Babilín Escuela Infantil" />
        <meta property="og:description" content="Accede al portal de familias de Babilín Escuela Infantil." />
        <meta property="og:url" content="https://babilin.es/login" />
        <link rel="canonical" href="https://babilin.es/login" />
      </Helmet>
      <div className="min-h-[80vh] flex items-center justify-center px-margin-mobile md:px-margin-desktop">
      <div className="w-full max-w-md">
        <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_10px_30px_rgba(190,217,238,0.15)] border border-surface-container">
          <div className="text-center mb-8">
            <img alt="Babilín Logo" className="h-20 w-auto object-contain mx-auto mb-4" src="/imagenes/logo.png" />
            <h1 className="font-headline-md text-headline-md text-primary">Acceso Padres</h1>
            <p className="font-body-md text-on-surface-variant mt-2">Introduce tus credenciales para acceder</p>
          </div>

          {error && (
            <div className="bg-error-container text-on-error-container p-4 rounded-lg mb-6 font-body-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest px-4 py-3 font-body-md"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="w-full rounded-lg border-outline-variant focus:border-primary focus:ring-primary bg-surface-container-lowest px-4 py-3 font-body-md"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-on-primary font-label-lg px-6 py-3 rounded-lg hover:opacity-90 transition-opacity w-full mt-2 disabled:opacity-50"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-surface-container-low rounded-lg">
            <p className="font-label-sm text-on-surface-variant mb-2">Usuarios de prueba:</p>
            <p className="font-body-md text-on-surface-variant text-sm">
              <strong>Admin:</strong> admin@babilin.es / admin123
            </p>
            <p className="font-body-md text-on-surface-variant text-sm">
              <strong>Padre:</strong> padre@babilin.es / padre123
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
