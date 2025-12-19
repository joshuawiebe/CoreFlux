import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DeviceOverview from './pages/DeviceOverview';
import Settings from './pages/Settings';
import AdminPanel from './pages/AdminPanel';
import Team from './pages/Team';
import Impressum from './pages/Impressum';
import Pricing from './pages/Pricing';
import Checkout from './pages/Checkout';

// Styles
import './index.css';

function AppLayout({ children }) {
  const { isLoggedIn } = useAuth();
  const { isDark } = useTheme();
  
  return (
    <div className={isDark ? 'dark' : ''}>
      <Navbar />
      {!isLoggedIn ? (
        <div>
          {children}
        </div>
      ) : (
        <main className="flex-1 pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      )}
    </div>
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
