import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Auth from './pages/Auth';
import VacancyDetails from './pages/VacancyDetails';
import ApplicantDashboard from './pages/Dashboard/ApplicantDashboard';
import EmployerDashboard from './pages/Dashboard/EmployerDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Messages from './pages/Messages';
import Community from './pages/Community';
import AboutUs from './pages/AboutUs';
import SettingsPage from './pages/SettingsPage';
import { FilterProvider } from './context/FilterContext';
import { AuthProvider, AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <FilterProvider>
        <BrowserRouter>
          <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            <Header />
            <main>
              <Routes>
                {/* Публичные маршруты */}
                <Route path="/" element={<Home />} />
                <Route path="/vacancy/:id" element={<VacancyDetails />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/community" element={<Community />} />
                <Route path="/about" element={<AboutUs />} />

                {/* Защищенные общие маршруты */}
                <Route
                  path="/messages"
                  element={<ProtectedRoute><Messages /></ProtectedRoute>}
                />
                <Route
                  path="/settings"
                  element={<ProtectedRoute><SettingsPage /></ProtectedRoute>}
                />

                {/* Ролевые дашборды */}
                <Route
                  path="/dashboard"
                  element={<ProtectedRoute allowedRole="applicant"><ApplicantDashboard /></ProtectedRoute>}
                />
                <Route
                  path="/dashboard/employer"
                  element={<ProtectedRoute allowedRole="employer"><EmployerDashboard /></ProtectedRoute>}
                />
                <Route
                  path="/dashboard/admin"
                  element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>}
                />
              </Routes>
            </main>

            {/* Метрики Vercel (не влияют на интерфейс) */}
            <Analytics />
            <SpeedInsights />
          </div>
        </BrowserRouter>
      </FilterProvider>
    </AuthProvider>
  );
}

export default App;