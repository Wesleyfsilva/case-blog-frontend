// App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FormArtigo from './pages/FormArtigo';

function RotaPrivada({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrar" element={<Register />} />
        <Route
          path="/dashboard"
          element={<RotaPrivada><Dashboard /></RotaPrivada>}
        />
        <Route
          path="/novo"
          element={<RotaPrivada><FormArtigo /></RotaPrivada>}
        />
        <Route
          path="/editar/:id"
          element={<RotaPrivada><FormArtigo /></RotaPrivada>}
        />
      </Routes>
    </Router>
  );
}
