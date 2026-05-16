import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Inicio from './pages/Inicio';
import Galeria from './pages/Galeria';
import Login from './pages/Login';
import AccesoPadres from './pages/AccesoPadres';
import AdminDashboard from './pages/AdminDashboard';
import MenuView from './pages/MenuView';
import ProgrammingView from './pages/ProgrammingView';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="galeria" element={<Galeria />} />
        <Route path="login" element={<Login />} />
        <Route
          path="padres"
          element={
            <ProtectedRoute requiredRole="parent">
              <AccesoPadres />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="menu" element={<MenuView />} />
        <Route path="programacion/:classroom" element={<ProgrammingView />} />
      </Route>
    </Routes>
  );
}

export default App;
