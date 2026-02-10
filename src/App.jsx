import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Landing from './pages/LandingNew';
import Login from './pages/Login';
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

function AppLayout({ children }) {
  const { isLoggedIn } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();
  
  // Check if current route is full-page (like AI Chat)
  const isFullPageRoute = location.pathname === '/ai-chat';
  
  // Apply dark mode to html element
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);
  
  return (
    <>
      {!isFullPageRoute && <Navbar />}
      {!isLoggedIn && !isFullPageRoute ? (
        <div>
          {children}
        </div>
      ) : (
        <main className={isFullPageRoute ? '' : 'flex-1 pt-24 pb-8'}>
          <div className={isFullPageRoute ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
            {children}
          </div>
        </main>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/team" element={<Team />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/ai-chat" element={<AIChat />} />

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

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
