import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ModelsProvider } from './context/ModelsContext';
import ProfessionalNavbar from './components/NavbarV2';
import CookieConsent from './components/CookieConsent';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Landing from './pages/LandingNew';
import Login from './pages/Login';
import SignupPagePro from './pages/SignupPagePro';
import Dashboard from './pages/Dashboard';
import DeviceOverview from './pages/DeviceOverview';
import Settings from './pages/Settings';
import AdminPanel from './pages/AdminPanel';
import Team from './pages/Team';
import Impressum from './pages/Impressum';
import Privacy from './pages/Privacy';
import Pricing from './pages/Pricing';
import Checkout from './pages/Checkout';
import AIChat from './pages/AIChat';

// Styles
import './index.css';

// Smart Landing Route that redirects logged-in users to dashboard
function SmartLanding() {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Landing />;
}

function AppLayout({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  
  // Check if current route is full-page (like AI Chat, Devices Overview)
  const fullPageRoutes = ['/ai-chat', '/devices'];
  const isFullPageRoute = fullPageRoutes.includes(location.pathname);
  
  return (
    <>
      {!isFullPageRoute && <ProfessionalNavbar />}
      {!isLoggedIn && !isFullPageRoute ? (
        <div className="w-full min-h-screen">
          {children}
        </div>
      ) : (
        <main className={`w-full min-h-screen ${isFullPageRoute ? 'bg-dark-bg' : 'pt-20 pb-8 bg-dark-bg'}`}>
          <div className={isFullPageRoute ? 'w-full h-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
            {children}
          </div>
        </main>
      )}
      <CookieConsent />
    </>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ModelsProvider>
            <div className="w-full min-h-screen overflow-x-hidden">
              <AppLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<SmartLanding />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignupPagePro />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/team" element={<Team />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/privacy" element={<Privacy />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/devices"
                element={
                  <PrivateRoute>
                    <DeviceOverview />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminPanel />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ai-chat"
                element={
                  <PrivateRoute>
                    <AIChat />
                  </PrivateRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
              </AppLayout>
            </div>
            <Analytics />
          </ModelsProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
