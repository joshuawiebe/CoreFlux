import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 text-brand-accent mx-auto mb-4" />
          <p className={`text-2xl font-bold ${isDark ? 'text-brand-primary' : 'text-brand-primary'}`}>Zugriff verweigert</p>
          <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Bitte melden Sie sich an</p>
        </div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
