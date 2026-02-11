import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignupForm from '../components/SignupForm';
import ServiceSelection from '../components/ServiceSelection';
import darkLogo from '../assets/dark.png';
import lightLogo from '../assets/light.png';

const Signup = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showServiceSelection, setShowServiceSelection] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Call auth signup
      await signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      // Show service selection
      setShowServiceSelection(true);
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  if (showServiceSelection) {
    return <ServiceSelection />;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Animated Background */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${isDark ? '' : ''}`}>
        <div className={`absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-blue-600' : 'bg-blue-300'}`} />
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-purple-600' : 'bg-purple-300'}`} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="flex items-center gap-3 group mb-8 w-fit">
            <img
              src={isDark ? darkLogo : lightLogo}
              alt="CoreFlux"
              className="h-8 group-hover:scale-105 transition-transform"
            />
            <span className={`font-black text-xl ${isDark ? 'text-white' : 'text-black'}`}>
              Core<span className="text-blue-500">Flux</span>
            </span>
          </Link>

          <h1 className={`text-4xl font-black mb-3 ${isDark ? 'text-white' : 'text-black'}`}>
            Create Account
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Join CoreFlux to access our AI platform and smart heating services
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg border-l-4 ${isDark ? 'bg-red-900/20 border-l-red-500 text-red-200' : 'bg-red-50 border-l-red-500 text-red-700'}`}
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <SignupForm onSubmit={handleSignup} loading={loading} />

        {/* Divider */}
        <div className="relative my-8">
          <div className={`absolute inset-0 flex items-center ${isDark ? '' : ''}`}>
            <div className={`w-full border-t ${isDark ? 'border-gray-700' : 'border-gray-300'}`} />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className={`px-2 ${isDark ? 'bg-black text-gray-400' : 'bg-white text-gray-600'}`}>
              Already have an account?
            </span>
          </div>
        </div>

        {/* Sign In Link */}
        <Link
          to="/login"
          className={`block text-center py-3 rounded-lg border-2 font-semibold transition-all ${
            isDark
              ? 'border-gray-700 text-blue-400 hover:bg-gray-900'
              : 'border-blue-300 text-blue-600 hover:bg-blue-50'
          }`}
        >
          Sign In Instead
        </Link>

        {/* Footer */}
        <p className={`text-center text-xs mt-6 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
          By signing up, you agree to our{' '}
          <Link to="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </Link>
          {' '}and{' '}
          <Link to="/impressum" className="text-blue-500 hover:underline">
            Terms of Service
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
